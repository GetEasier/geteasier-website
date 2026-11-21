// Fonte única de verdade para rotas, navegação, breadcrumbs, metadados e sitemap.
// Cada página tem uma entrada por língua. `null` quando a página só existe em português.

export type Locale = 'pt' | 'en' | 'nl' | 'es' | 'fr'

export const LOCALES: readonly Locale[] = ['pt', 'en', 'nl', 'es', 'fr']

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
  nl: LocalizedRoute | null
  es: LocalizedRoute | null
  fr: LocalizedRoute | null
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
    nl: {
      path: '/nl',
      title: 'GetEasier | Maatwerksoftware en producten voor bedrijven',
      description:
        'Portugees softwareteam. Wij bouwen maatwerksoftware en eigen producten voor tijdregistratie, werven, voorraad en hout. Vertel ons over uw project.',
      breadcrumb: 'Start',
    },
    es: {
      path: '/es',
      title: 'GetEasier | Software a medida y productos para empresas',
      description:
        'Equipo portugués de desarrollo. Creamos software a medida y productos para control horario, obras, stock y madera tratada. Cuéntanos tu proyecto hoy.',
      breadcrumb: 'Inicio',
    },
    fr: {
      path: '/fr',
      title: 'GetEasier | Logiciel sur mesure et produits d’entreprise',
      description:
        'Équipe portugaise de développement. Logiciels sur mesure et produits pour le pointage, les chantiers, les stocks et le bois. Parlez-nous de votre projet.',
      breadcrumb: 'Accueil',
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
    nl: {
      path: '/nl/custom-software',
      title: 'Maatwerksoftware voor bedrijven | GetEasier',
      description:
        'Webapps, mobiele apps en integraties gebouwd rond de processen van uw bedrijf. Bekijk onze aanpak en stack en vertel ons meer over uw project.',
      breadcrumb: 'Maatwerksoftware',
    },
    es: {
      path: '/es/custom-software',
      title: 'Desarrollo de software a medida | GetEasier',
      description:
        'Aplicaciones web, móviles e integraciones diseñadas para los procesos de tu empresa. Conoce nuestra forma de trabajar y cuéntanos tu proyecto hoy.',
      breadcrumb: 'Software a medida',
    },
    fr: {
      path: '/fr/custom-software',
      title: 'Développement logiciel sur mesure | GetEasier',
      description:
        'Applications web, mobiles et intégrations conçues autour des processus de votre entreprise. Découvrez notre méthode et parlez-nous de votre projet.',
      breadcrumb: 'Logiciel sur mesure',
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
    nl: {
      path: '/nl/products',
      title: 'Producten: tijd, werven, voorraad en hout | GetEasier',
      description:
        'TimeEasier, ConstructionEasier, StockEasier en WoodEasier: vier GetEasier-producten voor bedrijven op de werkvloer. Vergelijk en vraag een demo aan.',
      breadcrumb: 'Producten',
    },
    es: {
      path: '/es/products',
      title: 'Productos: horario, obras, stock y madera | GetEasier',
      description:
        'TimeEasier, ConstructionEasier, StockEasier y WoodEasier: cuatro productos de GetEasier para empresas en campo. Compáralos y solicita una demo.',
      breadcrumb: 'Productos',
    },
    fr: {
      path: '/fr/products',
      title: 'Produits : pointage, chantiers, stock et bois | GetEasier',
      description:
        'TimeEasier, ConstructionEasier, StockEasier et WoodEasier : quatre produits GetEasier pour les équipes sur le terrain. Comparez et demandez une démo.',
      breadcrumb: 'Produits',
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
    nl: {
      path: '/nl/time-easier',
      title: 'TimeEasier: tijdregistratie en aanwezigheid | GetEasier',
      description:
        'Inklokken op een tablet op de werkplek of in de app, vakantie, afwezigheden en het maandelijkse urenrapport dat de Portugese wet vraagt. Vraag een demo.',
      breadcrumb: 'TimeEasier',
    },
    es: {
      path: '/es/time-easier',
      title: 'TimeEasier: control horario y asistencia | GetEasier',
      description:
        'Ficha en la tablet del centro de trabajo o en la app, gestiona vacaciones y ausencias y obtén el informe mensual de horas que exige la ley portuguesa.',
      breadcrumb: 'TimeEasier',
    },
    fr: {
      path: '/fr/time-easier',
      title: 'TimeEasier : pointage et gestion des présences | GetEasier',
      description:
        'Pointage sur tablette sur le lieu de travail ou dans l’app, congés, absences et relevé mensuel des heures exigé par la loi portugaise. Demandez une démo.',
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
    nl: {
      path: '/nl/construction-easier',
      title: 'ConstructionEasier: werfbeheer en kosten | GetEasier',
      description:
        'Wie er op elke werf werkt, onderaannemers en hun documenten, kosten per werf en vorderingsstaten. Bekijk hoe het werkt en vraag een demo aan.',
      breadcrumb: 'ConstructionEasier',
    },
    es: {
      path: '/es/construction-easier',
      title: 'ConstructionEasier: gestión de obras | GetEasier',
      description:
        'Quién está en cada obra, subcontratistas y sus documentos, costes por obra y certificaciones de obra. Descubre cómo funciona y pide una demostración.',
      breadcrumb: 'ConstructionEasier',
    },
    fr: {
      path: '/fr/construction-easier',
      title: 'ConstructionEasier : gestion de chantiers | GetEasier',
      description:
        'Qui est sur chaque chantier, sous-traitants et leurs documents, coûts par chantier et états d’avancement. Voyez comment ça marche et demandez une démo.',
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
    nl: {
      path: '/nl/stock-easier',
      title: 'StockEasier: voorraad- en PBM-beheer | GetEasier',
      description:
        'Registreer in- en uitgaande PBM’s en verbruiksmaterialen, zie wat elke medewerker ontving en krijg tijdige bestelmeldingen. Vraag een demo aan.',
      breadcrumb: 'StockEasier',
    },
    es: {
      path: '/es/stock-easier',
      title: 'StockEasier: gestión de stock y EPI | GetEasier',
      description:
        'Registra entradas y salidas de EPI y consumibles, consulta qué recibió cada empleado y recibe alertas de reposición a tiempo. Solicita una demo.',
      breadcrumb: 'StockEasier',
    },
    fr: {
      path: '/fr/stock-easier',
      title: 'StockEasier : gestion des stocks et EPI | GetEasier',
      description:
        'Enregistrez les entrées et sorties d’EPI et de consommables, voyez ce que chaque collaborateur a reçu et recevez des alertes de réapprovisionnement.',
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
    nl: {
      path: '/nl/wood-easier',
      title: 'WoodEasier: paspoorten voor behandeld hout | GetEasier',
      description:
        'Partijen, behandelingen, paspoorten en DGAV-rapporten, van ontvangst tot verzending van behandeld hout. Bekijk hoe WoodEasier werkt en vraag een demo.',
      breadcrumb: 'WoodEasier',
    },
    es: {
      path: '/es/wood-easier',
      title: 'WoodEasier: pasaportes de madera tratada | GetEasier',
      description:
        'Lotes, tratamientos, pasaportes e informes para la DGAV, de la recepción a la expedición de la madera tratada. Descubre cómo funciona y pide una demo.',
      breadcrumb: 'WoodEasier',
    },
    fr: {
      path: '/fr/wood-easier',
      title: 'WoodEasier : passeports pour bois traité | GetEasier',
      description:
        'Lots, traitements, passeports et rapports pour la DGAV, de la réception à l’expédition du bois traité. Découvrez WoodEasier et demandez une démo.',
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
    nl: {
      path: '/nl/pricing',
      title: 'Plannen en modules | GetEasier',
      description:
        'Vergelijk de plannen Basis, Geavanceerd en Premium van de GetEasier-producten en het enige plan van WoodEasier. Vraag een offerte voor uw team.',
      breadcrumb: 'Plannen',
    },
    es: {
      path: '/es/pricing',
      title: 'Planes y módulos | GetEasier',
      description:
        'Compara los planes Base, Avanzado y Premium de los productos GetEasier y el plan único de WoodEasier. Solicita una propuesta para el tamaño de tu equipo.',
      breadcrumb: 'Planes',
    },
    fr: {
      path: '/fr/pricing',
      title: 'Formules et modules | GetEasier',
      description:
        'Comparez les formules Base, Avancé et Premium des produits GetEasier et la formule unique de WoodEasier. Demandez un devis selon la taille de votre équipe.',
      breadcrumb: 'Formules',
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
        'Somos uma equipa de desenvolvimento em Marco de Canaveses, no distrito do Porto. Conheça quem faz o software à medida e os produtos da GetEasier.',
      breadcrumb: 'Sobre',
    },
    en: {
      path: '/en/about',
      title: 'About GetEasier and the team | GetEasier',
      description:
        'We are a software team based in Marco de Canaveses, near Porto, Portugal. Meet the people who build GetEasier custom software and products.',
      breadcrumb: 'About',
    },
    nl: {
      path: '/nl/about',
      title: 'Over GetEasier en het team | GetEasier',
      description:
        'Wij zijn een softwareteam uit Marco de Canaveses, nabij Porto, Portugal. Maak kennis met de mensen die de software en producten van GetEasier bouwen.',
      breadcrumb: 'Over ons',
    },
    es: {
      path: '/es/about',
      title: 'Sobre GetEasier y el equipo | GetEasier',
      description:
        'Somos un equipo de desarrollo en Marco de Canaveses, cerca de Oporto, Portugal. Conoce a las personas que crean el software y los productos GetEasier.',
      breadcrumb: 'Sobre nosotros',
    },
    fr: {
      path: '/fr/about',
      title: 'À propos de GetEasier et l’équipe | GetEasier',
      description:
        'Nous sommes une équipe de développement à Marco de Canaveses, près de Porto, au Portugal. Découvrez qui crée les logiciels et produits GetEasier.',
      breadcrumb: 'À propos',
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
    nl: {
      path: '/nl/contact',
      title: 'Contact opnemen | GetEasier',
      description:
        'Vertel ons over uw maatwerkproject of vraag een productdemo aan. Gebruik het contactformulier of stuur een bericht via WhatsApp op +351 914 223 323.',
      breadcrumb: 'Contact',
    },
    es: {
      path: '/es/contact',
      title: 'Contacto | GetEasier',
      description:
        'Cuéntanos tu proyecto de software a medida o solicita una demostración de producto. Usa el formulario o escríbenos por WhatsApp al +351 914 223 323.',
      breadcrumb: 'Contacto',
    },
    fr: {
      path: '/fr/contact',
      title: 'Contactez-nous | GetEasier',
      description:
        'Parlez-nous d’un projet de logiciel sur mesure ou demandez une démo produit. Utilisez le formulaire ou contactez-nous sur WhatsApp au +351 914 223 323.',
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
    nl: null,
    es: null,
    fr: null,
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
    nl: null,
    es: null,
    fr: null,
  },
}

export const ROUTE_LIST = Object.values(ROUTES)

export function route(id: PageId, locale: Locale): LocalizedRoute {
  const r = ROUTES[id]
  return (locale !== 'pt' && r[locale]) || r.pt
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
