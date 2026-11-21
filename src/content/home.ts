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

// Sem logótipo (logo: null), o cartão mostra o nome em texto; `sub` é uma segunda linha opcional e
// `mark` um símbolo branco num quadrado escuro ao lado do nome (Carvões Mirita só tem a chama).
export const CLIENTS: readonly { name: string; logo: string | null; sub?: string; mark?: string }[] = [
  { name: 'Granitos do Norte', logo: '/images/home/clients/logo_gnt.jpeg' },
  { name: 'Granitos Irmãos Peixoto', logo: '/images/home/clients/logo_peixotos.jpeg' },
  { name: 'Pardais', logo: '/images/home/clients/logo_pardais.jpeg' },
  { name: 'ACI Castelo de Paiva, Associação Comercial e Industrial', logo: '/images/home/clients/logo_aci_castelo_paiva.png' },
  { name: 'Futuro Alternativo', logo: '/images/home/clients/futuro-alternativo-logo.jpeg' },
  { name: 'OJP', logo: '/images/home/clients/Logo_OJP.jpeg' },
  { name: 'Carvões Mirita', logo: null, mark: '/images/home/clients/mirita_chama.png' },
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
      a: 'Não. Cada produto funciona sozinho. O ConstructionEasier já inclui o registo de ponto do TimeEasier.',
    },
    {
      q: 'Como se identifica um trabalhador no tablet?',
      a: 'Toca no ecrã e o tablet reconhece-lhe o rosto. Se não for reconhecido, pode entrar com o PIN.',
    },
    {
      q: 'Quanto custa?',
      a: 'O TimeEasier, o ConstructionEasier e o StockEasier têm os planos Base, Avançado e Premium, e o WoodEasier tem um plano único. O preço depende da empresa e é dado numa proposta. Um projeto à medida tem uma proposta própria, com âmbito, fases e custo antes de começarmos.',
    },
    {
      q: 'Os produtos usam inteligência artificial?',
      a: 'Sim. Já usamos inteligência artificial na leitura de documentos (OCR) e estamos a levá-la a mais partes dos produtos.',
    },
    {
      q: 'Onde está a equipa?',
      a: 'No norte de Portugal, perto do Porto. Desenhamos, desenvolvemos e damos suporte aos produtos e aos projetos à medida.',
    },
  ],
  faqPlans: 'Comparar os planos',
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
    text: 'Feitos e mantidos por nós. Cada um funciona sozinho.',
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
      a: 'No. Each product works on its own. ConstructionEasier already includes TimeEasier’s time tracking.',
    },
    {
      q: 'How does a worker identify themselves on the tablet?',
      a: 'They tap the screen and the tablet recognises their face. If it doesn’t, they can sign in with their PIN.',
    },
    {
      q: 'How much does it cost?',
      a: 'TimeEasier, ConstructionEasier and StockEasier have Base, Advanced and Premium plans, and WoodEasier has a single plan. The price depends on your company and comes in a quote. A custom project gets its own proposal, with scope, phases and cost before we start.',
    },
    {
      q: 'Do your products use artificial intelligence?',
      a: 'Yes. We already use artificial intelligence for document reading (OCR), and we are bringing it to more parts of our products.',
    },
    {
      q: 'Where is the team?',
      a: 'In northern Portugal, near Porto. We design, build and support both the products and the custom projects.',
    },
  ],
  faqPlans: 'Compare the plans',
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
    text: 'Built and maintained by us. Each one works on its own.',
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

