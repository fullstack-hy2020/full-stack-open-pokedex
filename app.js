const express = require('express') // eslint-disable-line
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5000 // eslint-disable-line

app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`) // eslint-disable-line
})

app.get('/health', (req, res) => {
  console.log('juu') // eslint-disable-line
  res.send('ok')
})
