import { createServer } from 'node:http'
import { listener } from './.output/server/index.mjs'

const port = Number(process.env.PORT || 3004)
const host = process.env.HOST || process.env.HOSTNAME || '0.0.0.0'

const server = createServer(listener)

server.listen(port, host, () => {
  console.log(`🚀 Nitro server listening on http://${host}:${port}`)
})

server.on('error', (err) => {
  console.error('Server error:', err)
  process.exit(1)
})

