const express = require('express');
const route = express.Router();
const User = require('../Models/User');

route.post('/signup', async (req, res) => {
    try {
        const { fullName, phoneNumber, password } = req.body;
        if (!fullName || !phoneNumber || !password) {
            res.json({ msg: 'All fields are required in Signup' });
            console.log('All fields are required in Signup');
            return;
        }
        const newUser = new User({
            fullName,
            phoneNumber,
            password
        });

        const savedUser = await newUser.save(); 

        if (savedUser) {
            res.json({ success: true, msg: 'Signup Successful' });
            console.log('Signup Successful');
        } else {
            res.json({ msg: 'Signup Failed' });
            console.log('Signup Failed');
        }
    } catch (err) {
        console.log('Internal server error in Signup', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

route.post('/login', async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res.json({ msg: 'Phone number and password are required' });
        }
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.json({ msg: 'User not found' });
        }

        if (user.password !== password) {
            return res.json({ msg: 'Incorrect password' });
        }

        res.json({ success: true, msg: 'Login Successful', userId: user._id });
        console.log('Login Successful');
    } catch (err) {
        console.log('Internal server error in Login', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});
module.exports = route;
