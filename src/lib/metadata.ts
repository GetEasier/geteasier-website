import type { Metadata } from 'next'
import { LOCALES, ROUTES, type Locale, type PageId } from './seo.config'
import { SITE_URL, absoluteUrl } from './site'

const OG_LOCALE: Record<Locale, string> = {
  pt: 'pt_PT',
  en: 'en_GB',
  nl: 'nl_BE',
  es: 'es_ES',
  fr: 'fr_BE',
}

const HREFLANG: Record<Locale, string> = {
  pt: 'pt-PT',
  en: 'en',
  nl: 'nl',
  es: 'es',
  fr: 'fr',
}

/** Metadados de uma página a partir de seo.config.ts. */
export function buildMetadata(id: PageId, locale: Locale): Metadata {
  const r = ROUTES[id]
  const loc = (locale !== 'pt' && r[locale]) || r.pt
  const url = absoluteUrl(loc.path)

  const languages: Record<string, string> = {}
  const alternates: string[] = []
  for (const l of LOCALES) {
    const entry = r[l]
    if (entry) {
      languages[HREFLANG[l]] = absoluteUrl(entry.path)
      if (l !== locale) alternates.push(OG_LOCALE[l])
    }
  }
  if (r.en) languages['x-default'] = absoluteUrl(r.pt.path)

  // Uma imagem por língua (scripts/og-images.mjs); páginas só em português usam a portuguesa.
  const ogImage = `${SITE_URL}/og/${id}-${r[locale] ? locale : 'pt'}.png`

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: loc.title },
    description: loc.description,
    alternates: { canonical: url, languages: Object.keys(languages).length > 1 ? languages : undefined },
    robots: r.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: 'GetEasier',
      title: loc.title,
      description: loc.description,
      locale: OG_LOCALE[locale],
      alternateLocale: alternates.length ? alternates : undefined,
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
