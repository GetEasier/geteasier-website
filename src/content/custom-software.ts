import type { Locale } from '@/lib/seo.config'

// Capacidade técnica: secção 1 do briefing (sem IA, por decisão do Alexandre a 29/09/2026).
// Revisão de 01/10: textos curtos, uma linha por cartão; o visual faz o resto. A arquitetura é um
// exemplo genérico de um sistema de gestão (não os nossos produtos). Sem tecnologia nem testemunho (Alexandre, 01/10).

const pt = {
  h1: 'Software feito à volta da forma como a sua empresa trabalha',
  lead: [
    'Quando um produto pronto obriga a sua equipa a mudar a forma de trabalhar, faz sentido construir o sistema certo.',
  ],
  heroArch: 'Ver a arquitetura',
  hero: {
    caption:
      'Animação: uma aplicação de gestão ganha módulos um a um (encomendas, aprovações, equipas, faturação e relatórios) e o ecrã principal mostra cada módulo a funcionar. Dados fictícios.',
    url: 'gestao.suaempresa.pt',
    modules: ['Encomendas', 'Aprovações', 'Equipas', 'Faturação', 'Relatórios'],
    orders: [
      ['#1042', 'Metalúrgica Ave', 'Enviada'],
      ['#1043', 'Têxteis Sousa', 'Em preparação'],
      ['#1044', 'Clínica Foz', 'Nova'],
    ],
    approval: { title: 'Pedido de compra', value: '1 240 €', who: 'Marta R. · Compras', approve: 'Aprovar', approved: 'Aprovado' },
    teams: { title: 'Equipas hoje', items: ['Equipa A · Braga', 'Equipa B · Porto', 'Equipa C · Penafiel'] },
    invoice: { title: 'Fatura FT 2026/318', client: 'Padaria Lima', total: '860,40 €', sent: 'Enviada ao cliente' },
    reports: { title: 'Vendas por mês', kpis: [['Encomendas', '312'], ['Em atraso', '4']] },
  },
  buildTitle: 'O que construímos',
  build: [
    { term: 'Aplicações web de gestão', desc: 'Back-offices, portais e aprovações que seguem os passos da sua equipa.' },
    { term: 'Apps para iOS e Android', desc: 'Para quem trabalha no terreno, como a app do TimeEasier.' },
    { term: 'Integrações', desc: 'Ligação ao ERP, aos salários e a sistemas públicos, sem copiar dados à mão.' },
    { term: 'Plataformas para várias empresas', desc: 'Um sistema, vários clientes, cada um com os seus dados e permissões.' },
    { term: 'Acompanhamento e suporte', desc: 'Ficamos depois da entrega para evoluir o sistema consigo.' },
  ],
  buildCta: { term: 'Tem outra ideia?', desc: 'Conte-nos o que precisa.' },
  mocks: {
    mobile: { title: 'Tarefas de hoje', items: ['Instalação · Braga', 'Visita · Porto', 'Entrega · Penafiel'], done: 'Concluído' },
    integrations: { center: 'O seu sistema', nodes: ['ERP', 'Salários', 'Finanças', 'Banco'] },
    tenants: ['Empresa A', 'Empresa B', 'Empresa C'],
    support: ['Podem acrescentar um relatório de vendas por loja?', 'Sim. Já está publicado ✓'],
  },
  processTitle: 'Como trabalhamos',
  process: [
    { term: 'Descoberta', desc: 'Ouvimos quem vai usar o sistema e vemos onde se perde tempo.' },
    { term: 'Proposta e arquitetura', desc: 'Âmbito, arquitetura, fases e custo, antes de programar.' },
    { term: 'Desenvolvimento em sprints', desc: 'Ciclos curtos com demonstrações regulares. Pode mudar prioridades.' },
    { term: 'Entrega', desc: 'Pomos o sistema em produção e acompanhamos o arranque.' },
    { term: 'Manutenção e evolução', desc: 'Corrigimos, atualizamos e acrescentamos funcionalidades.' },
  ],
  archTitle: 'Um sistema de gestão, por dentro',
  archIntro: 'Um exemplo do que desenhamos para uma empresa com vários departamentos. Cada camada tem uma função.',
  archFigure:
    'Diagrama de arquitetura de um sistema de gestão: os canais (web, app móvel, portal de clientes e quiosque) passam por uma camada de acesso com login único e permissões, que chama os serviços de encomendas, faturação, stock, RH e aprovações. Os serviços comunicam por eventos e guardam os dados numa base de dados, em ficheiros e em cache, e ligam-se ao ERP, ao banco, às Finanças e ao e-mail e SMS. Tudo corre com publicação automática, métricas, alertas e cópias de segurança.',
  arch: [
    { key: 'channels', term: 'Canais', desc: 'Web, app móvel, portal de clientes e quiosque. Cada pessoa usa o ecrã que lhe dá jeito.' },
    { key: 'access', term: 'Acesso e permissões', desc: 'Um login para tudo, com perfis por departamento, equipa e empresa.' },
    { key: 'services', term: 'Serviços de negócio', desc: 'Encomendas, faturação, stock, RH e aprovações, cada um com as suas regras.' },
    { key: 'data', term: 'Dados e eventos', desc: 'Os serviços falam por eventos e cada dado fica guardado uma vez, no sítio certo.' },
    { key: 'integrations', term: 'Integrações', desc: 'ERP, banco, Finanças, e-mail e SMS, sem copiar dados à mão.' },
    { key: 'ops', term: 'Operação', desc: 'Publicação automática, métricas, alertas e cópias de segurança.' },
  ],
  archLabels: {
    channels: ['Web', 'App móvel', 'Portal clientes', 'Quiosque'],
    access: 'Acesso · login único · permissões',
    services: ['Encomendas', 'Faturação', 'Stock', 'RH', 'Aprovações'],
    bus: 'eventos',
    data: ['Base de dados', 'Ficheiros', 'Cache'],
    integrations: ['ERP', 'Banco', 'Finanças', 'E-mail/SMS'],
    ops: 'CI/CD · métricas · alertas · cópias de segurança',
  },
  faqTitle: 'Perguntas frequentes',
  faqText: 'Não encontra a sua pergunta? Fale connosco.',
  faq: [
    {
      q: 'Quanto tempo demora um projeto?',
      a: 'Depende do âmbito. A proposta inclui as fases e o prazo de cada uma, e como trabalhamos em sprints curtos vê resultados desde o início.',
    },
    { q: 'Quanto custa?', a: 'Cada projeto tem uma proposta própria, com âmbito, fases e custo, antes de começarmos a programar.' },
    {
      q: 'Quem fica com o código e os dados?',
      a: 'Os dados são sempre da sua empresa. A propriedade do código e a forma de o entregar ficam definidas na proposta.',
    },
    {
      q: 'Podem melhorar um sistema que já temos?',
      a: 'Sim. Começamos por perceber o que existe e propomos o que faz mais sentido: evoluir, integrar ou substituir.',
    },
    { q: 'E depois da entrega?', a: 'Continuamos consigo: suporte, correções, atualizações e novas funcionalidades.' },
  ],
}

