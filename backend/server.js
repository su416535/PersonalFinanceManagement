require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const transactionsRouter = require('./routes/transactions');
const authRouter = require('./routes/auth');
const reportRouter = require('./routes/Report');
const errorHandler = require('./utils/errorHandler');
const bodyParser = require('body-parser');
const budgetRoutes = require('./routes/budgetRoutes');
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/users'); 
const authenticate = require('./middlewares/authMiddleware');
//heroku related
//const path = require('path');



const app = express();

// Database connection
mongoose.connect(
  //process.env.MONGO_URI, 
  'mongodb://127.0.0.1:27017/finance',
  {

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
//app.use('/api/transactions', transactionsRouter);
//app.use('/api/reports', reportRouter); // Mount report routes
//app.use('/api/budgets', budgetRoutes);
//app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/budgets', authenticate, budgetRoutes);
app.use('/api/goals', authenticate, goalRoutes);
app.use('/api/transactions', authenticate, transactionsRouter);
app.use('/api/reports', authenticate, reportRouter);

// Base route
app.get('/', (req, res) => {
    res.send('Personal Finance Management API');
  });

//Heroku related
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'build', 'index.html')); });
// end Heroku
// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}

// Error handling middleware
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
