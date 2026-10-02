'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Perguntas frequentes em <details>: funciona sem JavaScript. Com JS, a altura anima de 0fr para
// 1fr (grid-template-rows, 280 ms) ao abrir e ao fechar, e a pergunta aberta ganha um cartão com
// barra de cor. As perguntas entram uma a uma quando a lista aparece no ecrã (só com .motion-ok).
// Com "reduzir movimento" abre sem animação.
export default function Faq({ items, children }: { items: { q: string; a: ReactNode }[]; children?: ReactNode }) {
  const list = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = list.current
    if (!root) return
    root.classList.add('faq-js')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Entrada: só esconde as perguntas se ainda estão abaixo do ecrã (nunca esconde o que já se vê).
    let io: IntersectionObserver | undefined
    if (!reduced && root.getBoundingClientRect().top > window.innerHeight * 0.9) {
      root.classList.add('faq-wait')
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          root.classList.add('is-in')
          io?.disconnect()
        },
        { threshold: 0.15 },
      )
      io.observe(root)
    }
    const onClick = (e: Event) => {
      const summary = (e.target as HTMLElement).closest('summary')
      const item = summary?.parentElement as HTMLDetailsElement | null
      if (!summary || !item || !root.contains(item)) return
      e.preventDefault()
      if (!item.open) {
        item.open = true
        requestAnimationFrame(() => requestAnimationFrame(() => item.classList.add('is-open')))
      } else {
        item.classList.remove('is-open')
        const body = item.querySelector('.faq-body')
        if (reduced || !body) {
          item.open = false
          return
        }
        const done = () => {
          if (!item.classList.contains('is-open')) item.open = false
        }
        body.addEventListener('transitionend', done, { once: true })
        window.setTimeout(done, 400)
      }
    }
    root.addEventListener('click', onClick)
    return () => {
      io?.disconnect()
      root.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div ref={list} className="faq border-t border-caixa">
      {items.map((it, i) => (
        <details key={it.q} className="faq-item border-b border-caixa" style={{ '--i': i } as React.CSSProperties}>
          <summary className="faq-q flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-6 py-4 text-lead font-semibold [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden="true" className="faq-icon relative h-8 w-8 shrink-0 rounded-full" />
          </summary>
          <div className="faq-body">
            <div className="min-h-0 overflow-hidden">
              <p className="max-w-prose pb-5 text-grafite">{it.a}</p>
            </div>
          </div>
        </details>
      ))}
      {children}
    </div>
  )
}
