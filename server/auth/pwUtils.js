const crypto = require('crypto');

const generatePassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const generatedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: generatedHash
    };
}

const verifyPassword = (password, hash, salt) => {
    const hashToBeChecked = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === hashToBeChecked;
}

module.exports.generatePassword = generatePassword;
module.exports.verifyPassword = verifyPassword;