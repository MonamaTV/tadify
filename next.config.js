/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.scdn.co",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
        pathname: "*/**",
      },
    ],
  },
};

module.exports = nextConfig;