const nl: HomeDict = {
  build: {
    summary:
      'Geanimeerde illustratie met voorbeeldgegevens: de vraag van een klant om aanwezigheden zonder papier te registreren wordt vertaald naar een architectuur, de code wordt geschreven en getest, en de applicatie draait op computer en smartphone, gekoppeld aan ERP en loonverwerking.',
    steps: ['Idee', 'Architectuur', 'Code', 'Lancering'],
    sample: 'voorbeeldgegevens',
    noteKicker: 'De vraag',
    note: 'Aanwezigheden voor elk team registreren, zonder papier',
    url: 'app.uwbedrijf.be',
    appTitle: 'Aanwezigheden',
    newBtn: 'Exporteren',
    nav: ['Start', 'Aanwezigheden', 'Teams', 'Rapporten'],
    kpis: [
      ['42', 'aanwezig'],
      ['3', 'te laat'],
      ['1284 u', 'deze maand'],
    ],
    chart: 'Uren per week',
    list: 'Registraties vandaag',
    clockIn: 'Inklokken',
    clockedIn: 'Ingeklokt om 08:02',
    pipeline: ['Build', 'Tests', 'Deploy'],
    integrations: ['ERP', 'Lonen', 'Kalender'],
    deployed: 'Versie 1.0 gelanceerd',
    deployedText: 'Web, iOS en Android',
    arch: {
      title: 'Architectuur van de oplossing',
      clients: ['Web', 'iOS en Android', 'Tablet'],
      api: 'API',
      apiSub: 'authenticatie',
      services: ['Registraties', 'Shiften', 'Rapporten'],
      db: 'Databank',
      integrations: 'ERP · Lonen',
    },
    pause: 'Animatie pauzeren',
    play: 'Animatie hervatten',
  },
  hero: {
    summary:
      'Geanimeerde illustratie met voorbeeldgegevens: Rui Marques van Cofragens Tejo komt aan bij de werfpoort, de tablet herkent zijn gezicht, zijn aankomst wordt geregistreerd om 07:42 en de werfleider krijgt een melding dat de verzekering over 12 dagen vervalt.',
    detected: 'Medewerker aan de poort',
    company: 'Cofragens Tejo',
    role: 'bekister',
    verified: 'Gezicht geverifieerd',
    verifiedText: 'Op de tablet aan de poort',
    entry: 'Aankomst geregistreerd om 07:42 op werf Marvila',
    alert: 'Verzekering van Cofragens Tejo vervalt over 12 dagen',
    alertText: 'Melding voor de projectleider',
    pause: 'Animatie pauzeren',
    play: 'Animatie hervatten',
  },
  faqTitle: 'Veelgestelde vragen',
  faq: [
    {
      q: 'Bouwen jullie software op maat of verkopen jullie producten?',
      a: 'Allebei. We hebben vier eigen producten (TimeEasier, ConstructionEasier, StockEasier en WoodEasier) en we bouwen software op maat voor bedrijven met unieke processen.',
    },
    {
      q: 'Werken de producten samen?',
      a: 'Nee, elk product werkt zelfstandig. ConstructionEasier bevat wel al de tijdregistratie van TimeEasier.',
    },
    {
      q: 'Hoe identificeert een medewerker zich op de tablet?',
      a: 'Hij tikt op het scherm en de tablet herkent zijn gezicht. Lukt dat niet, dan kan hij inloggen met zijn pincode.',
    },
    {
      q: 'Wat kost het?',
      a: 'TimeEasier, ConstructionEasier en StockEasier hebben de plannen Basis, Geavanceerd en Premium, en WoodEasier heeft één plan. De prijs hangt af van uw bedrijf en staat in een offerte op maat. Een maatwerkproject krijgt een eigen offerte met omvang, fasen en prijs voor we starten.',
    },
    {
      q: 'Gebruiken de producten artificiële intelligentie?',
      a: 'Ja. We gebruiken AI nu al voor het uitlezen van documenten (OCR) en breiden dat verder uit in onze producten.',
    },
    {
      q: 'Waar is het team gevestigd?',
      a: 'In het noorden van Portugal, vlak bij Porto. We ontwerpen, bouwen en ondersteunen zowel onze producten als maatwerkprojecten.',
    },
  ],
  faqPlans: 'Plannen vergelijken',
  stats: {
    title: 'In cijfers',
    note: undefined,
    items: [
      { value: 8, suffix: '+', label: 'klantbedrijven' },
      { value: 10000, suffix: '+', label: 'tijdregistraties per maand' },
      { value: 4, suffix: '+', label: 'jaar softwareontwikkeling' },
    ],
  },
  carousel: { prev: 'Vorige getuigenis', next: 'Volgende getuigenis', pause: 'Getuigenissen pauzeren', play: 'Getuigenissen afspelen', of: '{i} van {n}' },
  h1: 'Wij bouwen de software die uw bedrijf op het terrein gebruikt',
  lead: 'Software op maat en vier eigen producten, gebouwd door een Portugees team.',
  custom: {
    title: 'Software op maat',
    text: 'Als geen enkel standaardproduct past bij hoe uw bedrijf werkt, bouwen wij het juiste systeem.',
    items: [
      { title: 'Webapplicaties', text: 'Platformen op maat van uw bedrijf, overal toegankelijk.' },
      { title: 'Mobiele apps', text: 'Apps voor iOS en Android die eenvoudig zijn voor wie er elke dag mee werkt.' },
      { title: 'Integraties', text: 'We koppelen het nieuwe systeem aan uw bestaande tools zodat gegevens automatisch doorstromen.' },
    ],
    link: 'Hoe we software op maat bouwen',
    photoAlt: 'Het GetEasier-team aan het werk op kantoor',
  },
  products: {
    title: 'Onze producten',
    text: 'Door ons gebouwd en onderhouden. Elk product werkt zelfstandig.',
    link: 'Bekijk de vier producten',
    open: (name: string) => `Ontdek ${name}`,
  },
  clientsTitle: 'Bedrijven die met ons werken',
  testimonialsTitle: 'Wat klanten zeggen',
  teamTitle: 'Het team',
  teamText: 'De mensen die uw software ontwerpen, bouwen en ondersteunen.',
  teamLink: 'Over GetEasier',
  teamFacts: ['Jong en dynamisch', 'Portugees team', 'Van architectuur tot support'],
  contact: {
    title: 'Vertel ons welk proces u wilt vereenvoudigen',
    text: 'Vertel waar uw team tijd verliest. We antwoorden met gerichte vragen en, als het past, een voorstel.',
    whatsapp: 'WhatsApp',
  },
}

