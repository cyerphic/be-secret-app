import RustCryptCore from '../../modules/rust-crypt-core';

/**
 * Encrypts a base64-encoded plaintext payload with the native Rust crypt core.
 *
 * The returned value is also base64 encoded so callers can safely persist or
 * transport the binary ciphertext through JavaScript strings.
 */
export function encryptBase64(plaintextBase64: string, password: string): Promise<string> {
  return RustCryptCore.encryptBase64(plaintextBase64, password);
}

/**
 * Decrypts a base64-encoded ciphertext payload with the native Rust crypt core.
 *
 * The returned value is a base64-encoded plaintext payload.
 */
export function decryptBase64(ciphertextBase64: string, password: string): Promise<string> {
  return RustCryptCore.decryptBase64(ciphertextBase64, password);
}