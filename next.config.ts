import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // Admins paste arbitrary image URLs when adding/editing products in
      // /admin/products, so any https host has to be allowed here — Next's
      // image optimizer will fetch whatever host is in that URL server-side.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
