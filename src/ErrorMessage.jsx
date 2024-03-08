import React from 'react'

const ErrorMessage = ({ error }) => (
  <div data-testid="error">An error on V3 occurred: {error.toString()}</div>
)

export default ErrorMessage
