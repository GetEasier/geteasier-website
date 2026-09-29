import type { Locale } from '@/lib/seo.config'

// Capacidade técnica: secção 1 do briefing (sem IA, por decisão do Alexandre a 29/09/2026).

const pt = {
  h1: 'Software feito à volta da forma como a sua empresa trabalha',
  lead: [
    'Quando um produto pronto obriga a sua equipa a mudar a forma de trabalhar, faz sentido construir o sistema certo.',
    'Desenhamos, desenvolvemos e mantemos aplicações web, apps móveis e integrações. É o mesmo trabalho que fazemos todos os dias nos nossos produtos.',
  ],
  buildTitle: 'O que construímos',
  build: [
    {
      term: 'Aplicações web de gestão',
      desc: 'Back-offices, portais para clientes ou fornecedores e fluxos de aprovação. Os ecrãs seguem os passos que a sua equipa já dá.',
    },
    {
      term: 'Apps móveis para iOS e Android',
      desc: 'Para quem trabalha fora do escritório: registos no terreno, consulta de dados e geolocalização. A app do TimeEasier, na App Store e no Google Play, é um exemplo.',
    },
    {
      term: 'Integrações',
      desc: 'Ligamos o sistema novo ao seu ERP, ao processamento salarial e a sistemas públicos, para que ninguém tenha de copiar dados à mão.',
    },
    {
      term: 'Plataformas para várias empresas',
      desc: 'Um só sistema para vários clientes, cada um com os seus dados, utilizadores e permissões. É a arquitetura dos nossos produtos.',
    },
    {
      term: 'Acompanhamento e suporte',
      desc: 'Acompanhamos a implementação e continuamos a evoluir o sistema depois da entrega, com suporte próximo.',
    },
  ],
  processTitle: 'Como trabalhamos',
  processIntro: 'Um projeto passa por cinco etapas, por esta ordem.',
  process: [
    {
      term: 'Descoberta',
      desc: 'Falamos com quem vai usar o sistema. Percebemos o processo atual, os dados que já existem e onde se perde tempo.',
    },
    {
      term: 'Proposta e arquitetura',
      desc: 'Apresentamos o âmbito, a arquitetura, as fases e o custo. Decide com tudo em cima da mesa antes de começarmos a programar.',
    },
    {
      term: 'Desenvolvimento em sprints',
      desc: 'Trabalhamos em ciclos curtos e mostramos o que está feito em demonstrações regulares. Pode mudar prioridades a meio do caminho.',
    },
    {
      term: 'Entrega',
      desc: 'Pomos o sistema em produção e acompanhamos a sua equipa no arranque.',
    },
    {
      term: 'Manutenção e evolução',
      desc: 'Corrigimos, atualizamos e acrescentamos funcionalidades, para o sistema acompanhar a empresa.',
    },
  ],
  proofTitle: 'Caso de estudo: a plataforma do TimeEasier e do ConstructionEasier',
  proofIntro:
    'Construímos de raiz a plataforma onde correm o TimeEasier e o ConstructionEasier. É o melhor exemplo do que fazemos para outras empresas.',
  proofFigure:
    'Diagrama de arquitetura: o tablet, a app móvel e a aplicação web ligam-se a uma API comum, que separa os dados de cada empresa cliente. A API liga-se à identificação biométrica, às integrações externas e à infraestrutura com observabilidade.',
  proof: [
    {
      key: 'clients',
      term: 'Tablet, app e web',
      desc: 'Os registos chegam do tablet no local de trabalho, da app para iOS e Android e da aplicação web.',
    },
    {
      key: 'tenants',
      term: 'Várias empresas, dados separados',
      desc: 'Cada empresa cliente tem os seus colaboradores, obras e permissões, separados das restantes, na mesma plataforma.',
    },
    {
      key: 'biometrics',
      term: 'Identificação pelo rosto',
      desc: 'No tablet, o colaborador identifica-se pelo rosto no momento da picagem.',
    },
    {
      key: 'integrations',
      term: 'Integrações',
      desc: 'Exportação para processamento salarial, integração com ERP e com sistemas públicos.',
    },
    {
      key: 'infra',
      term: 'Infraestrutura e observabilidade',
      desc: 'Corre em infraestrutura própria. Cada alteração passa por testes automáticos antes de ser publicada, e métricas, registos e alertas mostram o estado de cada serviço.',
    },
  ],
  proofLinks: 'Veja os produtos que correm nesta plataforma:',
  stackTitle: 'Tecnologia',
  stackIntro: 'A stack que usamos e porque a escolhemos.',
  stack: [
    {
      term: 'Java 25 e Spring Boot 4',
      desc: 'Versões atuais, com suporte longo e um ecossistema maduro para regras de negócio, segurança e integrações.',
    },
    {
      term: 'Imagens nativas GraalVM',
      desc: 'Os serviços arrancam mais depressa e usam menos memória, o que baixa o custo de infraestrutura.',
    },
    {
      term: 'Angular 21',
      desc: 'Para aplicações de gestão com muitos formulários, tabelas e permissões, com TypeScript em todo o código do cliente.',
    },
    {
      term: 'Arquitetura multi-empresa',
      desc: 'Um só sistema serve vários clientes, e os dados de cada empresa ficam separados.',
    },
    {
      term: 'CI/CD e observabilidade',
      desc: 'Testes e publicação automáticos, e visibilidade sobre o que se passa em produção.',
    },
  ],
  contactTitle: 'Fale-nos do seu projeto',
  contactText:
    'Diga-nos o que a sua equipa faz hoje, que ferramentas usa e o que gostaria de mudar. Respondemos com perguntas concretas e, se fizer sentido, marcamos uma conversa.',
}

