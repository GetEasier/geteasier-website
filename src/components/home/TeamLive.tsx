'use client'

import { useEffect } from 'react'

// Inclinação e luz que seguem o rato nos cartões da equipa (só com rato e sem "reduzir movimento").
export default function TeamLive() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-team-live] .team-card'))
    const offs = cards.map((card) => {
      let raf = 0
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
          card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
          card.style.setProperty('--ry', `${((x - 0.5) * 10).toFixed(2)}deg`)
          card.style.setProperty('--rx', `${((0.5 - y) * 8).toFixed(2)}deg`)
        })
      }
      const leave = () => {
        cancelAnimationFrame(raf)
        card.style.setProperty('--ry', '0deg')
        card.style.setProperty('--rx', '0deg')
      }
      card.addEventListener('pointermove', move)
      card.addEventListener('pointerleave', leave)
      return () => {
        cancelAnimationFrame(raf)
        card.removeEventListener('pointermove', move)
        card.removeEventListener('pointerleave', leave)
      }
    })
    return () => offs.forEach((off) => off())
  }, [])
  return null
}
