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

# Set NODE_ENV and PORT
ENV NODE_ENV=production
ENV PORT=3004

# Expose le port interne du conteneur
EXPOSE 3004

# Démarrage du serveur
CMD ["node", ".output/server/index.mjs"]
