import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { archivo, plexMono } from '@/lib/fonts'
import SiteShell from '@/components/site/SiteShell'
import { common } from '@/content/common'
import { MAIN_NAV, href, route } from '@/lib/seo.config'

// Página 404 de todo o site (há dois layouts raiz, um por língua). Devolve HTTP 404.
export const metadata: Metadata = {
  title: 'Página não encontrada | GetEasier',
  description: 'A página que procura não existe no site da GetEasier.',
  robots: { index: false, follow: true },
  icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.svg', type: 'image/svg+xml' }], apple: '/apple-icon.png' },
}

export default function GlobalNotFound() {
  const pt = common.pt.notFound
  const en = common.en.notFound
  return (
    <html lang="pt-PT" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <SiteShell pageId={null} locale="pt">
          <section className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <p className="t-data text-grafite">404</p>
              <h1 className="t-h1 mt-3">{pt.title}</h1>
              <p className="mt-6 max-w-prose text-lead text-grafite">{pt.text}</p>
              <ul className="mt-6 border-t border-linha">
                {(['home', ...MAIN_NAV] as const).map((id) => (
                  <li key={id} className="border-b border-linha">
                    <Link href={href(id, 'pt')} className="flex min-h-[52px] items-center font-medium hover:text-azul hover:underline">
                      {id === 'home' ? 'Página inicial' : route(id, 'pt').breadcrumb}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                {pt.contact}{' '}
                <Link href={href('contact', 'pt')} className="link">
                  {route('contact', 'pt').breadcrumb}
                </Link>
              </p>
            </div>
            <div lang="en" className="lg:border-l lg:border-linha lg:pl-12">
              <h2 className="t-h3">{en.title}</h2>
              <p className="mt-4 max-w-prose text-grafite">{en.text}</p>
              <ul className="mt-4 space-y-2">
                {(['home', 'customSoftware', 'products', 'contact'] as const).map((id) => (
                  <li key={id}>
                    <Link href={href(id, 'en')} hrefLang="en" className="link">
                      {id === 'home' ? 'Home page' : route(id, 'en').breadcrumb}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </SiteShell>
      </body>
    </html>
  )
}
