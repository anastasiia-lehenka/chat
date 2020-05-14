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
        isOnline: true,
        isMuted: false,
        isBanned: false
    });

    return newUser.save();
}

const getUserByUsername = username => User.findOne({username});

const changeOnlineStatus = (id, status) => User.findByIdAndUpdate(id, {isOnline: status});

const removeUser = id => User.findByIdAndDelete(id);

const toggleUserBan = async (id) => {
    const user = await User.findById(id);
    return User.findByIdAndUpdate(id, {isBanned: !user.isBanned});
}

const toggleUserMute = async (id) => {
    const user = await User.findById(id);
    return User.findByIdAndUpdate(id, {isMuted: !user.isMuted});
}

const getUserById = async(id) => {
    const user = await User.findById(id);
    return ({
        _id: user._id,
        username: user.username,
        isOnline: user.isOnline,
        isMuted: user.isMuted,
        isBanned: user.isBanned,
        isAdmin: user.isAdmin
    });
}

const getAllUsers = async() => {
    const users = await User.find();
    return users.map(user => ({
        _id: user._id,
        username: user.username,
        isOnline: user.isOnline,
        isMuted: user.isMuted,
        isBanned: user.isBanned,
        isAdmin: user.isAdmin
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