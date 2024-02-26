const express = require('express')
const app = express()

// get the port from the env variable
const PORT = process.env.PORT || 5000

// Serve static files from the "dist" directory
app.use(express.static('dist', { index: 'index.html' }))

// Optional: Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
