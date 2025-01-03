import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const ErrorMessage = ({ error }) => (
  <div data-testid="error">An error occured: {error.toString()}</div>
);

export default ErrorMessage;

// Define prop types for the component
ErrorMessage.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired, // Ensures the error prop is an instance of Error
};
