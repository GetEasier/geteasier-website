import type { Locale, PageId, ProductId } from '@/lib/seo.config'

// Funcionalidades: só as que já estavam publicadas no site (páginas de produto e /planos).

export type Feature = { term: string; desc: string }
export type FaqItem = { q: string; a: string }

export type ProductContent = {
  name: string
  logo: { src: string; width: number; height: number }
  icon: string
  /** Uma linha para listas e navegação */
  short: string
  /** Frase para o índice de produtos */
  summary: string
  h1: string
  lead: string[]
  featuresTitle: string
  features: Feature[]
  stepsTitle: string
  stepsIntro: string
  steps: string[]
  related: { id: PageId; text: string }[]
  planAnchor: string
  demoSubject: string
  /** Perguntas frequentes do produto (o ConstructionEasier tem as suas em construction.ts) */
  faqTitle?: string
  faq?: FaqItem[]
}

type ProductsDict = {
  indexH1: string
  indexLead: string
  indexSame: string
  indexSameLink: string
  plansLine: string
  plansLink: string
  /** Página Produtos: etiqueta no ConstructionEasier, título dos planos e do cartão de software à medida */
  indexIncludes: string
  plansTitle: string
  customTitle: string
  planIncluded: string
  relatedTitle: string
  videoTitle: string
  videoButton: string
  videoNote: string
  testimonialTitle: string
  items: Record<ProductId, ProductContent>
}

const LOGOS = {
  timeEasier: { src: '/images/products/logos/time-easier.png', width: 1358, height: 320 },
  constructionEasier: { src: '/images/products/logos/construction-easier.png', width: 1615, height: 410 },
  stockEasier: { src: '/images/products/logos/stock-easier.png', width: 1431, height: 430 },
  woodEasier: { src: '/images/products/logos/wood-easier.png', width: 1591, height: 296 },
}

const ICONS = {
  timeEasier: '/images/products/icons/time-easier.png',
  constructionEasier: '/images/products/icons/construction-easier.png',
  stockEasier: '/images/products/icons/stock-easier.png',
  woodEasier: '/images/products/icons/wood-easier.png',
}

