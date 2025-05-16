// eslint-disable-next-line no-undef
const express = require('express')
const app = express()

// get the port from env variable
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('15') // change this string to ensure a new version deployed
})

// Render is set up to check this endpoint for periodic health checks.
app.get('/health', (req, res) => {
  res.send('ok')
})

// Simulate a broken deployment
/* app.get('/health', (req, res) => {
  // eslint-disable-next-line no-constant-condition
  if (true) throw('error...  ')
  res.send('ok')
})
 */

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})
