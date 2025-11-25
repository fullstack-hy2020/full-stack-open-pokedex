const express = require('express')
const app = express()
require('dotenv').config()

// get the port from env variable/ Changed the default to 5001 since 5000 is reserved for apple sharing in IOS

const PORT = process.env.PORT || 5001

app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

app.get('/version', (req, res) => {
  res.send('0.0.13') // change this string to ensure a new version deployed
})

app.get('/health', (req, res) => {
  res.send('ok')
})
