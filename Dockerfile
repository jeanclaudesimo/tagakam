# Multi-stage build für Production
FROM node:20-alpine AS builder

WORKDIR /app

# Package files kopieren und Dependencies installieren
COPY package*.json ./
RUN npm ci --only=production=false

# Source code kopieren
COPY . .

# Nuxt App für Production builden
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /app

# Nur Production Dependencies installieren
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Built app vom Builder Stage kopieren
COPY --from=builder /app/.output /app/.output

# Port exponieren
EXPOSE 3003

# Environment Variable für Production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3003/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start command
CMD ["node", ".output/server/index.mjs"]
