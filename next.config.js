/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lltxovwrdbrpueqwezkw.supabase.co',
      },
    ],
  },
  // trailingSlash: false already handles slash redirects — no custom redirects needed
}

module.exports = nextConfig
