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

export function CinematicText({
  children,
  as = 'h1',
  delay = 0.2,
  stagger = 0.11,
  blur = 28,
  once = true,
  className,
}: CinematicTextProps) {
  const ref = React.useRef<HTMLElement>(null)
  const [inView, setInView] = React.useState(false)
  const words = React.useMemo(() => children.split(/\s+/).filter(Boolean), [children])
  const Tag = as as React.ElementType

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
  }, [once])

  return (
    <Tag ref={ref} className={cn('text-balance', className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block will-change-[filter,transform] motion-reduce:!transform-none motion-reduce:!filter-none motion-reduce:![transition:opacity_0.22s_ease-out]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(22px) scale(1.04)',
              filter: inView ? 'blur(0px)' : `blur(${blur}px)`,
              transition: `opacity 1.4s ${CINEMA}, transform 1.4s ${CINEMA}, filter 1.4s ${CINEMA}`,
              transitionDelay: `${delay + i * stagger}s`,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </Tag>
  )
}

CinematicText.displayName = 'CinematicText'
