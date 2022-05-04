/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TOM_TOM_API_KEY: process.env.TOM_TOM_API_KEY
  },
  images: {
    domains: [
      "th.bing.com",
    ],
  },
}

module.exports = nextConfig
