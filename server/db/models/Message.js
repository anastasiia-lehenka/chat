const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const messageSchema = new Schema({
    author: {
        type: String,
        required: true,
        min: 3
    },
    text: {
        type: String,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
},  { versionKey: false });

const Message = model('Message', messageSchema);

module.exports = Message;
