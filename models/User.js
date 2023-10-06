const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
});

module.exports = model('User', userSchema);