import type { Locale } from '@/lib/seo.config'

// Testemunhos e clientes: já publicados no site anterior, com nome, empresa e fotografia.
export const TESTIMONIALS = [
  {
    quote:
      'Podemos considerar a GetEasier como um parceiro que agiliza o nosso dia a dia, sempre dispostos a ajudar e a melhorar. Ou seja, o Parceiro certo em qualquer empresa.',
    name: 'Hélder Rocha',
    company: 'Granitos do Norte, Lda',
    photo: '/images/testimonials/helder-rocha-avatar.jpeg',
    logo: '/images/home/clients/logo_gnt.jpeg',
  },
  {
    quote:
      'O WoodEasier simplifica o nosso quotidiano. Com esta aplicação, conseguimos reduzir para menos de metade o tempo que antes precisávamos para gerir todos os passaportes de madeiras tratadas. Além disso, é importante salientar a disponibilidade de toda a equipa para prestar qualquer apoio necessário.',
    name: 'Diogo Silva',
    company: 'Granitos Irmãos Peixoto, Lda',
    photo: '/images/testimonials/diogo-silva-avatar.jpeg',
    logo: '/images/home/clients/logo_peixotos.jpeg',
  },
  {
    quote:
      'Na minha ótica, a GetEasier chegou para se afirmar no mercado. Equipa super competente e que vai de encontro às necessidades e objetivos do cliente. Com o WoodEasier encurtamos o tempo dispendido na nossa metodologia de rastreabilidade das nossas madeiras.',
    name: 'Catarina Moreira',
    company: 'Pardais',
    photo: '/images/testimonials/ds-seguros.jpeg',
    logo: '/images/home/clients/logo_pardais.jpeg',
  },
] as const

export const CLIENTS = [
  { name: 'Granitos do Norte', logo: '/images/home/clients/logo_gnt.jpeg' },
  { name: 'Granitos Irmãos Peixoto', logo: '/images/home/clients/logo_peixotos.jpeg' },
  { name: 'Pardais', logo: '/images/home/clients/logo_pardais.jpeg' },
  { name: 'Futuro Alternativo', logo: '/images/home/clients/futuro-alternativo-logo.jpeg' },
  { name: 'OJP', logo: '/images/home/clients/Logo_OJP.jpeg' },
] as const

const pt = {
  h1: 'Fazemos o software que a sua empresa usa no terreno',
  lead: 'Software à medida e quatro produtos próprios, feitos por uma equipa portuguesa.',
  custom: {
    title: 'Software à medida',
    text: 'Quando nenhum produto serve a forma como a sua empresa trabalha, construímos o sistema certo.',
    items: ['Aplicações web de gestão', 'Apps para iOS e Android', 'Integrações com ERP e salários'],
    link: 'Como fazemos software à medida',
    photoAlt: 'A equipa da GetEasier a trabalhar no escritório',
  },
  products: {
    title: 'Os nossos produtos',
    text: 'Feitos e mantidos por nós. Funcionam sozinhos ou em conjunto.',
    link: 'Ver os quatro produtos',
    open: (name: string) => `Conhecer o ${name}`,
  },
  clientsTitle: 'Empresas que trabalham connosco',
  testimonialsTitle: 'O que dizem os clientes',
  teamTitle: 'A equipa',
  teamText: 'As pessoas que desenham, desenvolvem e dão suporte ao seu software.',
  teamLink: 'Sobre a GetEasier',
  contact: {
    title: 'Fale-nos do processo que quer resolver',
    text: 'Conte-nos onde a sua equipa perde tempo. Respondemos com perguntas concretas e, se fizer sentido, uma proposta.',
  },
}

export type HomeDict = Omit<typeof pt, 'products'> & { products: Omit<typeof pt.products, 'open'> & { open: (name: string) => string } }

const en: HomeDict = {
  h1: 'We build the software your company uses on site',
  lead: 'Custom software and four products of our own, built by a Portuguese team.',
  custom: {
    title: 'Custom software',
    text: 'When no product fits the way your company works, we build the right system.',
    items: ['Web management applications', 'iOS and Android apps', 'ERP and payroll integrations'],
    link: 'How we build custom software',
    photoAlt: 'The GetEasier team working at the office',
  },
  products: {
    title: 'Our products',
    text: 'Built and maintained by us. They work on their own or together.',
    link: 'See the four products',
    open: (name: string) => `Explore ${name}`,
  },
  clientsTitle: 'Companies that work with us',
  testimonialsTitle: 'What clients say',
  teamTitle: 'The team',
  teamText: 'The people who design, build and support your software.',
  teamLink: 'About GetEasier',
  contact: {
    title: 'Tell us about the process you want to fix',
    text: 'Tell us where your team loses time. We reply with specific questions and, if it makes sense, a proposal.',
  },
}

export const home: Record<Locale, HomeDict> = { pt, en }
