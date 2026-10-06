import localFont from 'next/font/local'

// Geist e Geist Mono variáveis (OFL, Vercel), reduzidas ao Latin básico, Latin-1 e pontuação
// tipográfica: cerca de 31 KB e 33 KB em vez de 70 KB cada. Escolhidas pelo Alexandre a 01/10/2026
// em vez da Archivo larga, que dava ao site um ar de software antigo.
export const sans = localFont({
  src: '../fonts/geist-latin-wght100-900.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-sans',
  adjustFontFallback: 'Arial',
  preload: true,
})

export const mono = localFont({
  src: '../fonts/geist-mono-latin-wght100-900.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-mono',
  adjustFontFallback: false,
  preload: false,
})