const pt: ProductsDict = {
  indexH1: 'Quatro produtos para empresas que trabalham no terreno',
  indexLead: 'Cada um resolve um problema concreto e funciona sozinho.',
  indexSame: 'A mesma equipa que faz os produtos constrói o que eles não fazem.',
  indexSameLink: 'Ver software à medida',
  plansLine: 'Planos de cada produto',
  plansLink: 'Comparar os planos',
  indexIncludes: 'Inclui o TimeEasier',
  plansTitle: 'Base, Avançado ou Premium',
  customTitle: 'Precisa de algo diferente?',
  planIncluded: 'Ver o que inclui cada plano',
  relatedTitle: 'Páginas relacionadas',
  videoTitle: 'O WoodEasier em vídeo',
  videoButton: 'Ver o vídeo do WoodEasier',
  videoNote: 'O vídeo abre no YouTube, dentro desta página, só depois de carregar no botão.',
  testimonialTitle: 'Quem usa',
  items: {
    timeEasier: {
      name: 'TimeEasier',
      logo: LOGOS.timeEasier,
      icon: ICONS.timeEasier,
      short: 'Registo de ponto e gestão de RH',
      summary:
        'Os colaboradores registam entradas e saídas num tablet no local de trabalho ou na app. A gestão tem horas, férias, ausências e o relatório mensal pronto.',
      h1: 'Registo de ponto no tablet do local de trabalho ou no telemóvel',
      lead: [
        'Com o TimeEasier, cada colaborador regista a entrada e a saída num tablet no local de trabalho, onde se identifica pelo rosto, ou na app para iOS e Android quando trabalha fora.',
        'A gestão vê as horas, as ausências e as férias de cada pessoa. No fim do mês tira o relatório de horas de cada colaborador, de acordo com o Artigo 202.º do Código do Trabalho e o que a ACT pede.',
      ],
      featuresTitle: 'O que o TimeEasier faz',
      features: [
        { term: 'Registo de ponto', desc: 'Em tablet no local de trabalho, ou na app iOS e Android para quem trabalha fora.' },
        { term: 'Identificação pelo rosto', desc: 'No tablet, o colaborador identifica-se pelo rosto no momento da picagem.' },
        { term: 'Geolocalização', desc: 'Cada registo feito na app guarda o local onde foi feito.' },
        { term: 'Horários', desc: 'Vários horários e tipos de horário: isenção de horário, pago à hora, horário fixo.' },
        { term: 'Ausências e férias', desc: 'Ausências por colaborador e mapa de férias da empresa.' },
        { term: 'Horas extra', desc: 'Controlo das horas extra de cada colaborador.' },
        { term: 'Aprovação de registos', desc: 'O responsável aprova os registos da sua equipa.' },
        { term: 'Documentos e formações', desc: 'Recibos de vencimento, contratos e relatórios por colaborador, com alertas de documentos expirados e registo de formações.' },
        { term: 'Relatório mensal', desc: 'Relatório de horas por colaborador (Art. 202.º do Código do Trabalho) e relatório geral da empresa.' },
        { term: 'Salários e ERP', desc: 'Exportação para processamento salarial e integração com ERP, no plano Premium.' },
      ],
      stepsTitle: 'Um registo, do tablet ao relatório',
      stepsIntro: 'O que acontece quando um colaborador chega ao trabalho:',
      steps: [
        'O colaborador chega e identifica-se no tablet pelo rosto, ou regista a entrada na app.',
        'O TimeEasier guarda a hora e, na app, o local do registo.',
        'O responsável vê os registos da equipa e aprova-os.',
        'No fim do mês, o relatório de horas de cada colaborador está pronto a exportar.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier: o TimeEasier com gestão de obras' },
        { id: 'customSoftware', text: 'Como construímos a plataforma do TimeEasier' },
      ],
      planAnchor: 'time',
      demoSubject: 'demo-time-easier',
      faqTitle: 'Perguntas sobre o TimeEasier',
      faq: [
        {
          q: 'O reconhecimento facial cumpre o RGPD?',
          a: 'O empregador é o responsável pelo tratamento e define o fundamento jurídico e a informação aos trabalhadores. A GetEasier trata os dados por conta dele, como subcontratante (artigo 28.º do RGPD). No tablet, o colaborador também pode entrar com o PIN.',
        },
        {
          q: 'Serve para quem trabalha fora das instalações?',
          a: 'Sim. Quem trabalha fora regista a entrada e a saída na app para iOS e Android. Nos planos Avançado e Premium, cada registo feito na app guarda o local onde foi feito.',
        },
        {
          q: 'Liga ao processamento salarial?',
          a: 'Sim, no plano Premium: exportação para o processamento salarial e integração com o ERP da empresa.',
        },
      ],
    },
    constructionEasier: {
      name: 'ConstructionEasier',
      logo: LOGOS.constructionEasier,
      icon: ICONS.constructionEasier,
      short: 'Gestão de obras e subempreiteiros',
      summary:
        'Quem está em cada obra e de que empresa é, os documentos dos subempreiteiros, os custos de cada obra e o auto de obra. Inclui o TimeEasier.',
      h1: 'Quem está em cada obra, de que empresa é e com que documentos',
      lead: [
        'O ConstructionEasier junta o registo de ponto do TimeEasier à gestão das obras. Foi desenvolvido com empresas de construção portuguesas para acompanhar cada obra, do planeamento à análise de resultados.',
        'O diretor de obra sabe quem está no estaleiro, que subempreiteiros trabalham lá e se os documentos estão em dia. A administração vê o custo de cada obra em materiais e mão de obra.',
      ],
      featuresTitle: 'O que o ConstructionEasier faz',
      features: [
        { term: 'Obras', desc: 'Lista de obras em curso, a preparar e concluídas, com estado e progresso de cada uma.' },
        { term: 'Colaboradores por obra', desc: 'Localização em tempo real de quem está em cada obra, com alertas de entrada.' },
        { term: 'Subempreiteiros', desc: 'Empresas subempreiteiras e os seus trabalhadores por obra, com gestão dos documentos de cada uma.' },
        { term: 'Permissões por função', desc: 'Encarregado de Obra, Diretor de Obra, TSST e Encarregado Geral, cada um com o que precisa de ver.' },
        { term: 'Custos', desc: 'Custo por obra em materiais e mão de obra, e custo por colaborador.' },
        { term: 'Auto de obra', desc: 'Auto de obra gerado automaticamente.' },
        { term: 'Documentação', desc: 'Anexos e documentos organizados e partilhados por obra.' },
        { term: 'Alojamento e carreira', desc: 'Despesas de alojamento dos colaboradores e progressão de carreira.' },
        { term: 'Painel central', desc: 'Visão de todas as obras para acompanhamento e análise.' },
        { term: 'Registo de ponto', desc: 'Todas as funcionalidades do TimeEasier no plano correspondente.' },
        { term: 'Leitura de documentos com IA', desc: 'Os documentos são lidos com inteligência artificial (OCR) e os dados entram na plataforma sem ninguém os escrever à mão.' },
      ],
      stepsTitle: 'Uma obra vista pelo diretor de obra',
      stepsIntro: 'O que o diretor de obra vê ao abrir uma obra:',
      steps: [
        'Escolhe a obra e vê quem está presente agora, de que empresa é cada pessoa e a que horas entrou.',
        'Vê as empresas subempreiteiras na obra e os trabalhadores de cada uma.',
        'Vê o estado dos documentos de cada trabalhador: válido, a expirar ou em falta.',
        'Recebe um alerta quando um colaborador entra na obra.',
      ],
      related: [
        { id: 'timeEasier', text: 'TimeEasier: o registo de ponto incluído no ConstructionEasier' },
        { id: 'stockEasier', text: 'StockEasier: EPIs entregues a cada trabalhador' },
        { id: 'customSoftware', text: 'Como construímos esta plataforma' },
      ],
      planAnchor: 'construction',
      demoSubject: 'demo-construction-easier',
    },
    stockEasier: {
      name: 'StockEasier',
      logo: LOGOS.stockEasier,
      icon: ICONS.stockEasier,
      short: 'Stocks de EPIs e consumíveis',
      summary:
        'Entradas e saídas de EPIs e consumíveis, o que foi entregue a cada colaborador e alertas quando é preciso repor. Sem folhas de cálculo.',
      h1: 'Saiba que EPIs entregou, a quem, e quando tem de voltar a comprar',
      lead: [
        'O StockEasier regista as entradas e saídas de EPIs e outros consumíveis. Cada movimento atualiza o stock, e o sistema avisa quando um artigo chega ao nível de reposição.',
        'Deixa de precisar de folhas de cálculo e faz menos compras de urgência. Fica o histórico de tudo o que entrou, saiu e foi entregue a cada colaborador.',
      ],
      featuresTitle: 'O que o StockEasier faz',
      features: [
        { term: 'Movimentos', desc: 'Registo de entradas e saídas de EPIs e outros consumíveis.' },
        { term: 'Níveis de stock', desc: 'Níveis atualizados a cada movimento, em tempo real.' },
        { term: 'Alertas de reposição', desc: 'Aviso automático quando um artigo chega ao nível mínimo definido.' },
        { term: 'Histórico', desc: 'Todos os movimentos e consumos, para análise e auditoria.' },
        { term: 'Categorias e locais', desc: 'Artigos organizados por categoria e local de armazenamento.' },
        { term: 'EPIs por colaborador', desc: 'Relatório do que foi entregue a cada colaborador.' },
        { term: 'Vários utilizadores', desc: 'Acesso simultâneo de várias pessoas, a partir de qualquer dispositivo.' },
        { term: 'Relatórios e exportações', desc: 'Relatórios avançados e exportações, no plano Premium.' },
      ],
      stepsTitle: 'Um artigo, da entrada ao alerta',
      stepsIntro: 'O que acontece com um artigo em stock:',
      steps: [
        'Dá entrada a uma caixa de luvas de proteção: o stock sobe.',
        'Entrega um par a um colaborador: o stock desce e a entrega fica no registo desse colaborador.',
        'Quando o stock chega ao nível de reposição, o StockEasier avisa.',
        'O histórico mostra quanto se consumiu em cada mês.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier: as obras onde os EPIs são usados' },
        { id: 'customSoftware', text: 'Software à medida para outros processos da sua empresa' },
      ],
      planAnchor: 'stock',
      demoSubject: 'demo-stock-easier',
      faqTitle: 'Perguntas sobre o StockEasier',
      faq: [
        {
          q: 'O StockEasier serve só para EPIs?',
          a: 'Não. Serve para EPIs e outros consumíveis, organizados por categoria e por local de armazenamento.',
        },
        {
          q: 'Consigo saber que EPIs entreguei a cada colaborador?',
          a: 'Sim. Nos planos Avançado e Premium há um relatório dos EPIs entregues a cada colaborador, com o histórico de todos os movimentos.',
        },
        {
          q: 'Avisa quando é preciso comprar?',
          a: 'Sim. Nos planos Avançado e Premium, o StockEasier avisa quando um artigo chega ao nível mínimo que definiu.',
        },
        {
          q: 'Várias pessoas podem usar ao mesmo tempo?',
          a: 'Sim. Em todos os planos, várias pessoas usam o StockEasier ao mesmo tempo, a partir de qualquer dispositivo.',
        },
      ],
    },
    woodEasier: {
      name: 'WoodEasier',
      logo: LOGOS.woodEasier,
      icon: ICONS.woodEasier,
      short: 'Passaportes de madeira tratada',
      summary:
        'Lotes, tratamentos, passaportes e comprovativos para a DGAV, da receção à expedição da madeira tratada e das paletes.',
      h1: 'Passaportes de madeira tratada, da receção à expedição',
      lead: [
        'O WoodEasier foi feito para empresas que trabalham com madeira tratada e paletes e têm de cumprir as exigências da DGAV.',
        'Regista cada lote e o seu tratamento, com temperaturas e durações, e emite os relatórios e comprovativos para a DGAV. Numa inspeção ou auditoria, a documentação já está organizada.',
      ],
      featuresTitle: 'O que o WoodEasier faz',
      features: [
        { term: 'Lotes e movimentos', desc: 'Registo rápido de lotes e movimentos de madeira tratada.' },
        { term: 'Tratamentos', desc: 'Tratamentos com temperaturas e durações, por lote.' },
        { term: 'Passaportes', desc: 'Passaportes de madeiras tratadas gerados a partir dos lotes.' },
        { term: 'Relatórios DGAV', desc: 'Relatórios e comprovativos emitidos automaticamente, de acordo com a legislação portuguesa.' },
        { term: 'Rastreabilidade', desc: 'Histórico de cada lote, da receção à expedição.' },
        { term: 'Administração e produção', desc: 'A mesma informação para quem trata a madeira e para quem trata dos papéis.' },
        { term: 'Auditorias', desc: 'Documentação organizada para inspeções e auditorias.' },
      ],
      stepsTitle: 'Um lote, da receção à expedição',
      stepsIntro: 'O percurso de um lote de madeira no WoodEasier:',
      steps: [
        'A madeira chega e é registada como um lote.',
        'O tratamento fica registado com a temperatura e a duração.',
        'O WoodEasier gera o passaporte do lote tratado.',
        'Na expedição, o lote sai com o histórico completo e os relatórios para a DGAV prontos.',
      ],
      related: [
        { id: 'customSoftware', text: 'Software à medida para a sua indústria' },
        { id: 'products', text: 'Todos os produtos da GetEasier' },
      ],
      planAnchor: 'wood',
      demoSubject: 'demo-wood-easier',
      faqTitle: 'Perguntas sobre o WoodEasier',
      faq: [
        {
          q: 'Para que empresas é o WoodEasier?',
          a: 'Para empresas que trabalham com madeira tratada e paletes e têm de cumprir as exigências da DGAV.',
        },
        {
          q: 'Que documentos o WoodEasier emite?',
          a: 'Os passaportes de madeiras tratadas de cada lote e os relatórios e comprovativos para a DGAV, de acordo com a legislação portuguesa.',
        },
        {
          q: 'Ajuda numa inspeção ou auditoria?',
          a: 'Sim. Cada lote tem o histórico completo, da receção à expedição, com os tratamentos, temperaturas e durações. A documentação já está organizada quando a inspeção chega.',
        },
        {
          q: 'Quanto custa o WoodEasier?',
          a: 'O WoodEasier tem um plano único, com todas as funcionalidades. O preço é dado numa proposta para a sua empresa.',
        },
      ],
    },
  },
}

