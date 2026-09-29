'use client'

import { useEffect } from 'react'

// Ao descer, o cabeçalho encolhe (de 68 para 56 px, só visualmente, sem mexer no layout) e ao
// subir volta ao tamanho normal. A linha de progresso da página é CSS (animation-timeline).
export default function HeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!header) return
    let last = window.scrollY
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (y < 80) header.removeAttribute('data-compact')
        else if (y > last + 4) header.setAttribute('data-compact', '')
        else if (y < last - 4) header.removeAttribute('data-compact')
        last = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return null
}
