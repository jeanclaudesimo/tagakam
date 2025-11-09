# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Installer toutes les dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Build Nuxt/Nitro pour production
RUN npm run build

# -----------------------------
# Stage 2: Production
# -----------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Installer uniquement les dépendances de production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copier le build depuis le builder
COPY --from=builder /app/.output /app/.output

# Copier le script de démarrage du serveur
COPY server-start.mjs /app/server-start.mjs

# Copier le script d'entrée
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Set NODE_ENV, PORT and HOST
ENV NODE_ENV=production
ENV PORT=3004
ENV HOST=0.0.0.0
ENV NITRO_PORT=3004
ENV NITRO_HOST=0.0.0.0

# Expose le port interne du conteneur
EXPOSE 3004

# Démarrage du serveur via le script d'entrée
ENTRYPOINT ["/app/docker-entrypoint.sh"]
