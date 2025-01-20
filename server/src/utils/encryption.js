const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY; // 32 bytes
const iv = process.env.ENCRYPTION_IV;         // 16 bytes

module.exports.encrypt = (plaintext) => {
    if (!plaintext) return null;
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

module.exports.decrypt = (encryptedText) => {
    if (!encryptedText) return null;
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
