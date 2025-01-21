// src/routes/logs.routes.js
const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

// Apply authentication and RBAC middleware to all routes in this router
router.use(authMiddleware, authorizeRoles(['Admin']));

// Route for fetching login history (supports CSV export via query param)
router.get('/login-history', logsController.getLoginHistory);

// Route for fetching activity log
router.get('/activity', logsController.getActivityLog);

module.exports = router;
