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
        text: 'O documento de identificação é lido com inteligência artificial e os dados passam para a ficha do trabalhador sem ninguém os escrever à mão.',
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
  chaos: {
    title: 'Do caos ao controlo',
    intro: 'Uma manhã numa obra, antes e depois do ConstructionEasier. Dados de exemplo.',
    acts: [
      {
        name: 'Caos',
        text: 'A lista de trabalhadores vive numa folha de cálculo, os documentos chegam por fotografia no telemóvel e as entradas ficam num livro na portaria.',
      },
      {
        name: 'Pressão',
        text: 'Ninguém sabe ao certo quem está no estaleiro nem que documentos caducaram. Os avisos chegam tarde.',
      },
      {
        name: 'Controlo',
        text: 'Cada pessoa aparece uma vez, com a empresa, a hora de entrada e o estado dos documentos. Os avisos passam a resultados.',
      },
    ],
    sheet: {
      file: 'trabalhadores_obras_FINAL_v3.xlsx',
      cols: ['Nome', 'Empresa', 'Obra', 'Seguro', 'Entrada'],
      rows: [
        ['Rui Marques', 'Cofragens Tejo', 'Marvila', 'válido', '07:42'],
        ['Ana Figueiredo', 'Eletro Douro', 'Marvila', 'caducado', '—'],
        ['rui marques', 'Cofragens Tejo', 'Marvila', '—', '07:42'],
        ['Paulo Sá', '—', 'Marvila', 'válido', '08:05'],
        ['Hugo Tavares', 'Cofragens Tejo', 'Marvila', 'em falta', '07:58'],
      ],
      photo: 'Foto do seguro',
      photoTime: '07:51',
      book: 'Livro de entradas',
      bookLines: ['Rui M. 7h40', 'Paulo ? 8h', 'H. Tavares'],
    },
    alerts: ['Pessoa não identificada no estaleiro', 'Seguro do subempreiteiro caducou', 'Inspeção da ACT amanhã'],
    view: {
      title: 'Obra Marvila, hoje',
      people: [
        { name: 'Rui Marques', company: 'Cofragens Tejo', time: '07:42', status: 'ok', text: 'Documentos em dia' },
        { name: 'Ana Figueiredo', company: 'Eletro Douro', time: '07:55', status: 'missing', text: 'Seguro caducado' },
        { name: 'Paulo Sá', company: 'Eletro Douro', time: '08:05', status: 'ok', text: 'Documentos em dia' },
        { name: 'Hugo Tavares', company: 'Cofragens Tejo', time: '07:58', status: 'soon', text: 'Seguro expira em 12 dias' },
      ],
    },
    results: ['38 entradas verificadas hoje', '12 documentos validados', '0 pessoas sem registo'],
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
      q: 'O ConstructionEasier usa inteligência artificial?',
      a: 'Sim. A leitura dos documentos (OCR) é feita com inteligência artificial, e os dados passam para a plataforma sem ninguém os escrever à mão. Estamos a levar a IA a mais partes da plataforma.',
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
        text: 'The ID document is read with artificial intelligence and its details go into the worker’s record without anyone typing them.',
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
  chaos: {
    title: 'From chaos to control',
    intro: 'A morning on a construction site, before and after ConstructionEasier. Sample data.',
    acts: [
      {
        name: 'Chaos',
        text: 'The worker list lives in a spreadsheet, documents arrive as phone photos and entries go into a book at the gate.',
      },
      {
        name: 'Pressure',
        text: 'Nobody knows for sure who is on site or which documents have expired. Warnings arrive late.',
      },
      {
        name: 'Control',
        text: 'Each person appears once, with their company, entry time and document status. Warnings become results.',
      },
    ],
    sheet: {
      file: 'site_workers_FINAL_v3.xlsx',
      cols: ['Name', 'Company', 'Site', 'Insurance', 'Entry'],
      rows: [
        ['Rui Marques', 'Cofragens Tejo', 'Marvila', 'valid', '07:42'],
        ['Ana Figueiredo', 'Eletro Douro', 'Marvila', 'expired', '—'],
        ['rui marques', 'Cofragens Tejo', 'Marvila', '—', '07:42'],
        ['Paulo Sá', '—', 'Marvila', 'valid', '08:05'],
        ['Hugo Tavares', 'Cofragens Tejo', 'Marvila', 'missing', '07:58'],
      ],
      photo: 'Insurance photo',
      photoTime: '07:51',
      book: 'Entry book',
      bookLines: ['Rui M. 7h40', 'Paulo ? 8h', 'H. Tavares'],
    },
    alerts: ['Unidentified person on site', 'Subcontractor insurance has expired', 'Labour inspection tomorrow'],
    view: {
      title: 'Marvila site, today',
      people: [
        { name: 'Rui Marques', company: 'Cofragens Tejo', time: '07:42', status: 'ok', text: 'Documents up to date' },
        { name: 'Ana Figueiredo', company: 'Eletro Douro', time: '07:55', status: 'missing', text: 'Insurance expired' },
        { name: 'Paulo Sá', company: 'Eletro Douro', time: '08:05', status: 'ok', text: 'Documents up to date' },
        { name: 'Hugo Tavares', company: 'Cofragens Tejo', time: '07:58', status: 'soon', text: 'Insurance expires in 12 days' },
      ],
    },
    results: ['38 entries verified today', '12 documents validated', '0 people without a record'],
  },
  faqTitle: 'Questions about ConstructionEasier',
  faq: [
    { q: 'Does ConstructionEasier include time tracking?', a: 'Yes. It includes TimeEasier: on-site tablet with face recognition, an app for remote workers and the monthly hours report.' },
    { q: 'Do subcontractors use the same platform?', a: 'Yes. Your own company and subcontractors share the site, each with their own workers and documents.' },
    { q: 'Who sees what?', a: 'Permissions are per role: Site Foreman, Site Manager, Health and Safety Officer and General Foreman, each seeing what they need.' },
    { q: 'Does ConstructionEasier use artificial intelligence?', a: 'Yes. Document reading (OCR) uses artificial intelligence, and the details go into the platform without anyone typing them. We are bringing AI to more parts of the platform.' },
    { q: 'What box holds the gate tablet?', a: '[CONFIRMAR] Box specifications (protection, mounting, power).' },
  ],
}