const en: ProductsDict = {
  indexH1: 'Four products for companies that work on site',
  indexLead: 'Each one solves one specific problem and works on its own.',
  indexSame: 'The team that builds the products also builds what they do not do.',
  indexSameLink: 'See custom software',
  plansLine: 'Plans for each product',
  plansLink: 'Compare the plans',
  indexIncludes: 'Includes TimeEasier',
  plansTitle: 'Base, Advanced or Premium',
  customTitle: 'Need something different?',
  planIncluded: 'See what each plan includes',
  relatedTitle: 'Related pages',
  videoTitle: 'WoodEasier on video',
  videoButton: 'Play the WoodEasier video',
  videoNote: 'The video loads from YouTube, inside this page, only after you press the button. It is in Portuguese.',
  testimonialTitle: 'Who uses it',
  items: {
    timeEasier: {
      ...pt.items.timeEasier,
      short: 'Time tracking and HR',
      summary:
        'Employees clock in and out on a workplace tablet or in the mobile app. Managers get hours, holidays, absences and the monthly report ready.',
      h1: 'Clock in on the workplace tablet or on your phone',
      lead: [
        'With TimeEasier, each employee clocks in and out on a tablet at the workplace, identifying themselves by face, or in the iOS and Android app when working elsewhere.',
        'Managers see each person’s hours, absences and holidays. At the end of the month they export each employee’s hours report, in line with Article 202 of the Portuguese Labour Code and what the labour inspectorate (ACT) asks for.',
      ],
      featuresTitle: 'What TimeEasier does',
      features: [
        { term: 'Clocking in', desc: 'On a workplace tablet, or in the iOS and Android app for people working elsewhere.' },
        { term: 'Face identification', desc: 'On the tablet, employees identify themselves by face when they clock in.' },
        { term: 'Geolocation', desc: 'Every record made in the app stores where it was made.' },
        { term: 'Schedules', desc: 'Several schedules and schedule types: exempt, hourly, fixed hours.' },
        { term: 'Absences and holidays', desc: 'Absences per employee and the company holiday map.' },
        { term: 'Overtime', desc: 'Overtime tracking for each employee.' },
        { term: 'Record approval', desc: 'Team leads approve their team’s records.' },
        { term: 'Documents and training', desc: 'Payslips, contracts and reports per employee, with alerts for expired documents and training records.' },
        { term: 'Monthly report', desc: 'Hours report per employee (Article 202 of the Labour Code) and a company-wide report.' },
        { term: 'Payroll and ERP', desc: 'Export to payroll and ERP integration, on the Premium plan.' },
      ],
      stepsTitle: 'One record, from tablet to report',
      stepsIntro: 'What happens when an employee arrives at work:',
      steps: [
        'The employee arrives and identifies themselves by face on the tablet, or clocks in on the app.',
        'TimeEasier stores the time and, on the app, the location of the record.',
        'The team lead sees the team’s records and approves them.',
        'At the end of the month, each employee’s hours report is ready to export.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier: TimeEasier plus construction site management' },
        { id: 'customSoftware', text: 'How we built the TimeEasier platform' },
      ],
      faqTitle: 'Questions about TimeEasier',
      faq: [
        {
          q: 'Does face recognition comply with the GDPR?',
          a: 'The employer is the data controller and sets the legal basis and the information given to workers. GetEasier processes the data on the employer’s behalf, as a processor (Article 28 GDPR). On the tablet, employees can also sign in with their PIN.',
        },
        {
          q: 'Does it work for people who work off site?',
          a: 'Yes. People working elsewhere clock in and out in the iOS and Android app. On the Advanced and Premium plans, every record made in the app stores where it was made.',
        },
        {
          q: 'Does it connect to payroll?',
          a: 'Yes, on the Premium plan: export to payroll and integration with the company’s ERP.',
        },
      ],
    },
    constructionEasier: {
      ...pt.items.constructionEasier,
      short: 'Sites and subcontractors',
      summary:
        'Who is on each site and which company they work for, subcontractor documents, costs per site and progress reports. Includes TimeEasier.',
      h1: 'Who is on each site, which company they work for, and their documents',
      lead: [
        'ConstructionEasier adds construction site management to TimeEasier’s time tracking. It was developed with Portuguese construction companies to follow each site from planning to final figures.',
        'The site manager knows who is on site, which subcontractors are working there and whether their documents are up to date. Management sees the cost of each site in materials and labour.',
      ],
      featuresTitle: 'What ConstructionEasier does',
      features: [
        { term: 'Sites', desc: 'Sites in progress, in preparation and finished, with the status and progress of each one.' },
        { term: 'People on each site', desc: 'Real-time location of who is on each site, with entry alerts.' },
        { term: 'Subcontractors', desc: 'Subcontracting companies and their workers on each site, with document management for each company.' },
        { term: 'Role permissions', desc: 'Site foreman, site manager, health and safety officer and general foreman, each seeing what they need.' },
        { term: 'Costs', desc: 'Cost per site in materials and labour, and cost per employee.' },
        { term: 'Progress reports', desc: 'Site progress report (auto de obra) generated automatically.' },
        { term: 'Documents', desc: 'Attachments and documents organised and shared per site.' },
        { term: 'Housing and careers', desc: 'Employee housing expenses and career progression.' },
        { term: 'Central dashboard', desc: 'An overview of every site for follow-up and analysis.' },
        { term: 'Time tracking', desc: 'Every TimeEasier feature in the matching plan.' },
        { term: 'AI document reading', desc: 'Documents are read with artificial intelligence (OCR) and their details go into the platform without anyone typing them.' },
      ],
      stepsTitle: 'A site as the site manager sees it',
      stepsIntro: 'What the site manager sees when opening a site:',
      steps: [
        'Opens the site and sees who is there now, which company each person works for and when they arrived.',
        'Sees the subcontracting companies on site and each company’s workers.',
        'Sees the status of each worker’s documents: valid, expiring or missing.',
        'Gets an alert when an employee enters the site.',
      ],
      related: [
        { id: 'timeEasier', text: 'TimeEasier: the time tracking included in ConstructionEasier' },
        { id: 'stockEasier', text: 'StockEasier: PPE handed to each worker' },
        { id: 'customSoftware', text: 'How we built this platform' },
      ],
    },
    stockEasier: {
      ...pt.items.stockEasier,
      short: 'PPE and consumables stock',
      summary:
        'Stock in and out for PPE and consumables, what each employee received, and alerts when it is time to reorder. No spreadsheets.',
      h1: 'Know which PPE you handed out, to whom, and when to buy more',
      lead: [
        'StockEasier records stock coming in and going out for PPE and other consumables. Every movement updates the stock level, and you get an alert when an item reaches its reorder level.',
        'You no longer need spreadsheets and make fewer emergency purchases. You keep the history of everything that came in, went out and was handed to each employee.',
      ],
      featuresTitle: 'What StockEasier does',
      features: [
        { term: 'Movements', desc: 'Stock in and out for PPE and other consumables.' },
        { term: 'Stock levels', desc: 'Levels updated in real time with every movement.' },
        { term: 'Reorder alerts', desc: 'Automatic alert when an item reaches the minimum level you set.' },
        { term: 'History', desc: 'Every movement and consumption, for analysis and audits.' },
        { term: 'Categories and locations', desc: 'Items organised by category and storage location.' },
        { term: 'PPE per employee', desc: 'Report of what was handed to each employee.' },
        { term: 'Several users', desc: 'Several people at once, from any device.' },
        { term: 'Reports and exports', desc: 'Advanced reports and exports, on the Premium plan.' },
      ],
      stepsTitle: 'One item, from delivery to alert',
      stepsIntro: 'What happens to an item in stock:',
      steps: [
        'A box of safety gloves comes in: the stock goes up.',
        'You hand a pair to an employee: the stock goes down and the handover is recorded for that employee.',
        'When the stock reaches its reorder level, StockEasier sends an alert.',
        'The history shows how much was used each month.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier: the sites where the PPE is used' },
        { id: 'customSoftware', text: 'Custom software for your other processes' },
      ],
      faqTitle: 'Questions about StockEasier',
      faq: [
        {
          q: 'Is StockEasier only for PPE?',
          a: 'No. It covers PPE and other consumables, organised by category and storage location.',
        },
        {
          q: 'Can I see which PPE I handed to each employee?',
          a: 'Yes. On the Advanced and Premium plans there is a report of the PPE handed to each employee, with the history of every movement.',
        },
        {
          q: 'Does it tell me when to buy more?',
          a: 'Yes. On the Advanced and Premium plans, StockEasier sends an alert when an item reaches the minimum level you set.',
        },
        {
          q: 'Can several people use it at once?',
          a: 'Yes. On every plan, several people use StockEasier at the same time, from any device.',
        },
      ],
    },
    woodEasier: {
      ...pt.items.woodEasier,
      short: 'Treated timber passports',
      summary:
        'Batches, treatments, plant passports and DGAV reports, from receiving treated timber and pallets to shipping them.',
      h1: 'Treated timber passports, from receiving to shipping',
      lead: [
        'WoodEasier is built for companies that work with treated timber and pallets and must meet the requirements of DGAV, the Portuguese food and veterinary authority.',
        'It records each batch and its treatment, with temperatures and durations, and issues the reports and certificates for DGAV. When an inspection or audit comes, the paperwork is already in order.',
      ],
      featuresTitle: 'What WoodEasier does',
      features: [
        { term: 'Batches and movements', desc: 'Quick recording of treated timber batches and movements.' },
        { term: 'Treatments', desc: 'Treatments with temperatures and durations, per batch.' },
        { term: 'Passports', desc: 'Treated timber passports generated from each batch.' },
        { term: 'DGAV reports', desc: 'Reports and certificates issued automatically, in line with Portuguese law.' },
        { term: 'Traceability', desc: 'The history of each batch, from receiving to shipping.' },
        { term: 'Office and production', desc: 'The same information for the people treating the timber and the people doing the paperwork.' },
        { term: 'Audits', desc: 'Documents organised for inspections and audits.' },
      ],
      stepsTitle: 'One batch, from receiving to shipping',
      stepsIntro: 'The path of a timber batch in WoodEasier:',
      steps: [
        'The timber arrives and is recorded as a batch.',
        'The treatment is recorded with its temperature and duration.',
        'WoodEasier generates the passport for the treated batch.',
        'At shipping, the batch leaves with its full history and the DGAV reports ready.',
      ],
      related: [
        { id: 'customSoftware', text: 'Custom software for your industry' },
        { id: 'products', text: 'All GetEasier products' },
      ],
      faqTitle: 'Questions about WoodEasier',
      faq: [
        {
          q: 'Which companies is WoodEasier for?',
          a: 'Companies that work with treated timber and pallets and must meet the requirements of DGAV, the Portuguese food and veterinary authority.',
        },
        {
          q: 'Which documents does WoodEasier issue?',
          a: 'Treated timber passports for each batch, and the reports and certificates for DGAV, in line with Portuguese law.',
        },
        {
          q: 'Does it help with an inspection or audit?',
          a: 'Yes. Each batch has its full history, from receiving to shipping, with treatments, temperatures and durations. The paperwork is already in order when the inspection comes.',
        },
        {
          q: 'How much does WoodEasier cost?',
          a: 'WoodEasier has a single plan with every feature. The price comes in a quote for your company.',
        },
      ],
    },
  },
}

