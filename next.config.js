/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
  env: {
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
  }
}

module.exports = nextConfig