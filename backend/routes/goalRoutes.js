const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const authenticate = require('../middlewares/authMiddleware'); // Ensure this middleware is correctly applied

// Get goals for a specific user
router.get('/', authenticate, async (req, res) => {
    const userId = req.user.id;
    try {
        const goals = await Goal.find({ user: userId });
        res.json(goals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a goal for a user
router.post('/', authenticate, async (req, res) => {
    const goal = new Goal({ ...req.body, user: req.user.id });
    try {
        const newGoal = await goal.save();
        res.status(201).json(newGoal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a goal for a user
router.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedGoal = await Goal.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Match goal by ID and user
            { ...req.body }, // Update with new data
            { new: true } // Return the updated document
        );

        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json(updatedGoal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a goal for a user
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedGoal = await Goal.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json({ message: 'Goal deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
