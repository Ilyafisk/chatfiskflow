import CryptoJS from 'crypto-js';

// Функция для генерации случайного ключа
const generateKey = () => {
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
};

// Уровень 1: AES шифрование
const aesEncrypt = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
};

// Уровень 2: Triple DES шифрование
const tripleDesEncrypt = (text, key) => {
    return CryptoJS.TripleDES.encrypt(text, key).toString();
};

// Уровень 3: Rabbit шифрование
const rabbitEncrypt = (text, key) => {
    return CryptoJS.Rabbit.encrypt(text, key).toString();
};

// Уровень 4: RC4 шифрование
const rc4Encrypt = (text, key) => {
    return CryptoJS.RC4.encrypt(text, key).toString();
};

// Уровень 5: Blowfish шифрование
const blowfishEncrypt = (text, key) => {
    return CryptoJS.Blowfish.encrypt(text, key).toString();
};

// Функция для пятикратного шифрования
export const encryptMessage = (message) => {
    const keys = Array(5).fill().map(() => generateKey());
    let encryptedMessage = message;

    // Применяем шифрование последовательно
    encryptedMessage = aesEncrypt(encryptedMessage, keys[0]);
    encryptedMessage = tripleDesEncrypt(encryptedMessage, keys[1]);
    encryptedMessage = rabbitEncrypt(encryptedMessage, keys[2]);
    encryptedMessage = rc4Encrypt(encryptedMessage, keys[3]);
    encryptedMessage = blowfishEncrypt(encryptedMessage, keys[4]);

    return {
        encryptedMessage,
        keys
    };
};

// Функции дешифрования
const aesDecrypt = (text, key) => {
    const bytes = CryptoJS.AES.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const tripleDesDecrypt = (text, key) => {
    const bytes = CryptoJS.TripleDES.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const rabbitDecrypt = (text, key) => {
    const bytes = CryptoJS.Rabbit.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const rc4Decrypt = (text, key) => {
    const bytes = CryptoJS.RC4.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const blowfishDecrypt = (text, key) => {
    const bytes = CryptoJS.Blowfish.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};

// Функция для пятикратного дешифрования
export const decryptMessage = (encryptedMessage, keys) => {
    let decryptedMessage = encryptedMessage;

    // Применяем дешифрование в обратном порядке
    decryptedMessage = blowfishDecrypt(decryptedMessage, keys[4]);
    decryptedMessage = rc4Decrypt(decryptedMessage, keys[3]);
    decryptedMessage = rabbitDecrypt(decryptedMessage, keys[2]);
    decryptedMessage = tripleDesDecrypt(decryptedMessage, keys[1]);
    decryptedMessage = aesDecrypt(decryptedMessage, keys[0]);

    return decryptedMessage;
}; 