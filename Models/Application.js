const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    }
});

const App = mongoose.model('App', AppSchema);

module.exports = App;
