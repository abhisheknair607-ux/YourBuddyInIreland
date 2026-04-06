/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_DEPLOYMENT_ID: process.env.NEXT_DEPLOYMENT_ID ?? ""
  }
};

export default nextConfig;
