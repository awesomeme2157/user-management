// // src/controllers/auth.controller.js
// const { validationResult } = require('express-validator');
// const authService = require('../services/auth.service');
// const LoginHistory = require('../models/loginHistory.model');
// const requestIp = require('request-ip');

// exports.login = async (req, res) => {
//     // Check validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try {
//         const { email, password } = req.body;
//         const { user, token } = await authService.login(email, password);

//         // Record login history
//         await LoginHistory.create({
//             userId: user._id,
//             ipAddress: requestIp.getClientIp(req),
//             deviceInfo: req.headers['user-agent']
//         });

//         // Respond with token and basic user info
//         res.json({
//             token,
//             user: {
//                 email: user.email,
//                 role: user.role
//             }
//         });
//     } catch (err) {
//         res.status(401).json({ error: err.message });
//     }
// };


// src/controllers/auth.controller.js
const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');
const LoginHistory = require('../models/loginHistory.model');
const requestIp = require('request-ip');

exports.login = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);

        if (!user || !token) {
            // This condition catches unexpected missing user/token
            return res.status(401).json({ error: 'Authentication failed: Invalid email or password.' });
        }

        // Record login history
        await LoginHistory.create({
            userId: user._id,
            ipAddress: requestIp.getClientIp(req),
            deviceInfo: req.headers['user-agent']
        });

        // Respond with token and basic user info
        res.json({
            token,
            user: {
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        // Log error for debugging purposes (optional)
        console.error('Login error:', err);

        res.status(401).json({ error: err.message });
    }
};
