export const NAV_ITEMS = [
  // {
  //   label: 'Produtos',
  //   value: 'products' as const,
  //   featured: [
  //     {
  //       name: 'WoodEasier',
  //       href: '/products/wood-easier',
  //       imageSrc: '/images/products/wood-easier.jpg',
  //       description: 'A solução perfeita para a indústria da madeira.',
  //     },
  //     {
  //       name: 'StockEasier',
  //       href: '/products/stock-easier',
  //       imageSrc: '/images/products/stock-easier.jpg',
  //       description: 'Otimize o controlo dos seus materiais.',
  //     },
  //   ],
  // },
  // {
  //   label: 'Sobre nós',
  //   value: 'about' as const,
  //   href: '/about-us',
  // },
  // {
  //   label: 'Contactos',
  //   value: 'contacts' as const,
  //   href: '/contacts',
  // },
  {
    name: 'Produtos',
    link: 'products',
    products: [
      {
        name: 'TimeEasier',
        href: '/time-easier',
        color: '#4285F4',
        description: 'Registo de ponto simplificado',
        icon: 'clock',
        logo: '/images/products/icons/time-easier.png',
      },
      {
        name: 'ConstructionEasier',
        href: '/construction-easier',
        color: '#34A853',
        description: 'Gestão completa de obras',
        icon: 'building',
        logo: '/images/products/icons/construction-easier.png',
      },
      {
        name: 'StockEasier',
        href: '/stock-easier',
        color: '#EA4335',
        description: 'Gestão de inventário inteligente',
        icon: 'package',
        logo: '/images/products/icons/stock-easier.png',
      },
      {
        name: 'WoodEasier',
        href: '/wood-easier',
        color: '#D4A574',
        description: 'Passaportes de madeira em conformidade',
        icon: 'tree',
        logo: '/images/products/icons/wood-easier.png',
      },
    ],
  },
  {
    name: 'Testemunhos',
    link: 'testimonials',
  },
  {
    name: 'Sobre Nós',
    link: 'team',
  },
];
