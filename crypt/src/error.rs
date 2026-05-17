use thiserror::Error;

#[derive(Debug, Error, uniffi::Error)]
pub enum CryptoError {
    #[error("invalid file format")]
    InvalidFormat,

    #[error("unsupported version: {version}")]
    UnsupportedVersion {
        version: u8,
    },

    #[error("authentication failed")]
    AuthenticationFailed,

    #[error("kdf error: {details}")]
    Kdf {
        details: String,
    },

    #[error("encryption failure")]
    Encryption,

    #[error("io error: {details}")]
    Io {
        details: String,
    },
}

impl From<std::io::Error> for CryptoError {
    fn from(err: std::io::Error) -> Self {
        CryptoError::Io {
            details: err.to_string(),
        }
    }
}
