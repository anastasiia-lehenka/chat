const jwt = require('jsonwebtoken');
const {
    removeUser,
    getUserById,
    getAllUsers,
    changeOnlineStatus,
    toggleUserBan,
    toggleUserMute
} = require('./db/actions/users');
const {
    addMessage,
    getAllMessages
} = require('./db/actions/messages');

const sessionsMap = {};

const socketManager = io => {
    io.on('connection', socket => {
        let currentUser;

        socket.on('join', async() => {
            //console.log(sessionsMap);
            const token = socket.handshake.query.token;
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, 'token');
            } catch (err) {
                socket.disconnect();
            }

            currentUser = await getUserById(decodedToken._id);
            if (!currentUser || currentUser.isBanned) {
                socket.disconnect();
            }
            sessionsMap[currentUser._id] = socket.id;
            console.log(sessionsMap);

            socket.emit('currentUser', currentUser);

            await changeOnlineStatus(currentUser._id, true);
            const allUsers = await getAllUsers();
            io.sockets.emit('users', allUsers);

            const allMessages = await getAllMessages();
            socket.emit('messages', allMessages);

            //socket.emit('newMessage', addMessage('SYSTEM', 'You joined the chat'));
            //socket.broadcast.emit('newMessage', addMessage('SYSTEM', `${currentUser.username} has joined the chat`));
        });

        socket.on('newMessage', async (text) => {
            if (!currentUser.isMuted) {
                const newMessage = await addMessage(currentUser.username, text);
                io.sockets.emit('newMessage', newMessage);
            }
        });

        socket.on('typingMessage', () => {
            socket.broadcast.emit('typingMessage', currentUser.username)
        });

        socket.on('ban', async (id) => {
            if (currentUser.isAdmin) {
                await toggleUserBan(id);
                const allUsers = await getAllUsers();
                io.sockets.emit('users', allUsers);
                const socketId = sessionsMap[id];
                io.sockets.sockets[socketId].disconnect();
                delete sessionsMap[id];
                console.log(sessionsMap);
            }
        });

        socket.on('mute', async (id) => {
            if (currentUser.isAdmin) {
                await toggleUserMute(id);
                const allUsers = await getAllUsers();
                socket.emit('users', allUsers);
            }
        });

        socket.on('delete', async() => {
            const message = await addMessage('SYSTEM', `${currentUser.username} has left the chat`);
            socket.broadcast.emit('newMessage', message);

            await removeUser(currentUser._id);

            const allUsers = await getAllUsers();
            socket.broadcast.emit('users', allUsers);
            delete sessionsMap[currentUser._id];
        });

        socket.on('disconnect', async() => {
            await changeOnlineStatus(currentUser._id, false);

            const allUsers = await getAllUsers();
            socket.broadcast.emit('users', allUsers);
            delete sessionsMap[currentUser._id];
            console.log(sessionsMap);
        });
    });
};

module.exports = socketManager;