FROM node:20-bookworm-slim AS deps
WORKDIR /app/apps/api
COPY apps/api/package*.json ./
RUN npm install --omit=dev
FROM node:20-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY apps/api/package*.json ./apps/api/
COPY apps/api ./apps/api
COPY apps/web ./apps/web
EXPOSE 4000
CMD ["node","apps/api/src/server.js"]
