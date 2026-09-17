use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
use sqlx::SqlitePool;
use std::fs;
use std::path::PathBuf;
use std::str::FromStr;

/// Resolves the dedicated local database file path inside the app's local data folder.
pub fn get_db_path() -> PathBuf {
    let base_dir = dirs::data_local_dir().unwrap_or_else(|| PathBuf::from("."));
    base_dir.join("chronos").join("chronos.db")
}

/// Resolves the dedicated screenshots directory inside the app's local data folder.
pub fn get_screenshots_dir() -> PathBuf {
    let base_dir = dirs::data_local_dir().unwrap_or_else(|| PathBuf::from("."));
    base_dir.join("chronos").join("screenshots")
}

/// Automatically ensures the file system directory exists on app launch.
pub fn ensure_screenshots_dir() -> Result<PathBuf, std::io::Error> {
    let path = get_screenshots_dir();
    if !path.exists() {
        fs::create_dir_all(&path)?;
    }
    Ok(path)
}

/// Initializes SQLite database pool and applies required table migrations.
pub async fn init_pool(database_url: &str) -> Result<SqlitePool, sqlx::Error> {
    // 1. Ensure local screenshots directory exists automatically on app launch
    if let Err(e) = ensure_screenshots_dir() {
        eprintln!("Warning: Failed to create screenshots directory: {}", e);
    }

    // 2. Configure SQLite connection options with auto parent directory creation
    let connect_options = if database_url.starts_with("postgres")
        || database_url.is_empty()
        || database_url == "sqlite://chronos.db?mode=rwc"
        || database_url == "sqlite:chronos.db"
    {
        let db_path = get_db_path();
        if let Some(parent) = db_path.parent() {
            let _ = fs::create_dir_all(parent);
        }
        SqliteConnectOptions::new()
            .filename(&db_path)
            .create_if_missing(true)
    } else {
        match SqliteConnectOptions::from_str(database_url) {
            Ok(opts) => {
                // Ensure parent directory exists for file-based SQLite connections
                let filename = opts.get_filename();
                if let Some(parent) = filename.parent() {
                    if !parent.as_os_str().is_empty() {
                        let _ = fs::create_dir_all(parent);
                    }
                }
                opts.create_if_missing(true)
            }
            Err(_) => {
                let db_path = get_db_path();
                if let Some(parent) = db_path.parent() {
                    let _ = fs::create_dir_all(parent);
                }
                SqliteConnectOptions::new()
                    .filename(&db_path)
                    .create_if_missing(true)
            }
        }
    };

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(connect_options)
        .await?;

    // 3. Create activity_queue table for event logging
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS activity_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            app_name TEXT NOT NULL,
            sanitized_title TEXT NOT NULL,
            duration INTEGER NOT NULL DEFAULT 0,
            is_idle INTEGER NOT NULL DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // 4. Create screenshot_logs table for image file pointers and checksums
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS screenshot_logs (
            screenshot_id TEXT PRIMARY KEY,
            local_file_path TEXT NOT NULL,
            s3_object_key TEXT NOT NULL,
            image_hash TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            captured_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            is_blurred INTEGER DEFAULT 1 NOT NULL,
            blur_radius INTEGER DEFAULT 20 NOT NULL,
            window_title TEXT,
            app_name TEXT,
            device_id TEXT
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // 5. Create users table for user authentication
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'employee',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // 6. Create devices table for device management
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS devices (
            device_id TEXT PRIMARY KEY,
            user_id TEXT,
            device_name TEXT NOT NULL DEFAULT 'Endpoint Machine',
            os_type TEXT NOT NULL DEFAULT 'Win32',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .execute(&pool)
    .await?;

    Ok(pool)
}
