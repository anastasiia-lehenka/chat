const io = require('./server').io;
const jwt = require('jsonwebtoken');
const {
    removeUser,
    getUserById,
    getAllUsers,
    changeOnlineStatus
} = require('./db/actions/users');
const {
    addMessage,
    getAllMessages
} = require('./db/actions/messages');

const socketManager = socket => {
    let currentUser;

    socket.on('join', async() => {
        const token = socket.handshake.query.token;
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'token');
        } catch (err) {
            socket.disconnect();
        }

        currentUser = await getUserById(decodedToken._id);

        socket.emit('currentUser', {
            username: currentUser.username,
            image: currentUser.image
        });

        await changeOnlineStatus(currentUser._id, true);
        socket.broadcast.emit('newUser', currentUser.username);

        const allUsers = await getAllUsers();
        socket.emit('users', allUsers);

        const allMessages = await getAllMessages();
        socket.emit('messages', allMessages);

        //socket.emit('newMessage', addMessage('SYSTEM', 'You joined the chat'));
         //socket.broadcast.emit('newMessage', addMessage('SYSTEM', `${currentUser.username} has joined the chat`));
    });

    socket.on('newMessage', async (text) => {
        const newMessage = await addMessage(currentUser.username, text);
        socket.emit('newMessage', newMessage);
        socket.broadcast.emit('newMessage', newMessage);
    });

    socket.on('typingMessage', () => {
        socket.broadcast.emit('typingMessage', currentUser.username)
    });

    socket.on('exit', async() => {
        const message = addMessage('SYSTEM', `${currentUser.username} has left the chat`);
        socket.broadcast.emit('newMessage', message);

        await removeUser(currentUser._id);

        const allUsers = await getAllUsers();
        socket.broadcast.emit('users', allUsers);
    });

    socket.on('disconnect', async() => {
        await changeOnlineStatus(currentUser._id, false);

        const allUsers = await getAllUsers();
        socket.broadcast.emit('users', allUsers);
    });
};

module.exports = socketManager;