const nl: ConstructionDict = {
  modes: {
    title: 'Wat er aan de werfpoort gebeurt',
    label: 'Demomodi',
    items: [
      {
        id: 'identidade',
        tab: 'Identiteit verifiëren',
        text: 'De medewerker tikt op de tablet aan de poort en wordt herkend via zijn gezicht. Lukt dat niet, dan logt hij in met zijn pincode.',
        detail: 'De aankomst wordt geregistreerd met het uur, de werf en het bedrijf waartoe hij behoort.',
      },
      {
        id: 'documento',
        tab: 'Document uitlezen',
        text: 'Het identiteitsdocument wordt uitgelezen met artificiële intelligentie en de gegevens komen in de medewerkersfiche terecht zonder dat iemand ze hoeft over te typen.',
        detail: 'Naam, documentnummer, vervaldatum en nationaliteit.',
      },
      {
        id: 'presentes',
        tab: 'Wie is er op de werf',
        text: 'Op kantoor de lijst van wie er nu op elke werf aan het werk is, met aankomstuur en bedrijf.',
        detail: 'Filter op bedrijf om enkel de medewerkers van één onderaannemer te zien.',
      },
    ],
    doc: {
      card: 'Identiteitsdocument',
      sample: 'Fictief voorbeeld',
      fields: [
        { k: 'Naam', v: 'Rui Marques' },
        { k: 'Documentnr.', v: '00000000 0 ZZ0' },
        { k: 'Geldig tot', v: '12/05/2031' },
        { k: 'Nationaliteit', v: 'PRT' },
      ],
      form: 'Medewerkersfiche',
      replay: 'Opnieuw bekijken',
    },
  },
  modules: {
    title: 'Modules',
    label: 'Modules van ConstructionEasier',
    pause: 'Automatisch wisselen pauzeren',
    play: 'Automatisch wisselen hervatten',
    items: [
      { tab: 'Toegangscontrole', title: 'Wie komt binnen, en wanneer', text: 'De tablet aan de poort registreert elke in- en uitgang, en de werfleider krijgt meteen een melding.' },
      { tab: 'Identiteit en biometrie', title: 'Gezichtsherkenning op de tablet', text: 'Iedereen identificeert zich met zijn gezicht bij het inklokken. Geen badges om te verliezen of uit te lenen.' },
      { tab: 'Documenten en conformiteit', title: 'Documenten in orde, per medewerker', text: 'Een matrix per medewerker toont wat geldig is, wat binnenkort vervalt en wat ontbreekt.' },
      { tab: 'Onderaannemers en teams', title: 'Alle bedrijven op de werf op één plek', text: 'Eigen medewerkers en onderaannemers, elk met hun eigen arbeiders en documenten.' },
      { tab: 'Rapporten', title: 'Uren en werfverslagen meteen klaar', text: 'Maandelijks urenrapport per medewerker en automatisch gegenereerd werfverslag.' },
    ],
    docCols: ['AS', 'RM', 'CP', 'AD'],
    docNote: 'Documentstatus per medewerker',
    companies: [
      { name: 'Construções Marvila (eigen)', n: 14 },
      { name: 'Cofragens Tejo', n: 9 },
      { name: 'Eletro Douro', n: 6 },
    ],
    report: { title: 'Urenrapport, september', rows: [['Rui Marques', '168 u'], ['Hugo Tavares', '171 u'], ['Paulo Sá', '160 u']], export: 'Exporteren' },
    gate: { title: 'Poort, Werf Marvila', rows: [['Aankomst', '07:42'], ['Vertrek', '12:30'], ['Aankomst', '13:31']] },
    cta: 'Demo aanvragen',
    verified: 'Gezicht geverifieerd',
    site: 'Werf Marvila',
  },
  profiles: {
    title: 'Voor wie',
    label: 'Profielen',
    pain: 'Het probleem',
    gain: 'Wat het oplevert',
    items: [
      { tab: 'Hoofdaannemer en bouwheer', pain: 'Verantwoordelijk voor alles op de werf, ook voor wie de onderaannemers sturen.', gain: 'Ziet elke werf, elk bedrijf en de kostprijs per werf op één plek.' },
      { tab: 'Projectleider', pain: 'Begint de dag met telefoneren en papieren lijstjes om te zien wie er is.', gain: 'Opent de lijst van wie er nu werkt en krijgt een melding bij elke aankomst.' },
      { tab: 'Onderaannemer', pain: 'Stuurt steeds dezelfde documenten per mail en bericht, zonder te weten of ze goed zijn aangekomen.', gain: 'Bedrijfs- en medewerkersdocumenten staan op één plek, mét de status per document.' },
      { tab: 'Veiligheid en preventie', pain: 'Ontdekt een vervallen verzekering wanneer iemand al aan het werk is.', gain: 'Ziet wat er dreigt te vervallen vóór het zover is, per arbeider en per bedrijf.' },
    ],
  },
  gateFeed: {
    title: 'Van de werfpoort naar kantoor',
    text: 'Links de tablet in de poortkast. Rechts wat de projectleider tegelijkertijd ziet. Voorbeeldgegevens.',
    kiosk: 'Tablet aan de poort',
    feed: 'Nu aan het werk',
    present: '{n} aanwezig',
    all: 'Alle',
    filter: 'Filteren op bedrijf',
    entered: 'kwam aan',
    pause: 'Demo pauzeren',
    play: 'Demo hervatten',
    summary: 'Geanimeerde demo: telkens wanneer een medewerker op de tablet aan de poort wordt herkend, verschijnt hij bovenaan de lijst met wie er nu werkt.',
  },
  chaos: {
    title: 'Van chaos naar controle',
    intro: 'Een ochtend op een werf, voor en na ConstructionEasier. Voorbeeldgegevens.',
    acts: [
      {
        name: 'Chaos',
        text: 'De medewerkerslijst staat in een spreadsheet, documenten komen binnen als foto op de gsm en aankomsten staan in een schrift aan de poort.',
      },
      {
        name: 'Druk',
        text: 'Niemand weet zeker wie er op de werf is of welke documenten vervallen zijn. Waarschuwingen komen te laat.',
      },
      {
        name: 'Controle',
        text: 'Elke persoon verschijnt één keer, met bedrijf, aankomstuur en documentstatus. Waarschuwingen worden resultaten.',
      },
    ],
    sheet: {
      file: 'werf_arbeiders_FINAL_v3.xlsx',
      cols: ['Naam', 'Bedrijf', 'Werf', 'Verzekering', 'Aankomst'],
      rows: [
        ['Rui Marques', 'Cofragens Tejo', 'Marvila', 'geldig', '07:42'],
        ['Ana Figueiredo', 'Eletro Douro', 'Marvila', 'vervallen', '—'],
        ['rui marques', 'Cofragens Tejo', 'Marvila', '—', '07:42'],
        ['Paulo Sá', '—', 'Marvila', 'geldig', '08:05'],
        ['Hugo Tavares', 'Cofragens Tejo', 'Marvila', 'ontbreekt', '07:58'],
      ],
      photo: 'Foto verzekering',
      photoTime: '07:51',
      book: 'Aanwezigheidsboek',
      bookLines: ['Rui M. 7u40', 'Paulo ? 8u', 'H. Tavares'],
    },
    alerts: ['Onbekend persoon op de werf', 'Verzekering onderaannemer vervallen', 'Arbeidsinspectie morgen'],
    view: {
      title: 'Werf Marvila, vandaag',
      people: [
        { name: 'Rui Marques', company: 'Cofragens Tejo', time: '07:42', status: 'ok', text: 'Documenten in orde' },
        { name: 'Ana Figueiredo', company: 'Eletro Douro', time: '07:55', status: 'missing', text: 'Verzekering vervallen' },
        { name: 'Paulo Sá', company: 'Eletro Douro', time: '08:05', status: 'ok', text: 'Documenten in orde' },
        { name: 'Hugo Tavares', company: 'Cofragens Tejo', time: '07:58', status: 'soon', text: 'Verzekering vervalt over 12 dagen' },
      ],
    },
    results: ['38 registraties geverifieerd vandaag', '12 documenten gevalideerd', '0 personen zonder registratie'],
  },
  faqTitle: 'Vragen over ConstructionEasier',
  faq: [
    { q: 'Bevat ConstructionEasier ook tijdregistratie?', a: 'Ja. Het omvat TimeEasier: tablet op de werf met gezichtsherkenning, app voor buitendienst en het maandelijks urenrapport.' },
    { q: 'Gebruiken onderaannemers hetzelfde platform?', a: 'Ja. Uw eigen bedrijf en onderaannemers werken op dezelfde werf, elk met hun eigen arbeiders en documenten.' },
    { q: 'Wie ziet wat?', a: 'De rechten zijn per rol ingesteld: werfleider, projectleider, preventieadviseur en hoofduitvoerder, elk met wat zij nodig hebben.' },
    { q: 'Gebruikt ConstructionEasier artificiële intelligentie?', a: 'Ja. Documenten worden uitgelezen met AI (OCR), zodat de gegevens zonder overtypen in het platform komen. We breiden AI verder uit in het platform.' },
    { q: 'Welke behuizing heeft de tablet aan de poort?', a: 'Weerbestendige werfbehuizing met vaste voeding en bevestiging.' },
  ],
}

