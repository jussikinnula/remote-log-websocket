const logFunctions: any = {
  log: console.log,
  info: console.info,
  error: console.error,
  debug: console.debug,
  trace: console.trace
}

let reconnect: any = null

const STATUS_NOT_CONNECTED = 'STATUS_NOT_CONNECTED'
const STATUS_CONNECTING = 'STATUS_CONNECTING'
const STATUS_CONNECTED = 'STATUS_CONNECTED'
let status = STATUS_NOT_CONNECTED

export function connect(url: string = 'ws://localhost:12345') {
  if (status === STATUS_CONNECTING) return
  status = STATUS_CONNECTING
  logFunctions.info(`LOCAL: Trying to connect to remote log server ${url.toString()}`)
  const connection = new WebSocket(url)
  connection.onopen = onOpen
  connection.onclose = onClose
}

function onOpen(event: Event) {
  status = STATUS_CONNECTED
  logFunctions.info('LOCAL: Connection to remote log server opened')
  if (reconnect) clearInterval(reconnect)
  registerHandlers(this)
}

function onClose(error: any) {
  status = STATUS_NOT_CONNECTED
  logFunctions.info('LOCAL: Connection to remote log server closed')
  unregisterHandlers()
  reconnect = setInterval(() => connect(), 2500)
}

function logger(connection: WebSocket, callback: Function, type: string, payload: any) {
  callback(...payload)
  connection.send(JSON.stringify({ type, payload }))
}

function registerHandlers(connection: WebSocket) {
  console.log = (...args: any[]) => logger(connection, logFunctions.log, 'log', args)
  console.info = (...args: any[]) => logger(connection, logFunctions.info, 'info', args)
  console.error = (...args: any[]) => logger(connection, logFunctions.error, 'error', args)
  console.debug = (...args: any[]) => logger(connection, logFunctions.debug, 'debug', args)
  console.trace = (...args: any[]) => logger(connection, logFunctions.trace, 'trace', args)
}

function unregisterHandlers() {
  console.log = logFunctions.log
  console.info = logFunctions.info
  console.error = logFunctions.error
  console.debug = logFunctions.debug
  console.trace = logFunctions.trace
}
