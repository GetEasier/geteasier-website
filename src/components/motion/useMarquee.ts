'use client'

import { useEffect, useRef, type RefObject } from 'react'

// Faixa contínua que anda sozinha e também se desliza à mão: arrasto do rato, swipe no telemóvel e
// scroll horizontal do trackpad. Ao largar com força, a faixa continua a deslizar e vai abrandando
// (inércia, como uma lista no telemóvel); o trackpad já traz a sua própria inércia. O automático
// abranda até parar com o rato ou o foco em cima e volta a ganhar velocidade aos poucos depois. A faixa tem duas cópias iguais, por isso o deslocamento dá a volta a meio.
// Só mexe quando a página tem a classe motion-ok (sem "reduzir movimento"); sem ela, fica a grelha.
export function useMarquee(
  viewportRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  { seconds, running }: { seconds: number; running: boolean },
) {
  const runningRef = useRef(running)
  const kick = useRef<() => void>(() => {})

  useEffect(() => {
    const vp = viewportRef.current
    const track = trackRef.current
    if (!vp || !track) return

    let x = 0
    let half = track.scrollWidth / 2
    let hover = false
    let drag: { id: number; startX: number; startY: number; last: number; moved: boolean; axis: '' | 'x' | 'y' } | null = null
    // Últimas posições do dedo/rato, para saber a velocidade ao largar.
    let samples: { t: number; x: number }[] = []
    // Velocidades em px/ms: a da inércia (vai abrandando) e a do automático (sobe e desce aos poucos).
    let momentum = 0
    let autoV = 0
    let idleUntil = 0
    let raf = 0
    let prev = 0
    let swallowClick = false

    const enabled = () => document.documentElement.classList.contains('motion-ok')
    const wrap = () => {
      if (half > 0) x = ((x % half) + half) % half
    }
    const paint = () => {
      wrap()
      track.style.transform = `translate3d(${-x}px,0,0)`
    }
    const auto = () => runningRef.current && !hover && !drag && Math.abs(momentum) < 0.03 && performance.now() >= idleUntil

    const frame = (t: number) => {
      raf = 0
      const dt = prev ? Math.min(t - prev, 64) : 0
      prev = t
      if (!drag && dt > 0) {
        // Atrito da inércia (perde ~0,4 % por ms) e o automático a aproximar-se da sua velocidade.
        momentum *= Math.pow(0.996, dt)
        if (Math.abs(momentum) < 0.005) momentum = 0
        const target = auto() ? half / seconds / 1000 : 0
        autoV += (target - autoV) * (1 - Math.exp(-dt / 450))
        const v = momentum + autoV
        if (v !== 0) {
          x += v * dt
          paint()
        }
      }
      if (runningRef.current || momentum !== 0) raf = requestAnimationFrame(frame)
      else prev = 0
    }
    const start = () => {
      if (!raf && (runningRef.current || momentum !== 0) && enabled()) {
        prev = 0
        raf = requestAnimationFrame(frame)
      }
    }
    kick.current = start

    const hold = () => {
      idleUntil = performance.now() + 900
    }

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hover = true
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hover = false
    }
    const onFocusIn = () => (hover = true)
    const onFocusOut = () => (hover = false)

    const onDown = (e: PointerEvent) => {
      if (!enabled() || (e.pointerType === 'mouse' && e.button !== 0)) return
      drag = { id: e.pointerId, startX: e.clientX, startY: e.clientY, last: e.clientX, moved: false, axis: e.pointerType === 'mouse' ? 'x' : '' }
      // Agarrar a faixa trava-a logo, mesmo a meio de uma inércia.
      momentum = 0
      autoV = 0
      samples = [{ t: e.timeStamp, x: e.clientX }]
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      if (!drag.axis) {
        const dx = Math.abs(e.clientX - drag.startX)
        const dy = Math.abs(e.clientY - drag.startY)
        if (dx < 6 && dy < 6) return
        drag.axis = dx > dy ? 'x' : 'y'
      }
      if (drag.axis === 'y') return
      if (!drag.moved && Math.abs(e.clientX - drag.startX) > 3) {
        drag.moved = true
        vp.setPointerCapture(e.pointerId)
        vp.dataset.dragging = ''
      }
      x -= e.clientX - drag.last
      drag.last = e.clientX
      samples.push({ t: e.timeStamp, x: e.clientX })
      if (samples.length > 8) samples.shift()
      paint()
    }
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      // Um arrasto não conta como clique no que estiver por baixo.
      swallowClick = drag.moved
      setTimeout(() => (swallowClick = false), 0)
      delete vp.dataset.dragging
      if (drag.moved) {
        // Velocidade dos últimos ~100 ms de movimento; se ficou parado antes de largar, não há inércia.
        const b = samples[samples.length - 1]
        const a = samples.find((s) => b.t - s.t <= 100 && s !== b) ?? samples[samples.length - 2]
        if (a && b && b.t > a.t && e.timeStamp - b.t < 90) momentum = Math.max(-4, Math.min(4, -(b.x - a.x) / (b.t - a.t)))
      }
      drag = null
      hold()
      start()
    }
    const onWheel = (e: WheelEvent) => {
      if (!enabled() || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      momentum = 0
      autoV = 0
      x += e.deltaX
      paint()
      hold()
    }
    const onClick = (e: MouseEvent) => {
      if (swallowClick) e.preventDefault()
    }
    const noDrag = (e: DragEvent) => e.preventDefault()
    const onResize = () => {
      half = track.scrollWidth / 2
      paint()
    }

    const ro = new ResizeObserver(onResize)
    ro.observe(track)
    vp.addEventListener('pointerenter', onEnter)
    vp.addEventListener('pointerleave', onLeave)
    vp.addEventListener('focusin', onFocusIn)
    vp.addEventListener('focusout', onFocusOut)
    vp.addEventListener('pointerdown', onDown)
    vp.addEventListener('pointermove', onMove)
    vp.addEventListener('pointerup', onUp)
    vp.addEventListener('pointercancel', onUp)
    vp.addEventListener('wheel', onWheel, { passive: false })
    vp.addEventListener('click', onClick, true)
    vp.addEventListener('dragstart', noDrag)
    start()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      vp.removeEventListener('pointerenter', onEnter)
      vp.removeEventListener('pointerleave', onLeave)
      vp.removeEventListener('focusin', onFocusIn)
      vp.removeEventListener('focusout', onFocusOut)
      vp.removeEventListener('pointerdown', onDown)
      vp.removeEventListener('pointermove', onMove)
      vp.removeEventListener('pointerup', onUp)
      vp.removeEventListener('pointercancel', onUp)
      vp.removeEventListener('wheel', onWheel)
      vp.removeEventListener('click', onClick, true)
      vp.removeEventListener('dragstart', noDrag)
      track.style.transform = ''
    }
  }, [viewportRef, trackRef, seconds])

  useEffect(() => {
    runningRef.current = running
    if (running) kick.current()
  }, [running])
}
