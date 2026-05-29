/**
 * generate random Key
 * @returns {string} pure number (like: "830419")
 */
export function generateRandomNumber() {
    let result = '';
    for (let i = 0; i < 6; i++) {
        // generate 0-9 append number
        result += Math.floor(Math.random() * 10);
    }
    return result;
}