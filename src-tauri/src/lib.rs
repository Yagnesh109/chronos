use dotenvy::dotenv;
use std::env;
use tauri::Manager;

pub mod auth;
pub mod db;
pub mod privacy;
pub mod screenshot;

pub struct AppState {
    pub db: sqlx::SqlitePool,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Load environment variables from .env if present
    dotenv().ok();

    tauri::Builder::default()
        .setup(|app| {
            // Get database URL from .env or default fallback SQLite location
            let database_url = env::var("DATABASE_URL").unwrap_or_default();

            // Initialize SQLite database pool & migrations via modular db engine
            let pool = tauri::async_runtime::block_on(async {
                db::init_pool(&database_url)
                    .await
                    .expect("Failed to initialize database pool and schema migrations.")
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
            auth::authenticate,
            screenshot::capture_screenshot,
            screenshot::get_screenshot_logs,
            screenshot::delete_screenshot,
            screenshot::get_screenshot_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
