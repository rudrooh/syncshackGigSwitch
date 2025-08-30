/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
