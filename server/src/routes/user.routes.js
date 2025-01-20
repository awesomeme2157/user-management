// src/routes/user.routes.js
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

const router = express.Router();

// Validation rules for creating a user
const createUserValidationRules = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('hashedPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .optional()
        .isIn(['Admin', 'User'])
        .withMessage('Role must be either Admin or User'),
];

router.use(authMiddleware, authorizeRoles(['Admin']));

// Create new user (Admin-only)
router.post('/', createUserValidationRules, userController.createUser);

// List all users
router.get('/', userController.listUsers);

// Get a user by ID
router.get('/:userId', userController.getUserById);

// Update a user
router.patch('/:userId', userController.updateUser);

// Delete a user
router.delete('/:userId', userController.deleteUser);

module.exports = router;
