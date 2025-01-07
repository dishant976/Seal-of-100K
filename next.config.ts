import { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Configure the static image loader for Next.js
  images: {
    unoptimized: true, // Disable image optimization for debugging
    domains: ['localhost'], // Add other external image domains if needed
  },

  // Fix the assetPrefix to use a leading slash
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',

  // Enable Webpack configurations for better debugging and customizations
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    // Allow serving scripts directly from /lib
    if (!isServer) {
      if (config.module?.rules) {
        config.module.rules.push({
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        });
      }
    }
    return config;
  },
};

export default nextConfig;
