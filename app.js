const express = require('express')
const app = express()

app.get('/health', (req, res) => {
  res.send('Health is fine!')
})
// app.get('/health', (req, res) => {
//   // eslint-disable-next-line no-constant-condition
//   if (true) throw('error...  ')
//   res.send('ok')
// })

// get the port from env variable
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
