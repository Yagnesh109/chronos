use dotenvy::dotenv;
use sqlx::postgres::PgPoolOptions;
use std::env;
use tauri::Manager;

mod auth;

pub struct AppState {
    pub db: sqlx::PgPool,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Load environment variables from .env
    dotenv().ok();

    tauri::Builder::default()
        .setup(|app| {
            // Get database URL from .env or use a default
            let database_url = env::var("DATABASE_URL")
                .unwrap_or_else(|_| "postgres://username:password@localhost/chronos_db".to_string());

            // Initialize PostgreSQL connection pool using async runtime block
            let pool = tauri::async_runtime::block_on(async {
                let pool = PgPoolOptions::new()
                    .max_connections(5)
                    .connect(&database_url)
                    .await
                    .expect("Failed to connect to Postgres. Check your DATABASE_URL.");

                // Create users table if missing
                let _ = sqlx::query(
                    r#"
                    CREATE TABLE IF NOT EXISTS users (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        name VARCHAR(120),
                        email VARCHAR(255) UNIQUE NOT NULL,
                        password_hash TEXT NOT NULL,
                        role VARCHAR(50) NOT NULL DEFAULT 'employee',
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                    "#,
                )
                .execute(&pool)
                .await;

                // Ensure columns exist on pre-existing users table
                let _ = sqlx::query("ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(120);")
                    .execute(&pool)
                    .await;

                let _ = sqlx::query("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'employee';")
                    .execute(&pool)
                    .await;

                pool
            });

            // Manage the connection pool via Tauri state
            app.manage(AppState { db: pool });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            auth::login,
            auth::signup,
            auth::authenticate
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
