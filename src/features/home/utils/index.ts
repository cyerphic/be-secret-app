// Pre-defined cipher translation maps for case-sensitive letters and numbers
const ORIGINAL   = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SECRET_MAP = "zxywutsrqponmlkjihgfedcbaZXYWUTSRQPONMLKJIHGFEDCBA9876543210";

// Performance Optimization: Use Object.create(null) for pure dictionary objects.
const encodeLookup = Object.create(null);
const decodeLookup = Object.create(null);

for (let i = 0; i < ORIGINAL.length; i++) {
    encodeLookup[ORIGINAL[i]] = SECRET_MAP[i];
    decodeLookup[SECRET_MAP[i]] = ORIGINAL[i];
}

/**
 * Receives the full file path and obfuscates its extension.
 * @param {string} filepath - The original full path (e.g., "/path/to/image.png")
 * @returns {string} The complete path with obfuscated extension (e.g., "/path/to/image.kmt")
 */
export function obfuscateFilePath(filepath) {
    if (!filepath) return "";

    const dotIndex = filepath.lastIndexOf('.');
    
    if (dotIndex <= 0 || dotIndex === filepath.length - 1) {
        return filepath; 
    }

    const basePath = filepath.substring(0, dotIndex);
    const ext = filepath.substring(dotIndex + 1);

    let obfuscatedExt = "";
    for (let i = 0; i < ext.length; i++) {
        const char = ext[i];
        obfuscatedExt += encodeLookup[char] || char; 
    }

    // Return: Original Path + .ObfuscatedExtension
    return `${basePath}.${obfuscatedExt}`;
}

/**
 * Receives the obfuscated file path and restores the original extension.
 * @param {string} obfuscatedFilepath - The obfuscated full path (e.g., "/path/to/image.kmt")
 * @returns {string} The restored original full path (e.g., "/path/to/image.png")
 */
export function restoreFilePath(obfuscatedFilepath) {
    if (!obfuscatedFilepath) return "";

    const lastSlashIndex = Math.max(
        obfuscatedFilepath.lastIndexOf('/'), 
        obfuscatedFilepath.lastIndexOf('\\')
    );
    const directory = lastSlashIndex >= 0 ? obfuscatedFilepath.substring(0, lastSlashIndex + 1) : "";
    const filename = lastSlashIndex >= 0 ? obfuscatedFilepath.substring(lastSlashIndex + 1) : obfuscatedFilepath;

    const firstDotIndex = filename.indexOf('.');
    
    if (firstDotIndex <= 0 || firstDotIndex === filename.length - 1) {
        return obfuscatedFilepath; 
    }

    const baseName = filename.substring(0, firstDotIndex);

    const secondDotIndex = filename.indexOf('.', firstDotIndex + 1);

    const obfuscatedExt = secondDotIndex !== -1 
        ? filename.substring(firstDotIndex + 1, secondDotIndex) 
        : filename.substring(firstDotIndex + 1);

    let originalExt = "";
    for (let i = 0; i < obfuscatedExt.length; i++) {
        const char = obfuscatedExt[i];
        originalExt += decodeLookup[char] || char;
    }
    
    return `${directory}${baseName}.${originalExt}`;
}