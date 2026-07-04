import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage public buckets (logos, screenshots, avatars, articles)
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Clearbit logo API — used for software logos seeded via SQL migrations
      { protocol: "https", hostname: "logo.clearbit.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
