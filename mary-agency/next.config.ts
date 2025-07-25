import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
  
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  experimental: {
    optimizePackageImports: ['gsap'],
  },
  
  // Enable hot reload in Docker development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Enable polling for file watching in Docker
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
  
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
