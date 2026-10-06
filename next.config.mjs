// Pré-visualizações da Vercel (tudo o que não é produção) ficam fora dos motores de busca.
const isPreview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Dois layouts raiz (pt e en) precisam de uma 404 global.
    globalNotFound: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    if (!isPreview) return []
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]
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
