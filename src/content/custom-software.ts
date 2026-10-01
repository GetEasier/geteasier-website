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

export const customSoftware: Record<Locale, CustomSoftwareDict> = { pt, en }
