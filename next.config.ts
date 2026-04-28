import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  allowedDevOrigins: [
    "https://*.sanity.studio",
    "https://*.sanity.dev",
    "https://*.sanity.io",
  ],
};

export default nextConfig;
