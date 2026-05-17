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

/**
 * Encrypts a local file using a streaming approach powered by the native Rust crypt core.
 * 
 * The encrypted data is streamed and written directly to the specified output path 
 * without loading the entire file into JavaScript memory, making it safe for large files.
 */
export function encryptFile(inP: string, outP: string, password: string): Promise<void> {
  return RustCryptCore.encryptFile(inP, outP, password);
}

/**
 * Decrypts a local encrypted file using a streaming approach powered by the native Rust crypt core.
 * 
 * The decrypted data is streamed and written directly to the specified output path, 
 * restoring the original file contents efficiently without bloating JavaScript memory.
 */
export function decryptFile(inP: string, outP: string, password: string): Promise<void> {
  return RustCryptCore.decryptFile(inP, outP, password);
}
