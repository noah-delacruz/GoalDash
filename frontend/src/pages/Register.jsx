// Import React and necessary dependencies.
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

// Define the Register component.
export default function Register() {
    // Initialize the 'formData' state to hold user registration data.
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    // Destructure the registration form fields from 'formData'.
    const { name, email, password, password2 } = formData;

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
    }

    // Handle form submission.
    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            // Create an object with user registration data.
            const userData = {
                name,
                email,
                password,
            }
            // Dispatch the 'register' action with user data.
            dispatch(register(userData));
        }
    }

    // If the registration is in progress, display a loading spinner.
    if (isLoading) {
        return <Spinner />;
    }

    // Render the registration form.
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    {/* Input fields for name, email, password, and password confirmation */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                        />
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={onChange}
                        />
                    </div>
                    {/* Submit button */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}
