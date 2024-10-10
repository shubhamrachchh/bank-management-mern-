const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const newUser = new User({ ...req.body});
        console.log(newUser);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ message: 'Error creating user', error });
    }
});

// Login
router.post('/login', async (req, res) => {
    const userData = req.body;
    try {
        const user = await User.findOne({ username: userData.username });
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        if (user.password !== userData.password) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        res.status(200).send({ success: true, data: user });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

// Update user
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send({ message: 'Error updating user', error });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await User.findByIdAndRemove(id);
        if (!deleteUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

module.exports = router;
