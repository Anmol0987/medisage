# 1. BUILD STAGE
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build



# 1.  STAGEPRODUCTION STAGE

FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/server.js"]