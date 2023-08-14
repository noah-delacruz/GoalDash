// Import required libraries and modules
const jwt = require('jsonwebtoken'); // JSON Web Token library for user authentication
const bcrypt = require('bcryptjs'); // Library for password hashing
const asyncHandler = require('express-async-handler'); // Middleware for handling asynchronous route handlers
const User = require('../models/userModel'); // Import the User model for interacting with the database

// Register new user
// Handles POST /api/users route
// Public access
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validate incoming data
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user with the same email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user record in the database
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        // Generate a JWT token for the newly registered user
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Authenticate a user
// Handles POST /api/users/login route
// Public access
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by their email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // If the user is found and the password matches, return a JWT token
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// Get user data
// Handles GET /api/users/me route
// Private access
const getMe = asyncHandler(async (req, res) => {
    // Return user data from the authenticated user's session
    res.json({ message: 'User data display' });
});

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expiration time
    });
};

// Export the functions to make them available in other parts of the application
module.exports = {
    registerUser,
    loginUser,
    getMe,
};
