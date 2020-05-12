const User = require('./models/User');

// const addUser = (id, username, password) => {
//     const isExistingUser = users.find(user => user.username === username);
//
//     // if (isExistingUser) {
//     //     return new Error ('Username is taken');
//     // }
//
//     if (isExistingUser) return;
//
//     const user = {
//         _id: id,
//         username,
//         password,
//         isAdmin: false,
//         isOnline: true,
//         image: ''
//     };
//
//     users.push(user);
//     return user;
// }
//
// const disableUser = id => {
//     users = users.map(user => user._id !== id && (user.isOnline = false));
//     return users;
// }
//
// const removeUser = id => {
//     users = users.filter(user => user._id !== id);
//     return users;
// }

async function getUser(id) {
    return User.findById(id);
};

// const getAllUsers = () => users;

// module.exports = { addUser, removeUser, getUser, getAllUsers, disableUser};
module.exports = { getUser };