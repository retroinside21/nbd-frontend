import type {
  NextConfig,
} from 'next'
// import path from "path";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Это заставляет Next.js игнорировать Host и принимать запросы
  experimental: {
    serverComponentsExternalPackages: ['next'],
  },
  // Или явно указать, что hostname не проверяется
  basePath: '',
  assetPrefix: '',
}

export default nextConfig
