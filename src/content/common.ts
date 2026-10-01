import type { Locale } from '@/lib/seo.config'

const pt = {
  skipLink: 'Saltar para o conteúdo',
  nav: {
    label: 'Navegação principal',
    menu: 'Menu',
    close: 'Fechar menu',
    cta: 'Falar sobre um projeto',
    home: 'GetEasier, página inicial',
  },
  lang: {
    label: 'Language',
    switchTo: 'English',
    short: 'EN',
    hint: 'Ver esta página em inglês',
  },
  breadcrumbs: 'Caminho de navegação',
  footer: {
    tagline:
      'Equipa portuguesa de desenvolvimento de software. Fazemos software à medida e quatro produtos próprios.',
    company: 'Empresa',
    products: 'Produtos',
    legal: 'Informação legal',
    social: 'Redes sociais',
    rights: 'Todos os direitos reservados.',
    cookies: 'Cookies',
    fundingAlt:
      'Financiado pela União Europeia, NextGenerationEU, Plano de Recuperação e Resiliência, República Portuguesa',
    fundingDownload: 'Descarregar a ficha do projeto financiado (PDF)',
    whatsapp: 'WhatsApp',
    contact: 'Contacto',
    newsletter: {
      title: 'Newsletter',
      text: 'Novidades, bastidores e ideias sobre software para empresas, no seu email.',
      label: 'O seu email',
      placeholder: 'nome@empresa.pt',
      button: 'Subscrever',
    },
    ctaTitle: 'Tem uma ideia para a sua empresa?',
    ctaText: 'Conte-nos como trabalham hoje e mostramos o que dá para simplificar.',
    legalOnlyPt: '',
  },
  cta: {
    project: 'Falar sobre um projeto',
    demo: (product: string) => `Pedir demonstração do ${product}`,
    plans: 'Ver planos',
    products: 'Ver os produtos',
    whatsapp: 'Escrever no WhatsApp',
  },
  notFound: {
    title: 'Esta página não existe',
    text: 'O endereço pode estar errado ou a página mudou de sítio. Estas são as páginas principais do site:',
    contact: 'Se procurava alguma coisa em concreto, fale connosco.',
  },
}

export type CommonDict = typeof pt

const en: CommonDict = {
  skipLink: 'Skip to content',
  nav: {
    label: 'Main navigation',
    menu: 'Menu',
    close: 'Close menu',
    cta: 'Discuss a project',
    home: 'GetEasier home page',
  },
  lang: {
    label: 'Idioma',
    switchTo: 'Português',
    short: 'PT',
    hint: 'Ver esta página em português',
  },
  breadcrumbs: 'Breadcrumb',
  footer: {
    tagline: 'Portuguese software development team. We build custom software and four products of our own.',
    company: 'Company',
    products: 'Products',
    legal: 'Legal',
    social: 'Social media',
    rights: 'All rights reserved.',
    cookies: 'Cookies',
    fundingAlt:
      'Funded by the European Union, NextGenerationEU, Recovery and Resilience Plan, Portuguese Republic',
    fundingDownload: 'Download the funded project summary (PDF, in Portuguese)',
    whatsapp: 'WhatsApp',
    contact: 'Contact',
    newsletter: {
      title: 'Newsletter',
      text: 'News, behind the scenes and ideas about business software, in your inbox.',
      label: 'Your email',
      placeholder: 'name@company.com',
      button: 'Subscribe',
    },
    ctaTitle: 'Have an idea for your business?',
    ctaText: 'Tell us how you work today and we will show you what can be simplified.',
    legalOnlyPt: 'Legal documents are available in Portuguese.',
  },
  cta: {
    project: 'Discuss a project',
    demo: (product: string) => `Ask for a ${product} demo`,
    plans: 'See plans',
    products: 'See the products',
    whatsapp: 'Message us on WhatsApp',
  },
  notFound: {
    title: 'This page does not exist',
    text: 'The address may be wrong or the page has moved. These are the main pages of the site:',
    contact: 'If you were looking for something specific, get in touch.',
  },
}

export const common: Record<Locale, CommonDict> = { pt, en }