const es: ConstructionDict = {
  modes: {
    title: 'Qué ocurre en la entrada de la obra',
    label: 'Modos de demostración',
    items: [
      {
        id: 'identidade',
        tab: 'Verificar identidad',
        text: 'El trabajador toca la tablet de acceso y es reconocido por su rostro. Si no, entra con su PIN.',
        detail: 'La entrada queda registrada con la hora, la obra y la empresa a la que pertenece.',
      },
      {
        id: 'documento',
        tab: 'Leer documento',
        text: 'El documento de identidad se lee con inteligencia artificial y los datos pasan a la ficha del trabajador sin escribirlos a mano.',
        detail: 'Nombre, número de documento, validez y nacionalidad.',
      },
      {
        id: 'presentes',
        tab: 'Quién está en obra',
        text: 'En la oficina, el listado de quién trabaja ahora mismo en cada obra, con su hora de entrada y empresa.',
        detail: 'Filtra por empresa para ver solo a los trabajadores de un subcontratista.',
      },
    ],
    doc: {
      card: 'Documento de identidad',
      sample: 'Ejemplo ficticio',
      fields: [
        { k: 'Nombre', v: 'Rui Marques' },
        { k: 'N.º documento', v: '00000000 0 ZZ0' },
        { k: 'Validez', v: '12/05/2031' },
        { k: 'Nacionalidad', v: 'PRT' },
      ],
      form: 'Ficha del trabajador',
      replay: 'Ver otra vez',
    },
  },
  modules: {
    title: 'Módulos',
    label: 'Módulos de ConstructionEasier',
    pause: 'Pausar avance automático',
    play: 'Reanudar avance automático',
    items: [
      { tab: 'Control de accesos', title: 'Quién entra y cuándo', text: 'La tablet de la entrada registra cada acceso y salida, y el jefe de obra recibe el aviso.' },
      { tab: 'Identidad y biometría', title: 'Reconocimiento facial en la tablet', text: 'Cada persona se identifica por su rostro al fichar. Sin tarjetas que perder o prestar.' },
      { tab: 'Documentación y cumplimiento', title: 'Documentos al día por trabajador', text: 'Una matriz por trabajador muestra qué es válido, qué caduca pronto y qué falta.' },
      { tab: 'Subcontratistas y equipos', title: 'Todas las empresas de la obra en un sitio', text: 'Personal propio y subcontratistas, cada uno con sus trabajadores y documentos.' },
      { tab: 'Informes', title: 'Horas y certificaciones listas', text: 'Informe mensual de horas por empleado y certificación de obra generada automáticamente.' },
    ],
    docCols: ['AS', 'RM', 'CP', 'AD'],
    docNote: 'Estado documental por trabajador',
    companies: [
      { name: 'Construções Marvila (propia)', n: 14 },
      { name: 'Cofragens Tejo', n: 9 },
      { name: 'Eletro Douro', n: 6 },
    ],
    report: { title: 'Informe de horas, septiembre', rows: [['Rui Marques', '168 h'], ['Hugo Tavares', '171 h'], ['Paulo Sá', '160 h']], export: 'Exportar' },
    gate: { title: 'Acceso, Obra Marvila', rows: [['Entrada', '07:42'], ['Salida', '12:30'], ['Entrada', '13:31']] },
    cta: 'Solicitar demo',
    verified: 'Rostro verificado',
    site: 'Obra Marvila',
  },
  profiles: {
    title: 'Para quién es',
    label: 'Perfiles',
    pain: 'El problema',
    gain: 'Qué aporta',
    items: [
      { tab: 'Contratista principal y promotor', pain: 'Responde de todo lo que ocurre en obra, incluido a quién traen los subcontratistas.', gain: 'Ve todas las obras, todas las empresas y el coste de cada obra en un solo lugar.' },
      { tab: 'Jefe de obra', pain: 'Pasa el inicio del día confirmando quién vino, por teléfono y papel.', gain: 'Abre la lista de quién trabaja ahora y recibe un aviso por cada entrada.' },
      { tab: 'Subcontratista', pain: 'Envía los mismos documentos una y otra vez por correo y mensajes, sin saber si llegaron.', gain: 'Los documentos de empresa y trabajadores viven en un sitio, con el estado de cada uno.' },
      { tab: 'Seguridad y PRL', pain: 'Descubre un seguro caducado cuando alguien ya está trabajando.', gain: 'Ve qué caduca antes de que ocurra, por trabajador y por empresa.' },
    ],
  },
  gateFeed: {
    title: 'De la entrada a la oficina',
    text: 'A la izquierda, la tablet en el acceso. A la derecha, lo que ve el jefe de obra al mismo tiempo. Datos de ejemplo.',
    kiosk: 'Tablet en acceso',
    feed: 'Trabajando ahora',
    present: '{n} presentes',
    all: 'Todas',
    filter: 'Filtrar por empresa',
    entered: 'entró',
    pause: 'Pausar la demo',
    play: 'Reanudar la demo',
    summary: 'Demo animada: cada vez que un trabajador es reconocido en la tablet de acceso, aparece arriba en la lista de quienes trabajan ahora.',
  },
  chaos: {
    title: 'Del caos al control',
    intro: 'Una mañana en una obra, antes y después de ConstructionEasier. Datos de ejemplo.',
    acts: [
      {
        name: 'Caos',
        text: 'La lista de trabajadores está en una hoja de cálculo, los documentos llegan por foto en el móvil y las entradas quedan en un cuaderno.',
      },
      {
        name: 'Presión',
        text: 'Nadie sabe con certeza quién está en la obra ni qué documentos han caducado. Los avisos llegan tarde.',
      },
      {
        name: 'Control',
        text: 'Cada persona aparece una vez, con empresa, hora de entrada y estado documental. Los avisos pasan a ser resultados.',
      },
    ],
    sheet: {
      file: 'trabajadores_obra_FINAL_v3.xlsx',
      cols: ['Nombre', 'Empresa', 'Obra', 'Seguro', 'Entrada'],
      rows: [
        ['Rui Marques', 'Cofragens Tejo', 'Marvila', 'válido', '07:42'],
        ['Ana Figueiredo', 'Eletro Douro', 'Marvila', 'caducado', '—'],
        ['rui marques', 'Cofragens Tejo', 'Marvila', '—', '07:42'],
        ['Paulo Sá', '—', 'Marvila', 'válido', '08:05'],
        ['Hugo Tavares', 'Cofragens Tejo', 'Marvila', 'falta', '07:58'],
      ],
      photo: 'Foto del seguro',
      photoTime: '07:51',
      book: 'Libro de entradas',
      bookLines: ['Rui M. 7h40', 'Paulo ? 8h', 'H. Tavares'],
    },
    alerts: ['Persona no identificada en la obra', 'Seguro del subcontratista caducado', 'Inspección mañana'],
    view: {
      title: 'Obra Marvila, hoy',
      people: [
        { name: 'Rui Marques', company: 'Cofragens Tejo', time: '07:42', status: 'ok', text: 'Documentos al día' },
        { name: 'Ana Figueiredo', company: 'Eletro Douro', time: '07:55', status: 'missing', text: 'Seguro caducado' },
        { name: 'Paulo Sá', company: 'Eletro Douro', time: '08:05', status: 'ok', text: 'Documentos al día' },
        { name: 'Hugo Tavares', company: 'Cofragens Tejo', time: '07:58', status: 'soon', text: 'Seguro caduca en 12 días' },
      ],
    },
    results: ['38 entradas verificadas hoy', '12 documentos validados', '0 personas sin registro'],
  },
  faqTitle: 'Preguntas sobre ConstructionEasier',
  faq: [
    { q: '¿ConstructionEasier incluye el control horario?', a: 'Sí. Incluye TimeEasier: tablet en obra con reconocimiento facial, app para desplazados e informe mensual de horas.' },
    { q: '¿Los subcontratistas usan la misma plataforma?', a: 'Sí. Tu empresa y los subcontratistas comparten la obra, cada uno con sus trabajadores y documentos.' },
    { q: '¿Quién ve qué?', a: 'Los permisos son por rol: Encargado de Obra, Jefe de Obra, Técnico de PRL y Encargado General, cada uno con lo que necesita.' },
    { q: '¿ConstructionEasier usa inteligencia artificial?', a: 'Sí. La lectura de documentos (OCR) utiliza inteligencia artificial y los datos pasan a la plataforma sin teclearlos. Llevamos la IA a más partes del sistema.' },
    { q: '¿Qué carcasa lleva la tablet en la entrada?', a: 'Carcasa resistente para obra con fijación y alimentación protegida.' },
  ],
}

