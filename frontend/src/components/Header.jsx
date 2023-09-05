// Import necessary dependencies from React and other libraries.
import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

// Define the Header component.
export default function Header() {
    // Access the 'navigate' function from React Router to programmatically navigate to different routes.
    const navigate = useNavigate();

    // Access the 'dispatch' function to dispatch actions to the Redux store.
    const dispatch = useDispatch();

    // Use the 'useSelector' hook to select the 'user' property from the 'auth' slice of the Redux store.
    const { user } = useSelector((state) => state.auth);

    // Define a function to handle user logout.
    const onLogout = () => {
        // Dispatch the 'logout' action to log the user out.
        dispatch(logout());

        // Dispatch the 'reset' action to reset the authentication state.
        dispatch(reset());

        // Navigate the user to the home page ('/') after logout.
        navigate('/');
    }

    return (
        // Render the header component.
        <header className='header'>
            <div className='logo'>
                {/* Render a link to the home page with the text 'GoalDash'. */}
                <Link to='/'>GoalDash</Link>
            </div>
            <ul>
                {user ? (
                    // If a user is logged in, render a logout button.
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (
                    // If no user is logged in, render login and register links.
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}
