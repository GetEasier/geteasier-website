import type { Locale } from '@/lib/seo.config'

// Testemunhos e clientes: já publicados no site anterior, com nome, empresa e fotografia
// (as fotografias não aparecem no site desde 2026-10-02, a pedido do Alexandre).
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

// Sem logótipo (logo: null), o cartão mostra o nome em texto; `sub` é uma segunda linha opcional.
// ACIP e Carvões Mirita (2026-10-02) ainda estão em texto: os sites deles não abriam daqui.
export const CLIENTS: readonly { name: string; logo: string | null; sub?: string }[] = [
  { name: 'Granitos do Norte', logo: '/images/home/clients/logo_gnt.jpeg' },
  { name: 'Granitos Irmãos Peixoto', logo: '/images/home/clients/logo_peixotos.jpeg' },
  { name: 'Pardais', logo: '/images/home/clients/logo_pardais.jpeg' },
  { name: 'ACIP', sub: 'Associação Empresarial de Castelo de Paiva', logo: null },
  { name: 'Futuro Alternativo', logo: '/images/home/clients/futuro-alternativo-logo.jpeg' },
  { name: 'OJP', logo: '/images/home/clients/Logo_OJP.jpeg' },
  { name: 'Carvões Mirita', logo: null },
]

const pt = {
  build: {
    summary:
      'Ilustração animada com dados de exemplo: o pedido de um cliente para registar o ponto sem papel passa a uma arquitetura (aplicações web, telemóvel e tablet ligadas a uma API, aos serviços e à base de dados), o código é escrito e testado, e a aplicação de assiduidade chega ao computador e ao telemóvel, ligada ao ERP e aos salários.',
    steps: ['Ideia', 'Arquitetura', 'Código', 'Entrega'],
    sample: 'dados de exemplo',
    noteKicker: 'O pedido',
    note: 'Registar o ponto de todas as equipas, sem papel',
    url: 'app.suaempresa.pt',
    appTitle: 'Assiduidade',
    newBtn: 'Exportar',
    nav: ['Início', 'Assiduidade', 'Equipas', 'Relatórios'],
    kpis: [
      ['42', 'presentes'],
      ['3', 'atrasos'],
      ['1284 h', 'este mês'],
    ],
    chart: 'Horas por semana',
    list: 'Entradas de hoje',
    clockIn: 'Registar entrada',
    clockedIn: 'Entrada às 08:02',
    pipeline: ['Build', 'Testes', 'Deploy'],
    integrations: ['ERP', 'Salários', 'Calendário'],
    deployed: 'Versão 1.0 publicada',
    deployedText: 'Web, iOS e Android',
    arch: {
      title: 'Arquitetura da solução',
      clients: ['Web', 'iOS e Android', 'Tablet'],
      api: 'API',
      apiSub: 'autenticação',
      services: ['Registos', 'Turnos', 'Relatórios'],
      db: 'Base de dados',
      integrations: 'ERP · Salários',
    },
    pause: 'Pausar a animação',
    play: 'Retomar a animação',
  },
  hero: {
    summary:
      'Ilustração animada com dados de exemplo: o Rui Marques, da Cofragens Tejo, chega à portaria da Obra Marvila, o tablet reconhece-lhe o rosto, a entrada fica registada às 07:42 e o responsável recebe um aviso de que o seguro da Cofragens Tejo expira em 12 dias.',
    detected: 'Trabalhador à entrada',
    company: 'Cofragens Tejo',
    role: 'cofrador',
    verified: 'Rosto verificado',
    verifiedText: 'No tablet da portaria',
    entry: 'Entrada registada às 07:42 na Obra Marvila',
    alert: 'Seguro da Cofragens Tejo expira em 12 dias',
    alertText: 'Aviso ao diretor de obra',
    pause: 'Pausar a animação',
    play: 'Retomar a animação',
  },
  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Fazem software à medida ou vendem produtos?',
      a: 'As duas coisas. Temos quatro produtos próprios (TimeEasier, ConstructionEasier, StockEasier e WoodEasier) e fazemos software à medida para empresas cujos processos nenhum produto cobre.',
    },
    {
      q: 'Os produtos funcionam em conjunto?',
      a: 'Sim. Cada produto funciona sozinho, e o ConstructionEasier já inclui o registo de ponto do TimeEasier.',
    },
    {
      q: 'Como se identifica um trabalhador no tablet?',
      a: 'Toca no ecrã e o tablet reconhece-lhe o rosto. Se não for reconhecido, pode entrar com o PIN.',
    },
    {
      q: 'Quanto custa?',
      a: 'Cada produto tem os planos Base, Avançado e Premium. Um projeto à medida tem uma proposta própria, com âmbito, fases e custo antes de começarmos.',
    },
    {
      q: 'Onde está a equipa?',
      a: 'Em Marco de Canaveses. Desenhamos, desenvolvemos e damos suporte aos produtos e aos projetos à medida.',
    },
  ],
  faqPlans: 'Comparar os planos',
  chaos: {
    title: 'Do caos ao controlo',
    intro: 'Uma manhã numa empresa, antes e depois de um sistema feito à medida. Dados de exemplo.',
    acts: [
      {
        name: 'Caos',
        text: 'Os pedidos vivem numa folha de cálculo, as notas ficam em post-its e em fotografias do quadro, e cada pessoa tem a sua versão.',
      },
      {
        name: 'Pressão',
        text: 'Ninguém sabe ao certo o que está atrasado nem quem é o responsável. O cliente liga antes de o aviso chegar.',
      },
      {
        name: 'Controlo',
        text: 'Cada pedido aparece uma vez, com o responsável, o prazo e o estado. Os avisos passam a resultados.',
      },
    ],
    sheet: {
      file: 'pedidos_clientes_FINAL_v3.xlsx',
      cols: ['Cliente', 'Pedido', 'Responsável', 'Estado', 'Prazo'],
      rows: [
        ['Metalúrgica Ave', 'Orçamento', 'Joana Pinto', 'enviado', '02/10'],
        ['Têxteis Sousa', 'Assistência', 'Rui Lopes', 'atrasado', '—'],
        ['metalurgica ave', 'Orçamento', 'Joana', '—', '02/10'],
        ['Clínica Foz', '—', 'Marta Reis', 'em curso', '03/10'],
        ['Padaria Lima', 'Entrega', 'Hugo Matos', 'em falta', '01/10'],
      ],
      photo: 'Foto do quadro',
      photoTime: '08:51',
      book: 'Post-its',
      bookLines: ['Ligar Sousa!', 'Lima ? sexta', 'Orç. Ave'],
    },
    alerts: ['Cliente à espera de resposta há 3 dias', 'Entrega falhou o prazo', 'Reunião com a direção amanhã'],
    view: {
      title: 'Pedidos, hoje',
      people: [
        { name: 'Joana Pinto', company: 'Metalúrgica Ave, orçamento', time: '02/10', status: 'ok', text: 'Enviado ao cliente' },
        { name: 'Rui Lopes', company: 'Têxteis Sousa, assistência', time: '01/10', status: 'missing', text: 'Atrasado 1 dia' },
        { name: 'Marta Reis', company: 'Clínica Foz, implementação', time: '03/10', status: 'ok', text: 'Dentro do prazo' },
        { name: 'Hugo Matos', company: 'Padaria Lima, entrega', time: '01/10', status: 'soon', text: 'Entrega hoje às 16:00' },
      ],
    },
    results: ['24 pedidos em curso', '9 prazos cumpridos esta semana', '0 pedidos esquecidos'],
  },
  stats: {
    title: 'Em números',
    note: undefined as string | undefined,
    items: [
      { value: 8 as number | null, suffix: '+', label: 'empresas clientes' },
      { value: 10000 as number | null, suffix: '+', label: 'registos de ponto por mês' },
      { value: 4 as number | null, suffix: '+', label: 'anos a fazer software' },
    ],
  },
  carousel: { prev: 'Testemunho anterior', next: 'Testemunho seguinte', pause: 'Pausar os testemunhos', play: 'Retomar os testemunhos', of: '{i} de {n}' },
  h1: 'Fazemos o software que a sua empresa usa no terreno',
  lead: 'Software à medida e quatro produtos próprios, feitos por uma equipa portuguesa.',
  custom: {
    title: 'Software à medida',
    text: 'Quando nenhum produto serve a forma como a sua empresa trabalha, construímos o sistema certo.',
    items: [
      { title: 'Aplicações web', text: 'Plataformas feitas à medida do seu negócio, acessíveis a partir de qualquer lugar.' },
      { title: 'Aplicações móveis', text: 'Apps para iOS e Android, simples de usar por quem trabalha com elas todos os dias.' },
      { title: 'Integrações', text: 'Ligamos o novo sistema às ferramentas que já usa, para a informação circular sem trabalho manual.' },
    ],
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
  teamFacts: ['Jovem e dinâmica', 'Equipa portuguesa', 'Da arquitetura ao suporte'],
  contact: {
    title: 'Fale-nos do processo que quer resolver',
    text: 'Conte-nos onde a sua equipa perde tempo. Respondemos com perguntas concretas e, se fizer sentido, uma proposta.',
    whatsapp: 'WhatsApp',
  },
}

