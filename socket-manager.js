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

    const currentUser = getUser(decodedToken._id);

    currentUser.then(user => {
        socket.on('join', () => {
            // const allUsers = getAllUsers();
            // const allMessages = getAllMessages();
            //
            // socket.emit('users', allUsers);
            // socket.emit('messages', allMessages);
            socket.broadcast.emit('newUser', user.username);

            socket.emit('newMessage', addMessage('SYSTEM', 'You joined the chat'));
            socket.broadcast.emit('newMessage', addMessage('SYSTEM', `${user.username} has joined the chat`));
        });
    })

    socket.on('newMessage', text => {
        const currentUser = getUser(socket.id);
        const newMessage = addMessage(currentUser.username, text);
        console.log('here');

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