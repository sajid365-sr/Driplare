/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "framer-motion/dist/es/index": new URL(
        "framer-motion/dist/es/index",
        import.meta.url
      ).pathname,
    };
    return config;
  },
};

export default nextConfig;
