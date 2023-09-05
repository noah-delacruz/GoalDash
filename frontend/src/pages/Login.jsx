// Import React and required icons.
import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';

// Define the Login component.
export default function Login() {
    // Initialize the 'formData' state to hold the email and password inputs.
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

    // Destructure the email and password from 'formData'.
    const { email, password } = formData;

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
        // You can add logic here to send the login data to your authentication system.
    };

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
