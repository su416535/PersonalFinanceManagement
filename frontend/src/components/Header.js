import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/apiService'; // Authenticated API service
import '../styles.css';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            if (isAuthenticated) {
                try {
                    const response = await api.get('/auth/validate'); // Adjust endpoint to fetch user info
                    setUserName(response.data.user.username); // Assuming the user object includes `username`
                } catch (err) {
                    console.error('Error fetching user info:', err);
                }
            }
        };

        fetchUserName();
    }, [isAuthenticated]);

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout'); // Call backend logout service
            localStorage.removeItem('token'); // Clear token
            setIsAuthenticated(false); // Update authentication state
            setUserName(''); // Clear user name
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                {isAuthenticated && userName && (
                    <span className="user-name">Welcome, {userName}</span>
                )}
            </div>
            <h1>Personal Finance Management Tracking</h1>
            <nav className="nav-links">
                {isAuthenticated ? (
                    <Link to="/logout" className="nav-link" onClick={handleLogout}>
                        Logout
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                        <Link to="/register" className="nav-link">
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
