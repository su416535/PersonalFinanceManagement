import React, { useState, useEffect } from 'react';
import api from '../utils/apiService'; // Use authenticated API service
import '../styles.css';
import '../pfm.css';

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [form, setForm] = useState({
        name: '',
        amount: '',
        description: '',
        startDate: '',
        endDate: '',
    });
    const [editingBudget, setEditingBudget] = useState(null);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await api.get('/budgets');
                setBudgets(response.data);
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };

        fetchBudgets();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBudget) {
                const response = await api.put(`/budgets/${editingBudget._id}`, form);
                setBudgets((prev) =>
                    prev.map((b) => (b._id === editingBudget._id ? response.data : b))
                );
                setEditingBudget(null);
            } else {
                const response = await api.post('/budgets', form);
                setBudgets((prev) => [...prev, response.data]);
            }
            setForm({ name: '', amount: '', description: '', startDate: '', endDate: '' });
        } catch (err) {
            console.error('Error saving budget:', err);
        }
    };

    const handleEdit = (budget) => {
        setEditingBudget(budget);
        setForm({
            name: budget.name,
            amount: budget.amount,
            description: budget.description || '',
            startDate: budget.startDate.split('T')[0],
            endDate: budget.endDate.split('T')[0],
        });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/budgets/${id}`);
            setBudgets((prev) => prev.filter((budget) => budget._id !== id));
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    };

    return (
        <div className="budgets-container">
            <header className="header">
                <h1>Budgets</h1>
            </header>
            <div className="budgets-content">
                {/* Left: Create/Edit Form */}
                <div className="budget-form">
                    <form onSubmit={handleSubmit}>
                        <h2>{editingBudget ? 'Edit Budget' : 'Create New Budget'}</h2>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Amount:</label>
                            <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Start Date:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            {editingBudget ? 'Update Budget' : 'Create Budget'}
                        </button>
                    </form>
                </div>

                {/* Right: Budgets List */}
                <div className="budgets-list">
                    {budgets.map((budget) => (
                        <div key={budget._id} className="budget-card">
                            <h2>{budget.name}</h2>
                            <p>
                                <strong>Amount:</strong> ${budget.amount}
                            </p>
                            <p>
                                <strong>Description:</strong>{' '}
                                {budget.description || 'No description'}
                            </p>
                            <p>
                                <strong>Start Date:</strong>{' '}
                                {new Date(budget.startDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>End Date:</strong>{' '}
                                {new Date(budget.endDate).toLocaleDateString()}
                            </p>
                            <div className="budget-actions">
                                <button onClick={() => handleEdit(budget)} className="action-btn edit-btn">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(budget._id)} className="action-btn delete-btn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Budgets;
