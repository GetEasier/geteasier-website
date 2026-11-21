import type { MetadataRoute } from 'next'
import { LOCALES, ROUTE_LIST, type Locale } from '@/lib/seo.config'
import { absoluteUrl } from '@/lib/site'
import lastmod from '@/lib/lastmod.json'

const DATES = lastmod as Record<string, string>
const HREFLANG: Record<Locale, string> = { pt: 'pt-PT', en: 'en', nl: 'nl', es: 'es', fr: 'fr' }

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  for (const r of ROUTE_LIST) {
    if (!r.indexable) continue
    const dates = r.sources.map((s) => DATES[s]).filter(Boolean).sort()
    const lastModified = dates.length ? dates[dates.length - 1] : undefined
    const languages: Record<string, string> = {}
    for (const l of LOCALES) {
      const entry = r[l]
      if (entry) languages[HREFLANG[l]] = absoluteUrl(entry.path)
    }
    if (r.en) languages['x-default'] = absoluteUrl(r.pt.path)
    const alternates = Object.keys(languages).length > 1 ? { languages } : undefined

    for (const l of LOCALES) {
      const entry = r[l]
      if (entry) entries.push({ url: absoluteUrl(entry.path), lastModified, alternates })
    }
  }
  return entries
}
