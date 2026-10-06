type Item = { term: string; desc: string }

// Ficha técnica: termo à esquerda, descrição à direita, filetes entre linhas.
export default function SpecList({ items, numbered }: { items: Item[]; numbered?: boolean }) {
  if (numbered) {
    return (
      <ol className="spec">
        {items.map((item, i) => (
          <li key={item.term}>
            <p className="spec-term flex gap-3">
              <span className="t-data pt-1 text-grafite" aria-hidden="true">
                {i + 1}
              </span>
              {item.term}
            </p>
            <p className="spec-desc">{item.desc}</p>
          </li>
        ))}
      </ol>
    )
  }
  return (
    <dl className="spec">
      {items.map((item) => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.desc}</dd>
        </div>
      ))}
    </dl>
  )
}
