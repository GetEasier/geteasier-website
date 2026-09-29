'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

type Item = { id: string; label: string; path: string; active: boolean }
type Props = {
  labels: { menu: string; close: string; nav: string; cta: string; lang: string; langHint: string }
  items: Item[]
  ctaHref: string
  langHref: string
  langCode: string
}

// <details> funciona sem JavaScript; o JS só fecha o menu ao mudar de página ou com Escape.
export default function MobileMenu({ labels, items, ctaHref, langHref, langCode }: Props) {
  const ref = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (ref.current) ref.current.open = false
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && ref.current?.open) {
        ref.current.open = false
        ref.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <details ref={ref} className="group lg:hidden">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 rounded-ctl border border-tinta/70 px-4 font-semibold [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">{labels.menu}</span>
        <span className="hidden group-open:inline">{labels.close}</span>
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" className="group-open:hidden" />
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" className="hidden group-open:block" />
        </svg>
      </summary>
      <div className="absolute inset-x-0 top-[var(--header-h)] border-b border-linha bg-papel shadow-[0_12px_24px_-16px_rgba(6,8,60,0.35)]">
        <nav aria-label={labels.nav} className="wrap py-4">
          <ul className="border-t border-linha">
            {items.map((item) => (
              <li key={item.id} className="border-b border-linha">
                <Link
                  href={item.path}
                  aria-current={item.active ? 'page' : undefined}
                  className="flex min-h-[52px] items-center text-lead font-medium aria-[current=page]:text-azul"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4 pt-5">
            <Link href={ctaHref} className="btn-primary">
              {labels.cta}
            </Link>
            <Link href={langHref} hrefLang={langCode} lang={langCode} title={labels.langHint} className="link min-h-[44px] content-center">
              {labels.lang}
            </Link>
          </div>
        </nav>
      </div>
    </details>
  )
}
