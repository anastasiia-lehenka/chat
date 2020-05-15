const { validateMessage } = require('../validation');
const Message = require('../models/Message');

const addMessage = (author, text) => {
    const validationError = validateMessage({author, text});
    if (validationError) throw validationError;

    const newMessage = new Message({
        author,
        text,
        date: Date.now()
    });

    return newMessage.save();
}

const getAllMessages = () => Message.find().sort({date: 'asc'});

module.exports = { addMessage, getAllMessages };