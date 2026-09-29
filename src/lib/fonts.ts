import localFont from 'next/font/local'

// Archivo variável (peso 100–900, largura 62–125 %) e IBM Plex Mono, ambas OFL.
// Só o subconjunto latin: cobre todo o texto em português e inglês do site.
export const archivo = localFont({
  src: '../fonts/archivo-latin-wdth-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-archivo',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
  adjustFontFallback: 'Arial',
  preload: true,
})

export const plexMono = localFont({
  src: [
    { path: '../fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-plex-mono',
  adjustFontFallback: false,
  preload: false,
})
