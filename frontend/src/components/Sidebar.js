import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/goals">Goals</Link></li>
                <li><Link to="/budgets">Budgets</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
