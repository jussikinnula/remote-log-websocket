# remote-log-websocket

## Usage

### Installation

```bash
$ npm install --save remote-log-websocket
```

### Client

On your application, just use the client with JavaScript (ES5):

```js
require('remote-log-websocket').default('ws://localhost:12345')
```

...or with Babel/TypeScript:

```ts
import remoteLogWebsocket from 'remote-log-websocket'
remoteLogWebsocket('ws://localhost:12345')
```

### Server

From command line:

```bash
remote-log --host 0.0.0.0 --port 12345
```

...or with environment variables:
```bash
REMOTE_LOG_HOST=0.0.0.0 REMOTE_LOG_PORT=12345 remote-log
```

...or from your own NodeJS wrapper:

```js
require('remote-log-websocket/server').default('0.0.0.0', 12345)
```

...or with Babel/TypeScript/ts-node:
```ts
import remoteLogWebsocketServer from 'remote-log-websocket/server'
remoteLogWebsocketServer('0.0.0.0', 12345)
```