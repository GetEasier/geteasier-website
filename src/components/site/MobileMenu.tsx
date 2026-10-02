'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type Item = { id: string; label: string; path: string; active: boolean }
type Product = { id: string; name: string; icon: string; path: string; active: boolean }
type Props = {
  labels: { menu: string; close: string; nav: string; cta: string; langTitle: string; products: string }
  items: Item[]
  products: Product[]
  ctaHref: string
  /** As duas línguas, pela ordem do seletor; a atual não é ligação. */
  langs: { code: string; short: string; name: string; href: string; current: boolean }[]
}

// Menu do telemóvel: um painel que cresce a partir do botão e volta para ele ao fechar (o estilo vem do
// user-menu da Arc), com uma pega em baixo para o arrastar para cima e fechar, um fundo escurecido que
// fecha ao tocar, ícones em cada linha, os quatro produtos à mão e a língua num seletor PT | EN.
// <details> faz com que abra e feche sem JavaScript; o JS junta as animações, o arrasto, o Escape, o
// foco preso no menu e a página parada por trás. Sem "motion-ok" abre e fecha sem movimento.
// As ligações do menu não fazem prefetch: ao abrir, ficavam onze à vista de uma vez e o Next ia
// buscar todas as páginas a meio da animação, o que a engasgava no telemóvel.
export default function MobileMenu({ labels, items, products, ctaHref, langs }: Props) {
  const ref = useRef<HTMLDetailsElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const closing = useRef(false)
  const pathname = usePathname()

  const motionOk = () => document.documentElement.classList.contains('motion-ok')

  const close = useCallback((returnFocus: boolean) => {
    const d = ref.current
    const sheet = sheetRef.current
    if (!d?.open || closing.current) return
    const done = () => {
      closing.current = false
      d.open = false
      delete d.dataset.state
      if (sheet) sheet.style.transform = ''
      if (returnFocus) d.querySelector('summary')?.focus({ preventScroll: true })
    }
    if (!motionOk() || !sheet) return done()
    closing.current = true
    d.dataset.state = 'closing'
    // O painel sobe a partir de onde estiver (também a meio de um arrasto).
    sheet.style.transform = ''
    const t = window.setTimeout(done, 400)
    sheet.addEventListener(
      'transitionend',
      (e) => {
        if (e.target !== sheet) return
        window.clearTimeout(t)
        done()
      },
      { once: true },
    )
  }, [])

  // Mudar de página fecha logo, sem animação.
  useEffect(() => {
    const d = ref.current
    if (d) {
      d.open = false
      delete d.dataset.state
    }
    closing.current = false
  }, [pathname])

  useEffect(() => {
    const d = ref.current
    const sheet = sheetRef.current
    if (!d || !sheet) return
    const layer = sheet.parentElement as HTMLElement

    // A página por trás fica parada sem mexer em estilos do <html> (isso obrigava o browser a
    // recalcular a página inteira e engasgava a animação): os gestos sobre o fundo e sobre o painel,
    // quando ele não tem scroll próprio, simplesmente não fazem scroll.
    const canScroll = () => sheet.scrollHeight > sheet.clientHeight + 1
    const onTouchMove = (e: TouchEvent) => {
      if (!sheet.contains(e.target as Node) || !canScroll()) e.preventDefault()
    }
    const onWheel = (e: WheelEvent) => {
      if (!sheet.contains(e.target as Node) || !canScroll()) e.preventDefault()
    }

    const onKey = (e: KeyboardEvent) => {
      if (!d.open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        close(true)
      } else if (e.key === 'Tab') {
        // O foco fica no menu (botão Fechar e painel) enquanto está aberto.
        const f = [...d.querySelectorAll<HTMLElement>('summary, .mm-sheet a[href]')]
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    // Arrastar para cima fecha: pela pega sempre, e pelo painel todo quando ele não tem nada para
    // fazer scroll.
    let drag: { id: number; y0: number; x0: number; t0: number; dy: number; on: boolean } | null = null
    const onDown = (e: PointerEvent) => {
      if (!motionOk() || (e.pointerType === 'mouse' && e.button !== 0)) return
      const fromGrip = (e.target as HTMLElement).closest('.mm-grip')
      const fits = sheet.scrollHeight <= sheet.clientHeight + 1
      if (!fromGrip && !fits) return
      drag = { id: e.pointerId, y0: e.clientY, x0: e.clientX, t0: performance.now(), dy: 0, on: false }
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const dy = e.clientY - drag.y0
      if (!drag.on) {
        if (Math.abs(dy) < 6 || Math.abs(dy) < Math.abs(e.clientX - drag.x0)) return
        drag.on = true
        sheet.setPointerCapture(e.pointerId)
        d.dataset.state = 'dragging'
      }
      // Para baixo resiste, para cima segue o dedo.
      drag.dy = dy < 0 ? dy : dy / 6
      sheet.style.transform = `translate3d(0,${drag.dy}px,0)`
    }
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const { dy, on, t0 } = drag
      drag = null
      if (!on) return
      const fast = -dy / Math.max(1, performance.now() - t0) > 0.6
      if (dy < -90 || (fast && dy < -24)) {
        swallow = true
        setTimeout(() => (swallow = false), 0)
        close(false)
      } else {
        delete d.dataset.state
        sheet.style.transform = ''
      }
    }
    let swallow = false
    const onClick = (e: MouseEvent) => {
      if (swallow) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    layer.addEventListener('touchmove', onTouchMove, { passive: false })
    layer.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKey)
    sheet.addEventListener('pointerdown', onDown)
    sheet.addEventListener('pointermove', onMove)
    sheet.addEventListener('pointerup', onUp)
    sheet.addEventListener('pointercancel', onUp)
    sheet.addEventListener('click', onClick, true)
    return () => {
      layer.removeEventListener('touchmove', onTouchMove)
      layer.removeEventListener('wheel', onWheel)
      document.removeEventListener('keydown', onKey)
      sheet.removeEventListener('pointerdown', onDown)
      sheet.removeEventListener('pointermove', onMove)
      sheet.removeEventListener('pointerup', onUp)
      sheet.removeEventListener('pointercancel', onUp)
      sheet.removeEventListener('click', onClick, true)
    }
  }, [close])

  const onSummary = (e: React.MouseEvent) => {
    const d = ref.current
    if (!d) return
    if (d.open) {
      e.preventDefault()
      close(true)
      return
    }
    // O painel cresce a partir do centro do botão (e é para lá que volta ao fechar).
    const sheet = sheetRef.current
    const btn = e.currentTarget.getBoundingClientRect()
    const header = d.closest('header')
    if (sheet && header) {
      // O painel começa onde acaba o cabeçalho (menos o encolher ao descer a página).
      const top = header.getBoundingClientRect().bottom - (parseFloat(getComputedStyle(header).getPropertyValue('--compact-shift')) || 0)
      sheet.style.setProperty('--ox', `${btn.left + btn.width / 2}px`)
      sheet.style.setProperty('--oy', `${btn.top + btn.height / 2 - top}px`)
    }
  }

  return (
    <details ref={ref} className="mm group lg:hidden">
      <summary className="mm-trigger" onClick={onSummary}>
        <span className="mm-label-menu sr-only">{labels.menu}</span>
        <span className="mm-label-close sr-only">{labels.close}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="mm-burger h-5 w-5">
          <path d="M3 7h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </summary>

      <div className="mm-layer">
        <div className="mm-scrim" aria-hidden="true" onClick={() => close(true)} />
        <div ref={sheetRef} className="mm-sheet" role="dialog" aria-modal="true" aria-label={labels.nav}>
          <nav aria-label={labels.nav}>
            <ul className="mm-list">
              {items.map((item) => (
                <li key={item.id}>
                  <Link prefetch={false} href={item.path} aria-current={item.active ? 'page' : undefined} className="mm-item">
                    <span className="mm-ico" aria-hidden="true">
                      {NAV_ICONS[item.id]}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.active && <span className="mm-dot" aria-hidden="true" />}
                  </Link>
                  {item.id === 'products' && (
                    <ul className="mm-products" aria-label={labels.products}>
                      {products.map((p) => (
                        <li key={p.id}>
                          <Link prefetch={false} href={p.path} aria-current={p.active ? 'page' : undefined} className="mm-product">
                            <Image src={p.icon} alt="" width={28} height={28} loading="eager" className="h-6 w-6 shrink-0 rounded-md object-contain" />
                            <span className="min-w-0 truncate">{p.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mm-sep" />

          <div className="mm-lang">
            <span className="mm-ico" aria-hidden="true">
              {GLOBE}
            </span>
            <span className="flex-1 font-medium">{labels.langTitle}</span>
            <div className="mm-seg" style={{ '--index': langs.findIndex((l) => l.current) } as CSSProperties}>
              <span className="mm-thumb" aria-hidden="true" />
              {langs.map((l) =>
                l.current ? (
                  <span key={l.code} className="mm-seg-opt" aria-current="true" title={l.name}>
                    {l.short}
                  </span>
                ) : (
                  <Link key={l.code} prefetch={false} href={l.href} hrefLang={l.code} lang={l.code} className="mm-seg-opt" title={l.name}>
                    <span aria-hidden="true">{l.short}</span>
                    <span className="sr-only">{l.name}</span>
                  </Link>
                ),
              )}
            </div>
          </div>

          <div>
            <Link prefetch={false} href={ctaHref} className="btn-primary mt-3 w-full">
              {labels.cta}
            </Link>
          </div>
          <div className="mm-grip" aria-hidden="true">
            <span className="mm-handle" />
          </div>
        </div>
      </div>
    </details>
  )
}

const svg = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const NAV_ICONS: Record<string, ReactNode> = {
  home: svg(<path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" />),
  customSoftware: svg(<path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />),
  products: svg(
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" />
    </>,
  ),
  plans: svg(
    <>
      <path d="M3.5 12.6V5a1.5 1.5 0 0 1 1.5-1.5h7.6l8 8a1.5 1.5 0 0 1 0 2.1l-6.9 6.9a1.5 1.5 0 0 1-2.1 0z" />
      <circle cx="8.3" cy="8.3" r="1.4" />
    </>,
  ),
  about: svg(
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.8c1.6.6 2.7 2.2 3 4.7" />
    </>,
  ),
  contact: svg(<path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V17h0A1.5 1.5 0 0 1 4 15.5z" />),
}

const GLOBE = svg(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5z" />
  </>,
)
