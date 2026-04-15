import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    qualities: [60, 70, 75, 85],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
