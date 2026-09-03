mod database;
mod handlers;
mod models;

use axum::{
    routing::post,
    Router,
};
use sqlx::PgPool;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    // Get database URL from .env
    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL must be set");

    // Connect to PostgreSQL
    let pool = PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to PostgreSQL");

    println!("PostgreSQL connected successfully!");

    // Create application routes
    let app = Router::new()
        .route(
            "/signup",
            post(handlers::auth_handler::signup),
        )
        .route(
            "/login",
            post(handlers::auth_handler::login),
        )
        .layer(CorsLayer::permissive())
        .with_state(pool);

    // Start server
    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .expect("Failed to bind server");

    println!("Server running on http://127.0.0.1:8080");

    axum::serve(listener, app)
        .await
        .expect("Server failed");
}