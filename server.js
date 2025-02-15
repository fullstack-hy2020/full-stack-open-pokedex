const express = require('express')
const path = require('path')
const app = express()

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Start the server on the specified port or 5000
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})