export type CustomSoftwareDict = typeof pt

const en: CustomSoftwareDict = {
  h1: 'Software built around the way your company works',
  lead: [
    'When an off-the-shelf product forces your team to change how it works, it makes sense to build the right system instead.',
  ],
  heroArch: 'See the architecture',
  hero: {
    caption:
      'Animation: a management application gains modules one by one (orders, approvals, teams, invoicing and reports) and the main screen shows each module at work. Sample data.',
    url: 'manage.yourcompany.com',
    modules: ['Orders', 'Approvals', 'Teams', 'Invoicing', 'Reports'],
    orders: [
      ['#1042', 'Metalúrgica Ave', 'Shipped'],
      ['#1043', 'Têxteis Sousa', 'Preparing'],
      ['#1044', 'Clínica Foz', 'New'],
    ],
    approval: { title: 'Purchase request', value: '€1,240', who: 'Marta R. · Purchasing', approve: 'Approve', approved: 'Approved' },
    teams: { title: 'Teams today', items: ['Team A · Braga', 'Team B · Porto', 'Team C · Penafiel'] },
    invoice: { title: 'Invoice FT 2026/318', client: 'Padaria Lima', total: '€860.40', sent: 'Sent to the client' },
    reports: { title: 'Sales per month', kpis: [['Orders', '312'], ['Late', '4']] },
  },
  buildTitle: 'What we build',
  build: [
    { term: 'Web applications for management', desc: 'Back offices, portals and approvals that follow the steps your team takes.' },
    { term: 'iOS and Android apps', desc: 'For people who work in the field, like the TimeEasier app.' },
    { term: 'Integrations', desc: 'Links to your ERP, payroll and public systems, so nobody copies data by hand.' },
    { term: 'Platforms for many companies', desc: 'One system, many clients, each with its own data and permissions.' },
    { term: 'Follow-up and support', desc: 'We stay after delivery to keep improving the system with you.' },
  ],
  buildCta: { term: 'Got another idea?', desc: 'Tell us what you need.' },
  mocks: {
    mobile: { title: 'Today’s tasks', items: ['Install · Braga', 'Visit · Porto', 'Delivery · Penafiel'], done: 'Done' },
    integrations: { center: 'Your system', nodes: ['ERP', 'Payroll', 'Tax', 'Bank'] },
    tenants: ['Company A', 'Company B', 'Company C'],
    support: ['Could you add a sales report per shop?', 'Yes. It is live now ✓'],
  },
  processTitle: 'How we work',
  process: [
    { term: 'Discovery', desc: 'We listen to the people who will use the system and see where time gets lost.' },
    { term: 'Proposal and architecture', desc: 'Scope, architecture, phases and cost, before any coding.' },
    { term: 'Development in sprints', desc: 'Short cycles with regular demos. You can change priorities.' },
    { term: 'Delivery', desc: 'We put the system into production and stay through the start.' },
    { term: 'Maintenance and evolution', desc: 'We fix, update and add features.' },
  ],
  archTitle: 'A management system, inside',
  archIntro: 'An example of what we design for a company with several departments. Each layer has one job.',
  archFigure:
    'Architecture diagram of a management system: the channels (web, mobile app, customer portal and kiosk) go through an access layer with single sign-on and permissions, which calls the orders, invoicing, stock, HR and approvals services. The services talk through events and keep data in a database, in files and in a cache, and connect to the ERP, the bank, the tax authority and e-mail and SMS. Everything runs with automated releases, metrics, alerts and backups.',
  arch: [
    { key: 'channels', term: 'Channels', desc: 'Web, mobile app, customer portal and kiosk. Everyone uses the screen that suits them.' },
    { key: 'access', term: 'Access and permissions', desc: 'One login for everything, with profiles per department, team and company.' },
    { key: 'services', term: 'Business services', desc: 'Orders, invoicing, stock, HR and approvals, each with its own rules.' },
    { key: 'data', term: 'Data and events', desc: 'Services talk through events and each piece of data is stored once, in the right place.' },
    { key: 'integrations', term: 'Integrations', desc: 'ERP, bank, tax authority, e-mail and SMS, with no copying by hand.' },
    { key: 'ops', term: 'Operations', desc: 'Automated releases, metrics, alerts and backups.' },
  ],
  archLabels: {
    channels: ['Web', 'Mobile app', 'Customer portal', 'Kiosk'],
    access: 'Access · single sign-on · permissions',
    services: ['Orders', 'Invoicing', 'Stock', 'HR', 'Approvals'],
    bus: 'events',
    data: ['Database', 'Files', 'Cache'],
    integrations: ['ERP', 'Bank', 'Tax', 'E-mail/SMS'],
    ops: 'CI/CD · metrics · alerts · backups',
  },
  faqTitle: 'Frequently asked questions',
  faqText: 'Can’t find your question? Talk to us.',
  faq: [
    {
      q: 'How long does a project take?',
      a: 'It depends on the scope. The proposal includes the phases and the timeline of each one, and since we work in short sprints you see results from the start.',
    },
    { q: 'How much does it cost?', a: 'Each project has its own proposal, with scope, phases and cost, before we start coding.' },
    {
      q: 'Who owns the code and the data?',
      a: 'The data always belongs to your company. Code ownership and how it is handed over are set out in the proposal.',
    },
    {
      q: 'Can you improve a system we already have?',
      a: 'Yes. We start by understanding what exists and suggest what makes most sense: evolve it, integrate it or replace it.',
    },
    { q: 'What happens after delivery?', a: 'We stay with you: support, fixes, updates and new features.' },
  ],
}

