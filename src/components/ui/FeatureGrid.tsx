import type { Feature } from '@/content/products'
import { cn } from '@/lib/utils'

// Funcionalidades em grelha: marca na cor do produto, nome e uma linha.
export default function FeatureGrid({ items, theme }: { items: Feature[]; theme: { tint: string; text: string } }) {
  return (
    <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li key={f.term} className="reveal-panel flex gap-4">
          <span aria-hidden="true" className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-ctl', theme.tint, theme.text)}>
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10.5l4 4 8-9" />
            </svg>
          </span>
          <span>
            <span className="block font-semibold">{f.term}</span>
            <span className="mt-1 block text-small text-grafite">{f.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
