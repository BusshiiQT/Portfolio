import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Allow external images (update this list if you use other hosts)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "your.cdn.com" },
    ],
  },

  // Quiet CI builds: skip ESLint during `next build`
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {},
};

export default nextConfig;
