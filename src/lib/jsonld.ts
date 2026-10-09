import { ROUTES, breadcrumbTrail, route, type Locale, type PageId } from './seo.config'
import { COMPANY, SITE_URL, absoluteUrl } from './site'

// Dados estruturados (schema.org) a partir de seo.config.ts e site.ts.
// Só factos já publicados no site: sem avaliações, preços ou números inventados.

const ORG_ID = `${SITE_URL}/#organizacao`
const SITE_ID = `${SITE_URL}/#website`
const LANG: Record<Locale, string> = { pt: 'pt-PT', en: 'en' }

type Node = Record<string, unknown>

function organization(): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: absoluteUrl('/icon-512.png'),
    description: COMPANY.description,
    knowsAbout: COMPANY.knowsAbout,
    areaServed: 'PT',
    vatID: `PT${COMPANY.vatId}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.postalCode,
      addressLocality: COMPANY.address.locality,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.whatsapp.e164,
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'English'],
    },
    sameAs: COMPANY.socials.map((s) => s.href),
  }
}

function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: COMPANY.name,
    inLanguage: ['pt-PT', 'en'],
    publisher: { '@id': ORG_ID },
  }
}

function breadcrumbs(id: PageId, locale: Locale): Node | null {
  const trail = breadcrumbTrail(id, locale)
  if (trail.length < 2) return null
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(route(id, locale).path)}#breadcrumbs`,
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Perguntas frequentes em FAQPage. Deixa de fora respostas por confirmar ([CONFIRMAR]). */
export function faqJsonLd(items: { q: string; a: string }[]) {
  const ready = items.filter((f) => !f.q.includes('[CONFIRMAR]') && !f.a.includes('[CONFIRMAR]'))
  if (!ready.length) return null
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ready.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }).replace(/</g, '\\u003c')
}

type Extra = {
  name?: string
  description?: string
  operatingSystem?: string
  featureList?: string[]
  downloadUrl?: string[]
}

export function buildJsonLd(id: PageId, locale: Locale, extra?: Extra) {
  const r = ROUTES[id]
  const loc = route(id, locale)
  const lang = r.en ? LANG[locale] : 'pt-PT'
  const url = absoluteUrl(loc.path)
  const crumbs = breadcrumbs(id, locale)

  const page: Node = {
    '@type': 'WebPage',
    '@id': `${url}#pagina`,
    url,
    name: loc.title,
    description: loc.description,
    inLanguage: lang,
    isPartOf: { '@id': SITE_ID },
    ...(crumbs ? { breadcrumb: { '@id': crumbs['@id'] } } : {}),
  }

  const graph: Node[] = [page]
  if (crumbs) graph.push(crumbs)

  if (r.jsonLd === 'home') {
    graph.push(organization(), website())
    page.about = { '@id': ORG_ID }
  }

  if (r.jsonLd === 'service') {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#servico`,
      name: extra?.name ?? loc.breadcrumb,
      description: extra?.description ?? loc.description,
      serviceType: locale === 'en' ? 'Custom software development' : 'Desenvolvimento de software à medida',
      provider: { '@id': ORG_ID },
      url,
    })
    page.mainEntity = { '@id': `${url}#servico` }
  }

  if (r.jsonLd === 'software') {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${url}#aplicacao`,
      name: extra?.name ?? loc.breadcrumb,
      description: extra?.description ?? loc.description,
      applicationCategory: 'BusinessApplication',
      inLanguage: lang,
      ...(extra?.operatingSystem ? { operatingSystem: extra.operatingSystem } : {}),
      ...(extra?.featureList?.length ? { featureList: extra.featureList } : {}),
      ...(extra?.downloadUrl?.length ? { downloadUrl: extra.downloadUrl, sameAs: extra.downloadUrl } : {}),
      publisher: { '@id': ORG_ID },
      url,
    })
    page.mainEntity = { '@id': `${url}#aplicacao` }
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
