const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
