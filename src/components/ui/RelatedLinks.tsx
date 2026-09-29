import Link from 'next/link'
import { href, type Locale, type PageId } from '@/lib/seo.config'

export default function RelatedLinks({ title, links, locale }: { title: string; links: { id: PageId; text: string }[]; locale: Locale }) {
  return (
    <nav aria-labelledby="relacionadas" className="wrap border-t border-linha py-12">
      <h2 id="relacionadas" className="t-h3">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.id + l.text}>
            <Link href={href(l.id, locale)} className="link">
              {l.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
