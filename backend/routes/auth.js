const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: username,
        });

        const newUser = new User({
            firebaseUid: userRecord.uid,
            email,
            username,
        });

        await newUser.save();

        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/verifyToken', async (req, res) => {
    try {
        const { token } = req.body;
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        const user = await User.findOne({ firebaseUid: uid });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
});

module.exports = router;
