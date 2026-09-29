'use client'

import { useRef, type KeyboardEvent } from 'react'

// Separadores com o ARIA certo (tablist, tab, tabpanel) e navegação por setas, Home e End.
// Ativação automática: mover o foco muda de separador.
export function useTabs(id: string, count: number, active: number, setActive: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const focus = (i: number) => {
    setActive(i)
    refs.current[i]?.focus()
  }
  const onKeyDown = (e: KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: (active + 1) % count,
      ArrowDown: (active + 1) % count,
      ArrowLeft: (active - 1 + count) % count,
      ArrowUp: (active - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }
    if (e.key in map) {
      e.preventDefault()
      focus(map[e.key])
    }
  }
  const tab = (i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      refs.current[i] = el
    },
    id: `${id}-tab-${i}`,
    role: 'tab' as const,
    type: 'button' as const,
    'aria-selected': i === active,
    'aria-controls': `${id}-panel-${i}`,
    tabIndex: i === active ? 0 : -1,
    onKeyDown,
  })
  const panel = (i: number) => ({
    id: `${id}-panel-${i}`,
    role: 'tabpanel' as const,
    'aria-labelledby': `${id}-tab-${i}`,
    // Os painéis ficam empilhados para poderem trocar com crossfade; o inativo fica inerte e invisível.
    'data-on': i === active ? '' : undefined,
    inert: i !== active,
    tabIndex: 0,
  })
  return { tab, panel }
}
