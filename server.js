const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = module.exports.io = socket(server);

const socketManager = require('./socket-manager');

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`) });

io.on('connection', socketManager);

