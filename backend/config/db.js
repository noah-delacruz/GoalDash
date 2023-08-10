// Import the Mongoose library
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the provided MONGO_URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // If the connection is successful, log the host of the connected database in cyan and underline format
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        // If an error occurs during the connection attempt, log the error and exit the process with status code 1
        console.log(error);
        process.exit(1);
    }
};

// Export the connectDB function to make it available for use in other parts of the application
module.exports = connectDB;
