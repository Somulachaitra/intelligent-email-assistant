const CryptoJS = require('crypto-js');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  console.error('❌ ENCRYPTION_KEY is not set in environment variables');
  process.exit(1);
}

/**
 * Encrypts a plaintext string using AES
 * @param {string} text - The string to encrypt
 * @returns {string} The encrypted ciphertext string
 */
const encrypt = (text) => {
  if (!text) return null;
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};

/**
 * Decrypts an AES-encrypted ciphertext string
 * @param {string} ciphertext - The encrypted string to decrypt
 * @returns {string} The decrypted plaintext string
 */
const decrypt = (ciphertext) => {
  if (!ciphertext) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption failed:', error.message);
    return null;
  }
};

module.exports = { encrypt, decrypt };
