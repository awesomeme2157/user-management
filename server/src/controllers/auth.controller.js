const { validationResult } = require("express-validator");
const authService = require("../services/auth.service");
const LoginHistory = require("../models/loginHistory.model");
const requestIp = require("request-ip");

exports.login = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Authenticate user via the service layer
        const { user, token } = await authService.login(email, password);

        // Defensive check: If the service doesn't return a user or token
        if (!user || !token) {
            console.error("Unexpected issue: Missing user or token.");
            return res.status(500).json({ error: "Internal server error." });
        }

        // Record login history
        await LoginHistory.create({
            userId: user._id,
            ipAddress: requestIp.getClientIp(req),
            deviceInfo: req.headers["user-agent"] || "Unknown",
        });

        // Respond with token and user information
        res.status(200).json({
            token,
            user: {
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Login error:", err);

        // Handle specific error cases from the service layer
        if (err.message === "User not found" || err.message === "Invalid password") {
            return res.status(401).json({ error: err.message });
        }

        // For other unexpected errors
        res.status(500).json({ error: "Internal server error." });
    }
};
