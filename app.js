const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 3000

app.use(express.static('dist'))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})

app.get('/health', (req, res) => {
  res.send('ok')
})