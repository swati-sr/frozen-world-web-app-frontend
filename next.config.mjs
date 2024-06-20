/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image configuration
  images: {
    domains: ["storage.googleapis.com"],
  },

  webpack: (config, { webpack }) => {
    return config;
  },
};

export default nextConfig;
