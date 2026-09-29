'use client'

import { useEffect, useRef } from 'react'
import Badge, { StatusIcon, type DocStatus } from '@/components/checkin/Badge'
import type { HomeDict } from '@/content/home'
import { belowFold, loadGsap, reducedMotion } from '@/motion/gsap'
import { DUR, EASE, STAGGER } from '@/motion/tokens'

type Chaos = HomeDict['chaos']

// Linha da folha → pessoa na vista organizada (a linha duplicada junta-se ao Rui).
const ROW_TO_PERSON = [0, 1, 0, 2, 3]
// Células com falhas visíveis (linha, coluna).
const FLAGS: Record<string, 'bad' | 'empty'> = {
  '1-3': 'bad',
  '1-4': 'empty',
  '2-3': 'empty',
  '3-1': 'empty',
  '4-3': 'bad',
}

// Posição de um elemento dentro do palco, sem contar transformações (offsetLeft/Top),
// para as contas do FLIP darem certo mesmo a meio de uma animação ou depois de um resize.
function offsetIn(el: HTMLElement, stage: HTMLElement) {
  let x = 0
  let y = 0
  let n: HTMLElement | null = el
  while (n && n !== stage) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent as HTMLElement | null
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

// "Do caos ao controlo": a única secção pinned do site. Em desktop, três atos controlados pelo
// scroll (scrub): a folha de cálculo, os avisos a empilhar e a vista organizada, para onde as
// linhas da folha e os avisos se deslocam (FLIP). Em telemóvel, com ecrãs baixos ou com
// "reduzir movimento": sem pin, os três atos um por baixo do outro, revelados ao entrar.
// Tudo em DOM real e legível sem JavaScript.
export default function ChaosToControl({ t, headingId }: { t: Chaos; headingId: string }) {
  const stage = useRef<HTMLDivElement>(null)
  const pin = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    let revert: (() => void) | undefined
    let cancelled = false

    Promise.all([loadGsap(), import('gsap/SplitText')]).then(([{ gsap, ScrollTrigger }, { SplitText }]) => {
      if (cancelled || !stage.current || !pin.current) return
      gsap.registerPlugin(SplitText)
      const st = stage.current
      const q = <T extends Element = HTMLElement>(sel: string) => [...st.querySelectorAll<T & HTMLElement>(sel)]
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (min-height: 700px)', () => {
        st.classList.add('is-pinned')
        ScrollTrigger.refresh()
        const rows = q('[data-row]')
        const people = q('[data-person]')
        const alerts = q('[data-alert]')
        const results = q('[data-result]')
        const caps = q('[data-caption]')
        const split = SplitText.create(st.querySelector('[data-final]'), { type: 'chars', aria: 'auto' })

        // Vars de um FLIP: o alvo começa em cima da origem e desloca-se para o seu lugar.
        const flipFrom = (target: HTMLElement, source: () => HTMLElement) => ({
          x: () => offsetIn(source(), st).x - offsetIn(target, st).x,
          y: () => offsetIn(source(), st).y - offsetIn(target, st).y,
          scaleX: () => offsetIn(source(), st).w / offsetIn(target, st).w,
          scaleY: () => offsetIn(source(), st).h / offsetIn(target, st).h,
          transformOrigin: '0 0',
        })

        gsap.set(caps.slice(1), { autoAlpha: 0, y: 16 })
        gsap.set(alerts, { autoAlpha: 0, y: -24 })
        gsap.set(q('[data-view]'), { autoAlpha: 0 })
        gsap.set(q('[data-flag]'), { opacity: 0 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top+=68',
            end: '+=240%',
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        // Ato 1: as falhas da folha acendem-se uma a uma.
        tl.to(q('[data-flag]'), { opacity: 1, duration: 0.5, stagger: 0.12 }, 0.1)
          .to(q('[data-mess-extra]'), { rotation: (i) => (i ? 3 : -4), duration: 0.6 }, 0.1)
          // Ato 2: pressão. Os avisos empilham-se por cima e a folha fica em segundo plano.
          .to(caps[0], { autoAlpha: 0, y: -16, duration: 0.3 }, 1)
          .to(caps[1], { autoAlpha: 1, y: 0, duration: 0.4 }, 1.2)
          .to(q('[data-mess]'), { opacity: 0.45, duration: 0.5 }, 1.1)
          .to(alerts, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.25, ease: 'power2.out' }, 1.2)
          // Ato 3: controlo. As linhas deslocam-se para a vista organizada e os avisos viram resultados.
          .to(caps[1], { autoAlpha: 0, y: -16, duration: 0.3 }, 2.3)
          .to(caps[2], { autoAlpha: 1, y: 0, duration: 0.4 }, 2.5)
          .to(q('[data-view]'), { autoAlpha: 1, duration: 0.5 }, 2.4)
          .from(q('[data-view-head]'), { autoAlpha: 0, duration: 0.3 }, 2.45)
          .to(q('[data-mess-extra]'), { autoAlpha: 0, scale: 0.9, duration: 0.35 }, 2.4)
          .to(q('[data-mess-frame]'), { autoAlpha: 0, duration: 0.4 }, 2.5)
          .to(rows, { autoAlpha: 0, duration: 0.3, stagger: 0.05 }, 2.55)

        people.forEach((el, i) => {
          const src = rows[ROW_TO_PERSON.indexOf(i)]
          tl.from(el, { ...flipFrom(el, () => src), autoAlpha: 0, duration: 0.8, ease: EASE.estado }, 2.45 + i * STAGGER)
        })
        results.forEach((el, i) => {
          tl.from(el, { ...flipFrom(el, () => alerts[i]), autoAlpha: 0, duration: 0.8, ease: EASE.estado }, 2.6 + i * STAGGER)
          tl.to(alerts[i], { autoAlpha: 0, duration: 0.3 }, 2.6 + i * STAGGER)
        })
        // A frase final letra a letra (o único SplitText do site).
        tl.from(split.chars, { autoAlpha: 0, yPercent: 60, duration: 0.3, stagger: 0.02, ease: 'power2.out' }, 3.3).to({}, { duration: 0.4 })

        return () => {
          split.revert()
          st.classList.remove('is-pinned')
        }
      })

      // Sem pin: cada ato revela-se quando entra no ecrã, uma vez.
      mm.add('(max-width: 1023.98px), (max-height: 699.98px)', () => {
        q('[data-act]').forEach((act, i) => {
          if (!belowFold(act)) return
          const items =
            i === 0 ? act.querySelectorAll('[data-flag]') : i === 1 ? act.querySelectorAll('[data-alert]') : act.querySelectorAll('[data-person], [data-result]')
          gsap.set(items, i === 0 ? { opacity: 0 } : { autoAlpha: 0, x: i === 1 ? 24 : 0, y: i === 2 ? 12 : 0 })
          ScrollTrigger.create({
            trigger: act,
            start: 'top 70%',
            once: true,
            onEnter: () =>
              gsap.to(items, {
                opacity: 1,
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: i === 0 ? DUR.ui : DUR.reveal,
                ease: EASE.entrada,
                stagger: i === 1 ? 0.18 : STAGGER * 2,
              }),
          })
        })
      })

      revert = () => mm.revert()
    })

    return () => {
      cancelled = true
      revert?.()
    }
  }, [])

  const results = t.results.map((r) => {
    const m = r.match(/^(\d+)\s(.*)$/)
    return m ? { n: m[1], text: m[2] } : { n: '', text: r }
  })

  return (
    <div ref={pin} className="caos-pin">
      <div className="max-w-prose">
        <h2 id={headingId} className="t-h2">
          {t.title}
        </h2>
        <p className="mt-3 text-lead text-grafite">{t.intro}</p>
      </div>

      <div ref={stage} className="caos-stage mt-10">
        {/* Ato 1: caos */}
        <div className="caos-act" data-act>
          <div className="caos-caption" data-caption>
            <h3 className="t-h3">{t.acts[0].name}</h3>
            <p className="mt-2 text-grafite">{t.acts[0].text}</p>
          </div>
          <div className="caos-visual caos-mess">
            <div data-mess>
              <div className="caos-sheet" data-mess-frame>
                <p className="caos-sheet-bar">{t.sheet.file}</p>
              </div>
              <div className="caos-scroll">
              <table className="caos-table">
                <thead data-mess-frame>
                  <tr>
                    {t.sheet.cols.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.sheet.rows.map((row, r) => (
                    <tr key={r} data-row className={r === 2 ? 'is-dup' : undefined}>
                      {row.map((cell, c) => {
                        const flag = FLAGS[`${r}-${c}`]
                        return (
                          <td key={c} className={flag ? `is-${flag}` : undefined}>
                            {flag && <span data-flag className="caos-flag" aria-hidden="true" />}
                            <span className="relative">{cell}</span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
            <div className="caos-photo" data-mess-extra>
              <div className="caos-photo-doc" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="mt-2 flex justify-between gap-3 text-[13px]">
                {t.sheet.photo}
                <span className="t-data text-grafite">{t.sheet.photoTime}</span>
              </p>
            </div>
            <div className="caos-book" data-mess-extra>
              <p className="text-[13px] font-semibold">{t.sheet.book}</p>
              <ul className="mt-1">
                {t.sheet.bookLines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ato 2: pressão */}
        <div className="caos-act" data-act>
          <div className="caos-caption" data-caption>
            <h3 className="t-h3">{t.acts[1].name}</h3>
            <p className="mt-2 text-grafite">{t.acts[1].text}</p>
          </div>
          <ul className="caos-visual caos-alerts">
            {t.alerts.map((a, i) => (
              <li key={a} data-alert className="caos-alert">
                <StatusIcon status={i === 1 ? 'missing' : 'soon'} className={i === 1 ? 'text-estado-erro' : undefined} />
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Ato 3: controlo */}
        <div className="caos-act" data-act>
          <div className="caos-caption" data-caption>
            <h3 className="t-h3">{t.acts[2].name}</h3>
            <p className="mt-2 text-grafite">{t.acts[2].text}</p>
          </div>
          <div className="caos-visual caos-view" data-view>
            <p className="font-semibold" data-view-head>
              {t.view.title}
            </p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {t.view.people.map((p) => (
                <li key={p.name} data-person>
                  <Badge name={p.name} company={p.company} time={p.time} status={p.status as DocStatus} statusText={p.text} size="sm" />
                </li>
              ))}
            </ul>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {results.map((r, i) => (
                <li key={r.text} data-result className="caos-result">
                  <span className="t-data block text-[1.75rem] font-medium leading-none">{r.n}</span>
                  <span className="mt-1 block text-small font-semibold" data-final={i === 2 ? '' : undefined}>
                    {r.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
