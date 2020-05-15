const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { TOKEN } = require('./constants');

const signNewToken = data => {
    return jwt.sign(data, TOKEN, { expiresIn: '6h' });
};

const decodeToken = token => {
    return jwt.verify(token, TOKEN);
};

const encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePasswords = (password1, password2) => {
    return bcrypt.compare(password1, password2);
};

const getSecondsBetweenDates = (now, then) => {
    return moment(now).diff(moment(then), 'seconds');
}

const generateColor = () => {
    const colors = ['blue', 'pink', 'purple', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = {
    signNewToken,
    decodeToken,
    encryptPassword,
    comparePasswords,
    getSecondsBetweenDates,
    generateColor
};