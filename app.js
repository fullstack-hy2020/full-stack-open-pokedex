const express = require('express')
const app = express()

// get the port from the env variable
const PORT = process.env.PORT || 5000

// Serve static files from the "dist" directory
app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

app.get('/health', (req, res) => {
  res.send('ok -v2')
})