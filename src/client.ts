const logFn = {
  log: console.log,
  info: console.info,
  error: console.error,
  debug: console.debug,
  trace: console.trace
}

let connectionTimer: any = null

function connect(url: string = 'http://localhost:12345') {
  const connection = new WebSocket(url)
  connection.onopen = onOpen
  connection.onclose = onClose
}

function onOpen(event: Event) {
  console.log('this is', this)
  log('LOCAL: Connection to remote log server opened')
  if (connectionTimer) clearInterval(connectionTimer)
  registerHandlers(this)
}

function onClose(error: any) {
  log('LOCAL: Connection to remote log server closed')
  unregisterHandlers()
  connectionTimer = setInterval(() => connect(), 2500)
}

function logger(connection: WebSocket, callback: Function, type: string, payload: any) {
  callback(...payload)
  connection.send(JSON.stringify({ type, payload }))
}

function registerHandlers(connection: WebSocket) {
  console.log = (...args: any[]) => logger(connection, log, 'log', args)
  console.info = (...args: any[]) => logger(connection, info, 'info', args)
  console.error = (...args: any[]) => logger(connection, error, 'error', args)
  console.debug = (...args: any[]) => logger(connection, debug, 'debug', args)
  console.trace = (...args: any[]) => logger(connection, trace, 'trace', args)
}

function unregisterHandlers() {
  console.log = log
  console.info = info
  console.error = error
  console.debug = debug
  console.trace = trace
}

export default connect
