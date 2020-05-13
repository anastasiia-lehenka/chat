const User = require('../models/User');
const { validateUser } = require('../validation');
const { encryptPassword } = require('../../helpers');

const addUser = async (username, password, image) => {
    const validationError = validateUser({username, password, image});
    if (validationError) throw validationError;

    const hashedPassword = await encryptPassword(password);

    const newUser = new User({
        username,
        password: hashedPassword,
        //image,
        isAdmin: false,
        isOnline: true
    });

    return newUser.save();
}

const getUserByUsername = async (username) => User.findOne({username});

const changeOnlineStatus = async (id, status) => User.findByIdAndUpdate(id, {isOnline: status}, {new: true});

const removeUser = async (id) => User.findByIdAndDelete(id);

const getUserById = async (id) => User.findById(id);

const getAllUsers = () => User.find();


module.exports = {
    addUser,
    getUserById,
    getAllUsers,
    removeUser,
    changeOnlineStatus,
    getUserByUsername
};