const nl: CustomSoftwareDict = {
  h1: 'Software gebouwd rond de manier waarop uw bedrijf werkt',
  lead: [
    'Wanneer een standaardproduct uw team dwingt om zijn manier van werken aan te passen, is het zinvol om het juiste systeem te bouwen.',
  ],
  heroArch: 'Bekijk de architectuur',
  hero: {
    caption:
      'Animatie: een beheerapplicatie krijgt één voor één modules (bestellingen, goedkeuringen, teams, facturatie en rapporten) en het hoofdscherm toont elke module in werking. Voorbeeldgegevens.',
    url: 'beheer.uwbedrijf.be',
    modules: ['Bestellingen', 'Goedkeuringen', 'Teams', 'Facturatie', 'Rapporten'],
    orders: [
      ['#1042', 'Metalúrgica Ave', 'Verzonden'],
      ['#1043', 'Têxteis Sousa', 'In voorbereiding'],
      ['#1044', 'Clínica Foz', 'Nieuw'],
    ],
    approval: { title: 'Aankoopaanvraag', value: '€ 1.240', who: 'Marta R. · Aankoop', approve: 'Goedkeuren', approved: 'Goedgekeurd' },
    teams: { title: 'Teams vandaag', items: ['Team A · Braga', 'Team B · Porto', 'Team C · Penafiel'] },
    invoice: { title: 'Factuur FT 2026/318', client: 'Padaria Lima', total: '€ 860,40', sent: 'Verzonden naar klant' },
    reports: { title: 'Verkoop per maand', kpis: [['Bestellingen', '312'], ['Te laat', '4']] },
  },
  buildTitle: 'Wat we bouwen',
  build: [
    { term: 'Webapplicaties voor beheer', desc: 'Back-offices, portalen en goedkeuringsstromen die de stappen van uw team volgen.' },
    { term: 'Apps voor iOS en Android', desc: 'Voor medewerkers op de werkvloer of op verplaatsing, zoals de TimeEasier-app.' },
    { term: 'Integraties', desc: 'Koppelingen met uw ERP, loonverwerking en overheidssystemen zonder handmatig overtypen.' },
    { term: 'Platformen voor meerdere bedrijven', desc: 'Eén systeem, meerdere klanten, elk met eigen gegevens en rechten.' },
    { term: 'Opvolging en ondersteuning', desc: 'We blijven na de oplevering aan boord om het systeem samen verder te laten groeien.' },
  ],
  buildCta: { term: 'Een ander idee?', desc: 'Vertel ons wat u nodig heeft.' },
  mocks: {
    mobile: { title: 'Taken van vandaag', items: ['Installatie · Braga', 'Bezoek · Porto', 'Levering · Penafiel'], done: 'Afgerond' },
    integrations: { center: 'Uw systeem', nodes: ['ERP', 'Lonen', 'Fiscus', 'Bank'] },
    tenants: ['Bedrijf A', 'Bedrijf B', 'Bedrijf C'],
    support: ['Kunnen jullie een verkooprapport per vestiging toevoegen?', 'Ja. Het staat al live ✓'],
  },
  processTitle: 'Hoe we werken',
  process: [
    { term: 'Verkenning', desc: 'We luisteren naar wie het systeem gaat gebruiken en zien waar tijd verloren gaat.' },
    { term: 'Offerte en architectuur', desc: 'Omvang, architectuur, fasen en kostprijs, nog voor we beginnen te coderen.' },
    { term: 'Ontwikkeling in sprints', desc: 'Korte cycli met regelmatige demo’s. Prioriteiten kunnen bijgestuurd worden.' },
    { term: 'Oplevering', desc: 'We zetten het systeem in productie en begeleiden de opstart.' },
    { term: 'Onderhoud en evolutie', desc: 'We lossen op, werken bij en voegen nieuwe functies toe.' },
  ],
  archTitle: 'Een beheersysteem van binnenuit',
  archIntro: 'Een voorbeeld van wat we ontwerpen voor een bedrijf met meerdere afdelingen. Elke laag heeft een eigen functie.',
  archFigure:
    'Architectuurdiagram van een beheersysteem: de kanalen (web, mobiele app, klantenportaal en kiosk) lopen via een toegangslaag met single sign-on en rechten, die de diensten voor bestellingen, facturatie, stock, HR en goedkeuringen aanroept. De diensten communiceren via events, bewaren de gegevens in een databank, in bestanden en in cache, en koppelen met het ERP, de bank, de fiscus en e-mail en sms. Alles draait met automatische uitrol, statistieken, meldingen en back-ups.',
  arch: [
    { key: 'channels', term: 'Kanalen', desc: 'Web, mobiele app, klantenportaal en kiosk. Iedereen gebruikt het scherm dat past.' },
    { key: 'access', term: 'Toegang en rechten', desc: 'Eén login voor alles, met profielen per afdeling, team en bedrijf.' },
    { key: 'services', term: 'Bedrijfsdiensten', desc: 'Bestellingen, facturatie, stock, HR en goedkeuringen, elk met eigen regels.' },
    { key: 'data', term: 'Gegevens en events', desc: 'Diensten praten via events en elk gegeven wordt één keer op de juiste plek bewaard.' },
    { key: 'integrations', term: 'Integraties', desc: 'ERP, bank, fiscus, e-mail en sms, zonder gegevens handmatig over te typen.' },
    { key: 'ops', term: 'Operaties', desc: 'Automatische uitrol, statistieken, meldingen en back-ups.' },
  ],
  archLabels: {
    channels: ['Web', 'Mobiele app', 'Klantenportaal', 'Kiosk'],
    access: 'Toegang · single sign-on · rechten',
    services: ['Bestellingen', 'Facturatie', 'Stock', 'HR', 'Goedkeuringen'],
    bus: 'events',
    data: ['Databank', 'Bestanden', 'Cache'],
    integrations: ['ERP', 'Bank', 'Fiscus', 'E-mail/SMS'],
    ops: 'CI/CD · statistieken · meldingen · back-ups',
  },
  faqTitle: 'Veelgestelde vragen',
  faqText: 'Vindt u uw vraag niet? Neem contact op.',
  faq: [
    {
      q: 'Hoe lang duurt een project?',
      a: 'Dat hangt af van de omvang. De offerte bevat de fasen en de termijn van elke fase, en omdat we in korte sprints werken ziet u vanaf het begin resultaat.',
    },
    { q: 'Wat kost het?', a: 'Elk project krijgt een eigen offerte met omvang, fasen en prijs voordat we beginnen te ontwikkelen.' },
    {
      q: 'Wie is eigenaar van de code en de gegevens?',
      a: 'De gegevens zijn altijd van uw bedrijf. Het eigendom van de code en de overdracht leggen we vast in de offerte.',
    },
    {
      q: 'Kunnen jullie een bestaand systeem verbeteren?',
      a: 'Ja. We bekijken eerst wat er al bestaat en stellen voor wat het meest zinvol is: uitbreiden, koppelen of vervangen.',
    },
    { q: 'En na de oplevering?', a: 'We blijven u ondersteunen: support, aanpassingen, updates en nieuwe functies.' },
  ],
}

