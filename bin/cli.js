#!/usr/bin/env node
require('../lib/server')(
  process.env.REMOTE_LOG_HOST || 'localhost',
  process.env.REMOTE_LOG_PORT ? parseInt(process.env.REMOTE_LOG_PORT, 10) : 12345
);