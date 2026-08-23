import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  serverExternalPackages: ["jsdom"],
  outputFileTracingIncludes: {
    "/article/[id]": ["./node_modules/jsdom/**"],
  },
};

export default nextConfig;
