// // src/controllers/logs.controller.js
// const LoginHistory = require('../models/loginHistory.model');
// const ActivityLog = require('../models/activityLog.model');

// exports.getLoginHistory = async (req, res) => {
//     try {
//         const { start, end, export: exportType } = req.query;
//         const query = {};

//         if (start && end) {
//             query.timestamp = { $gte: new Date(start), $lte: new Date(end) };
//         }

//         const logs = await LoginHistory.find(query).populate('userId', 'email role');

//         // If you want CSV export:
//         if (exportType === 'csv') {
//             // Convert logs to CSV or use a library like json2csv
//             // Return or download
//         }

//         res.json(logs);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.getActivityLog = async (req, res) => {
//     try {
//         const { start, end } = req.query;
//         const query = {};

//         if (start && end) {
//             query.timestamp = { $gte: new Date(start), $lte: new Date(end) };
//         }

//         const logs = await ActivityLog.find(query).populate('userId', 'email role');
//         res.json(logs);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// src/controllers/logs.controller.js
const LoginHistory = require('../models/loginHistory.model');
const ActivityLog = require('../models/activityLog.model');
const { Parser } = require('json2csv');  // For CSV export

exports.getLoginHistory = async (req, res) => {
    try {
        const { start, end, export: exportType } = req.query;
        const query = {};

        if (start && end) {
            query.timestamp = { $gte: new Date(start), $lte: new Date(end) };
        }

        const logs = await LoginHistory.find(query).populate('userId', 'email role');

        // If CSV export is requested
        if (exportType === 'csv') {
            // Define fields for CSV output
            const fields = ['userId.email', 'userId.role', 'timestamp', 'ipAddress', 'deviceInfo'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(logs);

            res.header('Content-Type', 'text/csv');
            return res.send(csv);
        }

        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getActivityLog = async (req, res) => {
    try {
        const { start, end } = req.query;
        const query = {};

        if (start && end) {
            query.timestamp = { $gte: new Date(start), $lte: new Date(end) };
        }

        const logs = await ActivityLog.find(query).populate('userId', 'email role');
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