const es: CustomSoftwareDict = {
  h1: 'Software diseñado en torno a la forma en que trabaja tu empresa',
  lead: [
    'Cuando un producto estándar obliga a tu equipo a cambiar su forma de trabajar, tiene sentido construir el sistema adecuado.',
  ],
  heroArch: 'Ver la arquitectura',
  hero: {
    caption:
      'Animación: una aplicación de gestión incorpora módulos uno a uno (pedidos, aprobaciones, equipos, facturación e informes) y la pantalla principal muestra cada módulo en funcionamiento. Datos de ejemplo.',
    url: 'gestion.tuempresa.es',
    modules: ['Pedidos', 'Aprobaciones', 'Equipos', 'Facturación', 'Informes'],
    orders: [
      ['#1042', 'Metalúrgica Ave', 'Enviado'],
      ['#1043', 'Têxteis Sousa', 'En preparación'],
      ['#1044', 'Clínica Foz', 'Nuevo'],
    ],
    approval: { title: 'Solicitud de compra', value: '1.240 €', who: 'Marta R. · Compras', approve: 'Aprobar', approved: 'Aprobado' },
    teams: { title: 'Equipos hoy', items: ['Equipo A · Braga', 'Equipo B · Oporto', 'Equipo C · Penafiel'] },
    invoice: { title: 'Factura FT 2026/318', client: 'Padaria Lima', total: '860,40 €', sent: 'Enviada al cliente' },
    reports: { title: 'Ventas por mes', kpis: [['Pedidos', '312'], ['Con retraso', '4']] },
  },
  buildTitle: 'Qué construimos',
  build: [
    { term: 'Aplicaciones web de gestión', desc: 'Back-offices, portales y flujos de aprobación que siguen los pasos de tu equipo.' },
    { term: 'Apps para iOS y Android', desc: 'Para quienes trabajan sobre el terreno, como la app de TimeEasier.' },
    { term: 'Integraciones', desc: 'Conexión con tu ERP, nóminas y organismos públicos sin copiar datos a mano.' },
    { term: 'Plataformas multiempresa', desc: 'Un sistema, múltiples clientes, cada uno con sus propios datos y permisos.' },
    { term: 'Acompañamiento y soporte', desc: 'Nos quedamos tras la entrega para evolucionar el sistema contigo.' },
  ],
  buildCta: { term: '¿Tienes otra idea?', desc: 'Cuéntanos qué necesitas.' },
  mocks: {
    mobile: { title: 'Tareas de hoy', items: ['Instalación · Braga', 'Visita · Oporto', 'Entrega · Penafiel'], done: 'Completado' },
    integrations: { center: 'Tu sistema', nodes: ['ERP', 'Nóminas', 'Hacienda', 'Banco'] },
    tenants: ['Empresa A', 'Empresa B', 'Empresa C'],
    support: ['¿Podéis añadir un informe de ventas por tienda?', 'Sí. Ya está publicado ✓'],
  },
  processTitle: 'Cómo trabajamos',
  process: [
    { term: 'Descubrimiento', desc: 'Escuchamos a quienes usarán el sistema y vemos dónde se pierde tiempo.' },
    { term: 'Propuesta y arquitectura', desc: 'Alcance, arquitectura, fases y coste antes de empezar a programar.' },
    { term: 'Desarrollo en sprints', desc: 'Ciclos cortos con demostraciones periódicas. Puedes cambiar prioridades.' },
    { term: 'Entrega', desc: 'Ponemos el sistema en producción y acompañamos el arranque.' },
    { term: 'Mantenimiento y evolución', desc: 'Corregimos, actualizamos y añadimos nuevas funcionalidades.' },
  ],
  archTitle: 'Un sistema de gestión por dentro',
  archIntro: 'Un ejemplo de lo que diseñamos para una empresa con varios departamentos. Cada capa tiene una función.',
  archFigure:
    'Diagrama de arquitectura de un sistema de gestión: los canales (web, app móvil, portal de clientes y quiosco) pasan por una capa de acceso con inicio de sesión único y permisos, que llama a los servicios de pedidos, facturación, stock, RR. HH. y aprobaciones. Los servicios se comunican mediante eventos, guardan los datos en una base de datos, en archivos y en caché, y se conectan con el ERP, el banco, Hacienda y el correo y SMS. Todo funciona con publicación automática, métricas, alertas y copias de seguridad.',
  arch: [
    { key: 'channels', term: 'Canales', desc: 'Web, app móvil, portal de clientes y quiosco. Cada persona usa la pantalla que necesita.' },
    { key: 'access', term: 'Acceso y permisos', desc: 'Un inicio de sesión para todo, con perfiles por departamento, equipo y empresa.' },
    { key: 'services', term: 'Servicios de negocio', desc: 'Pedidos, facturación, stock, RR. HH. y aprobaciones, cada uno con sus reglas.' },
    { key: 'data', term: 'Datos y eventos', desc: 'Los servicios hablan mediante eventos y cada dato se guarda una sola vez, en el sitio correcto.' },
    { key: 'integrations', term: 'Integraciones', desc: 'ERP, banco, Hacienda, correo y SMS, sin copiar datos a mano.' },
    { key: 'ops', term: 'Operación', desc: 'Publicación automática, métricas, alertas y copias de seguridad.' },
  ],
  archLabels: {
    channels: ['Web', 'App móvil', 'Portal clientes', 'Quiosco'],
    access: 'Acceso · login único · permisos',
    services: ['Pedidos', 'Facturación', 'Stock', 'RR. HH.', 'Aprobaciones'],
    bus: 'eventos',
    data: ['Base de datos', 'Archivos', 'Caché'],
    integrations: ['ERP', 'Banco', 'Hacienda', 'Email/SMS'],
    ops: 'CI/CD · métricas · alertas · copias de seguridad',
  },
  faqTitle: 'Preguntas frecuentes',
  faqText: '¿No encuentras tu pregunta? Háblanos.',
  faq: [
    {
      q: '¿Cuánto tarda un proyecto?',
      a: 'Depende del alcance. La propuesta incluye las fases y el plazo de cada una, y como trabajamos en sprints cortos ves resultados desde el inicio.',
    },
    { q: '¿Cuánto cuesta?', a: 'Cada proyecto tiene su propia propuesta, con alcance, fases y coste antes de empezar a programar.' },
    {
      q: '¿Quién se queda con el código y los datos?',
      a: 'Los datos son siempre de tu empresa. La propiedad del código y su entrega quedan definidas en la propuesta.',
    },
    {
      q: '¿Podéis mejorar un sistema que ya tenemos?',
      a: 'Sí. Empezamos entendiendo lo que existe y proponemos lo que tiene más sentido: evolucionarlo, integrarlo o sustituirlo.',
    },
    { q: '¿Y después de la entrega?', a: 'Seguimos contigo: soporte, correcciones, actualizaciones y nuevas funcionalidades.' },
  ],
}

