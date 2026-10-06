'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// Título ou texto que se monta ao descer (inspirado no Skiper31 da skiper-ui). Cada peça (letra ou
// palavra) começa afastada do centro do texto e inclinada em 3D; à medida que o texto sobe no ecrã,
// as peças juntam-se. O original usa a biblioteca motion; aqui um pequeno ouvinte de scroll escreve
// o transform de cada peça, sem juntar dependências.
// Para o scroll continuar fluido: um só ouvinte de scroll para todos os textos, só para os que
// estão no ecrã, nada a mexer depois de montado, e os textos longos animam por palavra.
// (Uma versão só em CSS, com animation-timeline, mediu-se mais pesada.)
// Sem JavaScript ou com "reduzir movimento", as peças ficam sem transform: o texto aparece já montado.
// As peças soltas são aria-hidden; o leitor de ecrã lê o texto inteiro (sr-only).

type Props = {
  text: string
  as?: 'h2' | 'h3' | 'p'
  /** 'char' anima letra a letra (títulos); 'word' palavra a palavra (textos longos). */
  by?: 'char' | 'word'
  id?: string
  className?: string
}

// Um só ouvinte de scroll para todos os textos no ecrã: primeiro lê todas as posições, depois
// escreve todas as peças, para o browser não recalcular o layout várias vezes por frame.
type Item = { el: HTMLElement; last: number; parts: { s: CSSStyleDeclaration; d: number }[]; spread: number }
const live = new Set<Item>()
let frame = 0

function tick() {
  frame = 0
  const vh = window.innerHeight
  const items = [...live]
  // 0 quando o texto entra por baixo; 1 quando o centro do texto sobe a 60% da altura do ecrã
  // (antes de chegar a meio, que é onde o passo fica ativo).
  const ps = items.map(({ el }) => {
    const r = el.getBoundingClientRect()
    return Math.round(Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.4 + r.height / 2))) * 100) / 100
  })
  items.forEach((it, i) => {
    if (ps[i] === it.last) return
    it.last = ps[i]
    // Escreve o transform de cada peça diretamente (mudar uma variável herdada no bloco obrigava o
    // browser a recalcular os estilos de todas as peças, o que pesava no scroll).
    const k = 1 - ps[i]
    for (const { s, d } of it.parts) {
      // Montado: sem transform (nada a recalcular enquanto se lê).
      s.transform = k ? `translateX(${(d * it.spread * k).toFixed(1)}px) rotateX(${(d * 80 * k).toFixed(1)}deg)` : ''
      s.opacity = k ? String(1 - 0.8 * k) : ''
    }
  })
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(tick)
}
function track(it: Item, on: boolean) {
  const had = live.size
  if (on) live.add(it)
  else live.delete(it)
  if (!had && live.size) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  } else if (had && !live.size) {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  }
  schedule()
}

export default function ScrollWord({ text, as: Tag = 'h2', by = 'char', id, className }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const parts = [...el.querySelectorAll<HTMLElement>('.sw-char')].map((c) => ({ s: c.style, d: Number(c.dataset.d) }))
    // Distância máxima em px: 5em nos títulos, 6em nos textos.
    const spread = parseFloat(getComputedStyle(el).fontSize) * (Tag === 'p' ? 6 : 5)
    const it: Item = { el, last: -1, parts, spread }
    // Só segue o scroll enquanto o texto está no ecrã.
    const io = new IntersectionObserver(([e]) => track(it, e.isIntersecting))
    io.observe(el)
    return () => {
      io.disconnect()
      track(it, false)
    }
  }, [Tag])

  // Peças agrupadas por palavra, para o texto continuar a partir linhas entre palavras.
  const words = text.split(' ')
  const len = by === 'char' ? text.length : words.length
  const center = (len - 1) / 2
  // Distância ao centro de -1 a 1, para textos curtos e longos se espalharem por igual.
  const norm = (i: number) => (center > 0 ? (i - center) / center : 0).toFixed(3)
  // Posição da primeira letra de cada palavra no texto (letras + espaços antes dela).
  const starts = words.map((_, wi) => words.slice(0, wi).reduce((a, w) => a + w.length + 1, 0))

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>} id={id} className={cn('sw', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi}>
            {by === 'word' ? (
              <span className="sw-char" data-d={norm(wi)}>
                {w}
              </span>
            ) : (
              <span className="inline-block whitespace-nowrap">
                {[...w].map((ch, ci) => (
                  <span key={ci} className="sw-char" data-d={norm(starts[wi] + ci)}>
                    {ch}
                  </span>
                ))}
              </span>
            )}
            {wi < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </Tag>
  )
}
