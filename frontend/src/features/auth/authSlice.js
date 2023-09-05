// Import necessary dependencies from Redux Toolkit and the 'authService' module.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get the user object from localStorage, if it exists.
const user = JSON.parse(localStorage.getItem('user'));

// Define the initial state for the authentication slice.
const initialState = {
    user: user ? user : null, // The user object, or null if not logged in.
    isError: false,           // Indicates if an error occurred.
    isSuccess: false,         // Indicates if an action was successful.
    isLoading: false,         // Indicates if an action is currently loading.
    message: '',              // Holds error or success messages.
}

// Define an async action to register a user.
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        // Call the 'register' function from the 'authService'.
        return await authService.register(user);
    } catch (error) {
        // Handle errors and return a rejection value with an error message.
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Define an async action to log a user out.
export const logout = createAsyncThunk('auth/logout', async () => {
    // Call the 'logout' function from the 'authService'.
    await authService.logout();
});

// Create the 'authSlice' using Redux Toolkit.
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            // Reset state properties when needed.
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                // Update state when the 'register' action is pending.
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                // Update state when the 'register' action is fulfilled (successful).
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                // Update state when the 'register' action is rejected (failed).
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                // Update state when the 'logout' action is fulfilled (successful).
                state.user = null;
            });
    }
});

// Export the 'reset' action and the reducer from the 'authSlice'.
export const { reset } = authSlice.actions;
export default authSlice.reducer;
