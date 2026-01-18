# Этап 1: Сборка приложения
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
RUN npm ci

# Копируем весь код
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Этап 2: Продакшн-образ (очень маленький)
FROM node:20-alpine AS runner

WORKDIR /app

ENV PORT=7000

EXPOSE 7000

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js", "--port", "7000", "--hostname", "0.0.0.0"]