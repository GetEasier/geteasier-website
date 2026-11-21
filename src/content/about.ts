import type { Locale } from '@/lib/seo.config'

export const TEAM = [
  { name: 'Alexandre Barreto', photo: '/images/team/geteasier-1.jpeg', role: 'development' },
  { name: 'Nelson Luís', photo: '/images/team/geteasier-2.jpeg', role: 'development' },
  { name: 'Rui Peixoto', photo: '/images/team/geteasier-3.jpeg', role: 'product' },
] as const

// Formação e certificações são opcionais: só aparecem no cartão de código quando existem.
type Person = { bio: string; focus: string[]; degree?: string; certs?: string[] }

const pt = {
  h1: 'Uma equipa jovem e profissional',
  lead: 'Somos uma equipa portuguesa de software. Fazemos produtos próprios e software à medida para outras empresas.',
  frontsTitle: 'Duas frentes, a mesma equipa',
  fronts: {
    custom: {
      title: 'Software à medida',
      text: 'Aplicações web e móveis desenhadas à volta do processo de cada empresa.',
      link: 'Ver como trabalhamos',
    },
    products: {
      title: 'Produtos próprios',
      text: 'Quatro produtos feitos com empresas portuguesas. O que aprendemos com eles entra em cada projeto.',
      link: 'Ver os produtos',
    },
  },
  teamTitle: 'As pessoas',
  teamText: 'Os três co-fundadores desenham, desenvolvem e dão suporte a cada projeto.',
  // Alexandre: CV; Rui: dados do Alexandre; Nelson: LinkedIn (01/10).
  people: [
    { bio: 'Mais de 10 anos a desenvolver software para empresas. Na GetEasier cuida da arquitetura e da parte técnica de cada projeto, para que o software seja sólido, seguro e fácil de fazer crescer.', focus: ['Arquitetura', 'Desenvolvimento', 'Integrações', 'DevOps'], degree: 'Engenharia Informática' },
    { bio: 'Mais de 12 anos a desenvolver software, boa parte deles a liderar equipas técnicas. Na GetEasier garante que cada aplicação é rápida, fiável e segura.', focus: ['Desenvolvimento', 'Liderança técnica', 'Qualidade'], degree: 'Mestrado em Engenharia Informática' },
    { bio: 'Conhece por dentro a construção e a pedra natural. Na GetEasier fala com os clientes, percebe como cada empresa trabalha e transforma isso no que o software tem de fazer.', focus: ['Produto', 'Processos', 'Segurança no trabalho'], degree: 'Engenharia e Gestão Industrial' },
  ] as Person[],
  codeKeys: { role: 'papel', focus: 'foco', degree: 'formação', certs: 'certificações' },
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-fundador',
}

export type AboutDict = typeof pt

const en: AboutDict = {
  h1: 'A young, professional team',
  lead: 'We are a Portuguese software team. We build our own products and custom software for other companies.',
  frontsTitle: 'Two fronts, one team',
  fronts: {
    custom: {
      title: 'Custom software',
      text: 'Web and mobile apps designed around each company’s process.',
      link: 'See how we work',
    },
    products: {
      title: 'Our own products',
      text: 'Four products built with Portuguese companies. What we learn from them goes into every project.',
      link: 'See the products',
    },
  },
  teamTitle: 'The people',
  teamText: 'The three co-founders design, build and support every project.',
  people: [
    { bio: 'Over 10 years building software for companies. At GetEasier he looks after the architecture and technical side of every project, so the software is solid, secure and easy to grow.', focus: ['Architecture', 'Development', 'Integrations', 'DevOps'], degree: 'Computer Engineering' },
    { bio: 'Over 12 years building software, many of them leading technical teams. At GetEasier he makes sure every application is fast, reliable and secure.', focus: ['Development', 'Technical leadership', 'Quality'], degree: "Master's in Computer Engineering" },
    { bio: 'Knows construction and natural stone from the inside. At GetEasier he talks to clients, learns how each company works and turns that into what the software must do.', focus: ['Product', 'Processes', 'Health and safety'], degree: 'Industrial Engineering and Management' },
  ] as Person[],
  codeKeys: { role: 'role', focus: 'focus', degree: 'degree', certs: 'certifications' },
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Co-founder',
}

