// src/models/loginHistory.model.js
const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    ipAddress: { type: String, default: 'Unknown' },
    deviceInfo: { type: String, default: 'Unknown' }
}, {
    timestamps: { createdAt: 'timestamp', updatedAt: false }
    // Using timestamps option to automatically set 'timestamp' on creation.
    // updatedAt is disabled since login history might not need updates.
});

module.exports = mongoose.model('LoginHistory', loginHistorySchema);
