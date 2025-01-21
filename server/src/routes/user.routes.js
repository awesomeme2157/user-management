// // src/routes/user.routes.js
// const express = require('express');
// const { body } = require('express-validator');
// const userController = require('../controllers/user.controller');
// const authMiddleware = require('../middlewares/auth.middleware');
// const { authorizeRoles } = require('../middlewares/rbac.middleware');

// const router = express.Router();

// // Validation rules for creating a user
// const createUserValidationRules = [
//     body('email').isEmail().withMessage('Valid email is required'),
//     body('hashedPassword')
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long'),
//     body('role')
//         .optional()
//         .isIn(['Admin', 'User'])
//         .withMessage('Role must be either Admin or User'),
// ];

// router.use(authMiddleware, authorizeRoles(['Admin']));

// // Create new user (Admin-only)
// router.post('/', createUserValidationRules, userController.createUser);

// // List all users
// router.get('/', userController.listUsers);

// // Get a user by ID
// router.get('/:userId', userController.getUserById);

// // Update a user
// router.patch('/:userId', userController.updateUser);

// // Delete a user
// router.delete('/:userId', userController.deleteUser);

// module.exports = router;

//--------------------------------------------

// // src/routes/user.routes.js
// const express = require('express');
// const { body } = require('express-validator');
// const userController = require('../controllers/user.controller');
// const authMiddleware = require('../middlewares/auth.middleware');
// const { authorizeRoles } = require('../middlewares/rbac.middleware');

// const router = express.Router();

// // Validation rules for creating a user
// const createUserValidationRules = [
//     body('email')
//         .isEmail()
//         .withMessage('Valid email is required'),
//     body('password')
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long'),
//     body('role')
//         .optional()
//         .isIn(['Admin', 'User'])
//         .withMessage('Role must be either Admin or User'),
//     body('status')
//         .optional()
//         .isIn(['active', 'inactive'])
//         .withMessage('Status must be either active or inactive'),
// ];

// // Validation rules for updating a user
// const updateUserValidationRules = [
//     body('role')
//         .optional()
//         .isIn(['Admin', 'User'])
//         .withMessage('Role must be either Admin or User'),
//     body('status')
//         .optional()
//         .isIn(['active', 'inactive'])
//         .withMessage('Status must be either active or inactive'),
//     body('email')
//         .optional()
//         .isEmail()
//         .withMessage('Valid email is required'),
//     body('password')
//         .optional()
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long')
// ];

// // Protect all user routes to Admins only
// router.use(authMiddleware, authorizeRoles(['Admin']));

// // Create new user (Admin-only)
// router.post('/', createUserValidationRules, userController.createUser);

// // List all users
// router.get('/', userController.listUsers);

// // Get a user by ID
// router.get('/:userId', userController.getUserById);

// // Update a user
// router.patch(
//     '/:userId',
//     updateUserValidationRules,
//     userController.updateUser
// );

// // Delete a user
// router.delete('/:userId', userController.deleteUser);

// module.exports = router;

//--------------------------------------------

// const express = require('express');
// const { body } = require('express-validator');
// const userController = require('../controllers/user.controller');
// const authMiddleware = require('../middlewares/auth.middleware');
// const { authorizeRoles } = require('../middlewares/rbac.middleware');

// const router = express.Router();

// // Validation rules for creating a user (used for signup)
// const createUserValidationRules = [
//     body('email').isEmail().withMessage('Valid email is required'),
//     body('password')
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long'),
//     body('role')
//         .optional()
//         .isIn(['Admin', 'User'])
//         .withMessage('Role must be either Admin or User'),
//     body('status')
//         .optional()
//         .isIn(['active', 'inactive'])
//         .withMessage('Status must be either active or inactive'),
// ];

// // Public Signup Route (accessible without authentication)
// router.post('/signup', createUserValidationRules, userController.createUser);

// // Protect all routes below for Admins only
// router.use(authMiddleware, authorizeRoles(['Admin']));

// // List all users
// router.get('/', userController.listUsers);

// // Get a user by ID
// router.get('/:userId', userController.getUserById);

// // Update a user
// router.patch('/:userId', userController.updateUser);

// // Delete a user
// router.delete('/:userId', userController.deleteUser);

// module.exports = router;

//--------------------------------------------

// src/routes/user.routes.js
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

const router = express.Router();

// Validation rules for creating a user (signup)
const createUserValidationRules = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    // Optionally validate role/status if needed, but for public signup, default to User
];

// Public Signup Route - accessible without authentication
router.post('/signup', createUserValidationRules, userController.createUser);

// Protect all routes below for Admins only
router.use(authMiddleware, authorizeRoles(['Admin']));

// List all users
router.get('/', userController.listUsers);

// Get a user by ID
router.get('/:userId', userController.getUserById);

// Update a user with role/status changes
const updateUserValidationRules = [
    body('role')
        .optional()
        .isIn(['Admin', 'User'])
        .withMessage('Role must be either Admin or User'),
    body('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Status must be either active or inactive'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Valid email is required'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

router.patch('/:userId', updateUserValidationRules, userController.updateUser);

// Delete a user
router.delete('/:userId', userController.deleteUser);

module.exports = router;
