import React from "react";
// sample comment
// sample comment 2
const ErrorMessage = ({ error }) => (
  <div data-testid="error">An error occured: {error.toString()}</div>
);

export default ErrorMessage;