export type HomeDict = typeof pt

const en: HomeDict = {
  build: {
    summary:
      'Animated illustration with sample data: a client request to record attendance without paper becomes an architecture (web, phone and tablet apps connected to an API, services and a database), the code is written and tested, and the attendance app reaches the computer and the phone, connected to the ERP and payroll.',
    steps: ['Idea', 'Architecture', 'Code', 'Launch'],
    sample: 'sample data',
    noteKicker: 'The request',
    note: 'Record attendance for every team, without paper',
    url: 'app.yourcompany.com',
    appTitle: 'Attendance',
    newBtn: 'Export',
    nav: ['Home', 'Attendance', 'Teams', 'Reports'],
    kpis: [
      ['42', 'on site'],
      ['3', 'late'],
      ['1284 h', 'this month'],
    ],
    chart: 'Hours per week',
    list: 'Today’s check-ins',
    clockIn: 'Clock in',
    clockedIn: 'In at 08:02',
    pipeline: ['Build', 'Tests', 'Deploy'],
    integrations: ['ERP', 'Payroll', 'Calendar'],
    deployed: 'Version 1.0 released',
    deployedText: 'Web, iOS and Android',
    arch: {
      title: 'Solution architecture',
      clients: ['Web', 'iOS and Android', 'Tablet'],
      api: 'API',
      apiSub: 'authentication',
      services: ['Check-ins', 'Shifts', 'Reports'],
      db: 'Database',
      integrations: 'ERP · Payroll',
    },
    pause: 'Pause the animation',
    play: 'Resume the animation',
  },
  hero: {
    summary:
      'Animated illustration with sample data: Rui Marques, from Cofragens Tejo, arrives at the Marvila site gate, the tablet recognises his face, the entry is recorded at 07:42 and the manager is told that Cofragens Tejo’s insurance expires in 12 days.',
    detected: 'Worker at the gate',
    company: 'Cofragens Tejo',
    role: 'formwork carpenter',
    verified: 'Face verified',
    verifiedText: 'On the gate tablet',
    entry: 'Entry recorded at 07:42 on the Marvila site',
    alert: 'Cofragens Tejo’s insurance expires in 12 days',
    alertText: 'Notice to the site manager',
    pause: 'Pause the animation',
    play: 'Play the animation',
  },
  faqTitle: 'Frequently asked questions',
  faq: [
    {
      q: 'Do you build custom software or sell products?',
      a: 'Both. We have four products of our own (TimeEasier, ConstructionEasier, StockEasier and WoodEasier) and we build custom software for companies whose processes no product covers.',
    },
    {
      q: 'Do the products work together?',
      a: 'Yes. Each product works on its own, and ConstructionEasier already includes TimeEasier’s time tracking.',
    },
    {
      q: 'How does a worker identify themselves on the tablet?',
      a: 'They tap the screen and the tablet recognises their face. If it doesn’t, they can sign in with their PIN.',
    },
    {
      q: 'How much does it cost?',
      a: 'Each product has Base, Advanced and Premium plans. A custom project gets its own proposal, with scope, phases and cost before we start.',
    },
    {
      q: 'Where is the team?',
      a: 'In Marco de Canaveses, Portugal. We design, build and support both the products and the custom projects.',
    },
  ],
  faqPlans: 'Compare the plans',
  chaos: {
    title: 'From chaos to control',
    intro: 'A morning in a company, before and after a custom-built system. Sample data.',
    acts: [
      {
        name: 'Chaos',
        text: 'Requests live in a spreadsheet, notes end up on sticky notes and photos of the whiteboard, and everyone has their own version.',
      },
      {
        name: 'Pressure',
        text: 'Nobody knows for sure what is late or who is responsible. The client calls before the warning arrives.',
      },
      {
        name: 'Control',
        text: 'Each request appears once, with its owner, deadline and status. Warnings become results.',
      },
    ],
    sheet: {
      file: 'client_requests_FINAL_v3.xlsx',
      cols: ['Client', 'Request', 'Owner', 'Status', 'Due'],
      rows: [
        ['Metalúrgica Ave', 'Quote', 'Joana Pinto', 'sent', '02/10'],
        ['Têxteis Sousa', 'Support', 'Rui Lopes', 'late', '—'],
        ['metalurgica ave', 'Quote', 'Joana', '—', '02/10'],
        ['Clínica Foz', '—', 'Marta Reis', 'in progress', '03/10'],
        ['Padaria Lima', 'Delivery', 'Hugo Matos', 'missing', '01/10'],
      ],
      photo: 'Whiteboard photo',
      photoTime: '08:51',
      book: 'Sticky notes',
      bookLines: ['Call Sousa!', 'Lima ? Friday', 'Ave quote'],
    },
    alerts: ['Client waiting for an answer for 3 days', 'Delivery missed its deadline', 'Board meeting tomorrow'],
    view: {
      title: 'Requests, today',
      people: [
        { name: 'Joana Pinto', company: 'Metalúrgica Ave, quote', time: '02/10', status: 'ok', text: 'Sent to the client' },
        { name: 'Rui Lopes', company: 'Têxteis Sousa, support', time: '01/10', status: 'missing', text: '1 day late' },
        { name: 'Marta Reis', company: 'Clínica Foz, rollout', time: '03/10', status: 'ok', text: 'On schedule' },
        { name: 'Hugo Matos', company: 'Padaria Lima, delivery', time: '01/10', status: 'soon', text: 'Delivery today at 16:00' },
      ],
    },
    results: ['24 requests in progress', '9 deadlines met this week', '0 forgotten requests'],
  },
  stats: {
    title: 'In numbers',
    note: undefined,
    items: [
      { value: 8, suffix: '+', label: 'client companies' },
      { value: 10000, suffix: '+', label: 'clock-ins per month' },
      { value: 4, suffix: '+', label: 'years building software' },
    ],
  },
  carousel: { prev: 'Previous testimonial', next: 'Next testimonial', pause: 'Pause the testimonials', play: 'Play the testimonials', of: '{i} of {n}' },
  h1: 'We build the software your company uses on site',
  lead: 'Custom software and four products of our own, built by a Portuguese team.',
  custom: {
    title: 'Custom software',
    text: 'When no product fits the way your company works, we build the right system.',
    items: [
      { title: 'Web applications', text: 'Platforms built around your business, available from anywhere.' },
      { title: 'Mobile apps', text: 'iOS and Android apps that are simple for the people who use them every day.' },
      { title: 'Integrations', text: 'We connect the new system to the tools you already use, so information flows without manual work.' },
    ],
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
  teamFacts: ['Young and dynamic', 'Portuguese team', 'From architecture to support'],
  contact: {
    title: 'Tell us about the process you want to fix',
    text: 'Tell us where your team loses time. We reply with specific questions and, if it makes sense, a proposal.',
    whatsapp: 'WhatsApp',
  },
}

export const home: Record<Locale, HomeDict> = { pt, en }
