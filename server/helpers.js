const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { TOKEN } = require('./constants');

const signNewToken = data => {
    console.log(TOKEN);
    return jwt.sign(data, TOKEN, { expiresIn: '6h' });
};

const encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePasswords = (password1, password2) => {
    return bcrypt.compare(password1, password2);
};

module.exports = {
    signNewToken,
    encryptPassword,
    comparePasswords
};