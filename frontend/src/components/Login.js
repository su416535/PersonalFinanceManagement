import React, { useState } from 'react';
import api from '../utils/apiService'; // Import API service
import { useNavigate } from 'react-router-dom';
import '../pfm.css';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            setMessage('Login successful');
            navigate('/');
            window.location.reload(); // Refresh the page
        } catch (err) {
            setMessage(err.response?.data?.message || 'Invalid credentials');
        }
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };
    return (
        <div className="register-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Login
                </button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
