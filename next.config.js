/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'firebase/firestore': path.resolve(
        __dirname,
        'node_modules/firebase/firestore/dist/esm/index.esm.js'
      ),
      '@firebase/firestore': path.resolve(
        __dirname,
        'node_modules/@firebase/firestore/dist/index.esm.js'
      ),
      '@firebase/firestore/dist/index.node.mjs': path.resolve(
        __dirname,
        'node_modules/@firebase/firestore/dist/index.esm.js'
      ),
    };
    return config;
  },
};

module.exports = nextConfig;
