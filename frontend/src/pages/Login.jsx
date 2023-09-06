// Import React and required icons.
import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

// Define the Login component.
export default function Login() {
    // Initialize the 'formData' state to hold the email and password inputs.
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

    // Destructure the email and password from 'formData'.
    const { email, password } = formData;

    // Access the 'navigate' function from React Router to programmatically navigate.
    const navigate = useNavigate();
    
    // Access the 'dispatch' function to dispatch actions to the Redux store.
    const dispatch = useDispatch();

    // Select relevant authentication state properties from the Redux store.
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

     // useEffect to handle success, error, and reset actions.
     React.useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch]);

    // Handle input changes and update the 'formData' state.
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle form submission.
    const onSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            email,
            password
        }

        dispatch(login(userData))
        // You can add logic here to send the login data to your authentication system.
    };

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
            {/* Render the login form */}
            <section className="heading">
                <h1>
                    {/* Render the login icon */}
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    {/* Email input */}
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    {/* Password input */}
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                    </div>
                    {/* Submit button */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}
