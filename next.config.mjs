/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
