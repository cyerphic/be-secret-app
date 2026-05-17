#[cfg(not(target_arch = "wasm32"))]
pub const CHUNK_SIZE: usize = 1024 * 1024;
pub const SALT_SIZE: usize = 32;
pub const NONCE_SIZE: usize = 12;
pub const VERSION: u8 = 1;
pub const FILE_MAGIC: &[u8; 9] = b"BE-SECRET";
