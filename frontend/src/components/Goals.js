import React, { useState, useEffect } from 'react';
import api from '../utils/apiService'; // Authenticated API service
import '../styles.css';
import '../pfm.css';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [form, setForm] = useState({
        name: '',
        targetAmount: '',
        savedAmount: '',
        description: '',
        deadline: '',
    });
    const [editingGoal, setEditingGoal] = useState(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await api.get('/goals');
                setGoals(response.data);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingGoal) {
                const response = await api.put(`/goals/${editingGoal._id}`, form);
                setGoals((prev) =>
                    prev.map((goal) =>
                        goal._id === editingGoal._id ? response.data : goal
                    )
                );
                setEditingGoal(null);
            } else {
                const response = await api.post('/goals', form);
                setGoals((prev) => [...prev, response.data]);
            }
            setForm({
                name: '',
                targetAmount: '',
                savedAmount: '',
                description: '',
                deadline: '',
            });
        } catch (error) {
            console.error('Error saving goal:', error);
        }
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setForm({
            name: goal.name,
            targetAmount: goal.targetAmount,
            savedAmount: goal.savedAmount,
            description: goal.description,
            deadline: goal.deadline.split('T')[0],
        });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/goals/${id}`);
            setGoals((prev) => prev.filter((goal) => goal._id !== id));
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    return (
        <div className="goals-container">
            <header className="header">
                <h1>Goals</h1>
            </header>
            <div className="goals-content">
                {/* Left: Create/Edit Form */}
                <div className="goal-form">
                    <form onSubmit={handleSubmit}>
                        <h2>{editingGoal ? 'Edit Goal' : 'Create New Goal'}</h2>
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
                            <label>Target Amount:</label>
                            <input
                                type="number"
                                name="targetAmount"
                                value={form.targetAmount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Saved Amount:</label>
                            <input
                                type="number"
                                name="savedAmount"
                                value={form.savedAmount}
                                onChange={handleChange}
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
                            <label>Deadline:</label>
                            <input
                                type="date"
                                name="deadline"
                                value={form.deadline}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            {editingGoal ? 'Update Goal' : 'Create Goal'}
                        </button>
                    </form>
                </div>

                {/* Right: Goals List */}
                <div className="goals-list">
                    {goals.map((goal) => (
                        <div key={goal._id} className="goal-card">
                            <h2>{goal.name}</h2>
                            <p>
                                <strong>Target Amount:</strong> ${goal.targetAmount}
                            </p>
                            <p>
                                <strong>Saved Amount:</strong> ${goal.savedAmount}
                            </p>
                            <p>
                                <strong>Description:</strong>{' '}
                                {goal.description || 'No description'}
                            </p>
                            <p>
                                <strong>Deadline:</strong>{' '}
                                {new Date(goal.deadline).toLocaleDateString()}
                            </p>
                            <div className="goal-actions">
                                <button
                                    onClick={() => handleEdit(goal)}
                                    className="action-btn edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(goal._id)}
                                    className="action-btn delete-btn"
                                >
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

export default Goals;
