// Import the Express library
const express = require('express');

// Create a new Express Router instance
const router = express.Router();

// Import the route handler functions from the goalController module
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

// Import protect function for protecting routes
const { protect } = require('../middleware/authMiddleware');

// Define routes using the router for the '/api/goals' endpoint
// Each route is associated with a specific HTTP method and a corresponding route handler function

// GET /api/goals - Retrieve a list of goals
// POST /api/goals - Create a new goal
router.route('/')
    .get(protect, getGoals) // Handle GET requests by invoking the getGoals function from goalController
    .post(protect, setGoal); // Handle POST requests by invoking the setGoal function from goalController

// PUT /api/goals/:id - Update a specific goal by ID
// DELETE /api/goals/:id - Delete a specific goal by ID
router.route('/:id')
    .put(protect, updateGoal) // Handle PUT requests by invoking the updateGoal function from goalController
    .delete(protect, deleteGoal); // Handle DELETE requests by invoking the deleteGoal function from goalController

// Export the router to make the defined routes available for use in the application
module.exports = router;
