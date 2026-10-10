// Dados da empresa e do domínio. SITE_URL é definido só aqui.

export const SITE_URL = 'https://geteasier.pt'

export const COMPANY = {
  name: 'GetEasier',
  legalName: 'UNIVERSAL IDEAS - LDA',
  vatId: '517156261',
  // Para os dados estruturados (Organization): o que a empresa faz, em poucas palavras.
  description:
    'Empresa portuguesa de software. Faz software à medida para empresas e quatro produtos próprios: TimeEasier (registo de ponto e gestão de RH), ConstructionEasier (gestão de obras e subempreiteiros), StockEasier (stocks de EPIs e consumíveis) e WoodEasier (passaportes de madeira tratada para a DGAV). Usa inteligência artificial na leitura de documentos (OCR).',
  knowsAbout: [
    'Software à medida',
    'Registo de ponto',
    'Controlo de assiduidade',
    'Gestão de recursos humanos',
    'Gestão de obras',
    'Gestão de subempreiteiros',
    'Gestão de stocks de EPIs',
    'Leitura de documentos com inteligência artificial (OCR)',
    'Passaportes fitossanitários de madeira tratada',
  ],
  // Morada pública (dados estruturados): só a cidade, sem rua nem código postal, para pesquisas por
  // proximidade. A sede completa fica apenas nos documentos legais (Alexandre, 09/10).
  address: {
    locality: 'Marco de Canaveses',
    region: 'Porto',
    country: 'PT',
  },
  whatsapp: {
    display: '+351 914 223 323',
    href: 'https://wa.me/351914223323',
    e164: '+351914223323',
  },
  // Newsletter da GetEasier no Substack
  newsletter: 'https://geteasiersoftwares.substack.com',
  socials: [
    { name: 'LinkedIn', href: 'https://pt.linkedin.com/company/geteasier' },
    { name: 'Instagram', href: 'https://www.instagram.com/geteasier.pt/' },
    { name: 'Facebook', href: 'https://www.facebook.com/people/GetEasier/61558913198805/' },
  ],
  apps: {
    ios: 'https://apps.apple.com/pt/app/timeeasier/id6755851894',
    android: 'https://play.google.com/store/apps/details?id=com.geteasier.timeeasier&hl=pt_PT',
  },
  funding: {
    pdf: '/documents/ficha-projeto-universal-ideas.pdf',
    logo: '/images/funding/prr-financiamento.png',
  },
} as const

export function absoluteUrl(path: string) {
  if (path === '/') return SITE_URL
  return `${SITE_URL}${path}`
}
