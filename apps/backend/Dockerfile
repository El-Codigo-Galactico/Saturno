# Etapa de construcción
FROM node:18-alpine as builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY apps/backend ./apps/backend

# Instalar dependencias
RUN npm ci

# Construir la aplicación
RUN npx nx build backend --prod

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=builder /app/dist/apps/backend ./
COPY --from=builder /app/package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
