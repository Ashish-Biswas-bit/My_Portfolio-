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
  webpack(config, { isServer }) {
    // Handle Node.js modules that shouldn't be bundled for the browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        util: false,
        stream: false,
        buffer: false,
        net: false,
        tls: false,
      };

      // Prevent Firebase Firestore from being imported in client-side code
      config.resolve.alias = {
        ...config.resolve.alias,
        '@firebase/firestore': false,
        'firebase/firestore': false,
      };
    }

    // Ignore problematic node modules
    config.ignoreWarnings = [
      ...config.ignoreWarnings || [],
      {
        module: /protobufjs/,
      },
      {
        module: /@firebase\/firestore/,
      },
    ];

    return config;
  },
};

module.exports = nextConfig;
