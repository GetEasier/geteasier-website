import type { Locale, ProductId } from '@/lib/seo.config'

// Tabela copiada da página /planos anterior. `beOnly`: só disponível na Bélgica.

type Row = { pt: string; en: string; nl: string; es: string; fr: string; plans: [boolean, boolean, boolean]; beOnly?: boolean }
export type PlanModule = { id: string; product: ProductId; singlePlan?: boolean; rows: Row[] }

const ALL: [boolean, boolean, boolean] = [true, true, true]
const ADV: [boolean, boolean, boolean] = [false, true, true]
const PREM: [boolean, boolean, boolean] = [false, false, true]

export const PLAN_MODULES: PlanModule[] = [
  {
    id: 'time',
    product: 'timeEasier',
    rows: [
      { pt: 'Ficha e lista de colaboradores', en: 'Employee records and list', nl: 'Medewerkersfiche en -lijst', es: 'Ficha y lista de empleados', fr: 'Fiche et liste des collaborateurs', plans: ALL },
      { pt: 'Mapa de férias', en: 'Holiday map', nl: 'Vakantieplanning', es: 'Calendario de vacaciones', fr: 'Planning des congés', plans: ALL },
      { pt: 'Gestão de ausências', en: 'Absence management', nl: 'Afwezigheidsbeheer', es: 'Gestión de ausencias', fr: 'Gestion des absences', plans: ALL },
      { pt: 'Registo de ponto na app (iOS e Android)', en: 'Clocking in on the app (iOS and Android)', nl: 'Tijdregistratie via app (iOS & Android)', es: 'Fichaje en la app (iOS y Android)', fr: 'Pointage sur l’app (iOS et Android)', plans: ALL },
      { pt: 'Controlo de horas por colaborador', en: 'Hours per employee', nl: 'Urenregistratie per medewerker', es: 'Control de horas por empleado', fr: 'Suivi des heures par collaborateur', plans: ALL },
      { pt: 'Vários tipos de horário (isenção, pago à hora, fixo)', en: 'Several schedule types (exempt, hourly, fixed)', nl: 'Verschillende uurroosters (vast, per uur, vrijstelling)', es: 'Varios tipos de horario (exención, por horas, fijo)', fr: 'Plusieurs types d’horaires (forfait, horaire, fixe)', plans: ALL },
      { pt: 'Relatório mensal de horas (Art. 202.º CT e ACT)', en: 'Monthly hours report (Art. 202 Labour Code and ACT)', nl: 'Maandelijks urenrapport', es: 'Informe mensual de horas', fr: 'Rapport mensuel des heures', plans: ALL },
      { pt: 'Departamentos', en: 'Departments', nl: 'Afdelingen', es: 'Departamentos', fr: 'Départements', plans: ALL },
      { pt: 'Categorias de colaboradores', en: 'Employee categories', nl: 'Medewerkerscategorieën', es: 'Categorías de empleados', fr: 'Catégories de collaborateurs', plans: ADV },
      { pt: 'Gestão documental de colaboradores', en: 'Employee document management', nl: 'Documentbeheer van medewerkers', es: 'Gestión documental de empleados', fr: 'Gestion documentaire des collaborateurs', plans: ADV },
      { pt: 'Gestão de formações de colaboradores', en: 'Employee training records', nl: 'Opleidingen van medewerkers', es: 'Gestión de formaciones de empleados', fr: 'Suivi des formations des collaborateurs', plans: ADV },
      { pt: 'Alertas de documentos expirados', en: 'Expired document alerts', nl: 'Meldingen voor vervallen documenten', es: 'Alertas de documentos caducados', fr: 'Alertes de documents expirés', plans: ADV },
      { pt: 'Geolocalização', en: 'Geolocation', nl: 'Geolocatie', es: 'Geolocalización', fr: 'Géolocalisation', plans: ADV },
      { pt: 'Aprovação de registos pelo responsável', en: 'Record approval by the team lead', nl: 'Goedkeuring van registraties door verantwoordelijke', es: 'Aprobación de registros por el responsable', fr: 'Validation des pointages par le responsable', plans: ADV },
      { pt: 'Controlo de horas extra', en: 'Overtime tracking', nl: 'Overurenregistratie', es: 'Control de horas extra', fr: 'Suivi des heures supplémentaires', plans: ADV },
      { pt: 'Desativação automática de colaboradores', en: 'Automatic employee deactivation', nl: 'Automatische deactivering van medewerkers', es: 'Desactivación automática de empleados', fr: 'Désactivation automatique des collaborateurs', plans: ADV },
      { pt: 'Exportação para processamento salarial', en: 'Export to payroll', nl: 'Export voor loonverwerking', es: 'Exportación para nóminas', fr: 'Export pour la paie', plans: PREM },
      { pt: 'Integração com ERP', en: 'ERP integration', nl: 'ERP-integratie', es: 'Integración con ERP', fr: 'Intégration ERP', plans: PREM },
      { pt: 'Painel com indicadores (KPIs)', en: 'Dashboard with KPIs', nl: 'Dashboard met KPI’s', es: 'Panel con indicadores (KPIs)', fr: 'Tableau de bord avec indicateurs (KPI)', plans: PREM },
      { pt: 'Gestor dedicado', en: 'Dedicated account manager', nl: 'Vaste contactpersoon', es: 'Gestor dedicado', fr: 'Gestionnaire dédié', plans: PREM },
    ],
  },
  {
    id: 'construction',
    product: 'constructionEasier',
    rows: [
      { pt: 'Todas as funcionalidades do TimeEasier (plano correspondente)', en: 'Every TimeEasier feature (matching plan)', nl: 'Alle functies van TimeEasier (overeenkomstig plan)', es: 'Todas las funciones de TimeEasier (plan equivalente)', fr: 'Toutes les fonctionnalités de TimeEasier (offre équivalente)', plans: ALL },
      { pt: 'Lista de obras', en: 'List of sites', nl: 'Wervenlijst', es: 'Lista de obras', fr: 'Liste des chantiers', plans: ALL },
      { pt: 'Localização de colaboradores por obra', en: 'Employee location per site', nl: 'Locatie van medewerkers per werf', es: 'Ubicación de empleados por obra', fr: 'Localisation des collaborateurs par chantier', plans: ALL },
      { pt: 'Permissão Encarregado de Obra', en: 'Site foreman permission', nl: 'Rechten voor werfleider', es: 'Permiso de Encargado de Obra', fr: 'Rôle Chef de chantier', plans: ALL },
      { pt: 'Custo por colaborador', en: 'Cost per employee', nl: 'Kostprijs per medewerker', es: 'Coste por empleado', fr: 'Coût par collaborateur', plans: ALL },
      { pt: 'Subempreiteiros', en: 'Subcontractors', nl: 'Onderaannemers', es: 'Subcontratistas', fr: 'Sous-traitants', plans: ADV },
      { pt: 'Gestão documental de subempreiteiros', en: 'Subcontractor document management', nl: 'Documentbeheer van onderaannemers', es: 'Gestión documental de subcontratistas', fr: 'Gestion documentaire des sous-traitants', plans: ADV },
      { pt: 'Permissões Diretor de Obra, TSST e Encarregado Geral', en: 'Site manager, health and safety officer and general foreman permissions', nl: 'Rechten voor projectleider, preventieadviseur en hoofduitvoerder', es: 'Permisos de Director de Obra, PRL y Encargado General', fr: 'Rôles Directeur de travaux, Préventeur et Chef général', plans: ADV },
      { pt: 'Alertas de entrada de colaborador em obra', en: 'Alerts when an employee enters a site', nl: 'Meldingen bij aankomst van een medewerker op de werf', es: 'Alertas de entrada de empleado en obra', fr: 'Alertes d’arrivée d’un collaborateur sur chantier', plans: ADV },
      { pt: 'Progressão de carreira do colaborador', en: 'Employee career progression', nl: 'Loopbaanopvolging van de medewerker', es: 'Progresión profesional del empleado', fr: 'Évolution de carrière du collaborateur', plans: ADV },
      { pt: 'Auto de obra automático', en: 'Automatic site progress report', nl: 'Automatisch werfverslag', es: 'Certificación de obra automática', fr: 'Rapport d’avancement automatique', plans: ADV },
      { pt: 'Painel central para análise', en: 'Central dashboard for analysis', nl: 'Centraal analyse-dashboard', es: 'Panel central de análisis', fr: 'Tableau de bord central d’analyse', plans: ADV },
      { pt: 'Despesas de alojamento de colaboradores', en: 'Employee housing expenses', nl: 'Verblijfskosten van medewerkers', es: 'Gastos de alojamiento de empleados', fr: 'Frais d’hébergement des collaborateurs', plans: ADV },
      { pt: 'Implementação e integração com ERP', en: 'Rollout and ERP integration', nl: 'Implementatie en ERP-integratie', es: 'Implantación e integración con ERP', fr: 'Déploiement et intégration ERP', plans: PREM },
      { pt: 'Inserção facilitada de colaboradores e subempreiteiros', en: 'Assisted import of employees and subcontractors', nl: 'Vlotte invoer van medewerkers en onderaannemers', es: 'Alta asistida de empleados y subcontratistas', fr: 'Import facilité des collaborateurs et sous-traitants', plans: PREM },
      { pt: 'Integração com Check-In-At-Work', en: 'Check-In-At-Work integration', nl: 'Integratie met Checkinatwork', es: 'Integración con Check-In-At-Work', fr: 'Intégration Checkinatwork', plans: PREM, beOnly: true },
    ],
  },
  {
    id: 'stock',
    product: 'stockEasier',
    rows: [
      { pt: 'Registo de entradas e saídas de consumíveis', en: 'Consumables in and out', nl: 'Registratie van in- en uitgaande verbruiksgoederen', es: 'Registro de entradas y salidas de consumibles', fr: 'Entrées et sorties de consommables', plans: ALL },
      { pt: 'Monitorização contínua dos níveis de stock', en: 'Continuous stock level monitoring', nl: 'Continue opvolging van voorraadniveaus', es: 'Seguimiento continuo de los niveles de stock', fr: 'Suivi continu des niveaux de stock', plans: ALL },
      { pt: 'Gestão por categorias e locais de armazenamento', en: 'Categories and storage locations', nl: 'Beheer per categorie en opslaglocatie', es: 'Gestión por categorías y almacenes', fr: 'Gestion par catégories et emplacements', plans: ALL },
      { pt: 'Acesso simultâneo de vários utilizadores', en: 'Several users at once', nl: 'Gelijktijdige toegang voor meerdere gebruikers', es: 'Acceso simultáneo de varios usuarios', fr: 'Accès simultané de plusieurs utilisateurs', plans: ALL },
      { pt: 'Alertas automáticos de reposição', en: 'Automatic reorder alerts', nl: 'Automatische meldingen voor bijbestelling', es: 'Alertas automáticas de reposición', fr: 'Alertes automatiques de réapprovisionnement', plans: ADV },
      { pt: 'Histórico completo de movimentos e consumos', en: 'Full history of movements and consumption', nl: 'Volledige historiek van bewegingen en verbruik', es: 'Historial completo de movimientos y consumos', fr: 'Historique complet des mouvements et consommations', plans: ADV },
      { pt: 'Relatório de EPIs por colaborador', en: 'PPE report per employee', nl: 'PBM-rapport per medewerker', es: 'Informe de EPIs por empleado', fr: 'Rapport des EPI par collaborateur', plans: ADV },
      { pt: 'Relatórios avançados e exportações', en: 'Advanced reports and exports', nl: 'Uitgebreide rapporten en exports', es: 'Informes avanzados y exportaciones', fr: 'Rapports avancés et exports', plans: PREM },
    ],
  },
  {
    id: 'wood',
    product: 'woodEasier',
    singlePlan: true,
    rows: [
      { pt: 'Passaportes de madeiras tratadas', en: 'Treated timber passports', nl: 'Paspoorten voor behandeld hout', es: 'Pasaportes de maderas tratadas', fr: 'Passeports pour bois traités', plans: ALL },
      { pt: 'Rastreabilidade de lotes de madeira', en: 'Timber batch traceability', nl: 'Traceerbaarheid van houtpartijen', es: 'Trazabilidad de lotes de madera', fr: 'Traçabilité des lots de bois', plans: ALL },
      { pt: 'Gestão documental de tratamentos', en: 'Treatment document management', nl: 'Documentbeheer van behandelingen', es: 'Gestión documental de tratamientos', fr: 'Gestion documentaire des traitements', plans: ALL },
      { pt: 'Relatórios de conformidade', en: 'Compliance reports', nl: 'Conformiteitsrapporten', es: 'Informes de conformidad', fr: 'Rapports de conformité', plans: ALL },
    ],
  },
]

