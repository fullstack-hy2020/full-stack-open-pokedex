import express from 'express'
const app = express()

const PORT = process.env.PORT || 5001

app.use(express.static('dist'))

app.get('/health', (req, res) => {
  res.send('all good')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})