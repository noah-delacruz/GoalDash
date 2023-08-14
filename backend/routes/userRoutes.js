// Import the Express library
const express = require('express');

// Create an instance of an Express router
const router = express.Router();

// Import userController functions for handling user-related operations
const { registerUser, loginUser, getMe } = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware')

// Define routes and associate them with the corresponding controller functions

// Route for registering a new user
router.post('/', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get the currently authenticated user's information
router.get('/me', protect, getMe);

// Export the router to make it available for use in other parts of the application
module.exports = router;
