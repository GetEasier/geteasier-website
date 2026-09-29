import type { Locale } from '@/lib/seo.config'

// Secções animadas da página do ConstructionEasier (DESIGN_NOTES.md). Dados de exemplo e fictícios.
// [CONFIRMAR] marca o que ainda não foi validado com a app real.

const pt = {
  modes: {
    title: 'O que acontece à entrada da obra',
    label: 'Modos da demonstração',
    items: [
      {
        id: 'identidade',
        tab: 'Verificar identidade',
        text: 'O trabalhador toca no tablet da portaria e é reconhecido pelo rosto. Se não for, entra com o PIN.',
        detail: 'A entrada fica registada com a hora, a obra e a empresa a que pertence.',
      },
      {
        id: 'documento',
        tab: 'Ler documento',
        text: '[CONFIRMAR] Os dados do documento de identificação passam para a ficha do trabalhador sem ninguém os escrever à mão.',
        detail: '[CONFIRMAR] Nome, número do documento, validade e nacionalidade.',
      },
      {
        id: 'presentes',
        tab: 'Quem está na obra',
        text: 'No gabinete, a lista de quem está a trabalhar agora em cada obra, com a hora de entrada e a empresa.',
        detail: 'Filtra por empresa para ver só os de um subempreiteiro.',
      },
    ],
    doc: {
      card: 'Documento de identificação',
      sample: 'Exemplo fictício',
      fields: [
        { k: 'Nome', v: 'Rui Marques' },
        { k: 'N.º do documento', v: '00000000 0 ZZ0' },
        { k: 'Validade', v: '12/05/2031' },
        { k: 'Nacionalidade', v: 'PRT' },
      ],
      form: 'Ficha do trabalhador',
      replay: 'Ver outra vez',
    },
  },
  modules: {
    title: 'Módulos',
    label: 'Módulos do ConstructionEasier',
    pause: 'Pausar o avanço automático',
    play: 'Retomar o avanço automático',
    items: [
      {
        tab: 'Controlo de acessos',
        title: 'Quem entra e quando',
        text: 'O tablet da portaria regista cada entrada e saída, e o responsável da obra recebe o aviso.',
      },
      {
        tab: 'Identidade e biometria',
        title: 'Reconhecimento facial no tablet',
        text: 'Cada pessoa identifica-se pelo rosto no momento da picagem. Sem cartões para perder nem emprestar.',
      },
      {
        tab: 'Documentação e conformidade',
        title: 'Documentos em dia, por trabalhador',
        text: 'Uma matriz por trabalhador mostra o que está válido, o que expira em breve e o que falta.',
      },
      {
        tab: 'Subempreiteiros e equipas',
        title: 'Todas as empresas da obra no mesmo sítio',
        text: 'Empresa própria e subempreiteiros, cada um com os seus trabalhadores e documentos.',
      },
      {
        tab: 'Relatórios',
        title: 'Horas e auto de obra prontos',
        text: 'Relatório mensal de horas de cada colaborador (Art. 202.º) e auto de obra gerado automaticamente.',
      },
    ],
    docCols: ['AS', 'RM', 'CP', 'AD'],
    docNote: '[CONFIRMAR] nome por extenso de cada sigla',
    companies: [
      { name: 'Construções Marvila (própria)', n: 14 },
      { name: 'Cofragens Tejo', n: 9 },
      { name: 'Eletro Douro', n: 6 },
    ],
    report: { title: 'Relatório de horas, setembro', rows: [['Rui Marques', '168 h'], ['Hugo Tavares', '171 h'], ['Paulo Sá', '160 h']], export: 'Exportar' },
    gate: { title: 'Portaria, Obra Marvila', rows: [['Entrada', '07:42'], ['Saída', '12:30'], ['Entrada', '13:31']] },
    cta: 'Pedir demonstração',
    verified: 'Rosto verificado',
    site: 'Obra Marvila',
  },
  profiles: {
    title: 'Para quem é',
    label: 'Perfis',
    pain: 'O problema',
    gain: 'O que ganha',
    items: [
      {
        tab: 'Empreiteiro geral e dono de obra',
        pain: 'Responde por tudo o que acontece na obra, incluindo quem os subempreiteiros lá põem.',
        gain: 'Vê todas as obras, todas as empresas e o custo de cada obra num só sítio.',
      },
      {
        tab: 'Diretor de obra',
        pain: 'Passa o início do dia a confirmar quem veio, por telefone e por papel.',
        gain: 'Abre a lista de quem está a trabalhar agora e recebe o aviso de cada entrada.',
      },
      {
        tab: 'Subempreiteiro',
        pain: 'Envia os mesmos documentos várias vezes, por email e por mensagem, e nunca sabe se chegaram.',
        gain: 'Os documentos da empresa e dos trabalhadores ficam num só lugar, com o estado de cada um.',
      },
      {
        tab: 'Segurança e compliance',
        pain: 'Descobre um seguro caducado quando alguém já está a trabalhar.',
        gain: 'Vê o que expira antes de expirar, por trabalhador e por empresa.',
      },
    ],
  },
  gateFeed: {
    title: 'Da portaria ao gabinete',
    text: 'À esquerda, o tablet na caixa da portaria. À direita, o que o diretor de obra vê ao mesmo tempo. Dados de exemplo.',
    kiosk: 'Tablet na portaria',
    feed: 'A Trabalhar Agora',
    present: '{n} presentes',
    all: 'Todas',
    filter: 'Filtrar por empresa',
    entered: 'entrou',
    pause: 'Pausar a demonstração',
    play: 'Retomar a demonstração',
    summary:
      'Demonstração animada: cada vez que um trabalhador é reconhecido no tablet da portaria, aparece no topo da lista de quem está a trabalhar agora, com a hora e a empresa.',
  },
  faqTitle: 'Perguntas sobre o ConstructionEasier',
  faq: [
    {
      q: 'O ConstructionEasier inclui o registo de ponto?',
      a: 'Sim. Inclui o TimeEasier: tablet na obra com reconhecimento facial, app para quem trabalha fora e o relatório mensal de horas.',
    },
    {
      q: 'Os subempreiteiros usam a mesma plataforma?',
      a: 'Sim. A empresa própria e os subempreiteiros estão na mesma obra, cada um com os seus trabalhadores e documentos.',
    },
    {
      q: 'Quem vê o quê?',
      a: 'As permissões são por função: Encarregado de Obra, Diretor de Obra, TSST e Encarregado Geral, cada um com o que precisa de ver.',
    },
    {
      q: 'Que caixa leva o tablet na portaria?',
      a: '[CONFIRMAR] Características da caixa (proteção, fixação, alimentação).',
    },
  ],
}

