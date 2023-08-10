// Import the required Node.js modules
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

// Import the error handler middleware
const { errorHandler } = require('./middleware/errorMiddleware');

// Import the database connection function
const connectDB = require('./config/db');

// Define the port number for the server to listen on
const port = process.env.PORT || 3000;

// Establish a connection to the MongoDB database
connectDB();

// Create an instance of the Express application
const app = express();

// Middleware: Parse incoming JSON data
app.use(express.json());

// Middleware: Parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Middleware: Use the 'goalRoutes' router for handling '/api/goals' endpoints
app.use('/api/goals', require('./routes/goalRoutes'));

// Middleware: Use the 'errorHandler' middleware for handling errors
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server started on port ${port}`.cyan.bold);
});
