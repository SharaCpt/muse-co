/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true, // Let middleware handle trailing slashes with absolute URLs + proper Location header
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
