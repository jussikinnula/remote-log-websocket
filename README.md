# remote-log-websocket

## Usage

### Installation

```bash
$ npm install --save remote-log-websocket
```

### Client

On your application, just use the client with JavaScript (ES5):

```js
require('remote-log-websocket')('ws://localhost:12345')
```

...or with Babel/TypeScript:

```ts
import { startClient } from 'remote-log-websocket'
startClient('ws://localhost:12345')
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
require('remote-log-websocket/server')('0.0.0.0', 12345)
```

...or with Babel/TypeScript/ts-node:
```ts
import { startServer } from 'remote-log-websocket'
startServer('0.0.0.0', 12345)
```