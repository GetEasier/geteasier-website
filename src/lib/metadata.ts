import type { Metadata } from 'next'
import { ROUTES, type Locale, type PageId } from './seo.config'
import { SITE_URL, absoluteUrl } from './site'

const OG_LOCALE: Record<Locale, string> = { pt: 'pt_PT', en: 'en_GB' }

/** Metadados de uma página a partir de seo.config.ts. */
export function buildMetadata(id: PageId, locale: Locale): Metadata {
  const r = ROUTES[id]
  const loc = locale === 'en' && r.en ? r.en : r.pt
  const url = absoluteUrl(loc.path)

  const languages: Record<string, string> = { 'pt-PT': absoluteUrl(r.pt.path) }
  if (r.en) languages.en = absoluteUrl(r.en.path)
  if (r.en) languages['x-default'] = absoluteUrl(r.pt.path)

  const ogImage = `${SITE_URL}/og/${id}-${locale === 'en' && r.en ? 'en' : 'pt'}.png`

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: loc.title },
    description: loc.description,
    alternates: { canonical: url, languages: r.en ? languages : undefined },
    robots: r.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: 'GetEasier',
      title: loc.title,
      description: loc.description,
      locale: OG_LOCALE[locale],
      alternateLocale: r.en ? [OG_LOCALE[locale === 'pt' ? 'en' : 'pt']] : undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: loc.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: loc.title,
      description: loc.description,
      images: [ogImage],
    },
  }
}
