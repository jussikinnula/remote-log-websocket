import * as program from 'commander'
import startServer from './startServer'

const VERSION = require('../package.json').version
const HOST = process.env.REMOTE_LOG_HOST || 'localhost'
const PORT = process.env.REMOTE_LOG_PORT ? parseInt(process.env.REMOTE_LOG_PORT, 10) : 12345

program.version(VERSION)

program
  .command('start')
  .description('Start server')
  .option('-H, --host [host]', 'Set host for HTTP/WebSocket server', HOST)
  .option('-P, --port [port]', 'Set port for HTTP/WebSocket server', PORT)
  .action((command: any) => {
    const { host, port } = command
    startServer(host, port)
  })

// Default to command start
const args: string[] = process.argv
args.splice(2, 0, 'start')

program.parse(args)
