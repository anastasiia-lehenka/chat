const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const messageSchema = new Schema({
    author: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    date: {
        tyoe: Date,
        default: Date.now
    }
},  { versionKey: false });

const Message = model('Message', messageSchema);

module.exports = Message;
