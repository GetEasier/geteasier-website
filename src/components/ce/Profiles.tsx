import type { ReactNode } from 'react'
import type { ConstructionDict } from '@/content/construction'

// Por perfil: quem é e o que ganha, numa linha. Quatro cartões compactos lado a lado.
const ICONS: ReactNode[] = [
  // Empreiteiro geral e dono de obra: edifício
  <path key="0" d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M4 21h16" />,
  // Diretor de obra: capacete
  <path key="1" d="M3 17h18M5 17a7 7 0 0114 0M10 10V6h4v4M12 6V4" />,
  // Subempreiteiro: equipa
  <path key="2" d="M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M16 3.5a4 4 0 010 7M22 21v-1a6 6 0 00-4-5.6" />,
  // Segurança e compliance: escudo com visto
  <path key="3" d="M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />,
]

export default function Profiles({ t }: { t: ConstructionDict['profiles'] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {t.items.map((p, i) => (
        <li key={p.tab} className="reveal-panel rounded-frame bg-produto-obras-claro p-5">
          <span className="grid h-11 w-11 place-items-center rounded-ctl bg-white text-produto-obras shadow-[0_6px_16px_-10px_rgba(6,8,60,.4)]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[i]}
            </svg>
          </span>
          <h3 className="mt-4 font-bold leading-snug">{p.tab}</h3>
          <p className="mt-1.5 text-small text-grafite">{p.gain}</p>
        </li>
      ))}
    </ul>
  )
}
