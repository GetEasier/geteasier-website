// Fonte única de verdade para rotas, navegação, breadcrumbs, metadados e sitemap.
// Cada página tem uma entrada por língua. `en: null` quando a página só existe em português.

export type Locale = 'pt' | 'en'

export type PageId =
  | 'home'
  | 'customSoftware'
  | 'products'
  | 'timeEasier'
  | 'constructionEasier'
  | 'stockEasier'
  | 'woodEasier'
  | 'plans'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'

export type JsonLdType = 'home' | 'service' | 'software' | 'webpage'

type LocalizedRoute = {
  path: string
  title: string
  description: string
  breadcrumb: string
}

export type RouteConfig = {
  id: PageId
  parent: PageId | null
  jsonLd: JsonLdType
  indexable: boolean
  /** Ficheiros de conteúdo cuja data do último commit dá o `lastmod` do sitemap. */
  sources: string[]
  pt: LocalizedRoute
  en: LocalizedRoute | null
}

const PAGE = 'src/components/pages'
const CONTENT = 'src/content'

export const ROUTES: Record<PageId, RouteConfig> = {
  home: {
    id: 'home',
    parent: null,
    jsonLd: 'home',
    indexable: true,
    sources: [`${PAGE}/HomePage.tsx`, `${CONTENT}/home.ts`],
    pt: {
      path: '/',
      title: 'GetEasier | Software à medida e produtos para empresas',
      description:
        'Equipa portuguesa de desenvolvimento. Fazemos software à medida e produtos para registo de ponto, obras, stocks e madeira. Fale-nos do seu projeto.',
      breadcrumb: 'Início',
    },
    en: {
      path: '/en',
      title: 'GetEasier | Custom software and products for companies',
      description:
        'Portuguese software team. We build custom software and our own products for time tracking, construction sites, stock and timber. Tell us your project.',
      breadcrumb: 'Home',
    },
  },
  customSoftware: {
    id: 'customSoftware',
    parent: 'home',
    jsonLd: 'service',
    indexable: true,
    sources: [`${PAGE}/CustomSoftwarePage.tsx`, `${CONTENT}/custom-software.ts`],
    pt: {
      path: '/software-a-medida',
      title: 'Software à medida para empresas | GetEasier',
      description:
        'Aplicações web, apps móveis e integrações feitas para os processos da sua empresa. Veja como trabalhamos e a stack que usamos, e fale connosco do projeto.',
      breadcrumb: 'Software à medida',
    },
    en: {
      path: '/en/custom-software',
      title: 'Custom software development | GetEasier',
      description:
        'Web apps, mobile apps and integrations built around how your company works. See how we work and the stack we use, then tell us about your project.',
      breadcrumb: 'Custom software',
    },
  },
  products: {
    id: 'products',
    parent: 'home',
    jsonLd: 'webpage',
    indexable: true,
    sources: [`${PAGE}/ProductsPage.tsx`, `${CONTENT}/products.ts`],
    pt: {
      path: '/produtos',
      title: 'Produtos: ponto, obras, stocks e madeira | GetEasier',
      description:
        'TimeEasier, ConstructionEasier, StockEasier e WoodEasier: quatro produtos da GetEasier para empresas no terreno. Compare-os e peça uma demonstração.',
      breadcrumb: 'Produtos',
    },
    en: {
      path: '/en/products',
      title: 'Products: time, sites, stock and timber | GetEasier',
      description:
        'TimeEasier, ConstructionEasier, StockEasier and WoodEasier: four GetEasier products for companies working on site. Compare them and ask for a demo.',
      breadcrumb: 'Products',
    },
  },
  timeEasier: {
    id: 'timeEasier',
    parent: 'products',
    jsonLd: 'software',
    indexable: true,
    sources: [`${PAGE}/ProductPage.tsx`, `${CONTENT}/products.ts`, `src/components/demos/TimeEasierDemo.tsx`],
    pt: {
      path: '/time-easier',
      title: 'TimeEasier: registo de ponto e assiduidade | GetEasier',
      description:
        'Registo de ponto no tablet do local de trabalho ou na app, férias, ausências e relatório mensal de horas do Art. 202.º. Peça uma demonstração.',
      breadcrumb: 'TimeEasier',
    },
    en: {
      path: '/en/time-easier',
      title: 'TimeEasier: time and attendance tracking | GetEasier',
      description:
        'Clock in on a workplace tablet or the mobile app, manage holidays and absences, and get the monthly hours report Portuguese law requires. Ask for a demo.',
      breadcrumb: 'TimeEasier',
    },
  },
  constructionEasier: {
    id: 'constructionEasier',
    parent: 'products',
    jsonLd: 'software',
    indexable: true,
    sources: [`${PAGE}/ProductPage.tsx`, `${CONTENT}/products.ts`, `src/components/demos/ConstructionEasierDemo.tsx`],
    pt: {
      path: '/construction-easier',
      title: 'ConstructionEasier: gestão de obras | GetEasier',
      description:
        'Quem está em cada obra, subempreiteiros e os seus documentos, custos por obra e auto de obra. Veja como funciona e peça uma demonstração.',
      breadcrumb: 'ConstructionEasier',
    },
    en: {
      path: '/en/construction-easier',
      title: 'ConstructionEasier: construction site management | GetEasier',
      description:
        'Who is on each site, subcontractors and their documents, costs per site and progress reports. See how ConstructionEasier works and ask for a demo.',
      breadcrumb: 'ConstructionEasier',
    },
  },
  stockEasier: {
    id: 'stockEasier',
    parent: 'products',
    jsonLd: 'software',
    indexable: true,
    sources: [`${PAGE}/ProductPage.tsx`, `${CONTENT}/products.ts`, `src/components/demos/StockEasierDemo.tsx`],
    pt: {
      path: '/stock-easier',
      title: 'StockEasier: gestão de stocks e EPIs | GetEasier',
      description:
        'Registe entradas e saídas de EPIs e consumíveis, saiba o que recebeu cada colaborador e receba alertas de reposição. Peça uma demonstração.',
      breadcrumb: 'StockEasier',
    },
    en: {
      path: '/en/stock-easier',
      title: 'StockEasier: stock and PPE management | GetEasier',
      description:
        'Record stock in and out for PPE and consumables, see what each employee received and get reorder alerts before you run out. Ask for a StockEasier demo.',
      breadcrumb: 'StockEasier',
    },
  },
  woodEasier: {
    id: 'woodEasier',
    parent: 'products',
    jsonLd: 'software',
    indexable: true,
    sources: [`${PAGE}/ProductPage.tsx`, `${CONTENT}/products.ts`, `src/components/demos/WoodEasierDemo.tsx`],
    pt: {
      path: '/wood-easier',
      title: 'WoodEasier: passaportes de madeira tratada | GetEasier',
      description:
        'Lotes, tratamentos, passaportes e comprovativos para a DGAV, da receção à expedição da madeira tratada. Veja como funciona e peça uma demonstração.',
      breadcrumb: 'WoodEasier',
    },
    en: {
      path: '/en/wood-easier',
      title: 'WoodEasier: treated timber passports | GetEasier',
      description:
        'Batches, treatments, plant passports and DGAV reports, from receiving treated timber to shipping it. See how WoodEasier works and ask for a demo.',
      breadcrumb: 'WoodEasier',
    },
  },
  plans: {
    id: 'plans',
    parent: 'products',
    jsonLd: 'webpage',
    indexable: true,
    sources: [`${PAGE}/PlansPage.tsx`, `${CONTENT}/plans.ts`],
    pt: {
      path: '/planos',
      title: 'Planos e módulos | GetEasier',
      description:
        'Compare os planos Base, Avançado e Premium dos produtos GetEasier e o plano único do WoodEasier. Peça uma proposta para a dimensão da sua equipa.',
      breadcrumb: 'Planos',
    },
    en: {
      path: '/en/pricing',
      title: 'Plans and modules | GetEasier',
      description:
        'Compare the Base, Advanced and Premium plans of GetEasier products and WoodEasier’s single plan. Ask for a quote for the size of your team.',
      breadcrumb: 'Plans',
    },
  },
  about: {
    id: 'about',
    parent: 'home',
    jsonLd: 'webpage',
    indexable: true,
    sources: [`${PAGE}/AboutPage.tsx`, `${CONTENT}/about.ts`],
    pt: {
      path: '/sobre',
      title: 'Sobre a GetEasier e a equipa | GetEasier',
      description:
        'Somos uma equipa de desenvolvimento no norte de Portugal, perto do Porto. Conheça quem faz o software à medida e os produtos da GetEasier.',
      breadcrumb: 'Sobre',
    },
    en: {
      path: '/en/about',
      title: 'About GetEasier and the team | GetEasier',
      description:
        'We are a software team in northern Portugal, near Porto. Meet the people who build GetEasier custom software and products.',
      breadcrumb: 'About',
    },
  },
  contact: {
    id: 'contact',
    parent: 'home',
    jsonLd: 'webpage',
    indexable: true,
    sources: [`${PAGE}/ContactPage.tsx`, `${CONTENT}/contact.ts`],
    pt: {
      path: '/contactos',
      title: 'Contactos | GetEasier',
      description:
        'Fale connosco sobre um projeto de software à medida ou peça uma demonstração de um produto. Use o formulário ou o WhatsApp, +351 914 223 323.',
      breadcrumb: 'Contactos',
    },
    en: {
      path: '/en/contact',
      title: 'Contact | GetEasier',
      description:
        'Tell us about a custom software project or ask for a product demo. Use the contact form or message us on WhatsApp at +351 914 223 323.',
      breadcrumb: 'Contact',
    },
  },
  privacy: {
    id: 'privacy',
    parent: 'home',
    jsonLd: 'webpage',
    indexable: true,
    sources: ['src/content/legal/privacy-policy.pt.ts'],
    pt: {
      path: '/privacy-policy',
      title: 'Política de Privacidade | GetEasier',
      description:
        'Como a GetEasier trata dados pessoais no website e na plataforma: responsável, finalidades, prazos de conservação e os seus direitos no RGPD.',
      breadcrumb: 'Política de Privacidade',
    },
    en: null,
  },
  terms: {
    id: 'terms',
    parent: 'home',
    jsonLd: 'webpage',
    indexable: true,
    sources: ['src/content/legal/terms-of-use.pt.ts'],
    pt: {
      path: '/terms-and-conditions',
      title: 'Termos e Condições | GetEasier',
      description:
        'Termos e Condições de Utilização e Prestação de Serviços da plataforma GetEasier: obrigações das partes, dados pessoais, suporte, pagamentos e resolução.',
      breadcrumb: 'Termos e Condições',
    },
    en: null,
  },
}

export const ROUTE_LIST = Object.values(ROUTES)

export function route(id: PageId, locale: Locale): LocalizedRoute {
  const r = ROUTES[id]
  return (locale === 'en' && r.en) || r.pt
}

/** Caminho da página na língua pedida; se não existir nessa língua, usa o português. */
export function href(id: PageId, locale: Locale): string {
  return route(id, locale).path
}

/** Cadeia de breadcrumbs, da raiz até à página. */
export function breadcrumbTrail(id: PageId, locale: Locale) {
  const trail: { id: PageId; label: string; path: string }[] = []
  let current: PageId | null = id
  while (current) {
    const r = route(current, locale)
    trail.unshift({ id: current, label: r.breadcrumb, path: r.path })
    current = ROUTES[current].parent
  }
  return trail
}

export const MAIN_NAV: PageId[] = ['home', 'customSoftware', 'products', 'plans', 'about', 'contact']
export const PRODUCT_IDS = ['timeEasier', 'constructionEasier', 'stockEasier', 'woodEasier'] as const
export type ProductId = (typeof PRODUCT_IDS)[number]
