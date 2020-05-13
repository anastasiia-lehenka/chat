const express = require('express');
const http = require('http');
const socket = require('socket.io');
const mongoose = require('mongoose');

const socketManager = require('./socket-manager');
const router = require ('./routes');
const { DB_CONNECTION_URL } = require('./constants')

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use('/api', router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`) });

io.on('connection', socketManager);

mongoose.connect(DB_CONNECTION_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    error => { if(error) return console.log(error) }
);

module.exports.io = io;
