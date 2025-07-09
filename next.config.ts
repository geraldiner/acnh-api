import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["localhost:3000", "localhost:8888"],
  images: {
    remotePatterns: [new URL("http://localhost:8888/**")],
  },
};

export default nextConfig;
