// Import the 'configureStore' function from the Redux Toolkit library.
import { configureStore } from '@reduxjs/toolkit';

// Import the 'authReducer' from the 'authSlice' file located in the '../features/auth/' directory.
import authReducer from '../features/auth/authSlice';

// Import the 'goalReducer' from the 'goalSlice' file located in the '../features/auth/' directory.
import goalReducer from '../features/goals/goalSlice';

// Create the Redux store using 'configureStore' function.
export const store = configureStore({
  // Specify the initial state and reducers for the store.
  reducer: {
    // Define a 'auth' slice in the store, which will use the 'authReducer' to manage its state.
    auth: authReducer,
     // Define a 'goals' slice in the store, which will use the 'goalReducer' to manage its state.
    goals: goalReducer
  },
});
