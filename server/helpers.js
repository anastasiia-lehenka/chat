const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { TOKEN } = require('./constants');

const signNewToken = data => {
    return jwt.sign(data, TOKEN, { expiresIn: '6h' });
};

const decodeToken = token => {
    return jwt.verify(token, 'token');
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
    decodeToken,
    encryptPassword,
    comparePasswords
};