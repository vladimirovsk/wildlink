import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    qualities: [60, 70, 75, 85],
  },
};

export default nextConfig;
