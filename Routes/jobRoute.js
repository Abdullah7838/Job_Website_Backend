const express = require('express');
const route = express.Router();
const Job = require('../Models/Job');

route.post('/job', async (req, res) => {
    try {
        const { jobName, jobDetails } = req.body;
        if (!jobName || !jobDetails) {
            return res.json({ msg: 'All fields are required in Posting Job' });
        }
        const existingJob = await Job.findOne({ jobName });
        if (existingJob) {
            return res.status(409).json({ msg: 'This job name already exists' });
        }
        const newJob = new Job({
            jobName,
            jobDetails
        });
        const savedJob = await newJob.save();

        if (savedJob) {
            res.status(200).json({ success: true, msg: 'Job Posted Successfully' });
            console.log('Job Posted Successfully');
        } else {
            res.status(400).json({ success: false, msg: 'Failed to post job' });
        }
    } catch (err) {
        console.log('Internal server error in Posting Job', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

route.get('/job', async (req, res) => {
    try {
        const jobs = await Job.find();

        if (jobs.length > 0) {
            res.status(200).json(jobs);
            console.log('Jobs fetched successfully');
        } else {
            res.status(404).json({ success: false, msg: 'No jobs found' });
        }
    } catch (err) {
        console.log('Internal server error in Fetching Jobs', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

route.delete('/job/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, msg: 'Job ID is required' });
        }

        const deletedJob = await Job.findByIdAndDelete(id);

        if (deletedJob) {
            res.status(200).json({ success: true, msg: 'Job Deleted Successfully' });
            console.log('Job Deleted Successfully');
        } else {
            res.status(404).json({ success: false, msg: 'Job not found' });
        }
    } catch (err) {
        console.log('Internal server error in Deleting Job', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});
module.exports = route;
