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


// // src/app.js
// require('dotenv').config();
// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');
// const rfs = require('rotating-file-stream');  // Import rotating-file-stream

// const connectDB = require('./config/db');
// const apiLimiter = require('./middlewares/apiLimiter');  // Assuming your rate limiter middleware

// // Connect to the database
// connectDB();

// const app = express();

// // Remove or comment out custom logger
// // const logger = require('./logger');
// // app.use(logger);

// // Create log directory if it doesn't exist
// const logDirectory = path.join(__dirname, 'logs');
// if (!fs.existsSync(logDirectory)) {
//     fs.mkdirSync(logDirectory);
// }

// // Create a rotating write stream (rotates daily)
// const accessLogStream = rfs.createStream('access.log', {
//     interval: '1d',      // rotate daily
//     path: logDirectory
// });

// // Setup Morgan to log requests to the rotating file stream only
// app.use(morgan('combined', { stream: accessLogStream }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(cors());

// // Rate limiter
// app.use('/api', apiLimiter);

// // Routes
// const authRoutes = require('./routes/auth.routes');
// const userRoutes = require('./routes/user.routes');
// const logsRoutes = require('./routes/logs.routes');

// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/logs', logsRoutes);

// // Health check
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });
