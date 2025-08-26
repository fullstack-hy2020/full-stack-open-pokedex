const express = require('express')
const app = express()

app.get('/health', (req, res) => {
  res.send('ok')
})

// get the port from env variable
const PORT = process.env.PORT || 3100

app.use(express.static('dist'))

app.listen(PORT, () => {
  // eslint-disable-next-line no-constant-condition
  if (true) throw('error...  ')
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})
