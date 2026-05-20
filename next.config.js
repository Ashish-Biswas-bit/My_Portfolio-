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

      // Force @firebase/firestore to use the browser ESM build for client bundles
      // The package.json exports field resolves to the Node.js build by default,
      // which pulls in @grpc/proto-loader → protobufjs → Node.js native modules (fs, path)
      // that are unavailable in the browser.
      config.resolve.alias = {
        ...config.resolve.alias,
        '@firebase/firestore': path.resolve('./node_modules/@firebase/firestore/dist/index.esm.js'),
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
