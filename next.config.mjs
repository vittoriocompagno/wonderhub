/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      }
    ],
  },
  output: 'standalone',
  experimental: {
    disableOptimizedLoading: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