const nl: ProductsDict = {
  indexH1: 'Vier producten voor bedrijven die op het terrein werken',
  indexLead: 'Elk product lost één concreet probleem op en werkt op zichzelf.',
  indexSame: 'Hetzelfde team dat de producten bouwt, bouwt ook wat ze niet doen.',
  indexSameLink: 'Bekijk software op maat',
  plansLine: 'Plannen per product',
  plansLink: 'Plannen vergelijken',
  indexIncludes: 'Inclusief TimeEasier',
  plansTitle: 'Basis, Geavanceerd of Premium',
  customTitle: 'Iets anders nodig?',
  planIncluded: 'Bekijk wat elk plan omvat',
  relatedTitle: 'Gerelateerde pagina’s',
  videoTitle: 'WoodEasier in beeld',
  videoButton: 'Bekijk de WoodEasier-video',
  videoNote: 'De video wordt geladen van YouTube, binnen deze pagina, pas nadat u op de knop klikt. De video is in het Portugees.',
  testimonialTitle: 'Wie het gebruikt',
  items: {
    timeEasier: {
      ...pt.items.timeEasier,
      short: 'Tijdregistratie en HR-beheer',
      summary: 'Medewerkers klokken in en uit op een tablet op de werkvloer of in de app. Het management heeft uren, vakantie, afwezigheden en het maandrapport klaar.',
      h1: 'Tijdregistratie op de tablet op het werk of op de smartphone',
      lead: [
        'Met TimeEasier klokt elke medewerker in en uit op een tablet op de werkplek met gezichtsherkenning, of via de app voor iOS en Android bij werk op verplaatsing.',
        'Het management ziet de uren, afwezigheden en vakantiedagen van elke persoon. Op het einde van de maand exporteert het het urenrapport van elke medewerker, in overeenstemming met artikel 202 van de Portugese arbeidswet en met wat de Portugese arbeidsinspectie (ACT) vraagt.',
      ],
      featuresTitle: 'Wat TimeEasier doet',
      features: [
        { term: 'Tijdregistratie', desc: 'Op een tablet op de werkplek, of in de iOS- en Android-app voor wie op verplaatsing werkt.' },
        { term: 'Gezichtsherkenning', desc: 'Op de tablet identificeert de medewerker zich via zijn gezicht bij het inklokken.' },
        { term: 'Geolocatie', desc: 'Elke registratie in de app bewaart de locatie waar ze werd uitgevoerd.' },
        { term: 'Uurroosters', desc: 'Verschillende uurroosters en types: vrijgesteld van uurrooster, per uur betaald, vast uurrooster.' },
        { term: 'Afwezigheden en vakantie', desc: 'Afwezigheden per medewerker en de vakantieplanning van het bedrijf.' },
        { term: 'Overuren', desc: 'Opvolging van overuren per medewerker.' },
        { term: 'Goedkeuring van registraties', desc: 'De verantwoordelijke keurt de registraties van zijn team goed.' },
        { term: 'Documenten en opleidingen', desc: 'Loonfiches, contracten en rapporten per medewerker, met meldingen voor vervallen documenten en registratie van opleidingen.' },
        { term: 'Maandrapport', desc: 'Urenrapport per medewerker (art. 202 van de Portugese arbeidswet) en algemeen bedrijfsrapport.' },
        { term: 'Lonen en ERP', desc: 'Export naar loonverwerking en ERP-integratie in het Premium-plan.' },
      ],
      stepsTitle: 'Eén registratie, van tablet tot rapport',
      stepsIntro: 'Wat er gebeurt wanneer een medewerker aankomt op het werk:',
      steps: [
        'De medewerker komt aan en identificeert zich via zijn gezicht op de tablet, of klokt in via de app.',
        'TimeEasier bewaart het uur en, in de app, de locatie van de registratie.',
        'De verantwoordelijke bekijkt de registraties van het team en keurt ze goed.',
        'Op het einde van de maand staat het urenrapport per medewerker klaar voor export.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier: TimeEasier uitgebreid met werfbeheer' },
        { id: 'customSoftware', text: 'Hoe we het TimeEasier-platform bouwden' },
      ],
      faqTitle: 'Vragen over TimeEasier',
      faq: [
        { q: 'Voldoet gezichtsherkenning aan de AVG/GDPR?', a: 'De werkgever is de verwerkingsverantwoordelijke en bepaalt de rechtsgrond en de informatie aan de werknemers. GetEasier verwerkt de gegevens in zijn opdracht, als verwerker (artikel 28 AVG). Op de tablet kan de medewerker ook inloggen met zijn pincode.' },
        { q: 'Werkt het voor medewerkers op verplaatsing?', a: 'Ja. Wie op verplaatsing werkt, klokt in en uit via de iOS- en Android-app. In de plannen Geavanceerd en Premium bewaart elke registratie in de app de locatie waar ze werd gemaakt.' },
        { q: 'Koppelt het met de loonverwerking?', a: 'Ja, in het Premium-plan: export voor loonverwerking en integratie met het ERP van uw bedrijf.' },
      ],
    },
    constructionEasier: {
      ...pt.items.constructionEasier,
      short: 'Werven en onderaannemers',
      summary: 'Wie er op elke werf werkt en voor welk bedrijf, documenten van onderaannemers, kosten per werf en vorderingsstaten. Inclusief TimeEasier.',
      h1: 'Wie is er op elke werf, voor welk bedrijf en met welke documenten',
      lead: [
        'ConstructionEasier combineert de tijdregistratie van TimeEasier met werfbeheer. Het is ontwikkeld samen met Portugese bouwbedrijven om elke werf op te volgen, van planning tot analyse van de resultaten.',
        'De projectleider weet wie er op de werf staat, welke onderaannemers actief zijn en of alle documenten in orde zijn. De directie ziet de kostprijs per werf in materialen en werkuren.',
      ],
      featuresTitle: 'Wat ConstructionEasier doet',
      features: [
        { term: 'Werven', desc: 'Overzicht van lopende, geplande en afgeronde werven met status en voortgang.' },
        { term: 'Medewerkers per werf', desc: 'Realtime locatie van wie er op elke werf is, met aankomstmeldingen.' },
        { term: 'Onderaannemers', desc: 'Onderaannemers en hun arbeiders per werf, inclusief documentbeheer per bedrijf.' },
        { term: 'Rechten per rol', desc: 'Werfleider, projectleider, preventieadviseur en hoofduitvoerder zien elk wat ze nodig hebben.' },
        { term: 'Kosten', desc: 'Kostprijs per werf in materialen en arbeid, en kostprijs per medewerker.' },
        { term: 'Vorderingsstaat', desc: 'Automatisch gegenereerde vorderingsstaat (auto de obra).' },
        { term: 'Documentatie', desc: 'Bijlagen en documenten georganiseerd en gedeeld per werf.' },
        { term: 'Verblijf en loopbaan', desc: 'Verblijfskosten van medewerkers en loopbaanopvolging.' },
        { term: 'Centraal dashboard', desc: 'Overzicht van alle werven voor opvolging en analyse.' },
        { term: 'Tijdregistratie', desc: 'Alle functies van TimeEasier in het overeenkomstige plan.' },
        { term: 'Documentlezing met AI', desc: 'Documenten worden uitgelezen met artificiële intelligentie (OCR) en de gegevens komen in het platform zonder dat iemand ze overtypt.' },
      ],
      stepsTitle: 'Een werf gezien door de projectleider',
      stepsIntro: 'Wat de projectleider ziet bij het openen van een werf:',
      steps: [
        'Kiest de werf en ziet wie er nu aanwezig is, van welk bedrijf en hoe laat ze aankwamen.',
        'Ziet de onderaannemers op de werf en de arbeiders per bedrijf.',
        'Ziet de status van de documenten van elke arbeider: geldig, bijna vervallen of ontbrekend.',
        'Krijgt een melding wanneer een medewerker de werf betreedt.',
      ],
      related: [
        { id: 'timeEasier', text: 'TimeEasier: de tijdregistratie inbegrepen in ConstructionEasier' },
        { id: 'stockEasier', text: 'StockEasier: PBM’s uitgereikt aan elke medewerker' },
        { id: 'customSoftware', text: 'Hoe we dit platform bouwden' },
      ],
    },
    stockEasier: {
      ...pt.items.stockEasier,
      short: 'Voorraad van PBM’s en verbruiksgoederen',
      summary: 'In- en uitgaande PBM’s en verbruiksgoederen, wat aan elke medewerker werd uitgereikt en meldingen wanneer het tijd is om bij te bestellen. Zonder spreadsheets.',
      h1: 'Weet welke PBM’s u heeft uitgereikt, aan wie en wanneer u moet bijbestellen',
      lead: [
        'StockEasier registreert alle in- en uitgaande PBM’s en verbruiksgoederen. Elke beweging werkt de voorraad bij en het systeem waarschuwt wanneer een artikel het bestelniveau bereikt.',
        'U heeft geen spreadsheets meer nodig en doet minder spoedaankopen. U behoudt de historiek van alles wat binnenkwam, buitenging en aan elke medewerker werd uitgereikt.',
      ],
      featuresTitle: 'Wat StockEasier doet',
      features: [
        { term: 'Bewegingen', desc: 'Registratie van in- en uitgaande PBM’s en andere verbruiksgoederen.' },
        { term: 'Voorraadniveaus', desc: 'Realtime bijgewerkt bij elke beweging.' },
        { term: 'Bestelmeldingen', desc: 'Automatische melding zodra een artikel het ingestelde minimum bereikt.' },
        { term: 'Historiek', desc: 'Alle bewegingen en verbruik, klaar voor analyse en audits.' },
        { term: 'Categorieën en locaties', desc: 'Artikelen georganiseerd per categorie en opslaglocatie.' },
        { term: 'PBM’s per medewerker', desc: 'Rapport van wat aan elke medewerker werd uitgereikt.' },
        { term: 'Meerdere gebruikers', desc: 'Gelijktijdige toegang voor meerdere personen vanaf elk toestel.' },
        { term: 'Rapporten en exports', desc: 'Uitgebreide rapporten en exports in het Premium-plan.' },
      ],
      stepsTitle: 'Eén artikel, van levering tot melding',
      stepsIntro: 'Wat er gebeurt met een artikel in voorraad:',
      steps: [
        'U boekt een doos veiligheidshandschoenen in: de voorraad stijgt.',
        'U geeft een paar aan een medewerker: de voorraad daalt en de uitgifte staat op zijn naam.',
        'Bereikt de voorraad het bestelniveau, dan stuurt StockEasier een melding.',
        'De historiek toont hoeveel er elke maand werd verbruikt.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier: de werven waar de PBM’s worden gebruikt' },
        { id: 'customSoftware', text: 'Software op maat voor andere bedrijfsprocessen' },
      ],
      faqTitle: 'Vragen over StockEasier',
      faq: [
        { q: 'Is StockEasier alleen voor PBM’s?', a: 'Nee. Het dient voor PBM’s en andere verbruiksgoederen, geordend per categorie en opslaglocatie.' },
        { q: 'Zie ik welke PBM’s ik aan elke medewerker heb gegeven?', a: 'Ja. In de plannen Geavanceerd en Premium is er een rapport van de PBM’s die aan elke medewerker werden uitgereikt, met de historiek van alle bewegingen.' },
        { q: 'Waarschuwt het wanneer we moeten bijbestellen?', a: 'Ja. In de plannen Geavanceerd en Premium stuurt StockEasier een melding zodra een artikel het minimumniveau bereikt dat u heeft ingesteld.' },
        { q: 'Kunnen meerdere personen het tegelijk gebruiken?', a: 'Ja. In alle plannen gebruiken meerdere personen StockEasier tegelijk, vanaf elk toestel.' },
      ],
    },
    woodEasier: {
      ...pt.items.woodEasier,
      short: 'Paspoorten voor behandeld hout',
      summary: 'Partijen, behandelingen, paspoorten en bewijsstukken voor de DGAV, van ontvangst tot verzending van behandeld hout en palletten.',
      h1: 'Paspoorten voor behandeld hout, van ontvangst tot verzending',
      lead: [
        'WoodEasier is gemaakt voor bedrijven die werken met behandeld hout en palletten en moeten voldoen aan de eisen van de DGAV, de Portugese autoriteit voor voedsel en diergeneeskunde.',
        'Het registreert elke partij en haar behandeling, met temperaturen en duurtijden, en maakt de rapporten en bewijsstukken voor de DGAV op. Bij een inspectie of audit is de documentatie al geordend.',
      ],
      featuresTitle: 'Wat WoodEasier doet',
      features: [
        { term: 'Partijen en bewegingen', desc: 'Snelle registratie van partijen en bewegingen van behandeld hout.' },
        { term: 'Behandelingen', desc: 'Behandelingen met temperaturen en duurtijden per partij.' },
        { term: 'Paspoorten', desc: 'Paspoorten voor behandeld hout, gegenereerd op basis van de partijen.' },
        { term: 'DGAV-rapporten', desc: 'Rapporten en bewijsstukken automatisch opgemaakt, in overeenstemming met de Portugese wetgeving.' },
        { term: 'Traceerbaarheid', desc: 'Historiek van elke partij, van ontvangst tot verzending.' },
        { term: 'Kantoor en productie', desc: 'Dezelfde gegevens voor wie het hout behandelt en wie de administratie doet.' },
        { term: 'Audits', desc: 'Documentatie geordend voor inspecties en audits.' },
      ],
      stepsTitle: 'Eén partij, van ontvangst tot verzending',
      stepsIntro: 'Het traject van een partij hout in WoodEasier:',
      steps: [
        'Het hout komt aan en wordt als partij geregistreerd.',
        'De behandeling wordt vastgelegd met temperatuur en duurtijd.',
        'WoodEasier genereert het paspoort van de behandelde partij.',
        'Bij verzending vertrekt de partij met haar volledige historiek en met de rapporten voor de DGAV klaar.',
      ],
      related: [
        { id: 'customSoftware', text: 'Software op maat voor uw industrie' },
        { id: 'products', text: 'Alle producten van GetEasier' },
      ],
      faqTitle: 'Vragen over WoodEasier',
      faq: [
        { q: 'Voor welke bedrijven is WoodEasier bedoeld?', a: 'Voor bedrijven die werken met behandeld hout en palletten en moeten voldoen aan de eisen van de DGAV, de Portugese autoriteit voor voedsel en diergeneeskunde.' },
        { q: 'Welke documenten levert WoodEasier?', a: 'De paspoorten voor behandeld hout van elke partij en de rapporten en bewijsstukken voor de DGAV, in overeenstemming met de Portugese wetgeving.' },
        { q: 'Helpt het bij een inspectie of audit?', a: 'Ja. Elke partij heeft haar volledige historiek, van ontvangst tot verzending, met behandelingen, temperaturen en duurtijden. De documentatie is al geordend wanneer de inspectie komt.' },
        { q: 'Wat kost WoodEasier?', a: 'WoodEasier heeft één enkel plan, met alle functies. De prijs krijgt u in een offerte voor uw bedrijf.' },
      ],
    },
  },
}

