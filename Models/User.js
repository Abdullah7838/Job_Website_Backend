const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true 
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
