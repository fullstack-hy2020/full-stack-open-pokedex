import React from 'react'

const ErrorMessage = ({ error }) => (
  <div data-testid="error">An error  on V2 occured: {error.toString()}</div>
)

export default ErrorMessage
