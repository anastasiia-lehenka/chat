const User = require('../models/User');
const { validateUser } = require('../validation');
const {
    encryptPassword,
    generateColor
} = require('../../helpers');

const addUser = async (username, password, image) => {
    const validationError = validateUser({username, password, image});
    if (validationError) throw validationError;

    const hashedPassword = await encryptPassword(password);
    const color = generateColor();

    const newUser = new User({
        username,
        password: hashedPassword,
        //image,
        isAdmin: false,
        isOnline: true,
        isMuted: false,
        isBanned: false,
        color
    });

    return newUser.save();
}

const getUserByUsername = username => User.findOne({username});

const changeOnlineStatus = (id, status) => User.findByIdAndUpdate(id, {isOnline: status});

const removeUser = id => User.findByIdAndDelete(id);

const toggleUserBan = (id, value) => {
    return User.findByIdAndUpdate(id, {isBanned: value});
}

const toggleUserMute = (id, value) => {
    return User.findByIdAndUpdate(id, {isMuted: value}, {new: true});
}

const getUserById = async(id) => {
    const user = await User.findById(id);
    return ({
        _id: user._id,
        username: user.username,
        isOnline: user.isOnline,
        isMuted: user.isMuted,
        isBanned: user.isBanned,
        isAdmin: user.isAdmin,
        color: user.color
    });
}

const getAllUsers = async() => {
    const users = await User.find().sort({isOnline: -1});
    return users.map(user => ({
        _id: user._id,
        username: user.username,
        isOnline: user.isOnline,
        isMuted: user.isMuted,
        isBanned: user.isBanned,
        isAdmin: user.isAdmin,
        color: user.color
    }));
}

module.exports = {
    addUser,
    getUserById,
    getAllUsers,
    removeUser,
    changeOnlineStatus,
    getUserByUsername,
    toggleUserBan,
    toggleUserMute
};