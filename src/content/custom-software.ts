import type { Locale } from '@/lib/seo.config'

// Capacidade técnica: secção 1 do briefing (sem IA, por decisão do Alexandre a 29/09/2026).
// Revisão de 01/10: textos curtos, uma linha por cartão; o visual faz o resto.

const pt = {
  h1: 'Software feito à volta da forma como a sua empresa trabalha',
  lead: [
    'Quando um produto pronto obriga a sua equipa a mudar a forma de trabalhar, faz sentido construir o sistema certo.',
    'Desenhamos, desenvolvemos e mantemos aplicações web, apps móveis e integrações. É o mesmo trabalho que fazemos todos os dias nos nossos produtos.',
  ],
  heroCase: 'Ver um caso real',
  clientsTitle: 'Empresas que trabalham connosco',
  buildTitle: 'O que construímos',
  build: [
    { term: 'Aplicações web de gestão', desc: 'Back-offices, portais e aprovações que seguem os passos da sua equipa.' },
    { term: 'Apps para iOS e Android', desc: 'Para quem trabalha no terreno, como a app do TimeEasier.' },
    { term: 'Integrações', desc: 'Ligação ao ERP, aos salários e a sistemas públicos, sem copiar dados à mão.' },
    { term: 'Plataformas para várias empresas', desc: 'Um sistema, vários clientes, cada um com os seus dados e permissões.' },
    { term: 'Acompanhamento e suporte', desc: 'Ficamos depois da entrega para evoluir o sistema consigo.' },
  ],
  buildCta: { term: 'Tem outra ideia?', desc: 'Conte-nos o que precisa.' },
  processTitle: 'Como trabalhamos',
  process: [
    { term: 'Descoberta', desc: 'Ouvimos quem vai usar o sistema e vemos onde se perde tempo.' },
    { term: 'Proposta e arquitetura', desc: 'Âmbito, arquitetura, fases e custo, antes de programar.' },
    { term: 'Desenvolvimento em sprints', desc: 'Ciclos curtos com demonstrações regulares. Pode mudar prioridades.' },
    { term: 'Entrega', desc: 'Pomos o sistema em produção e acompanhamos o arranque.' },
    { term: 'Manutenção e evolução', desc: 'Corrigimos, atualizamos e acrescentamos funcionalidades.' },
  ],
  proofTitle: 'Caso de estudo: a plataforma do TimeEasier e do ConstructionEasier',
  proofIntro: 'Construímos esta plataforma de raiz. É o melhor exemplo do que fazemos para outras empresas.',
  proofFigure:
    'Diagrama de arquitetura: o tablet, a app móvel e a aplicação web ligam-se a uma API comum, que separa os dados de cada empresa cliente. A API liga-se à identificação biométrica, às integrações externas e à infraestrutura com observabilidade.',
  proof: [
    { key: 'clients', term: 'Tablet, app e web', desc: 'Os registos chegam do tablet no local, da app e da web.' },
    { key: 'tenants', term: 'Várias empresas, dados separados', desc: 'Cada empresa vê só os seus colaboradores, obras e permissões.' },
    { key: 'biometrics', term: 'Identificação pelo rosto', desc: 'No tablet, a picagem faz-se pelo rosto.' },
    { key: 'integrations', term: 'Integrações', desc: 'Processamento salarial, ERP e sistemas públicos.' },
    { key: 'infra', term: 'Infraestrutura e observabilidade', desc: 'Infraestrutura própria, testes automáticos em cada alteração e alertas em produção.' },
  ],
  proofLinks: 'Produtos que correm nesta plataforma',
  stackTitle: 'Tecnologia',
  stackIntro: 'A stack que usamos e porquê.',
  stack: [
    { badge: 'Java', term: 'Java 25 e Spring Boot 4', desc: 'Regras de negócio, segurança e integrações, com suporte longo.' },
    { badge: 'GraalVM', term: 'Imagens nativas GraalVM', desc: 'Arranque rápido e menos memória, logo menos custo de servidores.' },
    { badge: 'Angular', term: 'Angular 21', desc: 'Ecrãs de gestão com muitos formulários e tabelas, em TypeScript.' },
    { badge: 'CI/CD', term: 'CI/CD e observabilidade', desc: 'Testes e publicação automáticos, e visibilidade sobre produção.' },
  ],
  contactTitle: 'Fale-nos do seu projeto',
  contactText:
    'Diga-nos o que a sua equipa faz hoje e o que gostaria de mudar. Respondemos com perguntas concretas e, se fizer sentido, marcamos uma conversa.',
}