export type ConstructionDict = typeof pt

const en: ConstructionDict = {
  modes: {
    title: 'What happens at the site gate',
    label: 'Demo modes',
    items: [
      {
        id: 'identidade',
        tab: 'Verify identity',
        text: 'The worker taps the gate tablet and is recognised by their face. If not, they sign in with their PIN.',
        detail: 'The entry is recorded with the time, the site and the company they belong to.',
      },
      {
        id: 'documento',
        tab: 'Read a document',
        text: '[CONFIRMAR] The ID document’s details go into the worker’s record without anyone typing them.',
        detail: '[CONFIRMAR] Name, document number, expiry date and nationality.',
      },
      {
        id: 'presentes',
        tab: 'Who is on site',
        text: 'In the office, the list of who is working right now on each site, with entry time and company.',
        detail: 'Filter by company to see only one subcontractor’s workers.',
      },
    ],
    doc: {
      card: 'Identity document',
      sample: 'Fictitious sample',
      fields: [
        { k: 'Name', v: 'Rui Marques' },
        { k: 'Document no.', v: '00000000 0 ZZ0' },
        { k: 'Expiry', v: '12/05/2031' },
        { k: 'Nationality', v: 'PRT' },
      ],
      form: 'Worker record',
      replay: 'Play again',
    },
  },
  modules: {
    title: 'Modules',
    label: 'ConstructionEasier modules',
    pause: 'Pause auto-advance',
    play: 'Resume auto-advance',
    items: [
      { tab: 'Access control', title: 'Who comes in, and when', text: 'The gate tablet records every entry and exit, and the site manager gets notified.' },
      { tab: 'Identity and biometrics', title: 'Face recognition on the tablet', text: 'Each person identifies by face when clocking in. No cards to lose or lend.' },
      { tab: 'Documents and compliance', title: 'Documents up to date, per worker', text: 'A matrix per worker shows what is valid, what expires soon and what is missing.' },
      { tab: 'Subcontractors and teams', title: 'Every company on site in one place', text: 'Your own staff and subcontractors, each with their workers and documents.' },
      { tab: 'Reports', title: 'Hours and progress reports ready', text: 'Monthly hours report per employee (Portuguese Labour Code, art. 202) and automatically generated progress reports.' },
    ],
    docCols: ['AS', 'RM', 'CP', 'AD'],
    docNote: '[CONFIRMAR] full name of each abbreviation',
    companies: [
      { name: 'Construções Marvila (own staff)', n: 14 },
      { name: 'Cofragens Tejo', n: 9 },
      { name: 'Eletro Douro', n: 6 },
    ],
    report: { title: 'Hours report, September', rows: [['Rui Marques', '168 h'], ['Hugo Tavares', '171 h'], ['Paulo Sá', '160 h']], export: 'Export' },
    gate: { title: 'Gate, Marvila site', rows: [['Entry', '07:42'], ['Exit', '12:30'], ['Entry', '13:31']] },
    cta: 'Ask for a demo',
    verified: 'Face verified',
    site: 'Marvila site',
  },
  profiles: {
    title: 'Who it is for',
    label: 'Roles',
    pain: 'The problem',
    gain: 'What they get',
    items: [
      { tab: 'General contractor and owner', pain: 'Answers for everything on site, including who subcontractors bring in.', gain: 'Sees every site, every company and each site’s cost in one place.' },
      { tab: 'Site manager', pain: 'Starts the day confirming who showed up, by phone and on paper.', gain: 'Opens the list of who is working now and is notified of each entry.' },
      { tab: 'Subcontractor', pain: 'Sends the same documents again and again by email and message, never sure they arrived.', gain: 'Company and worker documents live in one place, each with its status.' },
      { tab: 'Health, safety and compliance', pain: 'Finds out about expired insurance when someone is already working.', gain: 'Sees what expires before it does, per worker and per company.' },
    ],
  },
  gateFeed: {
    title: 'From the gate to the office',
    text: 'On the left, the tablet in its gate box. On the right, what the site manager sees at the same time. Sample data.',
    kiosk: 'Gate tablet',
    feed: 'A Trabalhar Agora (working now)',
    present: '{n} on site',
    all: 'All',
    filter: 'Filter by company',
    entered: 'came in',
    pause: 'Pause the demo',
    play: 'Play the demo',
    summary: 'Animated demo: each time a worker is recognised on the gate tablet, they appear at the top of the list of who is working now, with time and company.',
  },
  faqTitle: 'Questions about ConstructionEasier',
  faq: [
    { q: 'Does ConstructionEasier include time tracking?', a: 'Yes. It includes TimeEasier: on-site tablet with face recognition, an app for remote workers and the monthly hours report.' },
    { q: 'Do subcontractors use the same platform?', a: 'Yes. Your own company and subcontractors share the site, each with their own workers and documents.' },
    { q: 'Who sees what?', a: 'Permissions are per role: Site Foreman, Site Manager, Health and Safety Officer and General Foreman, each seeing what they need.' },
    { q: 'What box holds the gate tablet?', a: '[CONFIRMAR] Box specifications (protection, mounting, power).' },
  ],
}

export const construction: Record<Locale, ConstructionDict> = { pt, en }
