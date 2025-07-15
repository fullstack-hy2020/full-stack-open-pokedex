import express from 'express'
const app = express()
import process from 'process'

// get the port from env variable
const PORT = process.env.PORT || 5000

app.get('/version', (req, res) => {
  res.send('3')
})


app.get('/health', (req, res) => {
  res.send('ok')
})


app.use(express.static('dist'))



app.listen(PORT, () => {
})
