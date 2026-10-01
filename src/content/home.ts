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
    intro: 'Uma manhã numa obra, antes e depois do ConstructionEasier. Dados de exemplo.',
    acts: [
      {
        name: 'Caos',
        text: 'A lista de trabalhadores vive numa folha de cálculo, os documentos chegam por fotografia no telemóvel e as entradas ficam num livro na portaria.',
      },
      {
        name: 'Pressão',
        text: 'Ninguém sabe ao certo quem está no estaleiro nem que documentos caducaram. Os avisos chegam tarde.',
      },
      {
        name: 'Controlo',
        text: 'Cada pessoa aparece uma vez, com a empresa, a hora de entrada e o estado dos documentos. Os avisos passam a resultados.',
      },
    ],
    sheet: {
      file: 'trabalhadores_obras_FINAL_v3.xlsx',
      cols: ['Nome', 'Empresa', 'Obra', 'Seguro', 'Entrada'],
      rows: [
        ['Rui Marques', 'Cofragens Tejo', 'Marvila', 'válido', '07:42'],
        ['Ana Figueiredo', 'Eletro Douro', 'Marvila', 'caducado', '—'],
        ['rui marques', 'Cofragens Tejo', 'Marvila', '—', '07:42'],
        ['Paulo Sá', '—', 'Marvila', 'válido', '08:05'],
        ['Hugo Tavares', 'Cofragens Tejo', 'Marvila', 'em falta', '07:58'],
      ],
      photo: 'Foto do seguro',
      photoTime: '07:51',
      book: 'Livro de entradas',
      bookLines: ['Rui M. 7h40', 'Paulo ? 8h', 'H. Tavares'],
    },
    alerts: ['Pessoa não identificada no estaleiro', 'Seguro do subempreiteiro caducou', 'Inspeção da ACT amanhã'],
    view: {
      title: 'Obra Marvila, hoje',
      people: [
        { name: 'Rui Marques', company: 'Cofragens Tejo', time: '07:42', status: 'ok', text: 'Documentos em dia' },
        { name: 'Ana Figueiredo', company: 'Eletro Douro', time: '07:55', status: 'missing', text: 'Seguro caducado' },
        { name: 'Paulo Sá', company: 'Eletro Douro', time: '08:05', status: 'ok', text: 'Documentos em dia' },
        { name: 'Hugo Tavares', company: 'Cofragens Tejo', time: '07:58', status: 'soon', text: 'Seguro expira em 12 dias' },
      ],
    },
    results: ['38 entradas verificadas hoje', '12 documentos validados', '0 pessoas sem registo'],
  },
  stats: {
    title: 'Em números',
    note: '[CONFIRMAR] Os três números entram quando forem confirmados.',
    items: [
      { value: null as number | null, suffix: '', label: 'empresas clientes' },
      { value: null as number | null, suffix: '', label: 'registos de ponto por mês' },
      { value: null as number | null, suffix: '', label: 'anos a fazer software' },
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
  clientsPause: { pause: 'Pausar os logótipos', play: 'Retomar os logótipos' },
  testimonialsTitle: 'O que dizem os clientes',
  teamTitle: 'A equipa',
  teamText: 'As pessoas que desenham, desenvolvem e dão suporte ao seu software.',
  teamLink: 'Sobre a GetEasier',
  teamFacts: ['Marco de Canaveses', 'Equipa portuguesa', 'Do desenho ao suporte'],
  contact: {
    title: 'Fale-nos do processo que quer resolver',
    text: 'Conte-nos onde a sua equipa perde tempo. Respondemos com perguntas concretas e, se fizer sentido, uma proposta.',
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
    intro: 'A morning on a construction site, before and after ConstructionEasier. Sample data.',
    acts: [
      {
        name: 'Chaos',
        text: 'The worker list lives in a spreadsheet, documents arrive as phone photos and entries go into a book at the gate.',
      },
      {
        name: 'Pressure',
        text: 'Nobody knows for sure who is on site or which documents have expired. Warnings arrive late.',
      },
      {
        name: 'Control',
        text: 'Each person appears once, with their company, entry time and document status. Warnings become results.',
      },
    ],
    sheet: {
      file: 'site_workers_FINAL_v3.xlsx',
      cols: ['Name', 'Company', 'Site', 'Insurance', 'Entry'],
      rows: [
        ['Rui Marques', 'Cofragens Tejo', 'Marvila', 'valid', '07:42'],
        ['Ana Figueiredo', 'Eletro Douro', 'Marvila', 'expired', '—'],
        ['rui marques', 'Cofragens Tejo', 'Marvila', '—', '07:42'],
        ['Paulo Sá', '—', 'Marvila', 'valid', '08:05'],
        ['Hugo Tavares', 'Cofragens Tejo', 'Marvila', 'missing', '07:58'],
      ],
      photo: 'Insurance photo',
      photoTime: '07:51',
      book: 'Entry book',
      bookLines: ['Rui M. 7h40', 'Paulo ? 8h', 'H. Tavares'],
    },
    alerts: ['Unidentified person on site', 'Subcontractor insurance has expired', 'Labour inspection tomorrow'],
    view: {
      title: 'Marvila site, today',
      people: [
        { name: 'Rui Marques', company: 'Cofragens Tejo', time: '07:42', status: 'ok', text: 'Documents up to date' },
        { name: 'Ana Figueiredo', company: 'Eletro Douro', time: '07:55', status: 'missing', text: 'Insurance expired' },
        { name: 'Paulo Sá', company: 'Eletro Douro', time: '08:05', status: 'ok', text: 'Documents up to date' },
        { name: 'Hugo Tavares', company: 'Cofragens Tejo', time: '07:58', status: 'soon', text: 'Insurance expires in 12 days' },
      ],
    },
    results: ['38 entries verified today', '12 documents validated', '0 people without a record'],
  },
  stats: {
    title: 'In numbers',
    note: '[CONFIRMAR] The three numbers go in once they are confirmed.',
    items: [
      { value: null as number | null, suffix: '', label: 'client companies' },
      { value: null as number | null, suffix: '', label: 'clock-ins per month' },
      { value: null as number | null, suffix: '', label: 'years building software' },
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
  clientsPause: { pause: 'Pause the logos', play: 'Resume the logos' },
  testimonialsTitle: 'What clients say',
  teamTitle: 'The team',
  teamText: 'The people who design, build and support your software.',
  teamLink: 'About GetEasier',
  teamFacts: ['Marco de Canaveses, Portugal', 'Portuguese team', 'From design to support'],
  contact: {
    title: 'Tell us about the process you want to fix',
    text: 'Tell us where your team loses time. We reply with specific questions and, if it makes sense, a proposal.',
  },
}

export const home: Record<Locale, HomeDict> = { pt, en }
