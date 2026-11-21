import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { sans, mono } from '@/lib/fonts'
import SiteShell from '@/components/site/SiteShell'
import { common } from '@/content/common'
import { LOCALES, MAIN_NAV, href, route, type Locale } from '@/lib/seo.config'

// Página 404 de todo o site (há um layout raiz por língua). Devolve HTTP 404.
// O texto principal é em português; ao lado, um resumo em cada uma das outras línguas.
const HTML_LANG: Record<Locale, string> = { pt: 'pt-PT', en: 'en', nl: 'nl-BE', es: 'es', fr: 'fr' }
const OTHER_LOCALES = LOCALES.filter((l) => l !== 'pt')
export const metadata: Metadata = {
  title: 'Página não encontrada | GetEasier',
  description: 'A página que procura não existe no site da GetEasier.',
  robots: { index: false, follow: true },
  icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }], apple: '/apple-icon.png' },
}

export default function GlobalNotFound() {
  const pt = common.pt.notFound
  return (
    <html lang="pt-PT" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SiteShell pageId={null} locale="pt">
          <section className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <p className="t-data text-grafite">404</p>
              <h1 className="t-h1 mt-3">{pt.title}</h1>
              <p className="mt-6 max-w-prose text-lead text-grafite">{pt.text}</p>
              <ul className="mt-6 border-t border-linha">
                {MAIN_NAV.map((id) => (
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
            <div className="space-y-10 lg:border-l lg:border-linha lg:pl-12">
              {OTHER_LOCALES.map((l) => (
                <div key={l} lang={HTML_LANG[l]}>
                  <h2 className="t-h3">{common[l].notFound.title}</h2>
                  <p className="mt-4 max-w-prose text-grafite">{common[l].notFound.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {(['home', 'customSoftware', 'products', 'contact'] as const).map((id) => (
                      <li key={id}>
                        <Link href={href(id, l)} hrefLang={HTML_LANG[l]} className="link">
                          {route(id, l).breadcrumb}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </SiteShell>
      </body>
    </html>
  )
}