const pt = {
  h1: 'Planos e módulos',
  lead: 'O TimeEasier, o ConstructionEasier e o StockEasier têm três planos e o WoodEasier tem um plano único. Cada cartão mostra o que o plano inclui. Para saber o preço para a sua empresa, peça uma proposta.',
  plans: ['Base', 'Avançado', 'Premium'] as [string, string, string],
  singlePlan: 'O WoodEasier tem um plano único, com todas as funcionalidades.',
  beOnly: 'Só na Bélgica',
  productLink: (name: string) => `Como funciona o ${name}`,
  ctaTitle: 'Peça uma proposta',
  ctaText: 'Diga-nos que produto lhe interessa e quantos colaboradores tem. Enviamos a proposta por email.',
  ctaButton: 'Pedir proposta',
  choose: 'Escolha o produto',
  everything: (plan: string) => `Tudo do ${plan}, e ainda:`,
  base: 'Inclui:',
  single: 'Plano único',
  allFeatures: 'Todas as funcionalidades:',
}

export type PlansDict = typeof pt

const en: PlansDict = {
  h1: 'Plans and modules',
  lead: 'TimeEasier, ConstructionEasier and StockEasier have three plans, and WoodEasier has a single plan. Each card shows what the plan includes. For the price for your company, ask for a quote.',
  plans: ['Base', 'Advanced', 'Premium'],
  singlePlan: 'WoodEasier has a single plan with every feature.',
  beOnly: 'Belgium only',
  productLink: (name: string) => `How ${name} works`,
  ctaTitle: 'Ask for a quote',
  ctaText: 'Tell us which product you are interested in and how many employees you have. We will send the quote by email.',
  ctaButton: 'Ask for a quote',
  choose: 'Choose a product',
  everything: (plan: string) => `Everything in ${plan}, plus:`,
  base: 'Includes:',
  single: 'Single plan',
  allFeatures: 'Every feature:',
}

