import type { Locale } from '@/lib/seo.config'

export const TEAM = [
  { name: 'Alexandre Barreto', photo: '/images/team/geteasier-1.jpeg', role: 'development' },
  { name: 'Nelson Luís', photo: '/images/team/geteasier-2.jpeg', role: 'development' },
  { name: 'Rui Peixoto', photo: '/images/team/geteasier-3.jpeg', role: 'product' },
] as const

const pt = {
  h1: 'A equipa por trás do seu software',
  lead: 'Somos uma equipa portuguesa de software. Fazemos produtos próprios e software à medida para outras empresas.',
  frontsTitle: 'Duas frentes, a mesma equipa',
  fronts: {
    custom: {
      title: 'Software à medida',
      text: 'Aplicações web e móveis desenhadas à volta do processo de cada empresa.',
      link: 'Ver como trabalhamos',
    },
    products: {
      title: 'Produtos próprios',
      text: 'Quatro produtos feitos com empresas portuguesas. O que aprendemos com eles entra em cada projeto.',
      link: 'Ver os produtos',
    },
  },
  teamTitle: 'As pessoas',
  teamText: 'Os três co-fundadores desenham, desenvolvem e dão suporte a cada projeto.',
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-fundador',
  companyTitle: 'A empresa',
  company: {
    legalName: 'Denominação',
    vat: 'NIPC',
    address: 'Sede',
  },
  fundingTitle: 'Projeto financiado',
  fundingText: 'Parte do nosso trabalho é financiada pelo PRR, com fundos NextGenerationEU da União Europeia.',
  fundingLink: 'Ficha do projeto (PDF)',
  instagramTitle: 'Últimas publicações no Instagram',
  instagramLink: 'Seguir a GetEasier no Instagram',
  contactTitle: 'Venha conhecer-nos',
  contactText: 'Conte-nos o que quer resolver. Respondemos nós, a mesma equipa que vai fazer o trabalho.',
  followTitle: 'Siga-nos',
}

export type AboutDict = typeof pt

const en: AboutDict = {
  h1: 'The team behind your software',
  lead: 'We are a Portuguese software team. We build our own products and custom software for other companies.',
  frontsTitle: 'Two fronts, one team',
  fronts: {
    custom: {
      title: 'Custom software',
      text: 'Web and mobile apps designed around each company’s process.',
      link: 'See how we work',
    },
    products: {
      title: 'Our own products',
      text: 'Four products built with Portuguese companies. What we learn from them goes into every project.',
      link: 'See the products',
    },
  },
  teamTitle: 'The people',
  teamText: 'The three co-founders design, build and support every project.',
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-founder',
  companyTitle: 'The company',
  company: {
    legalName: 'Registered name',
    vat: 'Tax number',
    address: 'Registered office',
  },
  fundingTitle: 'Funded project',
  fundingText: 'Part of our work is funded by the Portuguese Recovery and Resilience Plan, with NextGenerationEU funds.',
  fundingLink: 'Project summary (PDF, in Portuguese)',
  instagramTitle: 'Latest Instagram posts',
  instagramLink: 'Follow GetEasier on Instagram',
  contactTitle: 'Come and meet us',
  contactText: 'Tell us what you want to fix. You talk to us, the same team that will do the work.',
  followTitle: 'Follow us',
}

export const about: Record<Locale, AboutDict> = { pt, en }
