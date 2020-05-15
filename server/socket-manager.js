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
    getAllMessages,
    getLastMessageFromUser
} = require('./db/actions/messages');

const sessionsMap = {};

const socketManager = io => {

    io.on('connection', async (socket) => {
        let currentUser;
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

        socket.emit('currentUser', currentUser);

        getAllMessages().then(messages => {
            socket.emit('messages', messages);
        });

        await changeOnlineStatus(currentUser._id, true);

        getAllUsers().then(allUsers => {
            io.sockets.emit('users', allUsers);
        });

        //socket.emit('newMessage', addMessage('SYSTEM', 'You joined the chat'));
        //socket.broadcast.emit('newMessage', addMessage('SYSTEM', `${currentUser.username} has joined the chat`));

        socket.on('newMessage', async (text, date) => {
            if (!currentUser.isMuted) {
                const lastMessageTime =  getLastMessageFromUser(currentUser._id);
                const newMessage = await addMessage(currentUser.username, text, date);
                io.sockets.emit('newMessage', newMessage);
            }
        });

        socket.on('typingMessage', () => {
            socket.broadcast.emit('typingMessage', currentUser.username)
        });

        socket.on('ban', async (id, value) => {
            if (currentUser.isAdmin) {
                await toggleUserBan(id, value);
                getAllUsers().then(allUsers => {
                    io.sockets.emit('users', allUsers);
                });
                const socketId = sessionsMap[id];
                io.sockets.sockets[socketId].disconnect();
                delete sessionsMap[id];
            }
        });

        socket.on('mute', async (id, value) => {
            if (currentUser.isAdmin) {
                const mutedUser = await toggleUserMute(id, value);
                getAllUsers().then(allUsers => {
                    io.sockets.emit('users', allUsers);
                });
                const socketId = sessionsMap[id];
                io.sockets.sockets[socketId].emit('currentUser', mutedUser);
            }
        });

        socket.on('deleteUser', async() => {
            await removeUser(currentUser._id);

            // addMessage('SYSTEM', `${currentUser.username} has left the chat`).then(message => {
            //     socket.broadcast.emit('newMessage', message);
            // });

            getAllUsers().then(allUsers => {
                socket.broadcast.emit('users', allUsers);
            });

            delete sessionsMap[currentUser._id];
        });

        socket.on('disconnect', async() => {
            await changeOnlineStatus(currentUser._id, true);

            getAllUsers().then(allUsers => {
                socket.broadcast.emit('users', allUsers);
            });

            delete sessionsMap[currentUser._id];
        });
    });
};

module.exports = socketManager;