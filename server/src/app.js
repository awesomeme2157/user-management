// src/app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const logger = require('./logger');

// Connect to the database
connectDB();

// Use custom logger (e.g., Morgan-like functionality)
app.use(logger);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Rate limiter
const apiLimiter = require('./middlewares/apiLimiter');
app.use('/api', apiLimiter);

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const logsRoutes = require('./routes/logs.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/logs', logsRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});