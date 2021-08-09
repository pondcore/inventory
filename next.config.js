require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.BACKEND_URL,
  },
  images: {
    domains: ['picsum.photos'],
  },
}