const es: HomeDict = {
  build: {
    summary:
      'Ilustración animada con datos de ejemplo: la petición de un cliente para fichar sin papel se convierte en una arquitectura, el código se escribe y se prueba, y la app de control horario llega al ordenador y al móvil conectada al ERP y nóminas.',
    steps: ['Idea', 'Arquitectura', 'Código', 'Entrega'],
    sample: 'datos de ejemplo',
    noteKicker: 'El pedido',
    note: 'Registrar la jornada de todos los equipos, sin papel',
    url: 'app.tuempresa.es',
    appTitle: 'Asistencia',
    newBtn: 'Exportar',
    nav: ['Inicio', 'Asistencia', 'Equipos', 'Informes'],
    kpis: [
      ['42', 'presentes'],
      ['3', 'retrasos'],
      ['1284 h', 'este mes'],
    ],
    chart: 'Horas por semana',
    list: 'Entradas de hoy',
    clockIn: 'Fichar entrada',
    clockedIn: 'Entrada a las 08:02',
    pipeline: ['Build', 'Tests', 'Deploy'],
    integrations: ['ERP', 'Nóminas', 'Calendario'],
    deployed: 'Versión 1.0 publicada',
    deployedText: 'Web, iOS y Android',
    arch: {
      title: 'Arquitectura de la solución',
      clients: ['Web', 'iOS y Android', 'Tablet'],
      api: 'API',
      apiSub: 'autenticación',
      services: ['Fichajes', 'Turnos', 'Informes'],
      db: 'Base de datos',
      integrations: 'ERP · Nóminas',
    },
    pause: 'Pausar la animación',
    play: 'Reanudar la animación',
  },
  hero: {
    summary:
      'Ilustración animada con datos de ejemplo: Rui Marques, de Cofragens Tejo, llega al acceso de la obra, la tablet reconoce su rostro, la entrada queda registrada a las 07:42 y el encargado recibe un aviso de que el seguro caduca en 12 días.',
    detected: 'Trabajador en el acceso',
    company: 'Cofragens Tejo',
    role: 'encofrador',
    verified: 'Rostro verificado',
    verifiedText: 'En la tablet de acceso',
    entry: 'Entrada registrada a las 07:42 en Obra Marvila',
    alert: 'El seguro de Cofragens Tejo caduca en 12 días',
    alertText: 'Aviso al jefe de obra',
    pause: 'Pausar la animación',
    play: 'Reanudar la animación',
  },
  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Hacéis software a medida o vendéis productos?',
      a: 'Las dos cosas. Tenemos cuatro productos propios (TimeEasier, ConstructionEasier, StockEasier y WoodEasier) y desarrollamos software a medida para procesos que ningún producto cubre.',
    },
    {
      q: '¿Los productos funcionan juntos?',
      a: 'No. Cada producto funciona por separado. ConstructionEasier ya incluye el control horario de TimeEasier.',
    },
    {
      q: '¿Cómo se identifica un trabajador en la tablet?',
      a: 'Toca la pantalla y la tablet reconoce su rostro. Si no es reconocido, puede entrar con su PIN.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'TimeEasier, ConstructionEasier y StockEasier tienen los planes Base, Avanzado y Premium, y WoodEasier tiene un plan único. El precio depende de la empresa y se entrega en propuesta. Un proyecto a medida tiene su propio presupuesto cerrado por fases.',
    },
    {
      q: '¿Los productos usan inteligencia artificial?',
      a: 'Sí. Ya utilizamos inteligencia artificial en la lectura de documentos (OCR) y la estamos llevando a más áreas.',
    },
    {
      q: '¿Dónde está el equipo?',
      a: 'En el norte de Portugal, cerca de Oporto. Diseñamos, desarrollamos y damos soporte a nuestros productos y proyectos a medida.',
    },
  ],
  faqPlans: 'Comparar los planes',
  stats: {
    title: 'En cifras',
    note: undefined,
    items: [
      { value: 8, suffix: '+', label: 'empresas clientes' },
      { value: 10000, suffix: '+', label: 'fichajes al mes' },
      { value: 4, suffix: '+', label: 'años creando software' },
    ],
  },
  carousel: { prev: 'Testimonio anterior', next: 'Siguiente testimonio', pause: 'Pausar testimonios', play: 'Reanudar testimonios', of: '{i} de {n}' },
  h1: 'Creamos el software que tu empresa usa sobre el terreno',
  lead: 'Software a medida y cuatro productos propios, creados por un equipo portugués.',
  custom: {
    title: 'Software a medida',
    text: 'Cuando ningún producto encaja con la forma de trabajar de tu empresa, construimos el sistema adecuado.',
    items: [
      { title: 'Aplicaciones web', text: 'Plataformas a medida de tu negocio, accesibles desde cualquier lugar.' },
      { title: 'Aplicaciones móviles', text: 'Apps para iOS y Android sencillas para quienes las usan cada día.' },
      { title: 'Integraciones', text: 'Conectamos el nuevo sistema con tus herramientas actuales para evitar trabajo manual.' },
    ],
    link: 'Cómo hacemos software a medida',
    photoAlt: 'El equipo de GetEasier trabajando en la oficina',
  },
  products: {
    title: 'Nuestros productos',
    text: 'Creados y mantenidos por nosotros. Cada uno funciona por separado.',
    link: 'Ver los cuatro productos',
    open: (name: string) => `Conocer ${name}`,
  },
  clientsTitle: 'Empresas que trabajan con nosotros',
  testimonialsTitle: 'Lo que dicen los clientes',
  teamTitle: 'El equipo',
  teamText: 'Las personas que diseñan, desarrollan y dan soporte a tu software.',
  teamLink: 'Sobre GetEasier',
  teamFacts: ['Joven y dinámico', 'Equipo portugués', 'De la arquitectura al soporte'],
  contact: {
    title: 'Háblanos del proceso que quieres resolver',
    text: 'Cuéntanos dónde pierde tiempo tu equipo. Respondemos con preguntas concretas y, si encaja, una propuesta.',
    whatsapp: 'WhatsApp',
  },
}

