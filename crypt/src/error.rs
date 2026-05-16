use thiserror::Error;

#[derive(Debug, Error, uniffi::Error)]
pub enum CryptoError {
    #[error("invalid file format")]
    InvalidFormat,

    #[error("unsupported version: {0}")]
    UnsupportedVersion(u8),

    #[error("authentication failed")]
    AuthenticationFailed,

    #[error("kdf error: {0}")]
    Kdf(String),

    #[error("encryption failure")]
    Encryption,

    #[error("io error: {0}")]
    Io(String),
}

impl From<std::io::Error> for CryptoError {
    fn from(err: std::io::Error) -> Self {
        CryptoError::Io(err.to_string())
    }
}
