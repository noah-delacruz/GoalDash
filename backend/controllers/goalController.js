// Import the express-async-handler middleware for handling asynchronous routes
const asyncHandler = require('express-async-handler');

// Import the Goal model
const Goal = require('../models/goalModel');

// Import the User model
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    // Fetch all goals for a user from the database
    const goals = await Goal.find({ user: req.user.id });
    
    // Send a 200 (OK) response with the fetched goals in JSON format
    res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    // Check if a text field is provided in the request body
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    // Create a new goal in the database with the provided text
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });

    // Send a 200 (OK) response with the newly created goal in JSON format
    res.status(200).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    // Find the goal by ID in the database
    const goal = await Goal.findById(req.params.id);

    // If the goal is not found, send a 400 (Bad Request) response with an error message
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // Update the goal with the provided data and retrieve the updated goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Send a 200 (OK) response with the updated goal in JSON format
    res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    // Find the goal by ID in the database
    const goal = await Goal.findById(req.params.id);

    // If the goal is not found, send a 400 (Bad Request) response with an error message
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // Delete the goal from the database
    await goal.deleteOne();

    // Send a 200 (OK) response with the ID of the deleted goal
    res.status(200).json({ id: req.params.id });
});

// Export the route handlers for use in other parts of the application
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
