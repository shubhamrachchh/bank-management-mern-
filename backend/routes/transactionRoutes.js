const express = require('express');
const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');
const router = express.Router();

// Create a transaction
router.post('/', async (req, res) => {
    const body = req.body;
    
    try {
        const account = await Account.findById(body.accountId);
        if (!account) {
            return res.status(404).send('Account not found');
        }

        // Validate transaction type and amount
        if (body.type === 'debit' && account.balance < body.amount) {
            return res.status(400).send('Insufficient balance');
        }

        // Create the transaction
        const transaction = new Transaction({
            accountId: body.accountId,
            amount: body.amount,
            type: body.type,
        });
        await transaction.save();

        // Update account balance
        if (body.type === 'credit') {
            account.balance += body.amount;
        } else if (body.type === 'debit') {
            account.balance -= body.amount;
        }

        await account.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('accountId');
        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get transaction by Id
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('accountId');
        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }

        // Find the associated account
        const account = await Account.findById(transaction.accountId);
        if (!account) {
            return res.status(404).send('Account not found');
        }

        // Update the account balance based on the transaction type
        if (transaction.type === 'credit') {
            account.balance -= transaction.amount;
        } else {
            account.balance += transaction.amount;
        }

        await account.save(); // Save the updated account balance

        // Now remove the transaction
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).send(transaction); 
    } catch (error) {
        res.status(500).send(error);
    }
});


// Update transaction
router.patch('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }

        // Store original transaction details
        const originalType = transaction.type;
        const originalAmount = transaction.amount;

        // Update the transaction
        transaction.accountId = req.body.accountId || transaction.accountId;
        transaction.amount = req.body.amount || transaction.amount;
        transaction.type = req.body.type || transaction.type;
        await transaction.save();

        // Find the associated account
        const account = await Account.findById(transaction.accountId);
        if (!account) {
            return res.status(404).send('Account not found');
        }

        // Reverse original transaction effect
        if (originalType === 'credit') {
            account.balance -= originalAmount;
        } else {
            account.balance += originalAmount;
        }

        // Apply new transaction effect
        if (transaction.type === 'credit') {
            account.balance += transaction.amount;
        } else {
            account.balance -= transaction.amount;
        }

        await account.save();
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
