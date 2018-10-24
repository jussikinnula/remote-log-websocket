import { server as WebSocketServer } from 'websocket'
import * as express from 'express'

function startServer(host: string, port: number) {
  const app = express()
  const server = app.listen(port, host, () => {
    console.log(`Remote log server listening in http://${host}:${port}`)
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
}

module.exports = startServer