const nl: AboutDict = {
  h1: 'Een jong en professioneel team',
  lead: 'Wij zijn een Portugees softwareteam. We bouwen onze eigen producten en maatwerksoftware voor andere bedrijven.',
  frontsTitle: 'Twee pijlers, één team',
  fronts: {
    custom: {
      title: 'Software op maat',
      text: 'Web- en mobiele apps ontworpen rond het proces van elk bedrijf.',
      link: 'Bekijk hoe we werken',
    },
    products: {
      title: 'Eigen producten',
      text: 'Vier producten ontwikkeld samen met bedrijven. Wat we ervan leren, nemen we mee in elk project.',
      link: 'Bekijk de producten',
    },
  },
  teamTitle: 'De mensen',
  teamText: 'De drie medeoprichters ontwerpen, bouwen en ondersteunen elk project.',
  people: [
    { bio: 'Meer dan 10 jaar ervaring met bedrijfssoftware. Bij GetEasier bewaakt hij de architectuur en de technische kant van elk project, zodat de software solide, veilig en makkelijk uitbreidbaar is.', focus: ['Architectuur', 'Ontwikkeling', 'Integraties', 'DevOps'], degree: 'Informatica' },
    { bio: 'Meer dan 12 jaar ervaring met softwareontwikkeling, waarvan een groot deel als leider van technische teams. Bij GetEasier zorgt hij ervoor dat elke applicatie snel, betrouwbaar en veilig is.', focus: ['Ontwikkeling', 'Technisch leiderschap', 'Kwaliteit'], degree: 'Master in de Informatica' },
    { bio: 'Kent de bouw- en natuursteensector van binnenuit. Bij GetEasier praat hij met klanten, begrijpt hoe elk bedrijf werkt en vertaalt dat naar wat de software moet doen.', focus: ['Product', 'Processen', 'Veiligheid op de werkvloer'], degree: 'Industriële Ingenieurswetenschappen' },
  ] as Person[],
  codeKeys: { role: 'rol', focus: 'focus', degree: 'opleiding', certs: 'certificaten' },
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Medeoprichter',
}

const es: AboutDict = {
  h1: 'Un equipo joven y profesional',
  lead: 'Somos un equipo portugués de software. Creamos productos propios y software a medida para otras empresas.',
  frontsTitle: 'Dos frentes, el mismo equipo',
  fronts: {
    custom: {
      title: 'Software a medida',
      text: 'Aplicaciones web y móviles diseñadas en torno al proceso de cada empresa.',
      link: 'Ver cómo trabajamos',
    },
    products: {
      title: 'Productos propios',
      text: 'Cuatro productos creados junto a empresas. Lo que aprendemos con ellos entra en cada proyecto.',
      link: 'Ver los productos',
    },
  },
  teamTitle: 'Las personas',
  teamText: 'Los tres cofundadores diseñan, desarrollan y dan soporte a cada proyecto.',
  people: [
    { bio: 'Más de 10 años desarrollando software para empresas. En GetEasier cuida la arquitectura y la parte técnica de cada proyecto, para que el software sea sólido, seguro y fácil de escalar.', focus: ['Arquitectura', 'Desarrollo', 'Integraciones', 'DevOps'], degree: 'Ingeniería Informática' },
    { bio: 'Más de 12 años desarrollando software, gran parte de ellos liderando equipos técnicos. En GetEasier garantiza que cada aplicación sea rápida, fiable y segura.', focus: ['Desarrollo', 'Liderazgo técnico', 'Calidad'], degree: 'Máster en Ingeniería Informática' },
    { bio: 'Conoce por dentro la construcción y la piedra natural. En GetEasier habla con los clientes, entiende cómo trabaja cada empresa y lo convierte en lo que el software debe hacer.', focus: ['Producto', 'Procesos', 'Seguridad laboral'], degree: 'Ingeniería y Gestión Industrial' },
  ] as Person[],
  codeKeys: { role: 'rol', focus: 'enfoque', degree: 'formación', certs: 'certificaciones' },
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Cofundador',
}

const fr: AboutDict = {
  h1: 'Une équipe jeune et professionnelle',
  lead: 'Nous sommes une équipe portugaise de développement logiciel. Nous créons nos propres produits et des logiciels sur mesure pour d’autres entreprises.',
  frontsTitle: 'Deux volets, une même équipe',
  fronts: {
    custom: {
      title: 'Logiciels sur mesure',
      text: 'Des applications web et mobiles conçues autour des processus de chaque entreprise.',
      link: 'Voir notre méthode',
    },
    products: {
      title: 'Nos produits',
      text: 'Quatre produits développés avec des entreprises. Ce que nous y apprenons nourrit chaque projet.',
      link: 'Voir les produits',
    },
  },
  teamTitle: 'L’équipe',
  teamText: 'Les trois cofondateurs conçoivent, développent et accompagnent chaque projet.',
  people: [
    { bio: 'Plus de 10 ans à développer des logiciels pour les entreprises. Chez GetEasier, il veille sur l’architecture et la technique de chaque projet, pour un logiciel solide, sûr et évolutif.', focus: ['Architecture', 'Développement', 'Intégrations', 'DevOps'], degree: 'Génie Informatique' },
    { bio: 'Plus de 12 ans dans le développement logiciel, dont une grande partie à diriger des équipes techniques. Chez GetEasier, il veille à ce que chaque application soit rapide, fiable et sécurisée.', focus: ['Développement', 'Leadership technique', 'Qualité'], degree: 'Master en Génie Informatique' },
    { bio: 'Il connaît la construction et la pierre naturelle de l’intérieur. Chez GetEasier, il échange avec les clients, comprend leur fonctionnement et le traduit en fonctionnalités concrètes.', focus: ['Produit', 'Processus', 'Sécurité au travail'], degree: 'Génie et Gestion Industrielle' },
  ] as Person[],
  codeKeys: { role: 'rôle', focus: 'focus', degree: 'formation', certs: 'certifications' },
  roles: { development: 'Software Engineer', product: 'Product Manager' },
  founder: 'Cofondateur',
}

export const about: Record<Locale, AboutDict> = { pt, en, nl, es, fr }
