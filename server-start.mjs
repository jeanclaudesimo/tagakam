import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handler } from './.output/server/index.mjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const publicDir = resolve(__dirname, '.output/public')

const port = Number(process.env.PORT || 3004)
const host = process.env.HOST || process.env.HOSTNAME || '0.0.0.0'

// Middleware pour servir les fichiers statiques
function serveStatic(req, res, next) {
  const url = new URL(req.url, `http://${req.headers.host}`)
  let filePath = url.pathname
  
  // Enlever le leading slash
  if (filePath.startsWith('/')) {
    filePath = filePath.slice(1)
  }
  
  // Si c'est la racine, servir index.html
  if (!filePath || filePath === '') {
    filePath = 'index.html'
  }
  
  const fullPath = join(publicDir, filePath)
  
  // Vérifier si le fichier existe dans public
  if (existsSync(fullPath) && statSync(fullPath).isFile()) {
    try {
      const content = readFileSync(fullPath)
      const ext = filePath.split('.').pop()?.toLowerCase()
      const mimeTypes = {
        'js': 'application/javascript',
        'json': 'application/json',
        'css': 'text/css',
        'html': 'text/html',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon',
        'webp': 'image/webp',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'ttf': 'font/ttf',
        'eot': 'application/vnd.ms-fontobject'
      }
      
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
      res.setHeader('Content-Length', content.length)
      res.statusCode = 200
      res.end(content)
      return
    } catch (err) {
      console.error('Error serving static file:', err)
    }
  }
  
  // Si le fichier n'existe pas, passer au handler Nitro
  next()
}

// Wrapper pour combiner le middleware statique et le handler Nitro
function combinedHandler(req, res) {
  serveStatic(req, res, () => {
    handler(req, res)
  })
}

const server = createServer(combinedHandler)

server.listen(port, host, () => {
  console.log(`🚀 Nitro server listening on http://${host}:${port}`)
})

server.on('error', (err) => {
  console.error('Server error:', err)
  process.exit(1)
})

