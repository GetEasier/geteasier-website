import Image from 'next/image'
import { TESTIMONIALS } from '@/content/home'
import type { Locale } from '@/lib/seo.config'

type Item = (typeof TESTIMONIALS)[number]

// Citações originais, em português. Na versão inglesa ficam marcadas com lang="pt-PT".
export default function Testimonials({ locale, only }: { locale: Locale; only?: Item['name'] }) {
  const items = only ? TESTIMONIALS.filter((t) => t.name === only) : TESTIMONIALS
  const note = locale === 'en' ? 'Quoted in the original Portuguese.' : null
  return (
    <div className="mt-10">
      <ul className={items.length > 1 ? 'grid gap-12 lg:grid-cols-3 lg:gap-10' : ''}>
        {items.map((t) => (
          <li key={t.name}>
            <figure className="border-l-2 border-tinta pl-6">
              <blockquote lang="pt-PT" className="max-w-prose text-body">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Image src={t.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover grayscale" />
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-small text-grafite">{t.company}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {note && <p className="mt-8 text-small text-grafite">{note}</p>}
    </div>
  )
}
