import React, { useEffect, useState } from 'react';
import api from '../utils/apiService'; // Authenticated API helper
import '../styles.css';
import '../pfm.css';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);
    const handleTransactionAdded = (newTransaction) => {
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const handleDelete = async (id) => {
        try {
            console.log(`Deleting transaction with ID: ${id}`); // Debugging log
            await api.delete(`/transactions/${id}`);
            setTransactions((prev) => prev.filter((transaction) => transaction._id !== id));
        } catch (err) {
            console.error('Error deleting transaction:', err.response?.data?.message || err.message);
            alert('Failed to delete transaction. Please try again.');
        }
    };
    

    return (
        <div className="register-container"  >
            <h2>Transaction List</h2>
            {transactions.length === 0 ? (
                <p>No transactions available.</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id} className="form-group">
                            <div>
                                {transaction.description} - ${transaction.amount} ({transaction.type})
                            </div>
                            <button onClick={() => handleDelete(transaction._id)} className="submit-btn">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;
