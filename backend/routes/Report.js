const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authMiddleware'); 
// Middleware for authentication
// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach the decoded user information to the request
//         console.log(req.user);
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid token.' });
//     }
// };

// Monthly report for the logged-in user
router.get('/monthly/:year/:month', authenticate, async (req, res) => {
    const { year, month } = req.params;
    const userId = req.user.id;
    const userName = req.user.username;
    console.log('ID_'+userId);
    console.log(req.user.username);
    try {
        const transactions = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'users', // The collection to join (name of the collection, NOT the model name)
                    localField: 'user', // The field in the `Transaction` collection
                    foreignField: '_id', // The field in the `User` collection
                    as: 'userDetail' // The name of the output field
                }
            },
            {
                $unwind: '$userDetail'
            },
            {
                $match: {
                    //user: userId,
                    'userDetail.username': userName,
                    date: {
                        $gte: new Date(`${year}-${month}-01`),
                        $lt: new Date(`${year}-${parseInt(month) + 1}-01`)
                    },
                    type: { $in: ['income', 'expense','savings'] } 

                }
            },
            {
                $group: {
                    _id: '$type',
                     totalAmount: { $sum: '$amount' },
                     transactions: { $push: '$$ROOT' }
                }
            }
        ]);

        console.log('Transactions Aggregated:', transactions); // Debugging log

        const report = transactions.reduce((acc, curr) => {
            acc[curr._id] = curr.totalAmount;
            return acc;
        }, {});

        res.json({
            month,
            year,
            income: report.income || 0,
            expense: report.expense || 0,
            savings: report.savings || 0
        });
    } catch (err) {
        console.error('Error fetching monthly report:', err);
        res.status(500).json({ message: err.message });
    }
});

// Yearly report for the logged-in user
router.get('/yearly/:year', authenticate, async (req, res) => {
    const { year } = req.params;
    const userId = req.user.id;
    const userName = req.user.username;
    console.log('ID_'+userId);
    console.log(req.user.username);
    try {
       
        const transactions = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'users', // The collection to join (name of the collection, NOT the model name)
                    localField: 'user', // The field in the `Transaction` collection
                    foreignField: '_id', // The field in the `User` collection
                    as: 'userDetail' // The name of the output field
                }
            },
            {
                $unwind: '$userDetail'
            },
            {

            
                $match: {
                    'userDetail.username': userName,//'preethi',//userId,
                    date: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${parseInt(year) + 1}-01-01`)
                    },
                    type: { $in: ['income', 'expense','savings'] } 
                }
            },
            {
                $group: {
                    _id: '$type',
                    totalAmount: { $sum: '$amount' },
                    transactions: { $push: '$$ROOT' }
                }
            }
        ]);

        console.log('Transactions Aggregated:', transactions); // Debugging log

        const report = transactions.reduce((acc, curr) => {
            acc[curr._id] = curr.totalAmount;
            return acc;
        }, {});

        res.json({
            year,
            income: report.income || 0,
            expense: report.expense || 0,
            savings: report.savings || 0
        });
    } catch (err) {
        console.error('Error fetching yearly report:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
