mod cipher;
mod constants;
mod error;
mod kdf;

mod file;

pub use error::CryptoError;

pub use file::{decrypt_file, encrypt_file};

use aes_gcm::{Aes256Gcm, Key, KeyInit};
use rand::{thread_rng, RngCore};

use crate::cipher::{decrypt_chunk, encrypt_chunk};
use crate::constants::{FILE_MAGIC, NONCE_SIZE, SALT_SIZE, VERSION};
use crate::kdf::derive_key;

uniffi::setup_scaffolding!();

#[uniffi::export]
pub fn encrypt_bytes(plaintext: &[u8], pwd: &str) -> Result<Vec<u8>, CryptoError> {
    let mut output = Vec::with_capacity(
        FILE_MAGIC.len() + 1 + SALT_SIZE + NONCE_SIZE + 4 + plaintext.len() + 16,
    );

    output.extend_from_slice(FILE_MAGIC);
    output.push(VERSION);

    let mut salt = [0u8; SALT_SIZE];
    thread_rng().fill_bytes(&mut salt);
    output.extend_from_slice(&salt);

    let key = derive_key(pwd, &salt)?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));

    let mut nonce = [0u8; NONCE_SIZE];
    thread_rng().fill_bytes(&mut nonce);

    let aad = 0u64.to_le_bytes();
    let ciphertext = encrypt_chunk(&cipher, &nonce, plaintext, &aad)?;

    output.extend_from_slice(&nonce);
    output.extend_from_slice(&(ciphertext.len() as u32).to_be_bytes());
    output.extend_from_slice(&ciphertext);

    Ok(output)
}

#[uniffi::export]
pub fn decrypt_bytes(data: &[u8], pwd: &str) -> Result<Vec<u8>, CryptoError> {
    let min_len = FILE_MAGIC.len() + 1 + SALT_SIZE + NONCE_SIZE + 4;
    if data.len() < min_len {
        return Err(CryptoError::InvalidFormat);
    }

    let mut offset = 0;
    if &data[offset..offset + FILE_MAGIC.len()] != FILE_MAGIC {
        return Err(CryptoError::InvalidFormat);
    }
    offset += FILE_MAGIC.len();

    let version = data[offset];
    if version != VERSION {
        return Err(CryptoError::UnsupportedVersion(version));
    }
    offset += 1;

    let salt = &data[offset..offset + SALT_SIZE];
    offset += SALT_SIZE;

    let nonce: [u8; NONCE_SIZE] = data[offset..offset + NONCE_SIZE]
        .try_into()
        .map_err(|_| CryptoError::InvalidFormat)?;
    offset += NONCE_SIZE;

    let cipher_len = u32::from_be_bytes(
        data[offset..offset + 4]
            .try_into()
            .map_err(|_| CryptoError::InvalidFormat)?,
    ) as usize;
    offset += 4;

    if data.len() != offset + cipher_len {
        return Err(CryptoError::InvalidFormat);
    }

    let ciphertext = &data[offset..];

    let key = derive_key(pwd, salt)?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));
    let aad = 0u64.to_le_bytes();

    decrypt_chunk(&cipher, &nonce, ciphertext, &aad)
}
