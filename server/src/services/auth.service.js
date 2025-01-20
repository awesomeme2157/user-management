// src/services/auth.service.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

module.exports.login = async (email, password) => {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    // Compare password
    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) {
        throw new Error('Invalid password');
    }

    // Generate JWT
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { user, token };
};
