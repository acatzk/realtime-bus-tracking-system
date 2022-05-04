/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    TOM_TOM_API_KEY: process.env.TOM_TOM_API_KEY,
    NEXT_PUBLIC_NHOST_BACKEND: process.env.NEXT_PUBLIC_NHOST_BACKEND,
    NEXT_GOOGLE_MAP_API_KEY: process.env.NEXT_GOOGLE_MAP_API_KEY
  },
  images: {
    domains: [
      'th.bing.com',
    ]
  }
}
