import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Configure the static image loader for Next.js
  images: {
    unoptimized: true, // Disable image optimization for debugging
    domains: ['localhost'], // Add other external image domains if needed
  },

  // Fix the assetPrefix to use a leading slash
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
};

export default nextConfig;
