// Import the 'axios' library for making HTTP requests.
import axios from 'axios';

// Define the base URL for API requests.
const API_URL = '/api/users/';

// Function to register a user by sending user data to the server.
const register = async (userData) => {
    // Send a POST request to the API with the provided user data.
    const response = await axios.post(API_URL, userData);

    // If the response contains data, store the user data in the local storage.
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    // Return the response data.
    return response.data;
}

// Function to log out a user by removing user data from local storage.
const logout = () => {
    // Remove the 'user' data from local storage to log the user out.
    localStorage.removeItem('user');
}

// Define an object 'authService' with the 'register' and 'logout' functions.
const authService = {
    register,
    logout
}

// Export the 'authService' object as the default export of this module.
export default authService;