export type CustomSoftwareDict = typeof pt

const en: CustomSoftwareDict = {
  h1: 'Software built around the way your company works',
  lead: [
    'When an off-the-shelf product forces your team to change how it works, it makes sense to build the right system instead.',
    'We design, develop and maintain web applications, mobile apps and integrations. It is the same work we do every day on our own products.',
  ],
  heroCase: 'See a real case',
  clientsTitle: 'Companies that work with us',
  buildTitle: 'What we build',
  build: [
    { term: 'Web applications for management', desc: 'Back offices, portals and approvals that follow the steps your team takes.' },
    { term: 'iOS and Android apps', desc: 'For people who work in the field, like the TimeEasier app.' },
    { term: 'Integrations', desc: 'Links to your ERP, payroll and public systems, so nobody copies data by hand.' },
    { term: 'Platforms for many companies', desc: 'One system, many clients, each with its own data and permissions.' },
    { term: 'Follow-up and support', desc: 'We stay after delivery to keep improving the system with you.' },
  ],
  buildCta: { term: 'Got another idea?', desc: 'Tell us what you need.' },
  processTitle: 'How we work',
  process: [
    { term: 'Discovery', desc: 'We listen to the people who will use the system and see where time gets lost.' },
    { term: 'Proposal and architecture', desc: 'Scope, architecture, phases and cost, before any coding.' },
    { term: 'Development in sprints', desc: 'Short cycles with regular demos. You can change priorities.' },
    { term: 'Delivery', desc: 'We put the system into production and stay through the start.' },
    { term: 'Maintenance and evolution', desc: 'We fix, update and add features.' },
  ],
  proofTitle: 'Case study: the platform behind TimeEasier and ConstructionEasier',
  proofIntro: 'We built this platform from scratch. It is the best example of what we do for other companies.',
  proofFigure:
    'Architecture diagram: the tablet, the mobile app and the web application connect to a shared API, which keeps each client company’s data separate. The API connects to biometric identification, external integrations and infrastructure with observability.',
  proof: [
    { key: 'clients', term: 'Tablet, app and web', desc: 'Records come from the on-site tablet, the app and the web.' },
    { key: 'tenants', term: 'Many companies, separate data', desc: 'Each company sees only its own employees, sites and permissions.' },
    { key: 'biometrics', term: 'Face identification', desc: 'On the tablet, employees clock in with their face.' },
    { key: 'integrations', term: 'Integrations', desc: 'Payroll, ERP and public systems.' },
    { key: 'infra', term: 'Infrastructure and observability', desc: 'Our own infrastructure, automated tests on every change and alerts in production.' },
  ],
  proofLinks: 'Products running on this platform',
  stackTitle: 'Technology',
  stackIntro: 'The stack we use and why.',
  stack: [
    { badge: 'Java', term: 'Java 25 and Spring Boot 4', desc: 'Business rules, security and integrations, with long-term support.' },
    { badge: 'GraalVM', term: 'GraalVM native images', desc: 'Fast start-up and less memory, so lower server costs.' },
    { badge: 'Angular', term: 'Angular 21', desc: 'Management screens with many forms and tables, in TypeScript.' },
    { badge: 'CI/CD', term: 'CI/CD and observability', desc: 'Automated tests and releases, and visibility into production.' },
  ],
  contactTitle: 'Tell us about your project',
  contactText:
    'Tell us what your team does today and what you would like to change. We will reply with specific questions and, if it makes sense, set up a call.',
}

export const customSoftware: Record<Locale, CustomSoftwareDict> = { pt, en }
