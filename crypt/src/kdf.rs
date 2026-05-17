use argon2::{Algorithm, Argon2, Params, Version};
use zeroize::Zeroizing;

use crate::error::CryptoError;

pub fn derive_key(password: &str, salt: &[u8]) -> Result<Zeroizing<[u8; 32]>, CryptoError> {
    let mut key = [0u8; 32];

    let params =
        Params::new(256 * 1024, 4, 4, Some(32)).map_err(|e| CryptoError::Kdf(e.to_string()))?;

    let argon2 = Argon2::new(Algorithm::Argon2id, Version::V0x13, params);

    argon2
        .hash_password_into(password.as_bytes(), salt, &mut key)
        .map_err(|e| CryptoError::Kdf(e.to_string()))?;

    Ok(Zeroizing::new(key))
}
