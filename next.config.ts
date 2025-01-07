/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true, // Keep if not using Next image optimization
  },
  async headers() {
    return [
      {
        // Apply this CSP to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              connect-src 'self';
              img-src 'self' data:;
              style-src 'self' 'unsafe-inline';
              font-src 'self';
            `.replace(/\n/g, ""), 
          },
        ],
      },
    ];
  },
};

export default nextConfig;
