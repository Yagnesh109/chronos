use axum::{
    extract::State,
    http::StatusCode,
    Json,
};

use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash,
        PasswordHasher,
        PasswordVerifier,
        SaltString,
    },
    Argon2,
};

use sqlx::PgPool;
use uuid::Uuid;

use crate::models::user::{
    SignupRequest,
    SignupResponse,
    LoginRequest,
    LoginResponse,
};

// =========================
// SIGNUP
// =========================

pub async fn signup(
    State(pool): State<PgPool>,
    Json(payload): Json<SignupRequest>,
) -> Result<(StatusCode, Json<SignupResponse>), (StatusCode, String)> {

    // Check if email already exists
    let existing_user = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM users WHERE email = $1"
    )
    .bind(&payload.email)
    .fetch_one(&pool)
    .await
    .map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            "Database error".to_string(),
        )
    })?;

    // If email already exists
    if existing_user > 0 {
        return Err((
            StatusCode::CONFLICT,
            "Email already registered".to_string(),
        ));
    }

    // Generate random salt
    let salt = SaltString::generate(&mut OsRng);

    // Hash password using Argon2
    let password_hash = Argon2::default()
        .hash_password(
            payload.password.as_bytes(),
            &salt,
        )
        .map_err(|_| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                "Password hashing failed".to_string(),
            )
        })?
        .to_string();

    // Generate user ID
    let user_id = Uuid::new_v4();

    // Insert user into PostgreSQL
    sqlx::query(
        r#"
        INSERT INTO users (
            id,
            name,
            email,
            password_hash
        )
        VALUES ($1, $2, $3, $4)
        "#
    )
    .bind(user_id)
    .bind(&payload.name)
    .bind(&payload.email)
    .bind(&password_hash)
    .execute(&pool)
    .await
    .map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            "Failed to create user".to_string(),
        )
    })?;

    Ok((
        StatusCode::CREATED,
        Json(SignupResponse {
            message: "User created successfully".to_string(),
            user_id,
            name: payload.name,
            email: payload.email,
        }),
    ))
}


// =========================
// LOGIN
// =========================

pub async fn login(
    State(pool): State<PgPool>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, (StatusCode, String)> {

    // Find user using email
    let user = sqlx::query_as::<_, (Uuid, String, String, String)>(
        r#"
        SELECT id, name, email, password_hash
        FROM users
        WHERE email = $1
        "#
    )
    .bind(&payload.email)
    .fetch_optional(&pool)
    .await
    .map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            "Database error".to_string(),
        )
    })?;

    // Check if user exists
    let (user_id, name, email, password_hash) = match user {
        Some(user) => user,

        None => {
            return Err((
                StatusCode::UNAUTHORIZED,
                "Invalid email or password".to_string(),
            ));
        }
    };

    // Convert stored password hash
    let parsed_hash = PasswordHash::new(&password_hash)
        .map_err(|_| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                "Password verification failed".to_string(),
            )
        })?;

    // Verify entered password
    Argon2::default()
        .verify_password(
            payload.password.as_bytes(),
            &parsed_hash,
        )
        .map_err(|_| {
            (
                StatusCode::UNAUTHORIZED,
                "Invalid email or password".to_string(),
            )
        })?;

    // Successful login
    Ok(Json(LoginResponse {
        message: "Login successful".to_string(),
        user_id,
        name,
        email,
    }))
}