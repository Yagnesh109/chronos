use dotenvy::dotenv;
use sqlx::postgres::PgPoolOptions;
use std::env;
use tauri::Manager;

mod auth;

pub struct AppState {
    pub db: sqlx::PgPool,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
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
                PgPoolOptions::new()
                    .max_connections(5)
                    .connect(&database_url)
                    .await
            }).expect("Failed to connect to Postgres. Check your DATABASE_URL.");

            // Manage the connection pool via Tauri state
            app.manage(AppState { db: pool });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, auth::authenticate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
