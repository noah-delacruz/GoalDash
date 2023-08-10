// Define an error handler middleware function
const errorHandler = (err, req, res, next) => {
    // Determine the status code to use in the response, default to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Set the response status code
    res.status(statusCode);

    // Prepare the error response object with the error message and stack trace (if in development mode)
    const errorResponse = {
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    };

    // Send the error response as JSON
    res.json(errorResponse);
};

// Export the error handler middleware for use in other parts of the application
module.exports = {
    errorHandler,
};
