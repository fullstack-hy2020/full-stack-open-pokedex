const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/version', (_req, res) => {
  res.send('jade')
})

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})
