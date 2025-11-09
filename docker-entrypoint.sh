#!/bin/sh
set -e

echo "Starting Nitro server..."
echo "PORT: ${PORT:-3004}"
echo "HOST: ${HOST:-0.0.0.0}"
echo "NODE_ENV: ${NODE_ENV:-production}"

# Vérifier que le fichier existe
if [ ! -f ".output/server/index.mjs" ]; then
  echo "ERROR: .output/server/index.mjs not found!"
  ls -la .output/server/ || echo "Directory .output/server/ does not exist"
  exit 1
fi

echo "File .output/server/index.mjs exists, checking contents..."
ls -lh .output/server/index.mjs
head -20 .output/server/index.mjs || echo "Could not read file"

echo "Checking .output/server directory structure..."
ls -la .output/server/ || echo "Cannot list .output/server/"

echo "Checking if chunks directory exists..."
ls -la .output/server/chunks/ 2>/dev/null || echo "chunks directory not found or empty"

echo "Checking node_modules..."
ls -la node_modules/ 2>/dev/null | head -10 || echo "node_modules not found"

echo "Checking .output/public directory (static files)..."
ls -la .output/public/ 2>/dev/null | head -20 || echo ".output/public directory not found or empty"

echo "Checking .output/public/_nuxt directory..."
ls -la .output/public/_nuxt/ 2>/dev/null | head -10 || echo ".output/public/_nuxt directory not found or empty"

echo "Starting Node.js server with NODE_OPTIONS for better error reporting..."
export NODE_OPTIONS="--trace-warnings --unhandled-rejections=strict"

# Vérifier que le fichier de démarrage existe
if [ ! -f "server-start.mjs" ]; then
  echo "ERROR: server-start.mjs not found!"
  exit 1
fi

echo "Starting HTTP server with Nitro listener..."
# Démarrer le serveur HTTP avec le listener Nitro
node server-start.mjs 2>&1 || {
  EXIT_CODE=$?
  echo "Server exited with code: $EXIT_CODE"
  exit $EXIT_CODE
}

