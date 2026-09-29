import localFont from 'next/font/local'

// Archivo variável e IBM Plex Mono, ambas OFL.
// Archivo reduzida ao que o site usa (fontTools): peso 400–700, largura 100–112 %,
// Latin básico, Latin-1 e pontuação tipográfica. 43 KB em vez de 88 KB.
export const archivo = localFont({
  src: '../fonts/archivo-subset-wght400-700-wdth100-112.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-archivo',
  declarations: [{ prop: 'font-stretch', value: '100% 112%' }],
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
