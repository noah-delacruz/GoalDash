// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the 'User' collection
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'] // Name is a required field
    },
    email: {
        type: String,
        required: [true, 'Please add an email'], // Email is a required field
        unique: true // Ensure that email addresses are unique in the collection
    },
    password: {
        type: String,
        required: [true, 'Please add a password'] // Password is a required field
    },
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' fields to track document creation and updates
});

// Create and export the User model using the defined schema
module.exports = mongoose.model('User', userSchema);
