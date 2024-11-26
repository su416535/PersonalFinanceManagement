const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const authenticate = require('../middlewares/authMiddleware');

// Get budgets for a specific user
router.get('/', authenticate, async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user.id });
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a budget
router.post('/', authenticate, async (req, res) => {
    const budget = new Budget({ ...req.body, user: req.user.id });
    try {
        const newBudget = await budget.save();
        res.status(201).json(newBudget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a budget
router.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedBudget = await Budget.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { ...req.body },
            { new: true }
        );
        if (!updatedBudget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.json(updatedBudget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a budget
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedBudget = await Budget.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!deletedBudget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.json({ message: 'Budget deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
