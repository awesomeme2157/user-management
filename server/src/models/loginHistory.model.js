// src/models/loginHistory.model.js
const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    ipAddress: String,
    deviceInfo: String
});

module.exports = mongoose.model('LoginHistory', loginHistorySchema);
