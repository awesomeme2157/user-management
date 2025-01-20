// src/routes/logs.routes.js
const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

router.use(authMiddleware, authorizeRoles(['Admin']));

router.get('/login-history', logsController.getLoginHistory);
router.get('/activity', logsController.getActivityLog);

module.exports = router;
