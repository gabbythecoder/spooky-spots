/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "**",
      },
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
