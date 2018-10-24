# remote-log-websocket

## Usage

### Installation

```bash
$ npm install --save remote-log-websocket
```

### Client

On your application, just use the client:

```js
require('remote-log-websocket')('ws://localhost:12345')
```

### Server

From command line:

```bash
REMOTE_LOG_HOST=0.0.0.0 REMOTE_LOG_PORT=12345 remote-log
```

...or from your own NodeJS wrapper:

```js
require('remote-log-websocket/server')()
```
