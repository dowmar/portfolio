const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  scope: "/",
  sw: "service-worker.js",
  register: true,
});

module.exports = withPWA({
  webpack: (config) => {
    return config;
  },
  reactStrictMode: true,
  env: {
    dir: "/",
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel.app",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.shields.io",
        pathname: "/badge/**",
      },
      {
        protocol: "https",
        hostname: "*.shields.io",
        pathname: "/github/**",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.medium.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.dev.to",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
});
