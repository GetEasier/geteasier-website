import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { common } from '@/content/common'
import type { Locale, PageId } from '@/lib/seo.config'

export default function SiteShell({ pageId, locale, children }: { pageId: PageId | null; locale: Locale; children: ReactNode }) {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        {common[locale].skipLink}
      </a>
      <Header pageId={pageId} locale={locale} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  )
}
