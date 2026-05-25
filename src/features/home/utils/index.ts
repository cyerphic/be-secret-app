// Pre-defined cipher translation maps for case-sensitive letters and numbers
const ORIGINAL   = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SECRET_MAP = "zxywutsrqponmlkjihgfedcbaZXYWUTSRQPONMLKJIHGFEDCBA9876543210";

// Performance Optimization: Use Object.create(null) for pure dictionary objects.
// This avoids prototype chain lookups, making O(1) access slightly faster and safer.
const encodeLookup = Object.create(null);
const decodeLookup = Object.create(null);

for (let i = 0; i < ORIGINAL.length; i++) {
    encodeLookup[ORIGINAL[i]] = SECRET_MAP[i];
    decodeLookup[SECRET_MAP[i]] = ORIGINAL[i];
}

/**
 * Receives the full file path, obfuscates its extension, and appends the .enc suffix.
 * * @param {string} filepath - The original full path (e.g., "/path/to/image.png")
 * @returns {string} The complete path with obfuscated extension and .enc (e.g., "/path/to/image.mld.enc")
 */
export function obfuscateFilePath(filepath) {
    if (!filepath) return "";

    const dotIndex = filepath.lastIndexOf('.');
    
    // If there is no dot, it's a hidden file (e.g., "/path/.env"), or the dot is at the very end,
    // treat it as having no standard extension. Just append .enc directly.
    if (dotIndex <= 0 || dotIndex === filepath.length - 1) {
        return `${filepath}.enc`;
    }

    const basePath = filepath.substring(0, dotIndex);
    const ext = filepath.substring(dotIndex + 1);

    // Performance Optimization: Use a standard for-loop instead of split/map/join.
    // This prevents memory allocation overhead from creating intermediate arrays.
    let obfuscatedExt = "";
    for (let i = 0; i < ext.length; i++) {
        const char = ext[i];
        obfuscatedExt += encodeLookup[char] || char; // Fallback to original char if not found
    }

    // Return: Original Path + .ObfuscatedExtension + .enc
    return `${basePath}.${obfuscatedExt}.enc`;
}

/**
 * Receives the obfuscated file path, removes the .enc suffix, and restores the original extension.
 * * @param {string} obfuscatedFilepath - The obfuscated full path (e.g., "/path/to/image.mld.enc")
 * @returns {string} The restored original full path (e.g., "/path/to/image.png")
 */
export function restoreFilePath(obfuscatedFilepath) {
    if (!obfuscatedFilepath) return "";

    // 1. Safely remove the .enc suffix if it exists
    const pathWithoutEnc = obfuscatedFilepath.endsWith('.enc') 
        ? obfuscatedFilepath.slice(0, -4) 
        : obfuscatedFilepath;

    const dotIndex = pathWithoutEnc.lastIndexOf('.');
    
    // If there's no extension to restore, return the path as is
    if (dotIndex <= 0 || dotIndex === pathWithoutEnc.length - 1) {
        return pathWithoutEnc; 
    }

    const basePath = pathWithoutEnc.substring(0, dotIndex);
    const obfuscatedExt = pathWithoutEnc.substring(dotIndex + 1);

    // Performance Optimization: Standard for-loop for string restoration
    let originalExt = "";
    for (let i = 0; i < obfuscatedExt.length; i++) {
        const char = obfuscatedExt[i];
        originalExt += decodeLookup[char] || char;
    }

    // Return: Original Path + .RestoredExtension
    return `${basePath}.${originalExt}`;
}