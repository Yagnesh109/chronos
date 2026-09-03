use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize)]
pub struct User {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub password_hash: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct SignupRequest {
    pub name: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct SignupResponse {
    pub message: String,
    pub user_id: Uuid,
    pub name: String,
    pub email: String,
}

#[derive(Debug, Serialize)]
pub struct LoginResponse {
    pub message: String,
    pub user_id: Uuid,
    pub name: String,
    pub email: String,
}