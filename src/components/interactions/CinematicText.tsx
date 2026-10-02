'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

// Cinematic Text da Planes (https://useplanes.com/components/cinematic-text): cada palavra desce
// de um desfoque forte e assenta, como uma câmara a acertar o foco. O original usa a biblioteca
// motion; esta versão faz o mesmo com transições CSS (mesmos tempos e a mesma curva, que é o
// expo.out do site) para não juntar uma dependência só por um título.
// Com "reduzir movimento" não há desfoque nem deslocação: a linha aparece num fade de 0,22 s.

export type CinematicTextProps = {
  children: string
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'
  delay?: number
  stagger?: number
  blur?: number
  once?: boolean
  className?: string
}

const CINEMA = 'cubic-bezier(0.16, 1, 0.3, 1)'
// O original da Planes usa 1,4 s por palavra e 0,11 s entre palavras; o Alexandre pediu mais rápido.
const DURATION = 1

function useInViewOnce(ref: React.RefObject<HTMLElement | null>, once: boolean) {
  const [inView, setInView] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once])
  return inView
}

const WORD_CLASS =
  'inline-block will-change-[filter,transform] motion-reduce:!transform-none motion-reduce:!filter-none motion-reduce:![transition:opacity_0.22s_ease-out]'

function cinemaStyle(inView: boolean, blur: number, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(22px) scale(1.04)',
    filter: inView ? 'blur(0px)' : `blur(${blur}px)`,
    transition: `opacity ${DURATION}s ${CINEMA}, transform ${DURATION}s ${CINEMA}, filter ${DURATION}s ${CINEMA}`,
    transitionDelay: `${delay}s`,
  }
}

export function CinematicText({
  children,
  as = 'h1',
  delay = 0.1,
  stagger = 0.07,
  blur = 28,
  once = true,
  className,
}: CinematicTextProps) {
  const ref = React.useRef<HTMLElement>(null)
  const inView = useInViewOnce(ref, once)
  const words = React.useMemo(() => children.split(/\s+/).filter(Boolean), [children])
  const Tag = as as React.ElementType

  return (
    <Tag ref={ref} className={cn('text-balance', className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={WORD_CLASS} style={cinemaStyle(inView, blur, delay + i * stagger)}>
            {word}
            {i < words.length - 1 ? '\u00a0' : ''}
          </span>
        ))}
      </span>
    </Tag>
  )
}

CinematicText.displayName = 'CinematicText'

// O mesmo efeito para elementos que não são texto simples (os botões do hero): cada filho entra
// como uma palavra, com o mesmo desfoque, a mesma curva e o seu próprio atraso.
export function CinematicGroup({
  children,
  delay = 0.1,
  stagger = 0.07,
  blur = 28,
  once = true,
  className,
}: Omit<CinematicTextProps, 'children' | 'as'> & { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInViewOnce(ref, once)
  return (
    <div ref={ref} className={className}>
      {React.Children.toArray(children).map((child, i) => (
        <span key={i} className={WORD_CLASS} style={cinemaStyle(inView, blur, delay + i * stagger)}>
          {child}
        </span>
      ))}
    </div>
  )
}
