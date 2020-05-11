const express = require('express');
const http = require('http');
const socket = require('socket.io');
const router = require ('./routes');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = module.exports.io = socket(server);

const socketManager = require('./socket-manager');

app.use('/api', router);

mongoose.connect('mongodb+srv://user1:user1@cluster0-sa6h3.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    error => {
        if(error) return console.log(error);

        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`) });

        io.on('connection', socketManager);
    }
);

