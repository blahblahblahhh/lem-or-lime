import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

let clients = []

app.get('/api/video-events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  })

  const clientId = Date.now()
  const newClient = {
    id: clientId,
    response: res
  }
  clients.push(newClient)

  req.on('close', () => {
    clients = clients.filter(client => client.id !== clientId)
  })
})

app.post('/api/trigger-video', (req, res) => {
  const { video } = req.body
  
  if (video === 'lemon' || video === 'lime') {
    const message = JSON.stringify({
      type: 'play-video',
      video: video
    })
    
    clients.forEach(client => {
      client.response.write(`data: ${message}\n\n`)
    })
    
    res.json({ success: true })
  } else {
    res.status(400).json({ error: 'Invalid video type' })
  }
})

app.post('/api/reset-voting', (req, res) => {
  const message = JSON.stringify({
    type: 'reset-voting'
  })
  
  clients.forEach(client => {
    client.response.write(`data: ${message}\n\n`)
  })
  
  res.json({ success: true })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})