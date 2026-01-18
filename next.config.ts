import type {
  NextConfig,
} from 'next'
// import path from "path";

const nextConfig: NextConfig = {
  // Оставляем пустой turbopack конфиг, чтобы Turbopack не ругался
  turbopack: {},
  output: 'standalone',
  // Здесь можно добавлять другие настройки Next.js, например:
  reactStrictMode: true,
  compiler: {
    styledComponents: false, // если используешь Emotion/MUI, можно оставить false
  },
}

export default nextConfig
