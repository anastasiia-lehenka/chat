const io = require('./server').io;
const jwt = require('jsonwebtoken');

const { addUser, removeUser, getUser, getAllUsers, disableUser } = require('./users');
const { addMessage, getAllMessages } = require('./messages');

const socketManager = socket => {
    const token = socket.handshake.query.token;
    const decodedToken = token && jwt.verify(token, 'token');
    if (!decodedToken) {
        socket.disconnect();
    }

    getUser(decodedToken._id).then(user => {
        const {
            username,
            image
        } = user;

        socket.on('join', () => {
            // const allUsers = getAllUsers();
            // const allMessages = getAllMessages();
            //
            // socket.emit('users', allUsers);
            // socket.emit('messages', allMessages);
            socket.emit('currentUser', {
                username,
                image
            });

            socket.broadcast.emit('newUser', username);

            socket.emit('newMessage', addMessage('SYSTEM', 'You joined the chat'));
            socket.broadcast.emit('newMessage', addMessage('SYSTEM', `${username} has joined the chat`));
        });
    })

    socket.on('newMessage', text => {
        const currentUser = getUser(socket.id);
        const newMessage = addMessage(currentUser.username, text);
        io.sockets.emit('newMessage', newMessage);
    });

    socket.on('typingMessage', () => {
        const currentUser = getUser(socket.id);
        socket.broadcast.emit('typingMessage', {
            text: `${currentUser.username} is typing a message...`
        });
    });

    socket.on('logout', () => {
        const currentUser = getUser(socket.id);
        if (currentUser) {
            const message = addMessage('SYSTEM', `${currentUser.username} has left the chat`);
            socket.broadcast.emit('newMessage', message);
        }
        removeUser(socket.id);
    });

    socket.on('disconnect', () => {
        // const currentUser = getUser(socket.id);
        // if (currentUser) {
        //     const message = addMessage('SYSTEM', `${currentUser.username} has left the chat`);
        //     socket.broadcast.emit('newMessage', message);
        // }
        // removeUser(socket.id);
         //disableUser(socket.id);
    });
};

module.exports = socketManager;