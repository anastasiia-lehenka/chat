const io = require('./server').io;

const {addUser, removeUser, getUser, geAllUsers} = require('./users.js');

let id = 3;

const socketManager = socket => {
    socket.on('join', username => {
        const user = addUser(socket.id, username);
        if (!user) return;

        socket.emit('message', {
            _id: id++,
            author: 'SYSTEM',
            text: `You joined the chat`
        });

        socket.broadcast.emit('message', {
            _id: id++,
            author: 'SYSTEM',
            text: `${username} has joined the chat`
        });

    });

    socket.on('message', (text) => {
        const user = getUser(socket.id);

        io.sockets.emit('message', {
            _id: id++,
            author: user.username,
            text
        });
    });

    socket.on('typing', username => {
        socket.broadcast.emit('typing-message', {
            text: `${username} is typing a message...`
        });
    });

    socket.on('disconnect', () => {
        const user = getUser(socket.id);
        if (user) {
            socket.broadcast.emit('message', {
                _id: id++,
                author: 'SYSTEM',
                text: `${user.username} has left the chat`
            });
        }
        removeUser(socket.id);
    });
};

module.exports = socketManager;