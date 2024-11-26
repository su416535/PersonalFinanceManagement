const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const authenticate = require('../middlewares/authMiddleware');

// Get transactions for a specific user
router.get('/', async (req, res) => {
    const userId = req.user.id; // Assume user is authenticated and user ID is available
    try {
        const transactions = await Transaction.find({ user: userId });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a transaction for a user
router.post('/', async (req, res) => {
    const transaction = new Transaction({ ...req.body, user: req.user.id }); // Add user ID to transaction
    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to verify user authentication


// Delete a transaction
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting transaction', error: err.message });
    }
});


module.exports = router;
