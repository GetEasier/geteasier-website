import type { Locale, ProductId } from '@/lib/seo.config'

// Tabela copiada da página /planos anterior. `beOnly`: só disponível na Bélgica.

type Row = { pt: string; en: string; plans: [boolean, boolean, boolean]; beOnly?: boolean }
export type PlanModule = { id: string; product: ProductId; singlePlan?: boolean; rows: Row[] }

const ALL: [boolean, boolean, boolean] = [true, true, true]
const ADV: [boolean, boolean, boolean] = [false, true, true]
const PREM: [boolean, boolean, boolean] = [false, false, true]

export const PLAN_MODULES: PlanModule[] = [
  {
    id: 'time',
    product: 'timeEasier',
    rows: [
      { pt: 'Ficha e lista de colaboradores', en: 'Employee records and list', plans: ALL },
      { pt: 'Mapa de férias', en: 'Holiday map', plans: ALL },
      { pt: 'Gestão de ausências', en: 'Absence management', plans: ALL },
      { pt: 'Registo de ponto na app (iOS e Android)', en: 'Clocking in on the app (iOS and Android)', plans: ALL },
      { pt: 'Controlo de horas por colaborador', en: 'Hours per employee', plans: ALL },
      { pt: 'Vários tipos de horário (isenção, pago à hora, fixo)', en: 'Several schedule types (exempt, hourly, fixed)', plans: ALL },
      { pt: 'Relatório mensal de horas (Art. 202.º CT e ACT)', en: 'Monthly hours report (Art. 202 Labour Code and ACT)', plans: ALL },
      { pt: 'Departamentos', en: 'Departments', plans: ALL },
      { pt: 'Categorias de colaboradores', en: 'Employee categories', plans: ADV },
      { pt: 'Gestão documental de colaboradores', en: 'Employee document management', plans: ADV },
      { pt: 'Gestão de formações de colaboradores', en: 'Employee training records', plans: ADV },
      { pt: 'Alertas de documentos expirados', en: 'Expired document alerts', plans: ADV },
      { pt: 'Geolocalização', en: 'Geolocation', plans: ADV },
      { pt: 'Aprovação de registos pelo responsável', en: 'Record approval by the team lead', plans: ADV },
      { pt: 'Controlo de horas extra', en: 'Overtime tracking', plans: ADV },
      { pt: 'Desativação automática de colaboradores', en: 'Automatic employee deactivation', plans: ADV },
      { pt: 'Exportação para processamento salarial', en: 'Export to payroll', plans: PREM },
      { pt: 'Integração com ERP', en: 'ERP integration', plans: PREM },
      { pt: 'Painel com indicadores (KPIs)', en: 'Dashboard with KPIs', plans: PREM },
      { pt: 'Gestor dedicado', en: 'Dedicated account manager', plans: PREM },
    ],
  },
  {
    id: 'construction',
    product: 'constructionEasier',
    rows: [
      { pt: 'Todas as funcionalidades do TimeEasier (plano correspondente)', en: 'Every TimeEasier feature (matching plan)', plans: ALL },
      { pt: 'Lista de obras', en: 'List of sites', plans: ALL },
      { pt: 'Localização de colaboradores por obra', en: 'Employee location per site', plans: ALL },
      { pt: 'Permissão Encarregado de Obra', en: 'Site foreman permission', plans: ALL },
      { pt: 'Custo por colaborador', en: 'Cost per employee', plans: ALL },
      { pt: 'Subempreiteiros', en: 'Subcontractors', plans: ADV },
      { pt: 'Gestão documental de subempreiteiros', en: 'Subcontractor document management', plans: ADV },
      { pt: 'Permissões Diretor de Obra, TSST e Encarregado Geral', en: 'Site manager, health and safety officer and general foreman permissions', plans: ADV },
      { pt: 'Alertas de entrada de colaborador em obra', en: 'Alerts when an employee enters a site', plans: ADV },
      { pt: 'Progressão de carreira do colaborador', en: 'Employee career progression', plans: ADV },
      { pt: 'Auto de obra automático', en: 'Automatic site progress report', plans: ADV },
      { pt: 'Painel central para análise', en: 'Central dashboard for analysis', plans: ADV },
      { pt: 'Despesas de alojamento de colaboradores', en: 'Employee housing expenses', plans: ADV },
      { pt: 'Implementação e integração com ERP', en: 'Rollout and ERP integration', plans: PREM },
      { pt: 'Inserção facilitada de colaboradores e subempreiteiros', en: 'Assisted import of employees and subcontractors', plans: PREM },
      { pt: 'Integração com Check-In-At-Work', en: 'Check-In-At-Work integration', plans: PREM, beOnly: true },
    ],
  },
  {
    id: 'stock',
    product: 'stockEasier',
    rows: [
      { pt: 'Registo de entradas e saídas de consumíveis', en: 'Consumables in and out', plans: ALL },
      { pt: 'Monitorização contínua dos níveis de stock', en: 'Continuous stock level monitoring', plans: ALL },
      { pt: 'Gestão por categorias e locais de armazenamento', en: 'Categories and storage locations', plans: ALL },
      { pt: 'Acesso simultâneo de vários utilizadores', en: 'Several users at once', plans: ALL },
      { pt: 'Alertas automáticos de reposição', en: 'Automatic reorder alerts', plans: ADV },
      { pt: 'Histórico completo de movimentos e consumos', en: 'Full history of movements and consumption', plans: ADV },
      { pt: 'Relatório de EPIs por colaborador', en: 'PPE report per employee', plans: ADV },
      { pt: 'Relatórios avançados e exportações', en: 'Advanced reports and exports', plans: PREM },
    ],
  },
  {
    id: 'wood',
    product: 'woodEasier',
    singlePlan: true,
    rows: [
      { pt: 'Passaportes de madeiras tratadas', en: 'Treated timber passports', plans: ALL },
      { pt: 'Rastreabilidade de lotes de madeira', en: 'Timber batch traceability', plans: ALL },
      { pt: 'Gestão documental de tratamentos', en: 'Treatment document management', plans: ALL },
      { pt: 'Relatórios de conformidade', en: 'Compliance reports', plans: ALL },
    ],
  },
]

