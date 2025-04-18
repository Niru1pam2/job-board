import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ni0n7q4ejne15ytt.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
