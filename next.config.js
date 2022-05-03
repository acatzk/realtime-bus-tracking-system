/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TOM_TOM_API_KEY: process.env.TOM_TOM_API_KEY
  }
}

module.exports = nextConfig
