import type { Locale, PageId, ProductId } from '@/lib/seo.config'

// Funcionalidades: só as que já estavam publicadas no site (páginas de produto e /planos).

export type Feature = { term: string; desc: string }

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
  indexLead: 'Cada um resolve um problema concreto. Funcionam sozinhos ou em conjunto.',
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
    },
  },
}

const en: ProductsDict = {
  indexH1: 'Four products for companies that work on site',
  indexLead: 'Each one solves one specific problem. They work on their own or together.',
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
    },
  },
}

export const products: Record<Locale, ProductsDict> = { pt, en }