const fr: HomeDict = {
  build: {
    summary:
      'Illustration animée avec données d’exemple : la demande d’un client pour pointer sans papier devient une architecture, le code est écrit et testé, et l’application arrive sur ordinateur et mobile, connectée à l’ERP et à la paie.',
    steps: ['Idée', 'Architecture', 'Code', 'Livraison'],
    sample: 'données d’exemple',
    noteKicker: 'La demande',
    note: 'Enregistrer le pointage de toutes les équipes, sans papier',
    url: 'app.votreentreprise.fr',
    appTitle: 'Présences',
    newBtn: 'Exporter',
    nav: ['Accueil', 'Présences', 'Équipes', 'Rapports'],
    kpis: [
      ['42', 'présents'],
      ['3', 'retards'],
      ['1284 h', 'ce mois'],
    ],
    chart: 'Heures par semaine',
    list: 'Pointages du jour',
    clockIn: 'Pointer l’entrée',
    clockedIn: 'Entrée à 08:02',
    pipeline: ['Build', 'Tests', 'Deploy'],
    integrations: ['ERP', 'Paie', 'Calendrier'],
    deployed: 'Version 1.0 publiée',
    deployedText: 'Web, iOS et Android',
    arch: {
      title: 'Architecture de la solution',
      clients: ['Web', 'iOS et Android', 'Tablette'],
      api: 'API',
      apiSub: 'authentification',
      services: ['Pointages', 'Horaires', 'Rapports'],
      db: 'Base de données',
      integrations: 'ERP · Paie',
    },
    pause: 'Mettre l’animation en pause',
    play: 'Reprendre l’animation',
  },
  hero: {
    summary:
      'Illustration animée avec données d’exemple : Rui Marques arrive à l’entrée du chantier, la tablette reconnaît son visage, l’entrée est enregistrée à 07:42 et le responsable reçoit une alerte sur l’assurance qui expire dans 12 jours.',
    detected: 'Ouvrier à l’entrée',
    company: 'Cofragens Tejo',
    role: 'coffreur',
    verified: 'Visage vérifié',
    verifiedText: 'Sur la tablette d’entrée',
    entry: 'Entrée enregistrée à 07:42 sur le chantier Marvila',
    alert: 'L’assurance de Cofragens Tejo expire dans 12 jours',
    alertText: 'Alerte au conducteur de travaux',
    pause: 'Mettre l’animation en pause',
    play: 'Reprendre l’animation',
  },
  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Faites-vous du sur-mesure ou vendez-vous des produits ?',
      a: 'Les deux. Nous avons quatre produits propres (TimeEasier, ConstructionEasier, StockEasier et WoodEasier) et nous créons des logiciels sur mesure pour les processus spécifiques.',
    },
    {
      q: 'Les produits fonctionnent-ils ensemble ?',
      a: 'Non. Chaque produit fonctionne de manière autonome. ConstructionEasier intègre déjà le suivi des temps de TimeEasier.',
    },
    {
      q: 'Comment un collaborateur s’identifie-t-il sur la tablette ?',
      a: 'Il touche l’écran et la tablette reconnaît son visage. En cas de besoin, il peut se connecter avec son code PIN.',
    },
    {
      q: 'Combien cela coûte-t-il ?',
      a: 'TimeEasier, ConstructionEasier et StockEasier proposent les formules Base, Avancé et Premium, et WoodEasier une formule unique. Le tarif dépend de votre entreprise sur devis. Un projet sur mesure fait l’objet d’une proposition dédiée.',
    },
    {
      q: 'Vos produits utilisent-ils l’intelligence artificielle ?',
      a: 'Oui. Nous utilisons déjà l’IA pour la lecture de documents (OCR) et l’étendons progressivement à d’autres fonctions.',
    },
    {
      q: 'Où se trouve l’équipe ?',
      a: 'Dans le nord du Portugal, près de Porto. Nous concevons, développons et assurons le support de nos produits et projets sur mesure.',
    },
  ],
  faqPlans: 'Comparer les offres',
  stats: {
    title: 'En chiffres',
    note: undefined,
    items: [
      { value: 8, suffix: '+', label: 'entreprises clientes' },
      { value: 10000, suffix: '+', label: 'pointages par mois' },
      { value: 4, suffix: '+', label: 'ans de développement logiciel' },
    ],
  },
  carousel: { prev: 'Témoignage précédent', next: 'Témoignage suivant', pause: 'Mettre en pause', play: 'Reprendre', of: '{i} sur {n}' },
  h1: 'Nous créons les logiciels que votre entreprise utilise sur le terrain',
  lead: 'Logiciels sur mesure et quatre produits propres, conçus par une équipe portugaise.',
  custom: {
    title: 'Logiciels sur mesure',
    text: 'Quand aucun produit ne correspond à votre façon de travailler, nous construisons le bon système.',
    items: [
      { title: 'Applications web', text: 'Des plateformes adaptées à votre métier, accessibles partout.' },
      { title: 'Applications mobiles', text: 'Des apps iOS et Android simples pour ceux qui les utilisent chaque jour.' },
      { title: 'Intégrations', text: 'Nous connectons le nouveau système à vos outils actuels pour supprimer les saisies manuelles.' },
    ],
    link: 'Notre approche sur mesure',
    photoAlt: 'L’équipe GetEasier au travail au bureau',
  },
  products: {
    title: 'Nos produits',
    text: 'Conçus et maintenus par nos soins. Chacun fonctionne de façon autonome.',
    link: 'Voir les quatre produits',
    open: (name: string) => `Découvrir ${name}`,
  },
  clientsTitle: 'Entreprises qui travaillent avec nous',
  testimonialsTitle: 'Ce que disent nos clients',
  teamTitle: 'L’équipe',
  teamText: 'Les personnes qui conçoivent, développent et assurent le support de votre logiciel.',
  teamLink: 'À propos de GetEasier',
  teamFacts: ['Jeune et dynamique', 'Équipe portugaise', 'De l’architecture au support'],
  contact: {
    title: 'Parlez-nous du processus que vous voulez simplifier',
    text: 'Expliquez-nous où votre équipe perd du temps. Nous répondons avec des questions précises et, si besoin, une proposition.',
    whatsapp: 'WhatsApp',
  },
}

export const home: Record<Locale, HomeDict> = { pt, en, nl, es, fr }