const pt = {
  h1: 'Planos e módulos',
  lead: 'Cada produto tem três planos. A tabela mostra o que inclui cada um. Para saber o preço para a sua empresa, peça uma proposta.',
  plans: ['Base', 'Avançado', 'Premium'] as [string, string, string],
  feature: 'Funcionalidade',
  included: 'Incluído',
  notIncluded: 'Não incluído',
  singlePlan: 'O WoodEasier tem um plano único, com todas as funcionalidades.',
  beOnly: 'Só na Bélgica',
  notes: [
    'Mínimo de 25 colaboradores nos módulos cobrados por colaborador.',
    'O ConstructionEasier inclui todas as funcionalidades do TimeEasier no plano correspondente.',
    'Acresce IVA à taxa legal em vigor.',
  ],
  productLink: (name: string) => `Como funciona o ${name}`,
  ctaTitle: 'Peça uma proposta',
  ctaText: 'Diga-nos que produto lhe interessa e quantos colaboradores tem. Enviamos a proposta por email.',
  ctaButton: 'Pedir proposta',
}

export type PlansDict = typeof pt

const en: PlansDict = {
  h1: 'Plans and modules',
  lead: 'Each product has three plans. The table shows what each one includes. For the price for your company, ask for a quote.',
  plans: ['Base', 'Advanced', 'Premium'],
  feature: 'Feature',
  included: 'Included',
  notIncluded: 'Not included',
  singlePlan: 'WoodEasier has a single plan with every feature.',
  beOnly: 'Belgium only',
  notes: [
    'Minimum of 25 employees on modules charged per employee.',
    'ConstructionEasier includes every TimeEasier feature in the matching plan.',
    'Prices exclude VAT at the applicable rate.',
  ],
  productLink: (name: string) => `How ${name} works`,
  ctaTitle: 'Ask for a quote',
  ctaText: 'Tell us which product you are interested in and how many employees you have. We will send the quote by email.',
  ctaButton: 'Ask for a quote',
}

export const plans: Record<Locale, PlansDict> = { pt, en }
