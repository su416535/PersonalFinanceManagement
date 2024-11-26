import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/apiService'; // Use authenticated API service

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await api.post('/auth/logout'); // Use backend logout service
                localStorage.removeItem('token'); // Clear the token
                navigate('/login'); // Redirect to login
                window.location.reload(); // Refresh the page
            } catch (err) {
                console.error('Logout error:', err);
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Logging you out...</p>
        </div>
    );
};

export default Logout;
