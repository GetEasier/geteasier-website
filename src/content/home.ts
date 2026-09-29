import type { Locale } from '@/lib/seo.config'

// Testemunhos e clientes: já publicados no site anterior, com nome, empresa e fotografia.
export const TESTIMONIALS = [
  {
    quote:
      'Podemos considerar a GetEasier como um parceiro que agiliza o nosso dia a dia, sempre dispostos a ajudar e a melhorar. Ou seja, o Parceiro certo em qualquer empresa.',
    name: 'Hélder Rocha',
    company: 'Granitos do Norte, Lda',
    photo: '/images/testimonials/helder-rocha-avatar.jpeg',
  },
  {
    quote:
      'O WoodEasier simplifica o nosso quotidiano. Com esta aplicação, conseguimos reduzir para menos de metade o tempo que antes precisávamos para gerir todos os passaportes de madeiras tratadas. Além disso, é importante salientar a disponibilidade de toda a equipa para prestar qualquer apoio necessário.',
    name: 'Diogo Silva',
    company: 'Granitos Irmãos Peixoto, Lda',
    photo: '/images/testimonials/diogo-silva-avatar.jpeg',
  },
  {
    quote:
      'Na minha ótica, a GetEasier chegou para se afirmar no mercado. Equipa super competente e que vai de encontro às necessidades e objetivos do cliente. Com o WoodEasier encurtamos o tempo dispendido na nossa metodologia de rastreabilidade das nossas madeiras.',
    name: 'Catarina Moreira',
    company: 'Pardais',
    photo: '/images/testimonials/ds-seguros.jpeg',
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
  lead:
    'Somos uma equipa portuguesa de desenvolvimento. Fazemos software à medida para empresas com processos próprios, e temos quatro produtos para registo de ponto, obras, stocks de EPIs e passaportes de madeira tratada.',
  heroFigure:
    'Desenho de um sistema: o tablet na portaria de uma obra envia um registo ao servidor, que o associa à obra certa. O registo mostra 07:58, entrada registada, Obra Rua das Flores. Dados fictícios.',
  custom: {
    title: 'Software à medida',
    text: 'Quando nenhum produto se ajusta à forma como a sua empresa trabalha, construímos o sistema certo. Desenhamos, desenvolvemos e mantemos:',
    items: [
      'aplicações web de gestão, portais e fluxos de aprovação;',
      'apps móveis para iOS e Android, para quem trabalha fora do escritório;',
      'integrações com o seu ERP, o processamento salarial e sistemas públicos.',
    ],
    link: 'Como fazemos software à medida',
  },
  products: {
    title: 'Os nossos produtos',
    text: 'Quatro produtos, feitos e mantidos por nós, que também mostram o que sabemos construir.',
    link: 'Ver os quatro produtos',
  },
  clientsTitle: 'Algumas empresas que trabalham connosco',
  day: {
    title: 'Um dia numa obra com o ConstructionEasier',
    intro: 'O que o diretor de obra vê ao longo do dia. Nomes e horas são fictícios.',
    events: [
      { time: '07:58', text: 'Rui M. identifica-se no tablet da portaria. Entrada registada na Obra Rua das Flores.' },
      { time: '08:10', text: 'Chega a equipa de um subempreiteiro. Um documento de um dos trabalhadores expira em 12 dias e fica assinalado.' },
      { time: '12:30', text: 'O diretor de obra vê quem está em cada obra e de que empresa é.' },
      { time: '17:30', text: 'Saídas registadas. As horas do dia ficam prontas para o relatório mensal.' },
    ],
    link: 'Ver o ConstructionEasier',
  },
  testimonialsTitle: 'O que dizem os clientes',
  contact: {
    title: 'Fale-nos do processo que quer resolver',
    text: 'Conte-nos o que a sua equipa faz hoje e onde perde tempo. Respondemos com perguntas concretas e, se fizer sentido, com uma proposta.',
  },
}

export type HomeDict = typeof pt

const en: HomeDict = {
  h1: 'We build the software your company uses on site',
  lead:
    'We are a Portuguese software development team. We build custom software for companies with their own way of working, and we have four products for time tracking, construction sites, PPE stock and treated timber passports.',
  heroFigure:
    'Drawing of a system: the tablet at a construction site gate sends a record to the server, which links it to the right site. The record shows 07:58, entry recorded, Rua das Flores site. Fictitious data.',
  custom: {
    title: 'Custom software',
    text: 'When no product fits the way your company works, we build the right system. We design, develop and maintain:',
    items: [
      'web applications for management, portals and approval flows;',
      'iOS and Android apps for people who work away from the office;',
      'integrations with your ERP, payroll and public systems.',
    ],
    link: 'How we build custom software',
  },
  products: {
    title: 'Our products',
    text: 'Four products, built and maintained by us, that also show what we can build.',
    link: 'See the four products',
  },
  clientsTitle: 'Some of the companies we work with',
  day: {
    title: 'A day on site with ConstructionEasier',
    intro: 'What the site manager sees during the day. Names and times are fictitious.',
    events: [
      { time: '07:58', text: 'Rui M. clocks in by face on the gate tablet. Entry recorded at the Rua das Flores site.' },
      { time: '08:10', text: 'A subcontractor’s crew arrives. A document for one of the workers expires in 12 days and is flagged.' },
      { time: '12:30', text: 'The site manager sees who is on each site and which company they work for.' },
      { time: '17:30', text: 'Exits recorded. The day’s hours are ready for the monthly report.' },
    ],
    link: 'See ConstructionEasier',
  },
  testimonialsTitle: 'What clients say',
  contact: {
    title: 'Tell us about the process you want to fix',
    text: 'Tell us what your team does today and where time gets lost. We will reply with specific questions and, if it makes sense, a proposal.',
  },
}

export const home: Record<Locale, HomeDict> = { pt, en }
