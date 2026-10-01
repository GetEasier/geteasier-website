import type { Locale } from '@/lib/seo.config'

export const TEAM = [
  { name: 'Alexandre Barreto', photo: '/images/team/geteasier-1.jpeg', role: 'development' },
  { name: 'Nelson Luís', photo: '/images/team/geteasier-2.jpeg', role: 'development' },
  { name: 'Rui Peixoto', photo: '/images/team/geteasier-3.jpeg', role: 'product' },
] as const

const pt = {
  h1: 'Uma equipa de desenvolvimento em Marco de Canaveses',
  lead: [
    'A GetEasier é uma equipa portuguesa de desenvolvimento de software. Trabalhamos em duas frentes: produtos próprios e software à medida para outras empresas.',
    'O ConstructionEasier, por exemplo, foi desenvolvido com empresas de construção portuguesas. O que aprendemos a construir os produtos é o que levamos para os projetos à medida.',
  ],
  teamTitle: 'A equipa',
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-fundador',
  companyTitle: 'A empresa',
  company: {
    legalName: 'Denominação',
    vat: 'NIPC',
    address: 'Sede',
  },
  fundingTitle: 'Projeto financiado',
  fundingText:
    'Parte do nosso trabalho é financiada pelo Plano de Recuperação e Resiliência, com fundos NextGenerationEU da União Europeia.',
  fundingLink: 'Descarregar a ficha do projeto (PDF)',
  instagramTitle: 'Últimas publicações no Instagram',
  instagramLink: 'Seguir a GetEasier no Instagram',
  nextTitle: 'Continuar',
}

export type AboutDict = typeof pt

const en: AboutDict = {
  h1: 'A software development team in Marco de Canaveses, Portugal',
  lead: [
    'GetEasier is a Portuguese software development team. We work on two fronts: our own products and custom software for other companies.',
    'ConstructionEasier, for example, was developed together with Portuguese construction companies. What we learn building our products goes into our custom projects.',
  ],
  teamTitle: 'The team',
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-founder',
  companyTitle: 'The company',
  company: {
    legalName: 'Registered name',
    vat: 'Tax number',
    address: 'Registered office',
  },
  fundingTitle: 'Funded project',
  fundingText:
    'Part of our work is funded by the Portuguese Recovery and Resilience Plan, with NextGenerationEU funds from the European Union.',
  fundingLink: 'Download the project summary (PDF, in Portuguese)',
  instagramTitle: 'Latest Instagram posts',
  instagramLink: 'Follow GetEasier on Instagram',
  nextTitle: 'Continue',
}

export const about: Record<Locale, AboutDict> = { pt, en }