const es: ProductsDict = {
  indexH1: 'Cuatro productos para empresas que trabajan sobre el terreno',
  indexLead: 'Cada uno resuelve un problema concreto y funciona de forma independiente.',
  indexSame: 'El mismo equipo que crea los productos construye lo que no cubren.',
  indexSameLink: 'Ver software a medida',
  plansLine: 'Planes de cada producto',
  plansLink: 'Comparar los planes',
  indexIncludes: 'Incluye TimeEasier',
  plansTitle: 'Base, Avanzado o Premium',
  customTitle: '¿Necesitas algo diferente?',
  planIncluded: 'Ver qué incluye cada plan',
  relatedTitle: 'Páginas relacionadas',
  videoTitle: 'WoodEasier en vídeo',
  videoButton: 'Ver el vídeo de WoodEasier',
  videoNote: 'El vídeo se carga desde YouTube, dentro de esta página, solo después de pulsar el botón. Está en portugués.',
  testimonialTitle: 'Quién lo usa',
  items: {
    timeEasier: {
      ...pt.items.timeEasier,
      short: 'Control horario y gestión de RR. HH.',
      summary: 'Los empleados fichan en una tablet en el centro de trabajo o en la app. La dirección tiene las horas, las vacaciones, las ausencias y el informe mensual listos.',
      h1: 'Control horario en tablet en el centro de trabajo o en el móvil',
      lead: [
        'Con TimeEasier, cada empleado registra la entrada y la salida en una tablet en el centro de trabajo, donde se identifica por el rostro, o en la app para iOS y Android cuando trabaja fuera.',
        'La dirección ve las horas, las ausencias y las vacaciones de cada persona. A fin de mes obtiene el informe de horas de cada empleado, conforme al artículo 202 del Código del Trabajo portugués y a lo que pide la inspección de trabajo portuguesa (ACT).',
      ],
      featuresTitle: 'Qué hace TimeEasier',
      features: [
        { term: 'Control de fichajes', desc: 'En tablet en el centro de trabajo o en la app iOS y Android para personal desplazado.' },
        { term: 'Reconocimiento facial', desc: 'En la tablet, el trabajador se identifica por el rostro al fichar.' },
        { term: 'Geolocalización', desc: 'Cada fichaje realizado en la app guarda el lugar donde se registró.' },
        { term: 'Horarios', desc: 'Múltiples horarios y modalidades: exención, por horas o jornada fija.' },
        { term: 'Ausencias y vacaciones', desc: 'Ausencias por empleado y calendario de vacaciones de la empresa.' },
        { term: 'Horas extra', desc: 'Control de horas extraordinarias de cada trabajador.' },
        { term: 'Aprobación de registros', desc: 'El responsable valida los fichajes de su equipo.' },
        { term: 'Documentos y formación', desc: 'Nóminas, contratos e informes por empleado, con alertas de caducidad y registro de formaciones.' },
        { term: 'Informe mensual', desc: 'Informe de horas por empleado (art. 202 del Código del Trabajo portugués) e informe general de la empresa.' },
        { term: 'Nóminas y ERP', desc: 'Exportación para nóminas e integración con ERP en el plan Premium.' },
      ],
      stepsTitle: 'Un fichaje, de la tablet al informe',
      stepsIntro: 'Qué ocurre cuando un empleado llega al trabajo:',
      steps: [
        'El empleado llega y se identifica en la tablet por el rostro, o ficha en la app.',
        'TimeEasier guarda la hora y, en la app, la ubicación del registro.',
        'El responsable revisa los fichajes del equipo y los aprueba.',
        'A fin de mes, el informe de horas de cada empleado está listo para exportar.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier: TimeEasier con gestión de obras' },
        { id: 'customSoftware', text: 'Cómo construimos la plataforma de TimeEasier' },
      ],
      faqTitle: 'Preguntas sobre TimeEasier',
      faq: [
        { q: '¿El reconocimiento facial cumple con el RGPD?', a: 'El empleador es el responsable del tratamiento y define la base jurídica y la información a los trabajadores. GetEasier trata los datos por cuenta de este, como encargado del tratamiento (artículo 28 del RGPD). En la tablet, el empleado también puede entrar con el PIN.' },
        { q: '¿Sirve para quien trabaja fuera de las instalaciones?', a: 'Sí. Quien trabaja fuera registra la entrada y la salida en la app para iOS y Android. En los planes Avanzado y Premium, cada fichaje hecho en la app guarda el lugar donde se hizo.' },
        { q: '¿Se conecta con nóminas?', a: 'Sí, en el plan Premium: exportación para nóminas e integración con el ERP de la empresa.' },
      ],
    },
    constructionEasier: {
      ...pt.items.constructionEasier,
      short: 'Gestión de obras y subcontratistas',
      summary: 'Quién está en cada obra y de qué empresa es, documentación de subcontratistas, costes por obra y certificaciones de obra. Incluye TimeEasier.',
      h1: 'Quién está en cada obra, de qué empresa es y con qué documentos',
      lead: [
        'ConstructionEasier une el control horario de TimeEasier con la gestión de obras. Se desarrolló con empresas de construcción portuguesas para seguir cada obra, desde la planificación hasta el análisis de resultados.',
        'El jefe de obra sabe quién está en la obra, qué subcontratistas trabajan allí y si los documentos están al día. La dirección ve el coste de cada obra en materiales y mano de obra.',
      ],
      featuresTitle: 'Qué hace ConstructionEasier',
      features: [
        { term: 'Obras', desc: 'Listado de obras en curso, en preparación y finalizadas, con el estado y el avance de cada una.' },
        { term: 'Trabajadores por obra', desc: 'Ubicación en tiempo real de quién está en cada obra, con alertas de entrada.' },
        { term: 'Subcontratistas', desc: 'Empresas subcontratistas y sus trabajadores por obra, con la gestión de los documentos de cada una.' },
        { term: 'Permisos por rol', desc: 'Encargado de Obra, Jefe de Obra, Técnico de PRL y Encargado General, cada uno con lo que necesita ver.' },
        { term: 'Costes', desc: 'Coste por obra en materiales y mano de obra, y coste por empleado.' },
        { term: 'Certificación de obra', desc: 'Certificación de obra generada automáticamente.' },
        { term: 'Documentación', desc: 'Adjuntos y documentos organizados y compartidos por obra.' },
        { term: 'Alojamiento y carrera', desc: 'Gastos de alojamiento de empleados y progresión profesional.' },
        { term: 'Panel central', desc: 'Visión de todas las obras para seguimiento y análisis.' },
        { term: 'Control horario', desc: 'Todas las funciones de TimeEasier en el plan equivalente.' },
        { term: 'Lectura de documentos con IA', desc: 'Los documentos se leen con inteligencia artificial (OCR) y los datos entran en la plataforma sin que nadie los teclee.' },
      ],
      stepsTitle: 'Una obra vista por el jefe de obra',
      stepsIntro: 'Lo que ve el jefe de obra al abrir una obra:',
      steps: [
        'Elige la obra y ve quién está presente ahora, de qué empresa es cada persona y a qué hora entró.',
        'Ve las empresas subcontratistas en la obra y los trabajadores de cada una.',
        'Ve el estado de los documentos de cada trabajador: válido, por caducar o faltante.',
        'Recibe una alerta cuando un empleado entra en la obra.',
      ],
      related: [
        { id: 'timeEasier', text: 'TimeEasier: el control horario incluido en ConstructionEasier' },
        { id: 'stockEasier', text: 'StockEasier: EPIs entregados a cada trabajador' },
        { id: 'customSoftware', text: 'Cómo construimos esta plataforma' },
      ],
    },
    stockEasier: {
      ...pt.items.stockEasier,
      short: 'Stock de EPIs y consumibles',
      summary: 'Entradas y salidas de EPIs y consumibles, lo entregado a cada empleado y alertas de reposición. Sin hojas de cálculo.',
      h1: 'Sabe qué EPIs entregaste, a quién y cuándo tienes que volver a comprar',
      lead: [
        'StockEasier registra las entradas y salidas de EPIs y otros consumibles. Cada movimiento actualiza el stock y el sistema avisa al llegar al nivel de reposición.',
        'Dejas de necesitar hojas de cálculo y haces menos compras de urgencia. Queda el historial de todo lo que entró, salió y se entregó a cada empleado.',
      ],
      featuresTitle: 'Qué hace StockEasier',
      features: [
        { term: 'Movimientos', desc: 'Registro de entradas y salidas de EPIs y otros consumibles.' },
        { term: 'Niveles de stock', desc: 'Niveles actualizados en tiempo real con cada movimiento.' },
        { term: 'Alertas de reposición', desc: 'Aviso automático cuando un artículo alcanza el mínimo definido.' },
        { term: 'Historial', desc: 'Todos los movimientos y consumos para análisis y auditorías.' },
        { term: 'Categorías y ubicaciones', desc: 'Artículos organizados por categoría y lugar de almacenamiento.' },
        { term: 'EPIs por empleado', desc: 'Informe de lo entregado a cada trabajador.' },
        { term: 'Varios usuarios', desc: 'Acceso simultáneo de varias personas desde cualquier dispositivo.' },
        { term: 'Informes y exportaciones', desc: 'Informes avanzados y exportaciones en el plan Premium.' },
      ],
      stepsTitle: 'Un artículo, de la entrada a la alerta',
      stepsIntro: 'Qué ocurre con un artículo en stock:',
      steps: [
        'Das entrada a una caja de guantes de protección: el stock sube.',
        'Entregas un par a un empleado: el stock baja y queda registrado en su ficha.',
        'Cuando el stock alcanza el nivel de reposición, StockEasier avisa.',
        'El historial muestra cuánto se consumió cada mes.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier: las obras donde se usan los EPIs' },
        { id: 'customSoftware', text: 'Software a medida para otros procesos de tu empresa' },
      ],
      faqTitle: 'Preguntas sobre StockEasier',
      faq: [
        { q: '¿StockEasier sirve solo para EPIs?', a: 'No. Sirve para EPIs y otros consumibles, organizados por categoría y por lugar de almacenamiento.' },
        { q: '¿Puedo saber qué EPIs entregué a cada empleado?', a: 'Sí. En los planes Avanzado y Premium hay un informe de los EPIs entregados a cada empleado, con el historial de todos los movimientos.' },
        { q: '¿Avisa cuando hay que comprar?', a: 'Sí. En los planes Avanzado y Premium, StockEasier avisa cuando un artículo llega al nivel mínimo que has definido.' },
        { q: '¿Pueden usarlo varias personas a la vez?', a: 'Sí. En todos los planes, varias personas usan StockEasier a la vez, desde cualquier dispositivo.' },
      ],
    },
    woodEasier: {
      ...pt.items.woodEasier,
      short: 'Pasaportes de madera tratada',
      summary: 'Lotes, tratamientos, pasaportes y justificantes para la DGAV, desde la recepción hasta la expedición de la madera tratada y los palets.',
      h1: 'Pasaportes de madera tratada, de la recepción a la expedición',
      lead: [
        'WoodEasier está hecho para empresas que trabajan con madera tratada y palets y tienen que cumplir las exigencias de la DGAV, la autoridad portuguesa de alimentación y veterinaria.',
        'Registra cada lote y su tratamiento, con temperaturas y duraciones, y emite los informes y justificantes para la DGAV. En una inspección o auditoría, la documentación ya está organizada.',
      ],
      featuresTitle: 'Qué hace WoodEasier',
      features: [
        { term: 'Lotes y movimientos', desc: 'Registro ágil de lotes y movimientos de madera tratada.' },
        { term: 'Tratamientos', desc: 'Tratamientos con temperaturas y duraciones por lote.' },
        { term: 'Pasaportes', desc: 'Pasaportes de madera tratada generados a partir de los lotes.' },
        { term: 'Informes DGAV', desc: 'Informes y justificantes emitidos automáticamente, conforme a la legislación portuguesa.' },
        { term: 'Trazabilidad', desc: 'Historial de cada lote, de la recepción a la expedición.' },
        { term: 'Oficina y producción', desc: 'La misma información para quien trata la madera y quien gestiona los papeles.' },
        { term: 'Auditorías', desc: 'Documentación organizada para inspecciones y auditorías.' },
      ],
      stepsTitle: 'Un lote, de la recepción a la expedición',
      stepsIntro: 'El recorrido de un lote de madera en WoodEasier:',
      steps: [
        'La madera llega y se registra como un lote.',
        'El tratamiento queda registrado con su temperatura y duración.',
        'WoodEasier genera el pasaporte del lote tratado.',
        'En la expedición, el lote sale con el historial completo y los informes para la DGAV listos.',
      ],
      related: [
        { id: 'customSoftware', text: 'Software a medida para tu industria' },
        { id: 'products', text: 'Todos los productos de GetEasier' },
      ],
      faqTitle: 'Preguntas sobre WoodEasier',
      faq: [
        { q: '¿Para qué empresas es WoodEasier?', a: 'Para empresas que trabajan con madera tratada y palets y tienen que cumplir las exigencias de la DGAV, la autoridad portuguesa de alimentación y veterinaria.' },
        { q: '¿Qué documentos emite WoodEasier?', a: 'Los pasaportes de madera tratada de cada lote y los informes y justificantes para la DGAV, conforme a la legislación portuguesa.' },
        { q: '¿Ayuda en una inspección o auditoría?', a: 'Sí. Cada lote tiene el historial completo, de la recepción a la expedición, con los tratamientos, temperaturas y duraciones. La documentación ya está organizada cuando llega la inspección.' },
        { q: '¿Cuánto cuesta WoodEasier?', a: 'WoodEasier tiene un plan único, con todas las funcionalidades. El precio se indica en una propuesta para tu empresa.' },
      ],
    },
  },
}

