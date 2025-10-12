import express from 'express'
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 3001

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('3') // Change this string to ensure a new version deployed
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})
