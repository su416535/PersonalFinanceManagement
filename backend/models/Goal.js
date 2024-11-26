const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    description: { type: String },
    deadline: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
