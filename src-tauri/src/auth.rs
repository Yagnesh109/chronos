use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use serde::{Deserialize, Serialize};
use sqlx::Row;
use tauri::State;
use uuid::Uuid;

use crate::AppState;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AuthResponse {
    pub success: bool,
    pub user_id: Option<String>,
    pub name: Option<String>,
    pub email: Option<String>,
    pub role: String,
    pub message: String,
}

#[tauri::command]
pub async fn signup(
    name: String,
    email: String,
    password: String,
    role: Option<String>,
    state: State<'_, AppState>,
) -> Result<AuthResponse, String> {
    let email_trimmed = email.trim().to_lowercase();
    let name_trimmed = name.trim().to_string();
    let user_role = role.unwrap_or_else(|| "employee".to_string());

    if email_trimmed.is_empty() {
        return Ok(AuthResponse {
            success: false,
            user_id: None,
            name: None,
            email: None,
            role: user_role,
            message: "Email cannot be empty".to_string(),
        });
    }

    if password.is_empty() {
        return Ok(AuthResponse {
            success: false,
            user_id: None,
            name: None,
            email: None,
            role: user_role,
            message: "Password cannot be empty".to_string(),
        });
    }

    // Check if email already exists
    let existing_count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM users WHERE LOWER(email) = $1")
        .bind(&email_trimmed)
        .fetch_one(&state.db)
        .await
        .map_err(|e| format!("Database error: {}", e))?;

    if existing_count > 0 {
        return Ok(AuthResponse {
            success: false,
            user_id: None,
            name: None,
            email: None,
            role: user_role,
            message: "Email is already registered".to_string(),
        });
    }

    // Hash password with Argon2
    let salt = SaltString::generate(&mut OsRng);
    let password_hash = Argon2::default()
        .hash_password(password.as_bytes(), &salt)
        .map_err(|e| format!("Password hashing failed: {}", e))?
        .to_string();

    let new_uuid = Uuid::new_v4();

    // 1. Try UUID insert with name and role
    let res1 = sqlx::query(
        "INSERT INTO users (id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)",
    )
    .bind(new_uuid)
    .bind(&name_trimmed)
    .bind(&email_trimmed)
    .bind(&password_hash)
    .bind(&user_role)
    .execute(&state.db)
    .await;

    if res1.is_err() {
        // 2. Try SERIAL/Integer auto-increment insert with name and role
        let res2 = sqlx::query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
        )
        .bind(&name_trimmed)
        .bind(&email_trimmed)
        .bind(&password_hash)
        .bind(&user_role)
        .execute(&state.db)
        .await;

        if res2.is_err() {
            // 3. Minimal fallback insert (SERIAL id, email, password_hash)
            sqlx::query(
                "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
            )
            .bind(&email_trimmed)
            .bind(&password_hash)
            .execute(&state.db)
            .await
            .map_err(|e| format!("Failed to create user: {}", e))?;
        }
    }

    Ok(AuthResponse {
        success: true,
        user_id: Some(new_uuid.to_string()),
        name: Some(name_trimmed),
        email: Some(email_trimmed),
        role: user_role,
        message: "Account created successfully".to_string(),
    })
}

#[tauri::command]
pub async fn login(
    email: String,
    password: String,
    role: Option<String>,
    state: State<'_, AppState>,
) -> Result<AuthResponse, String> {
    let email_trimmed = email.trim().to_lowercase();
    let requested_role = role.unwrap_or_else(|| "employee".to_string());

    if email_trimmed.is_empty() {
        return Ok(AuthResponse {
            success: false,
            user_id: None,
            name: None,
            email: None,
            role: requested_role,
            message: "Email cannot be empty".to_string(),
        });
    }

    // Select matching user row
    let row = sqlx::query("SELECT * FROM users WHERE LOWER(email) = $1")
        .bind(&email_trimmed)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| format!("Database query error: {}", e))?;

    let row = match row {
        Some(r) => r,
        None => {
            return Ok(AuthResponse {
                success: false,
                user_id: None,
                name: None,
                email: None,
                role: requested_role,
                message: "Invalid email or password".to_string(),
            });
        }
    };

    // Safely decode ID regardless of whether SQL column is UUID or INT4 / SERIAL
    let id_str: String = row
        .try_get::<Uuid, _>("id")
        .map(|u| u.to_string())
        .or_else(|_| row.try_get::<i32, _>("id").map(|i| i.to_string()))
        .or_else(|_| row.try_get::<i64, _>("id").map(|i| i.to_string()))
        .or_else(|_| row.try_get::<String, _>("id"))
        .unwrap_or_else(|_| "0".to_string());

    let stored_email: String = row.get("email");
    let stored_hash: String = row.get("password_hash");

    // Flexible column resolution for name and role
    let name: String = row
        .try_get("name")
        .or_else(|_| row.try_get("full_name"))
        .unwrap_or_else(|_| stored_email.clone());

    let db_role: String = row.try_get("role").unwrap_or(requested_role);

    // Verify password with Argon2 (with fallback to plain text comparison)
    let password_valid = if let Ok(parsed_hash) = PasswordHash::new(&stored_hash) {
        Argon2::default()
            .verify_password(password.as_bytes(), &parsed_hash)
            .is_ok()
    } else {
        password == stored_hash
    };

    if !password_valid {
        return Ok(AuthResponse {
            success: false,
            user_id: None,
            name: None,
            email: None,
            role: db_role,
            message: "Invalid email or password".to_string(),
        });
    }

    Ok(AuthResponse {
        success: true,
        user_id: Some(id_str),
        name: Some(name),
        email: Some(stored_email),
        role: db_role,
        message: "Login successful".to_string(),
    })
}

// Backward compatibility alias for authenticate command
#[tauri::command]
pub async fn authenticate(
    email: String,
    password: String,
    role: String,
    state: State<'_, AppState>,
) -> Result<AuthResponse, String> {
    login(email, password, Some(role), state).await
}
