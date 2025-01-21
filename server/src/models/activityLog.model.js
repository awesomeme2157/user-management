// // src/models/activityLog.model.js
// const mongoose = require('mongoose');

// const activityLogSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     action: String,    // e.g. CREATE, UPDATE, DELETE
//     resource: String,  // e.g. "User credentials", "Login history", etc.
//     timestamp: { type: Date, default: Date.now },
//     details: { type: mongoose.Schema.Types.Mixed, default: {} }
// });

// module.exports = mongoose.model('ActivityLog', activityLogSchema);

// src/models/activityLog.model.js
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    action: { type: String, required: true },   // e.g. CREATE, UPDATE, DELETE
    resource: { type: String, required: true }, // e.g. "User credentials", "Login history", etc.
    details: { type: mongoose.Schema.Types.Mixed, default: {} }
}, {
    timestamps: { createdAt: 'timestamp', updatedAt: false }
    // Use timestamps to automatically set 'timestamp' on creation.
    // We disable 'updatedAt' since logs typically aren't updated once created.
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
