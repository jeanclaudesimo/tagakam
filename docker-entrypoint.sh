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

# Démarrer le serveur
exec node .output/server/index.mjs