export type CustomSoftwareDict = typeof pt

const en: CustomSoftwareDict = {
  h1: 'Software built around the way your company works',
  lead: [
    'When an off-the-shelf product forces your team to change how it works, it makes sense to build the right system instead.',
    'We design, develop and maintain web applications, mobile apps and integrations. It is the same work we do every day on our own products.',
  ],
  buildTitle: 'What we build',
  build: [
    {
      term: 'Web applications for management',
      desc: 'Back offices, customer or supplier portals and approval flows. The screens follow the steps your team already takes.',
    },
    {
      term: 'iOS and Android apps',
      desc: 'For people who work away from the office: records on site, looking up data and geolocation. The TimeEasier app, on the App Store and Google Play, is one example.',
    },
    {
      term: 'Integrations',
      desc: 'We connect the new system to your ERP, payroll and public systems, so nobody has to copy data by hand.',
    },
    {
      term: 'Platforms for many companies',
      desc: 'One system for many clients, each with its own data, users and permissions. It is how our products are built.',
    },
    {
      term: 'Follow-up and support',
      desc: 'We stay with you through rollout and keep improving the system after delivery, with close support.',
    },
  ],
  processTitle: 'How we work',
  processIntro: 'A project goes through five stages, in this order.',
  process: [
    {
      term: 'Discovery',
      desc: 'We talk to the people who will use the system. We learn the current process, the data that already exists and where time gets lost.',
    },
    {
      term: 'Proposal and architecture',
      desc: 'We present the scope, architecture, phases and cost. You decide with everything on the table before we start coding.',
    },
    {
      term: 'Development in sprints',
      desc: 'We work in short cycles and show what is done in regular demos. You can change priorities along the way.',
    },
    {
      term: 'Delivery',
      desc: 'We put the system into production and stay with your team through the start.',
    },
    {
      term: 'Maintenance and evolution',
      desc: 'We fix, update and add features so the system keeps up with the company.',
    },
  ],
  proofTitle: 'Case study: the platform behind TimeEasier and ConstructionEasier',
  proofIntro:
    'We built the platform that runs TimeEasier and ConstructionEasier from scratch. It is the best example of what we do for other companies.',
  proofFigure:
    'Architecture diagram: the tablet, the mobile app and the web application connect to a shared API, which keeps each client company’s data separate. The API connects to biometric identification, external integrations and infrastructure with observability.',
  proof: [
    {
      key: 'clients',
      term: 'Tablet, app and web',
      desc: 'Records come from the workplace tablet, the iOS and Android app and the web application.',
    },
    {
      key: 'tenants',
      term: 'Many companies, separate data',
      desc: 'Each client company has its own employees, sites and permissions, kept apart from the others on the same platform.',
    },
    {
      key: 'biometrics',
      term: 'Face identification',
      desc: 'On the tablet, employees identify themselves by face when they clock in.',
    },
    {
      key: 'integrations',
      term: 'Integrations',
      desc: 'Export to payroll, ERP integration and integration with public systems.',
    },
    {
      key: 'infra',
      term: 'Infrastructure and observability',
      desc: 'It runs on our own infrastructure. Every change goes through automated tests before release, and metrics, logs and alerts show the state of each service.',
    },
  ],
  proofLinks: 'See the products running on this platform:',
  stackTitle: 'Technology',
  stackIntro: 'The stack we use and why we chose it.',
  stack: [
    {
      term: 'Java 25 and Spring Boot 4',
      desc: 'Current versions with long-term support and a mature ecosystem for business rules, security and integrations.',
    },
    {
      term: 'GraalVM native images',
      desc: 'Services start faster and use less memory, which lowers infrastructure costs.',
    },
    {
      term: 'Angular 21',
      desc: 'For management applications with many forms, tables and permissions, with TypeScript across all the client code.',
    },
    {
      term: 'Multi-tenant architecture',
      desc: 'One system serves many clients, and each company’s data stays separate.',
    },
    {
      term: 'CI/CD and observability',
      desc: 'Automated tests and releases, and visibility into what is happening in production.',
    },
  ],
  contactTitle: 'Tell us about your project',
  contactText:
    'Tell us what your team does today, which tools it uses and what you would like to change. We will reply with specific questions and, if it makes sense, set up a call.',
}

export const customSoftware: Record<Locale, CustomSoftwareDict> = { pt, en }
