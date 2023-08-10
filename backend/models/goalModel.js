// Import the Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose schema for the 'Goal' collection
const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value'], // Ensure the 'text' field is required with a custom error message
    },
}, {
    timestamps: true, // Enable automatic timestamps (createdAt and updatedAt fields)
});

// Create a Mongoose model named 'Goal' based on the defined schema
module.exports = mongoose.model('Goal', goalSchema);
