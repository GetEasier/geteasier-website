import { ViewTransition, type ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import Motion from '@/components/motion/Motion'
import { common } from '@/content/common'
import { products } from '@/content/products'
import { buildJsonLd } from '@/lib/jsonld'
import { PRODUCT_IDS, type ProductId } from '@/lib/seo.config'
import type { Locale, PageId } from '@/lib/seo.config'

function jsonLdFor(pageId: PageId, locale: Locale) {
  const isProduct = (PRODUCT_IDS as readonly string[]).includes(pageId)
  const extra = isProduct
    ? {
        name: products[locale].items[pageId as ProductId].name,
        description: products[locale].items[pageId as ProductId].summary,
        // Só o TimeEasier tem apps publicadas nas lojas (ver site.ts).
        operatingSystem: pageId === 'timeEasier' ? 'iOS, Android' : undefined,
      }
    : undefined
  return JSON.stringify(buildJsonLd(pageId, locale, extra)).replace(/</g, '\\u003c')
}

export default function SiteShell({ pageId, locale, children }: { pageId: PageId | null; locale: Locale; children: ReactNode }) {
  return (
    <>
      {pageId && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFor(pageId, locale) }} />}
      <a href="#conteudo" className="skip-link">
        {common[locale].skipLink}
      </a>
      <Header pageId={pageId} locale={locale} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <ViewTransition>{children}</ViewTransition>
      </main>
      {/* O início e os contactos já acabam num cartão de contacto; nas outras páginas é o rodapé que convida a falar.
          A newsletter do início está logo a seguir ao hero, por isso não se repete no rodapé. */}
      <Footer locale={locale} cta={pageId !== 'home' && pageId !== 'contact'} newsletter={pageId !== 'home'} />
      <Motion />
    </>
  )
}
