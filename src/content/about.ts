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
  // Textos provisórios por pessoa [CONFIRMAR com o Alexandre].
  people: [
    { bio: 'Desenha a arquitetura dos projetos e escreve boa parte do código, do servidor às apps móveis.', focus: ['Arquitetura', 'Backend', 'Apps móveis'] },
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
    { bio: 'Designs the architecture of each project and writes much of the code, from the server to the mobile apps.', focus: ['Architecture', 'Backend', 'Mobile apps'] },
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
