const express = require('express');
const router = express.Router();
const Application = require('../Models/Application');

router.post('/applications', async (req, res) => {
    try {
        const { name, phone, email, address, experience, hobbies, jobTitle } = req.body;

        const newApplication = new Application({ name, phone, email, address, experience, hobbies, jobTitle });
        const savedApplication = await newApplication.save();

        res.status(201).json({
            success:true,
            message: 'Application created successfully',
            data: savedApplication,
        });
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ error: 'Failed to create application' });
    }
});

router.get('/applications', async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json({
            message: 'Applications fetched successfully',
            data: applications,
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});
router.delete('/applications/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json({
            success:true,
            message: 'Application deleted successfully',
            data: deletedApplication,
        });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ error: 'Failed to delete application' });
    }
});

module.exports = router;
