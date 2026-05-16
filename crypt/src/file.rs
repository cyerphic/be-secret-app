use std::fs::{File, OpenOptions};
use std::io::{BufReader, BufWriter, Read, Write};

use aes_gcm::{Aes256Gcm, Key, KeyInit};
use rand::{thread_rng, RngCore};

use crate::cipher::{decrypt_chunk, encrypt_chunk};
use crate::constants::*;
use crate::error::CryptoError;
use crate::kdf::derive_key;

pub fn encrypt_file(in_p: &str, out_p: &str, pwd: &str) -> Result<(), CryptoError> {
    let mut reader = BufReader::new(File::open(in_p)?);
    let mut writer = BufWriter::new(
        OpenOptions::new()
            .create(true)
            .write(true)
            .truncate(true)
            .open(out_p)?,
    );

    writer.write_all(FILE_MAGIC)?;
    writer.write_all(&[VERSION])?;

    let mut salt = [0u8; SALT_SIZE];
    thread_rng().fill_bytes(&mut salt);
    writer.write_all(&salt)?;

    let key = derive_key(pwd, &salt)?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));

    let mut buffer = vec![0u8; CHUNK_SIZE];
    let mut chunk_count = 0u64;

    loop {
        let n = reader.read(&mut buffer)?;
        if n == 0 {
            break;
        }

        let mut nonce = [0u8; NONCE_SIZE];
        thread_rng().fill_bytes(&mut nonce);

        let aad = chunk_count.to_le_bytes();
        let ciphertext = encrypt_chunk(&cipher, &nonce, &buffer[..n], &aad)?;

        writer.write_all(&nonce)?;
        writer.write_all(&(ciphertext.len() as u32).to_be_bytes())?;
        writer.write_all(&ciphertext)?;

        chunk_count += 1;
    }

    writer.flush()?;
    Ok(())
}

pub fn decrypt_file(in_p: &str, out_p: &str, pwd: &str) -> Result<(), CryptoError> {
    let mut reader = BufReader::new(File::open(in_p)?);
    let mut writer = BufWriter::new(File::create(out_p)?);

    let mut magic = [0u8; FILE_MAGIC.len()];
    reader.read_exact(&mut magic)?;
    if magic.as_slice() != FILE_MAGIC {
        return Err(CryptoError::InvalidFormat);
    }

    let mut version_byte = [0u8; 1];
    reader.read_exact(&mut version_byte)?;
    if version_byte[0] != VERSION {
        return Err(CryptoError::UnsupportedVersion(version_byte[0]));
    }

    let mut salt = [0u8; SALT_SIZE];
    reader.read_exact(&mut salt)?;

    let key = derive_key(pwd, &salt)?;
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(&*key));

    let mut chunk_count = 0u64;

    loop {
        let mut nonce = [0u8; NONCE_SIZE];
        if reader.read_exact(&mut nonce).is_err() {
            break;
        }

        let mut len_buf = [0u8; 4];
        reader.read_exact(&mut len_buf)?;
        let cipher_len = u32::from_be_bytes(len_buf) as usize;

        let mut ciphertext = vec![0u8; cipher_len];
        reader.read_exact(&mut ciphertext)?;

        let aad = chunk_count.to_le_bytes();
        let plaintext = decrypt_chunk(&cipher, &nonce, &ciphertext, &aad)?;

        writer.write_all(&plaintext)?;
        chunk_count += 1;
    }

    writer.flush()?;
    Ok(())
}
