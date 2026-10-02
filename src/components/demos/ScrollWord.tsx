'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

// Uma palavra grande que se monta ao descer (inspirada no Skiper31 da skiper-ui). Cada letra começa
// afastada do centro e inclinada em 3D; à medida que a palavra sobe até meio do ecrã, as letras
// juntam-se. O original usa a biblioteca motion; aqui o progresso vai para a variável CSS --p
// (0 = espalhada, 1 = montada) e o CSS faz o resto, sem juntar dependências.
// Sem JavaScript ou com "reduzir movimento", --p fica em 1: a palavra aparece já montada.
// Decorativa (aria-hidden): o título da secção logo a seguir diz o mesmo.

type Props = { word: string; className?: string; style?: CSSProperties }

export default function ScrollWord({ word, className, style }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 quando o topo da palavra entra por baixo; 1 quando o centro da palavra chega a meio do ecrã.
      const p = (vh - r.top) / (vh / 2 + r.height / 2)
      el.style.setProperty('--p', String(Math.min(1, Math.max(0, p))))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const chars = [...word]
  const center = (chars.length - 1) / 2

  return (
    <div ref={ref} aria-hidden="true" className={cn('sw', className)} style={style}>
      {chars.map((ch, i) => (
        <span key={i} className="sw-char" style={{ ['--d' as string]: i - center }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </div>
  )
}
