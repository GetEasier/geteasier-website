import type { Feature } from '@/content/products'

// Etapas em linha (ecrã largo) ou em coluna (telemóvel), com número em círculo e uma linha entre etapas.
export default function ProcessSteps({ items }: { items: Feature[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-5 md:gap-5">
      {items.map((s, i) => (
        <li key={s.term} className="reveal-panel relative flex gap-4 md:block">
          {i < items.length - 1 && (
            <span aria-hidden="true" className="absolute left-5 top-12 h-[calc(100%-1rem)] w-px bg-linha md:left-14 md:top-5 md:h-px md:w-[calc(100%-2.5rem)]" />
          )}
          <span aria-hidden="true" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-azul to-ciano font-bold text-white">
            {i + 1}
          </span>
          <span className="block md:mt-5">
            <span className="block font-semibold">{s.term}</span>
            <span className="mt-1 block text-small text-grafite">{s.desc}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
