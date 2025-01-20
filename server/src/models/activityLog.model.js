// src/models/activityLog.model.js
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String,    // e.g. CREATE, UPDATE, DELETE
    resource: String,  // e.g. "User credentials", "Login history", etc.
    timestamp: { type: Date, default: Date.now },
    details: { type: mongoose.Schema.Types.Mixed, default: {} }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
