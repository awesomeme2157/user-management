// src/controllers/user.controller.js
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const ActivityLog = require('../models/activityLog.model');

exports.listUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { email, hashedPassword, role, status } = req.body;
        const newUser = await User.create({
            email,
            hashedPassword,
            role: role || 'User',
            status: status || 'active'
        });

        // Log activity
        await ActivityLog.create({
            userId: req.user.userId, // Admin performing the creation
            action: 'CREATE',
            resource: 'User credentials',
            details: {
                createdUserId: newUser._id,
                role: newUser.role
            }
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log activity
        await ActivityLog.create({
            userId: req.user.userId,
            action: 'UPDATE',
            resource: 'User credentials',
            details: {
                updatedUserId: userId,
                changes: req.body
            }
        });

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log activity
        await ActivityLog.create({
            userId: req.user.userId,
            action: 'DELETE',
            resource: 'User credentials',
            details: { deletedUserId: userId }
        });

        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