const nl: PlansDict = {
  h1: 'Plannen en modules',
  lead: 'TimeEasier, ConstructionEasier en StockEasier hebben drie plannen en WoodEasier heeft één plan. Elke kaart toont wat inbegrepen is. Vraag een offerte aan voor de prijs op maat van uw bedrijf.',
  plans: ['Basis', 'Geavanceerd', 'Premium'],
  singlePlan: 'WoodEasier heeft één compleet plan met alle functies.',
  beOnly: 'Alleen in België',
  productLink: (name: string) => `Hoe ${name} werkt`,
  ctaTitle: 'Vraag een offerte aan',
  ctaText: 'Vertel ons welk product u interesseert en hoeveel medewerkers u heeft. We sturen de offerte per e-mail.',
  ctaButton: 'Offerte aanvragen',
  choose: 'Kies het product',
  everything: (plan: string) => `Alles uit ${plan}, plus:`,
  base: 'Inbegrepen:',
  single: 'Eén plan',
  allFeatures: 'Alle functies:',
}

const es: PlansDict = {
  h1: 'Planes y módulos',
  lead: 'TimeEasier, ConstructionEasier y StockEasier tienen tres planes y WoodEasier tiene un plan único. Cada tarjeta muestra lo que incluye. Para conocer el precio para tu empresa, solicita una propuesta.',
  plans: ['Base', 'Avanzado', 'Premium'],
  singlePlan: 'WoodEasier tiene un plan único con todas las funcionalidades.',
  beOnly: 'Solo en Bélgica',
  productLink: (name: string) => `Cómo funciona ${name}`,
  ctaTitle: 'Solicita una propuesta',
  ctaText: 'Indícanos qué producto te interesa y cuántos empleados tenéis. Te enviamos la propuesta por correo.',
  ctaButton: 'Solicitar propuesta',
  choose: 'Elige el producto',
  everything: (plan: string) => `Todo lo de ${plan}, y además:`,
  base: 'Incluye:',
  single: 'Plan único',
  allFeatures: 'Todas las funcionalidades:',
}

const fr: PlansDict = {
  h1: 'Offres et modules',
  lead: 'TimeEasier, ConstructionEasier et StockEasier proposent trois formules, et WoodEasier une formule unique. Chaque carte détaille ce qui est inclus. Demandez un devis pour votre entreprise.',
  plans: ['Base', 'Avancé', 'Premium'],
  singlePlan: 'WoodEasier propose une formule unique incluant toutes les fonctionnalités.',
  beOnly: 'Belgique uniquement',
  productLink: (name: string) => `Comment fonctionne ${name}`,
  ctaTitle: 'Demandez un devis',
  ctaText: 'Indiquez-nous le produit qui vous intéresse et le nombre de collaborateurs. Nous vous enverrons le devis par e-mail.',
  ctaButton: 'Demander un devis',
  choose: 'Choisissez le produit',
  everything: (plan: string) => `Tout de ${plan}, et en plus :`,
  base: 'Inclus :',
  single: 'Formule unique',
  allFeatures: 'Toutes les fonctionnalités :',
}

export const plans: Record<Locale, PlansDict> = { pt, en, nl, es, fr }
