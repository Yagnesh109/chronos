use serde::{Deserialize, Serialize};
use tauri::State;
use crate::AppState;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AuthResponse {
    pub success: bool,
    pub role: String,
    pub message: String,
}

#[tauri::command]
pub async fn authenticate(
    email: String,
    password: String,
    role: String,
    state: State<'_, AppState>,
) -> Result<AuthResponse, String> {
    if email.is_empty() {
        return Ok(AuthResponse {
            success: false,
            role: "".to_string(),
            message: "Email cannot be empty".to_string(),
        });
    }

    // Since the database is now running and connection URL is in .env,
    // we can use the compile-time checked query! macro.
    let result = sqlx::query!(
        "SELECT id, role, password_hash FROM users WHERE email = $1",
        email
    )
    .fetch_optional(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    match result {
        Some(user) => {
            // Verify password
            if password == user.password_hash {
                Ok(AuthResponse {
                    success: true,
                    role: user.role, // Use role from DB
                    message: "Login successful".to_string(),
                })
            } else {
                Ok(AuthResponse {
                    success: false,
                    role: "".to_string(),
                    message: "Invalid password".to_string(),
                })
            }
        },
        None => {
            Ok(AuthResponse {
                success: false,
                role: "".to_string(),
                message: "User not found".to_string(),
            })
        }
    }
}
