import React, { useState } from 'react';
import api from '../utils/apiService'; // Authenticated API service
import '../styles.css';
import '../pfm.css';

const Report = () => {
    const [monthlyReport, setMonthlyReport] = useState(null);
    const [yearlyReport, setYearlyReport] = useState(null);
    const [error, setError] = useState(null);

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const fetchMonthlyReport = async () => {
        if (!month || !year) {
            setError('Please provide both month and year.');
            return;
        }
        try {
            setError(null);
            const response = await api.get(`/reports/monthly/${year}/${month}`);
            setMonthlyReport(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching monthly report');
        }
    };

    const fetchYearlyReport = async () => {
        if (!year) {
            setError('Please provide the year.');
            return;
        }
        try {
            setError(null);
            const response = await api.get(`/reports/yearly/${year}`);
            setYearlyReport(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching yearly report');
        }
    };

    return (
        <div className="register-container">
            <h2>Reports</h2>
            <div className="register-form">
                <h3>Monthly Report</h3>
                <div className="form-group">
                    <label>Month (MM):</label>
                    <input
                        type="text"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        placeholder="e.g., 01 for January"
                    />
                </div>
                <div className="form-group">
                    <label>Year (YYYY):</label>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="e.g., 2024"
                    />
                </div>
                <button onClick={fetchMonthlyReport} className="submit-btn">
                    Get Monthly Report
                </button>
                {monthlyReport && (
                    <div>
                        <h4>Results for {monthlyReport.month}/{monthlyReport.year}</h4>
                        <p>Income: ${monthlyReport.income}</p>
                        <p>Expense: ${monthlyReport.expense}</p>
                        <p>Savings: ${monthlyReport.savings}</p>
                    </div>
                )}
            </div>

            <div className="register-form" style={{ marginTop: '20px' }}>
                <h3>Yearly Report</h3>
                <div className="form-group">
                    <label>Year (YYYY):</label>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="e.g., 2024"
                    />
                </div>
                <button onClick={fetchYearlyReport} className="submit-btn">
                    Get Yearly Report
                </button>
                {yearlyReport && (
                    <div>
                        <h4>Results for {yearlyReport.year}</h4>
                        <p>Income: ${yearlyReport.income}</p>
                        <p>Expense: ${yearlyReport.expense}</p>
                        <p>Savings: ${yearlyReport.savings}</p>
                    </div>
                )}
            </div>

            {error && (
                <div style={{ color: 'red', marginTop: '20px' }}>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Report;
