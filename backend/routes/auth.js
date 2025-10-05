const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { email, username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }

        const newUser = new User({
            email,
            username,
            password,
            role: role || 'student',
        });

        await newUser.save();

        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Signin route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        // For simplicity, returning user info without token
        // You can add JWT token generation here if needed
        res.status(200).send({
            email: user.email,
            username: user.username,
            id: user._id,
            role: user.role,
            privacy: user.privacy,
        });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

// Update user settings route
router.put('/update', async (req, res) => {
    try {
        const { id, privacy, username } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (privacy !== undefined) {
            user.privacy = privacy;
        }
        if (username !== undefined && username.trim() !== '') {
            user.username = username.trim();
        }

        await user.save();

        res.status(200).send({
            message: 'User updated successfully',
            user: {
                email: user.email,
                username: user.username,
                id: user._id,
                role: user.role,
                privacy: user.privacy,
            }
        });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;
