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

echo "Starting Node.js server..."
# Démarrer le serveur avec plus de logging
node .output/server/index.mjs 2>&1 || {
  echo "Server exited with code: $?"
  exit 1
}

