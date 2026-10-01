import type { Locale } from '@/lib/seo.config'

export const TEAM = [
  { name: 'Alexandre Barreto', photo: '/images/team/geteasier-1.jpeg', role: 'development' },
  { name: 'Nelson Luís', photo: '/images/team/geteasier-2.jpeg', role: 'development' },
  { name: 'Rui Peixoto', photo: '/images/team/geteasier-3.jpeg', role: 'product' },
] as const

// Formação e certificações são opcionais: só aparecem no cartão de código quando existem.
type Person = { bio: string; focus: string[]; degree?: string; certs?: string[] }

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
  // Alexandre: a partir do CV (01/10). Rui: dados do Alexandre (01/10). Nelson: provisório até haver CV [CONFIRMAR].
  people: [
    { bio: 'Mais de 10 anos a desenvolver software para empresas. Na GetEasier cuida da arquitetura e da parte técnica de cada projeto, para que o software seja sólido, seguro e fácil de fazer crescer.', focus: ['Arquitetura', 'Desenvolvimento', 'Integrações', 'DevOps'], degree: 'Engenharia Informática' },
    { bio: 'Transforma cada processo em ecrãs simples de usar e garante que tudo corre bem depois de entregue.', focus: ['Frontend', 'Integrações', 'Qualidade'] },
    { bio: 'Conhece por dentro a construção e a pedra natural. Na GetEasier fala com os clientes, percebe como cada empresa trabalha e transforma isso no que o software tem de fazer.', focus: ['Produto', 'Processos', 'Segurança no trabalho'], degree: 'Engenharia e Gestão Industrial' },
  ] as Person[],
  codeKeys: { role: 'papel', focus: 'foco', degree: 'formação', certs: 'certificações' },
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
    { bio: 'Over 10 years building software for companies. At GetEasier he looks after the architecture and technical side of every project, so the software is solid, secure and easy to grow.', focus: ['Architecture', 'Development', 'Integrations', 'DevOps'], degree: 'Computer Engineering' },
    { bio: 'Turns each process into screens that are simple to use and makes sure everything runs well after delivery.', focus: ['Frontend', 'Integrations', 'Quality'] },
    { bio: 'Knows construction and natural stone from the inside. At GetEasier he talks to clients, learns how each company works and turns that into what the software must do.', focus: ['Product', 'Processes', 'Health and safety'], degree: 'Industrial Engineering and Management' },
  ] as Person[],
  codeKeys: { role: 'role', focus: 'focus', degree: 'degree', certs: 'certifications' },
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-founder',
  instagramTitle: 'Latest Instagram posts',
  instagramLink: 'Follow GetEasier on Instagram',
}

export const about: Record<Locale, AboutDict> = { pt, en }
