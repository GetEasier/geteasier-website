import type { ProductId } from './seo.config'

// Cor de cada produto, tirada do respetivo logótipo. `app` é a cor do produto dentro da webapp (staging, 29/09). Classes escritas por extenso para o Tailwind as encontrar.
export const PRODUCT_THEME: Record<ProductId, { hex: string; app: string; tint: string; text: string; solid: string; border: string }> = {
  timeEasier: {
    hex: '#3B5FA8',
    app: '#2563eb',
    tint: 'bg-produto-time-claro',
    text: 'text-produto-time',
    solid: 'bg-produto-time',
    border: 'border-produto-time',
  },
  constructionEasier: {
    hex: '#1E7A45',
    app: '#15924e',
    tint: 'bg-produto-obras-claro',
    text: 'text-produto-obras',
    solid: 'bg-produto-obras',
    border: 'border-produto-obras',
  },
  stockEasier: {
    hex: '#A51F2D',
    app: '#d62828',
    tint: 'bg-produto-stock-claro',
    text: 'text-produto-stock',
    solid: 'bg-produto-stock',
    border: 'border-produto-stock',
  },
  woodEasier: {
    hex: '#7A3E1C',
    app: '#a4631b',
    tint: 'bg-produto-wood-claro',
    text: 'text-produto-wood',
    solid: 'bg-produto-wood',
    border: 'border-produto-wood',
  },
}
