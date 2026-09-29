import Link from 'next/link'
import { COMPANY } from '@/lib/site'
import { common } from '@/content/common'
import { href, type Locale } from '@/lib/seo.config'

type Props = { locale: Locale; title: string; text: string; subject: string; cta: string }

export default function ContactBand({ locale, title, text, subject, cta }: Props) {
  const t = common[locale]
  return (
    <section aria-labelledby="contacto-titulo" className="hero-dark py-16 text-white md:py-20">
      <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
        <div>
          <h2 id="contacto-titulo" className="t-h2 max-w-[24ch]">
            {title}
          </h2>
          <p className="mt-4 max-w-prose text-lead text-white/80">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link href={`${href('contact', locale)}?assunto=${subject}`} className="btn bg-white text-tinta hover:bg-papel">
            {cta}
          </Link>
          <a href={COMPANY.whatsapp.href} className="btn-on-dark" target="_blank" rel="noopener noreferrer">
            {t.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  )
}
