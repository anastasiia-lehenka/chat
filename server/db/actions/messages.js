const { validateMessage } = require('../validation');
const Message = require('../models/Message');

const addMessage = (author, text, date) => {
    const validationError = validateMessage({author, text});
    if (validationError) throw validationError;

    const newMessage = new Message({
        author,
        text,
        date: date
    });

    return newMessage.save();
}

const getAllMessages = () => Message.find().sort({date: 'asc'});

getLastMessageFromUser = (username) => Message.findOne({autor: username})

module.exports = { addMessage, getAllMessages };