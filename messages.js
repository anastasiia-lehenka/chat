let messages = [{
    _id: 1,
    author: 'Admin',
    text: 'Welcome to the chat'
}];

let id = 3;

const addMessage = (author, text) => {
    const newMessage = {
        _id: id++,
        author,
        text
    };

    messages.push(newMessage);
    return newMessage;
}

const getAllMessages = () => messages;

module.exports = { addMessage, getAllMessages };