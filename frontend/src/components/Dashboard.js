import React, { useState, useEffect } from 'react';
import api from '../utils/apiService'; // Use the authenticated API service
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
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

    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const savings = transactions.filter(t => t.type === 'savings').reduce((acc, t) => acc + t.amount, 0);

    const barData = {
        labels: ['Income', 'Expense', 'Savings'],
        datasets: [{
            label: 'Finance Overview',
            data: [income, expense, savings],
            backgroundColor: ['#4caf50', '#f44336', '#0000ff']
        }]
    };

    const pieData = {
        labels: ['Income', 'Expense', 'Savings'],
        datasets: [{
            label: 'Finance Distribution',
            data: [income, expense, savings],
            backgroundColor: ['#4caf50', '#f44336', '#0000ff']
        }]
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="chart-container">
                <div className="chart">
                    <Bar data={barData} />
                </div>
                <div className="chart">
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;