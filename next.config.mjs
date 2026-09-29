/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Dois layouts raiz (pt e en) precisam de uma 404 global.
    globalNotFound: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },
  async redirects() {
    return [
      // geteasier.pt é o domínio canónico; www redireciona com 301.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.geteasier.pt' }],
        destination: 'https://geteasier.pt/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
