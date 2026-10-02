'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// Título ou texto que se monta letra a letra ao descer (inspirado no Skiper31 da skiper-ui).
// Cada letra começa afastada do centro do texto e inclinada em 3D; à medida que o título sobe até meio do ecrã, as
// letras juntam-se. O original usa a biblioteca motion; aqui o progresso vai para a variável CSS --p
// (0 = espalhado, 1 = montado) e o CSS faz o resto, sem juntar dependências.
// Sem JavaScript ou com "reduzir movimento", --p fica em 1: o título aparece já montado.
// As letras soltas são aria-hidden; o leitor de ecrã lê o texto inteiro (sr-only).

type Props = { text: string; as?: 'h2' | 'h3' | 'p'; id?: string; className?: string }

export default function ScrollWord({ text, as: Tag = 'h2', id, className }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 quando o título entra por baixo; 1 quando o centro do título sobe a 60% da altura do ecrã
      // (antes de chegar a meio, que é onde o passo fica ativo).
      const p = (vh - r.top) / (vh * 0.4 + r.height / 2)
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

  // Letras agrupadas por palavra, para o título continuar a partir linhas entre palavras.
  const words = text.split(' ')
  const center = (text.length - 1) / 2
  // Distância ao centro de -1 a 1, para títulos curtos e textos longos se espalharem por igual.
  const norm = (i: number) => (center > 0 ? (i - center) / center : 0)
  // Posição de cada palavra no título (letras + espaços antes dela).
  const starts = words.map((_, wi) => words.slice(0, wi).reduce((a, w) => a + w.length + 1, 0))

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>} id={id} className={cn('sw', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => {
          const start = starts[wi]
          return (
            <span key={wi}>
              <span className="inline-block whitespace-nowrap">
                {[...w].map((ch, ci) => (
                  <span key={ci} className="sw-char" style={{ ['--d' as string]: norm(start + ci).toFixed(3) }}>
                    {ch}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 && ' '}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
