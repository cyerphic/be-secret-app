use aes_gcm::{
    aead::{Aead, Payload},
    Aes256Gcm, Nonce,
};

use crate::error::CryptoError;

pub fn encrypt_chunk(
    cipher: &Aes256Gcm,
    nonce: &[u8; 12],
    data: &[u8],
    aad: &[u8],
) -> Result<Vec<u8>, CryptoError> {
    cipher
        .encrypt(Nonce::from_slice(nonce), Payload { msg: data, aad })
        .map_err(|_| CryptoError::Encryption)
}

pub fn decrypt_chunk(
    cipher: &Aes256Gcm,
    nonce: &[u8; 12],
    data: &[u8],
    aad: &[u8],
) -> Result<Vec<u8>, CryptoError> {
    cipher
        .decrypt(Nonce::from_slice(nonce), Payload { msg: data, aad })
        .map_err(|_| CryptoError::AuthenticationFailed)
}
