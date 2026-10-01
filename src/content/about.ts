import type { Locale } from '@/lib/seo.config'

export const TEAM = [
  { name: 'Alexandre Barreto', photo: '/images/team/geteasier-1.jpeg', role: 'development' },
  { name: 'Nelson Luís', photo: '/images/team/geteasier-2.jpeg', role: 'development' },
  { name: 'Rui Peixoto', photo: '/images/team/geteasier-3.jpeg', role: 'product' },
] as const

const pt = {
  h1: 'Uma equipa jovem e profissional',
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
  // Alexandre: a partir do CV (01/10). Nelson e Rui: provisórios até haver CV [CONFIRMAR].
  people: [
    { bio: 'Engenheiro de software com mais de 8 anos em sistemas empresariais. Desenhou e construiu de raiz a plataforma da GetEasier, do servidor em Java às apps, incluindo o reconhecimento facial do TimeEasier.', focus: ['Arquitetura', 'Java e Spring Boot', 'DevOps'] },
    { bio: 'Transforma cada processo em ecrãs simples de usar e garante que tudo corre bem depois de entregue.', focus: ['Frontend', 'Integrações', 'Qualidade'] },
    { bio: 'Fala com os clientes, percebe o processo de cada empresa e decide o que entra em cada versão.', focus: ['Produto', 'Clientes', 'Suporte'] },
  ],
  codeKeys: { role: 'papel', focus: 'foco' },
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-fundador',
  instagramTitle: 'Últimas publicações no Instagram',
  instagramLink: 'Seguir a GetEasier no Instagram',
}

export type AboutDict = typeof pt

const en: AboutDict = {
  h1: 'A young, professional team',
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
  people: [
    { bio: 'Software engineer with 8+ years on enterprise systems. Designed and built the GetEasier platform from scratch, from the Java backend to the apps, including TimeEasier facial recognition.', focus: ['Architecture', 'Java and Spring Boot', 'DevOps'] },
    { bio: 'Turns each process into screens that are simple to use and makes sure everything runs well after delivery.', focus: ['Frontend', 'Integrations', 'Quality'] },
    { bio: 'Talks to clients, learns how each company works and decides what goes into every release.', focus: ['Product', 'Clients', 'Support'] },
  ],
  codeKeys: { role: 'role', focus: 'focus' },
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-founder',
  instagramTitle: 'Latest Instagram posts',
  instagramLink: 'Follow GetEasier on Instagram',
}

export const about: Record<Locale, AboutDict> = { pt, en }
