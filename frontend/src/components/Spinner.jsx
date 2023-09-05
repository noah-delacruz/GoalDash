// Import React library to define a React component.
import React from 'react';

// Define a functional component called Spinner.
export default function Spinner() {
    return (
        // Render a container element with a loading spinner.
        <div className="loadingSpinnerContainer">
            <div className="loadingSpinner"></div>
        </div>
    );
}
