import { Fragment } from 'react'

// Texto que se revela palavra a palavra, de desfocado para nítido (à maneira do "blur reveal text"
// da SpaceUI, feito aqui em CSS para não acrescentar dependências). O texto está todo no HTML;
// sem JS ou com "reduzir movimento" aparece logo nítido (só anima com .motion-ok).
export default function BlurReveal({ text, delay = 0, step = 70 }: { text: string; delay?: number; step?: number }) {
  return (
    <>
      {text.split(' ').map((word, i, all) => (
        <Fragment key={i}>
          <span className="blur-word" style={{ '--d': `${delay + i * step}ms` } as React.CSSProperties}>
            {word}
          </span>
          {i < all.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </>
  )
}
