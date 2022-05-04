/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_NHOST_BACKEND: process.env.NEXT_PUBLIC_NHOST_BACKEND
  },
  images: {
    domains: [
      'th.bing.com',
    ]
  }
}
