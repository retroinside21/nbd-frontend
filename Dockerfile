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

ENV NODE_ENV=production

ENV PORT=7000

# Копируем только нужное из builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Порт Next.js по умолчанию 7000 (можно изменить в .env или next.config.js)
EXPOSE 7000

# Запускаем standalone-режим Next.js (самый эффективный для Docker)
CMD ["node", "server.js", "--port", "7000"]