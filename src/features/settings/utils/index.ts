// 1. Combine all 88 characters
const ALL_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';

// 2. Pre-shuffle (executes only once during module load for optimal performance)
const SHUFFLED_CHARS = ALL_CHARS.split('').sort(() => Math.random() - 0.5).join('');

// 3. Perfectly split into 4 equal-length arrays (22 characters each)
const CHAR_POOLS = [
    SHUFFLED_CHARS.slice(0, 22),
    SHUFFLED_CHARS.slice(22, 44),
    SHUFFLED_CHARS.slice(44, 66),
    SHUFFLED_CHARS.slice(66, 88)
];

/**
 * Timestamp hash routing generator with dynamic random length
 * @returns {string} Random Key with length between 14 and 25
 */
export function generateRandomNumber() {
    const timestampStr = Date.now().toString(); 
    let result = '';

    // Calculate a random length between 14 and 25.
    // Formula: Math.floor(Math.random() * (max - min + 1)) + min
    // max = 25, min = 14 -> 25 - 14 + 1 = 12
    const randomLength = Math.floor(Math.random() * 12) + 14;

    // Iterate 'randomLength' times instead of just the timestamp length
    for (let i = 0; i < randomLength; i++) {
        // Use modulo to wrap around if 'i' exceeds the 13-digit timestamp length
        const timeIndex = i % timestampStr.length; 
        const digit = parseInt(timestampStr[timeIndex], 10);
        
        // Core routing: match to one of the 4 pools
        const poolIndex = digit % CHAR_POOLS.length; 
        const targetPool = CHAR_POOLS[poolIndex];
        
        // Extract a random character from the selected pool
        const randomChar = targetPool[Math.floor(Math.random() * targetPool.length)];
        
        result += randomChar;
    }

    return result;
}