import * as program from 'commander'
import server from './server'

const VERSION: string = require('../package.json').version
const HOST: string = process.env.REMOTE_LOG_HOST || 'localhost'
const PORT: string = process.env.REMOTE_LOG_PORT || '12345'

program.version(VERSION)

program
  .command('start')
  .description('Start server')
  .option('-H, --host [host]', 'Set host for HTTP/WebSocket server', HOST)
  .option('-P, --port [port]', 'Set port for HTTP/WebSocket server', PORT)
  .action((command: any) => {
    const { host, port } = command
    server(host, port)
  })

// Default to command start
const args: string[] = process.argv
args.splice(2, 0, 'start')

program.parse(args)
