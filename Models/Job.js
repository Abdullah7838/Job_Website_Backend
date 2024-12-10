const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobName: {
        type: String, 
        required: true 
    },
    jobDetails: {
        type: String,
        required: true
    },
    postedAt:{
        type:Date,
        default:Date.now
    }
});

const Job = mongoose.model('Person', JobSchema);

module.exports = Job;
