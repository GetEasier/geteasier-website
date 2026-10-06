'use client'

import { useEffect, useState, type RefObject } from 'react'

// Estado de reprodução de tudo o que se mexe sozinho: só corre com a peça no ecrã, com a aba
// visível, sem "reduzir movimento" e enquanto a pessoa não carregar em pausa (WCAG 2.2.2).
export function usePlayback(ref: RefObject<Element | null>, { margin = '0px' }: { margin?: string } = {}) {
  const [visible, setVisible] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)
  const [reduced, setReduced] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => setReduced(mq.matches)
    onMq()
    mq.addEventListener('change', onMq)
    const onVis = () => setTabVisible(document.visibilityState === 'visible')
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      mq.removeEventListener('change', onMq)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin])

  return {
    /** true quando pode animar agora */
    running: visible && tabVisible && !reduced && !paused,
    visible,
    reduced,
    paused,
    setPaused,
  }
}

/** Uma vez só: fica true quando o elemento entra no ecrã pela primeira vez. */
export function useSeenOnce(ref: RefObject<Element | null>, threshold = 0.35) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, seen, threshold])
  return seen
}
