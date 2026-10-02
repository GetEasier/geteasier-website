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
      <ul className={items.length > 1 ? 'grid gap-6 lg:grid-cols-3' : 'max-w-3xl'}>
        {items.map((t) => (
          <li key={t.name} className="reveal-panel">
            <figure className="flex h-full flex-col rounded-frame bg-white p-7 shadow-[0_18px_40px_-28px_rgba(6,8,60,.5)]">
              <svg viewBox="0 0 32 24" className="h-6 w-8 text-ciano" fill="currentColor" aria-hidden="true">
                <path d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12z" />
              </svg>
              <blockquote lang="pt-PT" className="mt-4 text-body">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-small text-grafite">{t.company}</span>
                </span>
                <Image src={t.logo} alt="" width={96} height={40} className="h-8 w-auto max-w-[84px] object-contain" />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {note && <p className="mt-8 text-small text-grafite">{note}</p>}
    </div>
  )
}
