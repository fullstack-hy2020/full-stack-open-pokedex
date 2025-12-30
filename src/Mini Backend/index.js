import express from 'express'
import path from 'path'

const app = express()

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})