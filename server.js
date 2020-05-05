const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);
let id = 3;

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`) });

io.on('connection', (socket) => {
    socket.on('join', user => {
        socket.emit('message', {
            _id: id++,
            author: 'ADMIN',
            text: `You joined the chat`
        });

        // io.sockets.emit('message', {
        //     author: 'ADMIN',
        //     text: `${ user } joined the chat`
        // });

    });

    socket.on('message', ({author, text}) => {
        io.sockets.emit('message', {_id: id++, author, text});
    })

    socket.on('disconnect', () => {
        //console.log('User has left');
    })
});