const fr: CustomSoftwareDict = {
  h1: 'Un logiciel conçu autour de la façon dont votre entreprise travaille',
  lead: [
    'Quand un produit standard oblige votre équipe à changer sa façon de travailler, il est logique de construire le bon système.',
  ],
  heroArch: 'Voir l’architecture',
  hero: {
    caption:
      'Animation : une application de gestion intègre des modules un par un (commandes, validations, équipes, facturation et rapports) et l’écran principal montre chaque module en action. Données fictives.',
    url: 'gestion.votreentreprise.fr',
    modules: ['Commandes', 'Validations', 'Équipes', 'Facturation', 'Rapports'],
    orders: [
      ['#1042', 'Metalúrgica Ave', 'Expédiée'],
      ['#1043', 'Têxteis Sousa', 'En préparation'],
      ['#1044', 'Clínica Foz', 'Nouvelle'],
    ],
    approval: { title: 'Demande d’achat', value: '1 240 €', who: 'Marta R. · Achats', approve: 'Valider', approved: 'Validé' },
    teams: { title: 'Équipes aujourd’hui', items: ['Équipe A · Braga', 'Équipe B · Porto', 'Équipe C · Penafiel'] },
    invoice: { title: 'Facture FT 2026/318', client: 'Padaria Lima', total: '860,40 €', sent: 'Envoyée au client' },
    reports: { title: 'Ventes par mois', kpis: [['Commandes', '312'], ['En retard', '4']] },
  },
  buildTitle: 'Ce que nous construisons',
  build: [
    { term: 'Applications web de gestion', desc: 'Back-offices, portails et circuits de validation adaptés aux étapes de votre équipe.' },
    { term: 'Apps iOS et Android', desc: 'Pour ceux qui travaillent sur le terrain, comme l’application TimeEasier.' },
    { term: 'Intégrations', desc: 'Connexion à votre ERP, à la paie et aux systèmes publics, sans ressaisie manuelle.' },
    { term: 'Plateformes multi-entreprises', desc: 'Un seul système, plusieurs clients, chacun avec ses données et ses droits.' },
    { term: 'Suivi et support', desc: 'Nous restons après la livraison pour faire évoluer le système avec vous.' },
  ],
  buildCta: { term: 'Une autre idée ?', desc: 'Dites-nous ce dont vous avez besoin.' },
  mocks: {
    mobile: { title: 'Tâches du jour', items: ['Installation · Braga', 'Visite · Porto', 'Livraison · Penafiel'], done: 'Terminé' },
    integrations: { center: 'Votre système', nodes: ['ERP', 'Paie', 'Fisc', 'Banque'] },
    tenants: ['Entreprise A', 'Entreprise B', 'Entreprise C'],
    support: ['Pouvez-vous ajouter un rapport des ventes par magasin ?', 'Oui. C’est en ligne ✓'],
  },
  processTitle: 'Comment nous travaillons',
  process: [
    { term: 'Découverte', desc: 'Nous écoutons les futurs utilisateurs et identifions où se perd le temps.' },
    { term: 'Proposition et architecture', desc: 'Périmètre, architecture, phases et budget avant de coder.' },
    { term: 'Développement en sprints', desc: 'Cycles courts avec démonstrations régulières. Vous pouvez changer les priorités.' },
    { term: 'Mise en production', desc: 'Nous déployons le système et accompagnons le démarrage.' },
    { term: 'Maintenance et évolution', desc: 'Nous corrigeons, mettons à jour et ajoutons de nouvelles fonctionnalités.' },
  ],
  archTitle: 'Un système de gestion, vu de l’intérieur',
  archIntro: 'Un exemple de ce que nous concevons pour une entreprise avec plusieurs services. Chaque couche a une fonction.',
  archFigure:
    'Schéma d’architecture d’un système de gestion : les canaux (web, application mobile, portail client et borne) passent par une couche d’accès avec authentification unique et droits, qui sollicite les services commandes, facturation, stock, RH et validations. Les services communiquent par événements, stockent les données dans une base de données, des fichiers et un cache, et se connectent à l’ERP, à la banque, au fisc et aux e-mails et SMS. Tout fonctionne avec déploiement automatisé, métriques, alertes et sauvegardes.',
  arch: [
    { key: 'channels', term: 'Canaux', desc: 'Web, app mobile, portail client et borne. Chacun utilise l’écran adapté.' },
    { key: 'access', term: 'Accès et droits', desc: 'Une seule connexion pour tout, avec des profils par service, équipe et entreprise.' },
    { key: 'services', term: 'Services métier', desc: 'Commandes, facturation, stock, RH et validations, chacun avec ses règles.' },
    { key: 'data', term: 'Données et événements', desc: 'Les services échangent par événements et chaque donnée est stockée une seule fois, au bon endroit.' },
    { key: 'integrations', term: 'Intégrations', desc: 'ERP, banque, fisc, e-mail et SMS, sans copier les données à la main.' },
    { key: 'ops', term: 'Exploitation', desc: 'Déploiement automatisé, métriques, alertes et sauvegardes.' },
  ],
  archLabels: {
    channels: ['Web', 'App mobile', 'Portail client', 'Borne'],
    access: 'Accès · connexion unique · droits',
    services: ['Commandes', 'Facturation', 'Stock', 'RH', 'Validations'],
    bus: 'événements',
    data: ['Base de données', 'Fichiers', 'Cache'],
    integrations: ['ERP', 'Banque', 'Fisc', 'E-mail/SMS'],
    ops: 'CI/CD · métriques · alertes · sauvegardes',
  },
  faqTitle: 'Questions fréquentes',
  faqText: 'Vous ne trouvez pas votre réponse ? Contactez-nous.',
  faq: [
    {
      q: 'Combien de temps dure un projet ?',
      a: 'Cela dépend du périmètre. La proposition détaille chaque phase et son délai, et nos sprints courts vous montrent des résultats dès le début.',
    },
    { q: 'Combien cela coûte-t-il ?', a: 'Chaque projet fait l’objet d’une proposition dédiée, avec périmètre, phases et coût, avant de commencer à coder.' },
    {
      q: 'À qui appartiennent le code et les données ?',
      a: 'Les données appartiennent toujours à votre entreprise. La propriété du code et sa remise sont définies dans la proposition.',
    },
    {
      q: 'Pouvez-vous améliorer un système existant ?',
      a: 'Oui. Nous analysons l’existant et proposons l’approche la plus adaptée : faire évoluer, intégrer ou remplacer.',
    },
    { q: 'Et après la livraison ?', a: 'Nous restons à vos côtés : support, correctifs, mises à jour et nouvelles fonctionnalités.' },
  ],
}

export const customSoftware: Record<Locale, CustomSoftwareDict> = { pt, en, nl, es, fr }