const fr: ConstructionDict = {
  modes: {
    title: 'Ce qui se passe à l’entrée du chantier',
    label: 'Modes de démonstration',
    items: [
      {
        id: 'identidade',
        tab: 'Vérifier l’identité',
        text: 'L’ouvrier touche la tablette d’entrée et est reconnu par son visage. Sinon, il se connecte avec son code PIN.',
        detail: 'L’entrée est enregistrée avec l’heure, le chantier et son entreprise.',
      },
      {
        id: 'documento',
        tab: 'Lire un document',
        text: 'La pièce d’identité est lue par intelligence artificielle et les données alimentent la fiche du collaborateur sans saisie manuelle.',
        detail: 'Nom, numéro de document, date d’expiration et nationalité.',
      },
      {
        id: 'presentes',
        tab: 'Qui est sur chantier',
        text: 'Au bureau, la liste en direct des personnes présentes sur chaque chantier, avec heure d’entrée et entreprise.',
        detail: 'Filtrez par entreprise pour voir uniquement les ouvriers d’un sous-traitant.',
      },
    ],
    doc: {
      card: 'Pièce d’identité',
      sample: 'Exemple fictif',
      fields: [
        { k: 'Nom', v: 'Rui Marques' },
        { k: 'N° document', v: '00000000 0 ZZ0' },
        { k: 'Expiration', v: '12/05/2031' },
        { k: 'Nationalité', v: 'PRT' },
      ],
      form: 'Fiche du collaborateur',
      replay: 'Revoir',
    },
  },
  modules: {
    title: 'Modules',
    label: 'Modules de ConstructionEasier',
    pause: 'Mettre en pause',
    play: 'Reprendre',
    items: [
      { tab: 'Contrôle d’accès', title: 'Qui entre, et à quelle heure', text: 'La tablette enregistre chaque entrée et sortie, et le conducteur de travaux est averti.' },
      { tab: 'Identité et biométrie', title: 'Reconnaissance faciale sur tablette', text: 'Chacun s’identifie par le visage au pointage. Plus de badges perdus ou prêtés.' },
      { tab: 'Documents et conformité', title: 'Documents à jour, par ouvrier', text: 'Une matrice par collaborateur montre ce qui est valide, expire bientôt ou manque.' },
      { tab: 'Sous-traitants et équipes', title: 'Toutes les entreprises du chantier au même endroit', text: 'Équipes internes et sous-traitants, chacun avec ses collaborateurs et ses documents.' },
      { tab: 'Rapports', title: 'Heures et rapports d’avancement prêts', text: 'Relevé mensuel des heures par collaborateur et rapport d’avancement généré automatiquement.' },
    ],
    docCols: ['AS', 'RM', 'CP', 'AD'],
    docNote: 'Statut documentaire par ouvrier',
    companies: [
      { name: 'Construções Marvila (interne)', n: 14 },
      { name: 'Cofragens Tejo', n: 9 },
      { name: 'Eletro Douro', n: 6 },
    ],
    report: { title: 'Relevé d’heures, septembre', rows: [['Rui Marques', '168 h'], ['Hugo Tavares', '171 h'], ['Paulo Sá', '160 h']], export: 'Exporter' },
    gate: { title: 'Entrée, Chantier Marvila', rows: [['Entrée', '07:42'], ['Sortie', '12:30'], ['Entrée', '13:31']] },
    cta: 'Demander une démo',
    verified: 'Visage vérifié',
    site: 'Chantier Marvila',
  },
  profiles: {
    title: 'Pour qui',
    label: 'Profils',
    pain: 'Le problème',
    gain: 'Ce que vous gagnez',
    items: [
      { tab: 'Entreprise générale et maître d’ouvrage', pain: 'Responsable de tout sur le chantier, y compris des équipes sous-traitantes.', gain: 'Voit tous les chantiers, toutes les entreprises et les coûts en un seul endroit.' },
      { tab: 'Conducteur de travaux', pain: 'Passe le début de journée à vérifier qui est présent par téléphone et sur papier.', gain: 'Consulte la liste en direct des présents et reçoit une alerte à chaque entrée.' },
      { tab: 'Sous-traitant', pain: 'Renvoie sans cesse les mêmes documents par e-mail ou message sans certitude de réception.', gain: 'Les documents de l’entreprise et des ouvriers sont centralisés avec leur statut.' },
      { tab: 'Sécurité et conformité', pain: 'Découvre une assurance expirée alors que l’ouvrier travaille déjà.', gain: 'Anticipe chaque échéance avant expiration, par ouvrier et par entreprise.' },
    ],
  },
  gateFeed: {
    title: 'De l’entrée du chantier au bureau',
    text: 'À gauche, la tablette à l’entrée. À droite, ce que voit le conducteur de travaux en temps réel. Données d’exemple.',
    kiosk: 'Tablette d’entrée',
    feed: 'En poste maintenant',
    present: '{n} présents',
    all: 'Toutes',
    filter: 'Filtrer par entreprise',
    entered: 'est entré',
    pause: 'Mettre la démo en pause',
    play: 'Reprendre la démo',
    summary: 'Démo animée : dès qu’un ouvrier est reconnu sur la tablette d’entrée, il apparaît en haut de la liste des présents.',
  },
  chaos: {
    title: 'Du chaos à la maîtrise',
    intro: 'Un matin sur un chantier, avant et après ConstructionEasier. Données d’exemple.',
    acts: [
      {
        name: 'Chaos',
        text: 'La liste des ouvriers vit dans un tableur, les documents arrivent en photo par message et les entrées dans un cahier.',
      },
      {
        name: 'Pression',
        text: 'Personne ne sait exactement qui est sur le chantier ni quels documents ont expiré. Les alertes arrivent trop tard.',
      },
      {
        name: 'Maîtrise',
        text: 'Chaque personne apparaît une seule fois, avec entreprise, heure d’entrée et statut documentaire. Les alertes deviennent des résultats.',
      },
    ],
    sheet: {
      file: 'ouvriers_chantier_FINAL_v3.xlsx',
      cols: ['Nom', 'Entreprise', 'Chantier', 'Assurance', 'Entrée'],
      rows: [
        ['Rui Marques', 'Cofragens Tejo', 'Marvila', 'valide', '07:42'],
        ['Ana Figueiredo', 'Eletro Douro', 'Marvila', 'expirée', '—'],
        ['rui marques', 'Cofragens Tejo', 'Marvila', '—', '07:42'],
        ['Paulo Sá', '—', 'Marvila', 'valide', '08:05'],
        ['Hugo Tavares', 'Cofragens Tejo', 'Marvila', 'manquante', '07:58'],
      ],
      photo: 'Photo assurance',
      photoTime: '07:51',
      book: 'Registre d’entrée',
      bookLines: ['Rui M. 7h40', 'Paulo ? 8h', 'H. Tavares'],
    },
    alerts: ['Personne non identifiée sur le chantier', 'Assurance du sous-traitant expirée', 'Inspection demain'],
    view: {
      title: 'Chantier Marvila, aujourd’hui',
      people: [
        { name: 'Rui Marques', company: 'Cofragens Tejo', time: '07:42', status: 'ok', text: 'Documents à jour' },
        { name: 'Ana Figueiredo', company: 'Eletro Douro', time: '07:55', status: 'missing', text: 'Assurance expirée' },
        { name: 'Paulo Sá', company: 'Eletro Douro', time: '08:05', status: 'ok', text: 'Documents à jour' },
        { name: 'Hugo Tavares', company: 'Cofragens Tejo', time: '07:58', status: 'soon', text: 'Assurance expire dans 12 jours' },
      ],
    },
    results: ['38 entrées vérifiées aujourd’hui', '12 documents validés', '0 personne sans enregistrement'],
  },
  faqTitle: 'Questions sur ConstructionEasier',
  faq: [
    { q: 'ConstructionEasier inclut-il le pointage ?', a: 'Oui. Il intègre TimeEasier : tablette sur chantier avec reconnaissance faciale, application mobile et relevé mensuel des heures.' },
    { q: 'Les sous-traitants utilisent-ils la même plateforme ?', a: 'Oui. Votre entreprise et vos sous-traitants partagent le chantier, chacun avec ses ouvriers et documents.' },
    { q: 'Qui voit quoi ?', a: 'Les accès sont gérés par rôle : Chef de chantier, Conducteur de travaux, Préventeur et Chef général.' },
    { q: 'ConstructionEasier utilise-t-il l’intelligence artificielle ?', a: 'Oui. La lecture des documents (OCR) s’appuie sur l’IA pour remplir la plateforme sans saisie manuelle.' },
    { q: 'Quel boîtier protège la tablette sur chantier ?', a: 'Boîtier renforcé pour chantier avec fixation sécurisée et alimentation continue.' },
  ],
}

export const construction: Record<Locale, ConstructionDict> = { pt, en, nl, es, fr }
