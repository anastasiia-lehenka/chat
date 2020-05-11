const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 3
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isOnline: {
        type: Boolean,
        required: true
    },
    image: {
        type: String
    }
},  { versionKey: false });

const User = model('User', userSchema);

module.exports = User;
