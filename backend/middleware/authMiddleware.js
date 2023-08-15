// Import required libraries and modules
const jwt = require('jsonwebtoken'); // JSON Web Token library for user authentication
const asyncHandler = require('express-async-handler'); // Middleware for handling asynchronous route handlers
const User = require('../models/userModel'); // Import the User model for interacting with the database

// Middleware to protect routes requiring authentication
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the request contains a valid JWT token in the 'Authorization' header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Retrieve the user's information from the decoded token, excluding the password
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Move on to the next middleware or route handler
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized'); // If token verification fails, deny access
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token'); // If no token is provided, deny access
    }
});

// Export the middleware function to make it available for protecting routes
module.exports = { protect };
