import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Evaluated at build time — on Vercel these change every deployment.
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_COMMIT_SHA: (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7),
    NEXT_PUBLIC_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.kameshwariselections.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
