const express = require('express');
const Account = require('../models/accountModel');
const router = express.Router();

// Create a new account
router.post('/register', async (req, res) => {
    try {
        const newAccount = new Account(req.body);
        await newAccount.save();
        res.status(201).send(newAccount);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find().populate('userId');
        res.status(200).send(accounts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get by id 
router.get('/:id', async (req, res) => {
    try {
        const account = await Account.findById(req.params.id).populate('userId');
        if (!account) {
            return res.status(404).send({ message: 'Account not found' });
        }
        res.status(200).send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Account
router.patch('/:id', async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!account) {
            return res.status(404).send({ message: 'Account not found' });
        }
        res.status(200).send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete account
router.delete('/:id', async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).send({ message: 'Account not found' });
        }
        res.status(200).send({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;