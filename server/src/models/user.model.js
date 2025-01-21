// src/models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../utils/encryption');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    // example to store the data at rest with encryption
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
    timestamps: true
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('hashedPassword')) return next();
    try {
        this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
