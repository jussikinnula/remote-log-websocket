import { server as WebSocketServer } from 'websocket'
import * as express from 'express'

export default (host: string, port: string) => {
  const app = express()
  const server = app.listen(parseInt(port, 10), host, () => {
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