const fr: ProductsDict = {
  indexH1: 'Quatre produits pour les entreprises qui travaillent sur le terrain',
  indexLead: 'Chacun résout un problème concret et fonctionne de façon autonome.',
  indexSame: 'La même équipe qui crée ces produits développe aussi ce qu’ils ne font pas.',
  indexSameLink: 'Voir le logiciel sur mesure',
  plansLine: 'Formules de chaque produit',
  plansLink: 'Comparer les formules',
  indexIncludes: 'Inclut TimeEasier',
  plansTitle: 'Base, Avancé ou Premium',
  customTitle: 'Besoin d’autre chose ?',
  planIncluded: 'Voir ce que comprend chaque formule',
  relatedTitle: 'Pages associées',
  videoTitle: 'WoodEasier en vidéo',
  videoButton: 'Voir la vidéo de WoodEasier',
  videoNote: 'La vidéo se charge depuis YouTube, dans cette page, uniquement après avoir cliqué sur le bouton. Elle est en portugais.',
  testimonialTitle: 'Qui l’utilise',
  items: {
    timeEasier: {
      ...pt.items.timeEasier,
      short: 'Pointage et gestion RH',
      summary: 'Les collaborateurs pointent leurs entrées et sorties sur une tablette sur le lieu de travail ou dans l’app. La direction dispose des heures, des congés, des absences et du rapport mensuel prêt.',
      h1: 'Pointage sur tablette sur site ou sur smartphone',
      lead: [
        'Avec TimeEasier, chaque collaborateur pointe son arrivée et son départ sur une tablette sur le lieu de travail, où il s’identifie par le visage, ou dans l’app iOS et Android lorsqu’il travaille à l’extérieur.',
        'La direction voit les heures, les absences et les congés de chacun. En fin de mois, elle exporte le relevé d’heures de chaque collaborateur, conformément à l’article 202 du Code du travail portugais et à ce que demande l’inspection du travail portugaise (ACT).',
      ],
      featuresTitle: 'Ce que fait TimeEasier',
      features: [
        { term: 'Pointage', desc: 'Sur tablette sur le lieu de travail, ou sur l’app iOS et Android en déplacement.' },
        { term: 'Reconnaissance faciale', desc: 'Sur la tablette, le collaborateur s’identifie par son visage au moment du pointage.' },
        { term: 'Géolocalisation', desc: 'Chaque pointage depuis l’app enregistre le lieu où il a été effectué.' },
        { term: 'Horaires', desc: 'Plusieurs horaires et types d’horaire : exemption d’horaire, rémunération à l’heure, horaire fixe.' },
        { term: 'Absences et congés', desc: 'Absences par collaborateur et planning des congés de l’entreprise.' },
        { term: 'Heures supplémentaires', desc: 'Suivi des heures supplémentaires de chaque collaborateur.' },
        { term: 'Validation des pointages', desc: 'Le responsable valide les pointages de son équipe.' },
        { term: 'Documents et formations', desc: 'Fiches de paie, contrats et rapports par collaborateur, avec alertes de documents expirés et suivi des formations.' },
        { term: 'Rapport mensuel', desc: 'Relevé d’heures par collaborateur (art. 202 du Code du travail portugais) et rapport global de l’entreprise.' },
        { term: 'Paie et ERP', desc: 'Export pour la paie et intégration ERP, dans la formule Premium.' },
      ],
      stepsTitle: 'Un pointage, de la tablette au rapport',
      stepsIntro: 'Ce qui se passe lorsqu’un collaborateur arrive au travail :',
      steps: [
        'Le collaborateur arrive et s’identifie sur la tablette par le visage, ou pointe sur l’app.',
        'TimeEasier enregistre l’heure et, sur l’app, le lieu du pointage.',
        'Le responsable consulte les pointages de son équipe et les valide.',
        'En fin de mois, le relevé d’heures de chaque collaborateur est prêt à exporter.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier : TimeEasier avec gestion de chantiers' },
        { id: 'customSoftware', text: 'Comment nous avons conçu la plateforme TimeEasier' },
      ],
      faqTitle: 'Questions sur TimeEasier',
      faq: [
        { q: 'La reconnaissance faciale est-elle conforme au RGPD ?', a: 'L’employeur est le responsable du traitement et définit la base juridique et l’information aux salariés. GetEasier traite les données pour son compte, en tant que sous-traitant (article 28 du RGPD). Sur la tablette, le collaborateur peut aussi se connecter avec son code PIN.' },
        { q: 'Convient-il à ceux qui travaillent hors des locaux ?', a: 'Oui. Ceux qui travaillent à l’extérieur pointent leur arrivée et leur départ dans l’app iOS et Android. Dans les formules Avancé et Premium, chaque pointage fait dans l’app enregistre le lieu où il a été effectué.' },
        { q: 'Est-ce relié à la paie ?', a: 'Oui, dans la formule Premium : export pour la paie et intégration avec l’ERP de l’entreprise.' },
      ],
    },
    constructionEasier: {
      ...pt.items.constructionEasier,
      short: 'Chantiers et sous-traitants',
      summary: 'Qui est sur chaque chantier et pour quelle entreprise, documents des sous-traitants, coûts par chantier et états d’avancement. Inclut TimeEasier.',
      h1: 'Qui est sur chaque chantier, pour quelle entreprise et avec quels documents',
      lead: [
        'ConstructionEasier réunit le pointage de TimeEasier et la gestion des chantiers. Il a été développé avec des entreprises de construction portugaises pour suivre chaque chantier, de la planification à l’analyse des résultats.',
        'Le conducteur de travaux sait qui est sur le chantier, quels sous-traitants y travaillent et si les documents sont à jour. La direction voit le coût de chaque chantier en matériaux et en main-d’œuvre.',
      ],
      featuresTitle: 'Ce que fait ConstructionEasier',
      features: [
        { term: 'Chantiers', desc: 'Liste des chantiers en cours, en préparation et terminés, avec l’état et l’avancement de chacun.' },
        { term: 'Ouvriers par chantier', desc: 'Localisation en temps réel de qui est sur chaque chantier, avec alertes d’entrée.' },
        { term: 'Sous-traitants', desc: 'Entreprises sous-traitantes et leurs ouvriers par chantier, avec la gestion des documents de chacune.' },
        { term: 'Droits par rôle', desc: 'Chef de chantier, Conducteur de travaux, Préventeur et Chef général, chacun avec ce qu’il doit voir.' },
        { term: 'Coûts', desc: 'Coût par chantier en matériaux et main-d’œuvre, et coût par collaborateur.' },
        { term: 'État d’avancement', desc: 'État d’avancement des travaux (auto de obra) généré automatiquement.' },
        { term: 'Documentation', desc: 'Pièces jointes et documents classés et partagés par chantier.' },
        { term: 'Hébergement et parcours', desc: 'Frais d’hébergement des collaborateurs et évolution de carrière.' },
        { term: 'Tableau de bord central', desc: 'Vue de tous les chantiers pour le suivi et l’analyse.' },
        { term: 'Pointage', desc: 'Toutes les fonctionnalités de TimeEasier dans la formule correspondante.' },
        { term: 'Lecture de documents par IA', desc: 'Les documents sont lus par intelligence artificielle (OCR) et les données entrent dans la plateforme sans que personne ne les saisisse.' },
      ],
      stepsTitle: 'Un chantier vu par le conducteur de travaux',
      stepsIntro: 'Ce que voit le conducteur de travaux en ouvrant un chantier :',
      steps: [
        'Choisit le chantier et voit qui est présent maintenant, de quelle entreprise est chaque personne et à quelle heure elle est entrée.',
        'Voit les entreprises sous-traitantes sur le chantier et les ouvriers de chacune.',
        'Voit l’état des documents de chaque ouvrier : valide, bientôt expiré ou manquant.',
        'Reçoit une alerte lorsqu’un collaborateur entre sur le chantier.',
      ],
      related: [
        { id: 'timeEasier', text: 'TimeEasier : le pointage inclus dans ConstructionEasier' },
        { id: 'stockEasier', text: 'StockEasier : EPI remis à chaque collaborateur' },
        { id: 'customSoftware', text: 'Comment nous avons construit cette plateforme' },
      ],
    },
    stockEasier: {
      ...pt.items.stockEasier,
      short: 'Stocks d’EPI et consommables',
      summary: 'Entrées et sorties d’EPI et de consommables, ce qui a été remis à chaque collaborateur et alertes quand il faut réapprovisionner. Sans tableurs.',
      h1: 'Sachez quels EPI vous avez remis, à qui, et quand recommander',
      lead: [
        'StockEasier enregistre les entrées et sorties d’EPI et d’autres consommables. Chaque mouvement met à jour le stock, et le système prévient lorsqu’un article atteint son seuil de réapprovisionnement.',
        'Vous n’avez plus besoin de tableurs et faites moins d’achats en urgence. Vous gardez l’historique de tout ce qui est entré, sorti et a été remis à chaque collaborateur.',
      ],
      featuresTitle: 'Ce que fait StockEasier',
      features: [
        { term: 'Mouvements', desc: 'Enregistrement des entrées et sorties d’EPI et d’autres consommables.' },
        { term: 'Niveaux de stock', desc: 'Niveaux mis à jour en temps réel à chaque mouvement.' },
        { term: 'Alertes de réapprovisionnement', desc: 'Alerte automatique lorsqu’un article atteint le seuil minimum défini.' },
        { term: 'Historique', desc: 'Tous les mouvements et consommations pour analyse et audits.' },
        { term: 'Catégories et emplacements', desc: 'Articles classés par catégorie et lieu de stockage.' },
        { term: 'EPI par collaborateur', desc: 'Rapport de ce qui a été remis à chaque collaborateur.' },
        { term: 'Multi-utilisateurs', desc: 'Accès simultané pour plusieurs personnes depuis n’importe quel appareil.' },
        { term: 'Rapports et exports', desc: 'Rapports avancés et exports, dans la formule Premium.' },
      ],
      stepsTitle: 'Un article, de l’entrée à l’alerte',
      stepsIntro: 'Ce qui arrive à un article en stock :',
      steps: [
        'Vous enregistrez une boîte de gants de protection : le stock augmente.',
        'Vous remettez une paire à un collaborateur : le stock baisse et la remise est enregistrée sur sa fiche.',
        'Lorsque le stock atteint le seuil de réapprovisionnement, StockEasier vous prévient.',
        'L’historique montre combien a été consommé chaque mois.',
      ],
      related: [
        { id: 'constructionEasier', text: 'ConstructionEasier : les chantiers où les EPI sont utilisés' },
        { id: 'customSoftware', text: 'Logiciel sur mesure pour vos autres processus' },
      ],
      faqTitle: 'Questions sur StockEasier',
      faq: [
        { q: 'StockEasier sert-il uniquement aux EPI ?', a: 'Non. Il sert pour les EPI et d’autres consommables, classés par catégorie et par lieu de stockage.' },
        { q: 'Puis-je savoir quels EPI ont été remis à chaque collaborateur ?', a: 'Oui. Les formules Avancé et Premium comprennent un rapport des EPI remis à chaque collaborateur, avec l’historique de tous les mouvements.' },
        { q: 'M’avertit-il quand il faut recommander ?', a: 'Oui. Dans les formules Avancé et Premium, StockEasier prévient lorsqu’un article atteint le seuil minimum que vous avez défini.' },
        { q: 'Plusieurs personnes peuvent-elles l’utiliser en même temps ?', a: 'Oui. Dans toutes les formules, plusieurs personnes utilisent StockEasier en même temps, depuis n’importe quel appareil.' },
      ],
    },
    woodEasier: {
      ...pt.items.woodEasier,
      short: 'Passeports pour bois traité',
      summary: 'Lots, traitements, passeports et justificatifs pour la DGAV, de la réception à l’expédition du bois traité et des palettes.',
      h1: 'Passeports pour bois traité, de la réception à l’expédition',
      lead: [
        'WoodEasier est conçu pour les entreprises qui travaillent avec du bois traité et des palettes et doivent respecter les exigences de la DGAV, l’autorité alimentaire et vétérinaire portugaise.',
        'Il enregistre chaque lot et son traitement, avec températures et durées, et émet les rapports et justificatifs pour la DGAV. Lors d’une inspection ou d’un audit, la documentation est déjà organisée.',
      ],
      featuresTitle: 'Ce que fait WoodEasier',
      features: [
        { term: 'Lots et mouvements', desc: 'Enregistrement rapide des lots et mouvements de bois traité.' },
        { term: 'Traitements', desc: 'Traitements avec températures et durées par lot.' },
        { term: 'Passeports', desc: 'Passeports de bois traité générés à partir des lots.' },
        { term: 'Rapports DGAV', desc: 'Rapports et justificatifs émis automatiquement, conformément à la législation portugaise.' },
        { term: 'Traçabilité', desc: 'Historique de chaque lot, de la réception à l’expédition.' },
        { term: 'Bureau et production', desc: 'La même information pour ceux qui traitent le bois et ceux qui s’occupent des papiers.' },
        { term: 'Audits', desc: 'Documentation organisée pour les inspections et les audits.' },
      ],
      stepsTitle: 'Un lot, de la réception à l’expédition',
      stepsIntro: 'Le parcours d’un lot de bois dans WoodEasier :',
      steps: [
        'Le bois arrive et est enregistré en tant que lot.',
        'Le traitement est saisi avec sa température et sa durée.',
        'WoodEasier génère le passeport du lot traité.',
        'À l’expédition, le lot part avec son historique complet et les rapports pour la DGAV prêts.',
      ],
      related: [
        { id: 'customSoftware', text: 'Logiciel sur mesure pour votre industrie' },
        { id: 'products', text: 'Tous les produits GetEasier' },
      ],
      faqTitle: 'Questions sur WoodEasier',
      faq: [
        { q: 'À quelles entreprises s’adresse WoodEasier ?', a: 'Aux entreprises qui travaillent avec du bois traité et des palettes et doivent respecter les exigences de la DGAV, l’autorité alimentaire et vétérinaire portugaise.' },
        { q: 'Quels documents WoodEasier génère-t-il ?', a: 'Les passeports de bois traité de chaque lot ainsi que les rapports et justificatifs pour la DGAV, conformément à la législation portugaise.' },
        { q: 'Aide-t-il lors d’une inspection ou d’un audit ?', a: 'Oui. Chaque lot a son historique complet, de la réception à l’expédition, avec les traitements, températures et durées. La documentation est déjà organisée quand l’inspection arrive.' },
        { q: 'Combien coûte WoodEasier ?', a: 'WoodEasier a une formule unique, avec toutes les fonctionnalités. Le prix est indiqué dans un devis pour votre entreprise.' },
      ],
    },
  },
}

export const products: Record<Locale, ProductsDict> = { pt, en, nl, es, fr }
