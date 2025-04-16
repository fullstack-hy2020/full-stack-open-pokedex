import express from 'express'
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('21')
})

app.get('/health', (req, res) => {
  res.status(200).send('OK')
})


app.get('/pokemon', (req, res) => {
  res.status(200).send('is so super awsome!!')
})
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`) // eslint-disable-line
})
