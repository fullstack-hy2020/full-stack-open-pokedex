const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5001

app.use(express.static('dist'))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`node env ${process.env.NODE_ENV}`)
  console.log(`server started on port ${PORT}`)
})
