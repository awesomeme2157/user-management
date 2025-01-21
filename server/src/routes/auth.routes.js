// // src/routes/auth.routes.js
// const express = require('express');
// const { body } = require('express-validator');
// const authController = require('../controllers/auth.controller');

// const router = express.Router();

// // Validation rules for login
// const loginValidationRules = [
//     body('email').isEmail().withMessage('Please provide a valid email'),
//     body('password')
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long')
// ];

// // POST /api/auth/login
// router.post('/login', loginValidationRules, authController.login);

// module.exports = router;

// src/routes/auth.routes.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Validation rules for login
const loginValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

// POST /api/auth/login
router.post('/login', loginValidationRules, authController.login);

module.exports = router;
