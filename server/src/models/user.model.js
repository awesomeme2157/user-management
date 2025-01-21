// src/models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../utils/encryption');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,            // Index for faster lookups
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    // Example of storing an encrypted field
    secretData: {
        type: String,
        get: (encrypted) => (encrypted ? decrypt(encrypted) : null),
        set: (plaintext) => (plaintext ? encrypt(plaintext) : null)
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('hashedPassword')) return next();
    try {
        this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
