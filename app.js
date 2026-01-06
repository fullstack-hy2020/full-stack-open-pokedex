import express from 'express'
const app = express()

// get the port from env variable
const port = process.env.PORT || 5000

app.use(express.static('dist'))

app.listen(port,'0.0.0.0', () => {
  console.log(`server started on port ${port}`)// eslint-disable-line no-console
})

app.get('/version', (req, res) => {
  res.send('yes bitches') // change this string to ensure a new version deployed
})