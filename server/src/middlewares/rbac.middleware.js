// src/middlewares/rbac.middleware.js
module.exports.authorizeRoles = (allowedRoles = []) => {
    return (req, res, next) => {
        // Ensure that req.user exists before proceeding
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user authenticated.' });
        }

        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: 'Access Forbidden: Insufficient privileges'
            });
        }
        next();
    };
};
