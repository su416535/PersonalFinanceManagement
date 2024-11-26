import React, { useState, useEffect } from 'react';
import api from './utils/apiService'; // Use authenticated API service
import './styles.css';
import './pfm.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Reports from './components/Reports';
import Login from './components/Login';
import Register from './components/Register';
import Budgets from './components/Budgets';
import Goals from './components/Goals';
import Logout from './components/Logout';

const App = () => {
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

    const addTransaction = async (transaction) => {
        try {
            const response = await api.post('/transactions', transaction);
            setTransactions((prev) => [...prev, response.data]);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await api.delete(`/transactions/${id}`);
            setTransactions((prev) => prev.filter((transaction) => transaction._id !== id));
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        <Router>
            <div className="app">
                <Header />
                <div className="main-content">
                    <Sidebar />
                    <div className="content">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/"
                                element={
                                    <div className="scrollable-content">
                                        <Dashboard transactions={transactions} />
                                    </div>
                                }
                            />
                            <Route
                                path="/transactions"
                                element={
                                    <div className="scrollable-content">
                                        <AddTransaction onAdd={addTransaction} />
                                        <TransactionList 
                                            transactions={transactions}
                                            onDelete={deleteTransaction}
                                        />
                                    </div>
                                }
                            />
                            <Route
                                path="/reports"
                                element={
                                    <div className="scrollable-content">
                                        <Reports />
                                    </div>
                                }
                            />
                            <Route
                                path="/goals"
                                element={
                                    <div className="scrollable-content">
                                        <Goals />
                                    </div>
                                }
                            />
                            <Route
                                path="/budgets"
                                element={
                                    <div className="scrollable-content">
                                        <Budgets />
                                    </div>
                                }
                            />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
