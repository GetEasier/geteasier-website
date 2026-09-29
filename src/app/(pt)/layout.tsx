import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { archivo, plexMono } from '@/lib/fonts'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.webmanifest',
  icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.svg', type: 'image/svg+xml' }], apple: '/apple-icon.png' },
}
export const viewport: Viewport = { themeColor: '#F4F6F9' }

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        {/* Esconde a planta do início até a animação arrancar (no máximo 3 s); nunca com "reduzir movimento". */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},3000)}}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
