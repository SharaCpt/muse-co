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
  async redirects() {
    return [
      // Redirect trailing slashes to non-trailing (prevents duplicate URLs)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
