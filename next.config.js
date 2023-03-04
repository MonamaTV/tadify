/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.scdn.co",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
        port: "",
        pathname: "*/**",
      },
    ],
  },
};

module.exports = nextConfig;
