import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "s4.anilist.co",
      "www.youtube.com"
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',  // Todos los endpoints que empiecen con /api/v1
        destination: 'http://backend:8000/api/v1/:path*', // Redirige a localhost
      },
    ]
  },
};

export default nextConfig;
