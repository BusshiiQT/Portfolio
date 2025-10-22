import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Add all the domains you actually use:
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.imgur.com" },
      // Example for GitHub raw:
      // { protocol: "https", hostname: "raw.githubusercontent.com" },
      // Example for your own CDN/domain:
      // { protocol: "https", hostname: "cdn.yourdomain.com" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  experimental: {},
};

export default nextConfig;
