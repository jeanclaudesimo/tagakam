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

echo "Starting Node.js server with NODE_OPTIONS for better error reporting..."
export NODE_OPTIONS="--trace-warnings --unhandled-rejections=strict"
# Démarrer le serveur avec plus de logging et capture de toutes les sorties
node .output/server/index.mjs 2>&1 || {
  EXIT_CODE=$?
  echo "Server exited with code: $EXIT_CODE"
  echo "Checking if chunks/nitro/nitro.mjs exists..."
  ls -la .output/server/chunks/nitro/nitro.mjs 2>/dev/null || echo "ERROR: chunks/nitro/nitro.mjs not found!"
  exit $EXIT_CODE
}

