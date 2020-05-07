const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const {addUser, removeUser, getUser, geAllUsers} = require('./users.js');
let id = 3;

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`) });

io.on('connection', (socket) => {
    socket.on('join', username => {
        const { error, user } = addUser(socket.id, username);
        if (error) return error;

        socket.emit('message', {
            _id: id++,
            author: 'ADMIN',
            text: `You joined the chat`
        });

        socket.broadcast.emit('message', {
            _id: id++,
            author: 'ADMIN',
            text: `${username} has joined the chat`
        });

    });

    socket.on('message', (text) => {
        const user = getUser(socket.id);

        io.sockets.emit('message', {_id: id++, author: user.username, text});
    });

    socket.on('typing', username => {
        socket.broadcast.emit('typing-message', {
            text: `${username} is typing a message...`
        });
    });

    // socket.on('disconnect', username => {
    // });

});
