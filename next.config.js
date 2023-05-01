/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_NHOST_BACKEND: process.env.NEXT_PUBLIC_NHOST_BACKEND
  },
  webp: {
    preset: 'default',
    quality: 100
  },
  images: {
    domains: [
      'th.bing.com',
      'scontent.fceb1-2.fna.fbcdn.net',
      'avatars.githubusercontent.com',
      's.gravatar.com',
      'scontent.fceb1-1.fna.fbcdn.net',
      'scontent.fceb1-3.fna.fbcdn.net',
      'i.stack.imgur.com',
      'tse2.mm.bing.net'
    ]
  }
}
