import type { Config } from 'tailwindcss'

// Tokens de docs/website/design.md
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        tinta: '#06083C',
        azul: { DEFAULT: '#1B54B8', escuro: '#15418F' },
        ciano: '#18DDBA',
        papel: '#F4F6F9',
        grafite: '#4A5263',
        linha: '#C9D1DE',
        estado: {
          valido: '#0F7A5C',
          aviso: '#8F5400',
          sinal: '#F5B400',
          erro: '#B42318',
        },
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 1.66rem + 3.4vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        h1: ['clamp(2.125rem, 1.7rem + 1.7vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        h2: ['clamp(1.6875rem, 1.48rem + 0.85vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.3125rem, 1.24rem + 0.3vw, 1.5rem)', { lineHeight: '1.25' }],
        lead: ['clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)', { lineHeight: '1.55' }],
        body: ['1.0625rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.45' }],
        data: ['0.8125rem', { lineHeight: '1.4' }],
      },
      maxWidth: {
        page: '77.5rem',
        prose: '64ch',
      },
      borderRadius: {
        ctl: '6px',
        frame: '12px',
      },
    },
  },
  plugins: [],
}

export default config
