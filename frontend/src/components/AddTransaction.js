import React, { useState } from 'react';
import api from '../utils/apiService';
import '../styles.css';
import '../pfm.css';

const AddTransaction = ({ onTransactionAdded }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTransaction = { description, amount: parseFloat(amount), type };
        try {
            const response = await api.post('/transactions', newTransaction);
            onTransactionAdded(response.data); // Notify parent about new transaction
            setDescription('');
            setAmount('');
            
        } catch (err) {
            console.error('Error adding transaction:', err);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Add Transaction</h2>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Type:</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="savings">Savings</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn" >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;
