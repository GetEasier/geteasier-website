import { products } from '@/content/products'
import { COMPANY, absoluteUrl } from '@/lib/site'
import { PRODUCT_IDS, ROUTES, href, type Locale, type PageId } from '@/lib/seo.config'

// /llms.txt (llmstxt.org): resumo em texto simples para assistentes de IA, gerado a partir do
// mesmo conteúdo do site (seo.config.ts, products.ts e site.ts), para não ficar desatualizado.

export const dynamic = 'force-static'

const PAGES: PageId[] = ['customSoftware', 'products', 'plans', 'about', 'contact']

function link(id: PageId, locale: Locale) {
  const r = locale === 'en' && ROUTES[id].en ? ROUTES[id].en! : ROUTES[id].pt
  return `- [${r.breadcrumb}](${absoluteUrl(href(id, locale))}): ${r.description}`
}

function productLines(locale: Locale) {
  return PRODUCT_IDS.map((id) => {
    const p = products[locale].items[id]
    return `- [${p.name}](${absoluteUrl(href(id, locale))}): ${p.short}. ${p.summary}`
  })
}

export function GET() {
  const body = [
    `# ${COMPANY.name}`,
    '',
    `> ${COMPANY.description}`,
    '',
    `${COMPANY.name} (${COMPANY.legalName}) é uma equipa de desenvolvimento de software no norte de Portugal, perto do Porto. O site está em português (${absoluteUrl('/')}) e em inglês (${absoluteUrl('/en')}). Os preços dos produtos são dados numa proposta para cada empresa.`,
    '',
    '## Produtos',
    '',
    ...productLines('pt'),
    '',
    '## Páginas principais',
    '',
    ...PAGES.map((id) => link(id, 'pt')),
    '',
    '## English',
    '',
    'GetEasier is a Portuguese software company. It builds custom software for companies and four products of its own:',
    '',
    ...productLines('en'),
    '',
    ...PAGES.map((id) => link(id, 'en')),
    '',
    '## Contactos',
    '',
    `- WhatsApp: ${COMPANY.whatsapp.display}`,
    `- Formulário de contacto: ${absoluteUrl(href('contact', 'pt'))}`,
    ...COMPANY.socials.map((s) => `- ${s.name}: ${s.href}`),
    `- Newsletter: ${COMPANY.newsletter}`,
    `- TimeEasier na App Store: ${COMPANY.apps.ios}`,
    `- TimeEasier no Google Play: ${COMPANY.apps.android}`,
    '',
  ].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
