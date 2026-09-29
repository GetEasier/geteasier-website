'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Perguntas frequentes em <details>: funciona sem JavaScript. Com JS, a altura anima de 0fr para
// 1fr (grid-template-rows, 280 ms) ao abrir e ao fechar. Com "reduzir movimento" abre sem animação.
export default function Faq({ items, children }: { items: { q: string; a: ReactNode }[]; children?: ReactNode }) {
  const list = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = list.current
    if (!root) return
    root.classList.add('faq-js')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
    return () => root.removeEventListener('click', onClick)
  }, [])

  return (
    <div ref={list} className="faq border-t border-caixa">
      {items.map((it) => (
        <details key={it.q} className="faq-item border-b border-caixa">
          <summary className="faq-q flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-6 py-4 text-lead font-semibold [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden="true" className="faq-icon relative h-4 w-4 shrink-0" />
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
