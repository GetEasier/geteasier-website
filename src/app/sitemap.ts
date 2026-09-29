import type { MetadataRoute } from 'next'
import { ROUTE_LIST } from '@/lib/seo.config'
import { absoluteUrl } from '@/lib/site'
import lastmod from '@/lib/lastmod.json'

// Só páginas indexáveis, nas duas línguas, com as alternativas hreflang.
// lastmod: data do último commit dos ficheiros de cada página (scripts/lastmod.mjs).
// Sem priority nem changefreq, que os motores de busca ignoram.

const DATES = lastmod as Record<string, string>

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  for (const r of ROUTE_LIST) {
    if (!r.indexable) continue
    const dates = r.sources.map((s) => DATES[s]).filter(Boolean).sort()
    const lastModified = dates.length ? dates[dates.length - 1] : undefined
    const languages: Record<string, string> = { 'pt-PT': absoluteUrl(r.pt.path) }
    if (r.en) languages.en = absoluteUrl(r.en.path)
    if (r.en) languages['x-default'] = absoluteUrl(r.pt.path)
    const alternates = r.en ? { languages } : undefined

    entries.push({ url: absoluteUrl(r.pt.path), lastModified, alternates })
    if (r.en) entries.push({ url: absoluteUrl(r.en.path), lastModified, alternates })
  }
  return entries
}
