/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TOM_TOM_API_KEY: process.env.TOM_TOM_API_KEY,
    NEXT_PUBLIC_NHOST_BACKEND: process.env.NEXT_PUBLIC_NHOST_BACKEND
  },
  images: {
    domains: [
      "th.bing.com",
    ],
  },
}

module.exports = nextConfig
