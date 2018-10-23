import { server as WebSocketServer } from 'websocket'
import * as express from 'express'

const PORT = process.env.REMOTE_LOG_PORT ? parseInt(process.env.REMOTE_LOG_PORT, 10) : 12345
const HOST = process.env.REMOTE_LOG_HOST || 'localhost'
const app = express()
const server = app.listen(PORT, HOST, () => {
  console.log(`Remote log server listening in http://${HOST}:${PORT}`)
})

// create the WebSocketServer
const websocketServer = new WebSocketServer({ httpServer: server })

// WebSocket server
websocketServer.on('request', (request) => {
  const connection = request.accept(null, request.origin)
  console.log('Client connected')

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log(message.utf8Data)
    }
  })

  connection.on('close', (connection) => {
    console.log('Client disconnected')
  })
})
