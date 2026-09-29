import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import HeroPlanta from '@/components/HeroPlanta'
import ContactBand from '@/components/ui/ContactBand'
import Testimonials from '@/components/Testimonials'
import LegacyHashRedirect from '@/components/LegacyHashRedirect'
import { CLIENTS, home } from '@/content/home'
import { common } from '@/content/common'
import { products } from '@/content/products'
import { PRODUCT_IDS, href, type Locale } from '@/lib/seo.config'

const PLANTA = {
  pt: { gate: 'portaria', tablet: 'tablet', server: 'servidor · API', siteA: 'Rua das Flores', siteB: 'Av. Central', recordName: 'Rui M.', recordSite: 'Rua das Flores' },
  en: { gate: 'site gate', tablet: 'tablet', server: 'server · API', siteA: 'Rua das Flores', siteB: 'Av. Central', recordName: 'Rui M.', recordSite: 'Rua das Flores' },
}

export default function HomePage({ locale }: { locale: Locale }) {
  const t = home[locale]
  const c = common[locale]
  const p = products[locale]

  return (
    <SiteShell pageId="home" locale={locale}>
      <LegacyHashRedirect locale={locale} />

      <section className="wrap grid items-center gap-12 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
        <div>
          <h1 className="t-display max-w-[16ch]">{t.h1}</h1>
          <p className="mt-6 max-w-prose text-lead text-grafite">{t.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn-primary">
              {c.cta.project}
            </Link>
            <Link href={href('products', locale)} className="btn-secondary">
              {c.cta.products}
            </Link>
          </div>
        </div>
        <HeroPlanta labels={PLANTA[locale]} caption={t.heroFigure} />
      </section>

      <section aria-label={`${t.custom.title}, ${t.products.title}`} className="border-t border-linha">
        <div className="wrap grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="border-b border-linha py-14 lg:border-b-0 lg:border-r lg:py-20 lg:pr-12">
            <h2 className="t-h2">{t.custom.title}</h2>
            <p className="mt-4 max-w-prose text-lead text-grafite">{t.custom.text}</p>
            <ul className="mt-6 max-w-prose space-y-3">
              {t.custom.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-tinta" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href={href('customSoftware', locale)} className="btn-primary mt-8">
              {t.custom.link}
            </Link>
          </div>
          <div className="py-14 lg:py-20 lg:pl-12">
            <h2 className="t-h2">{t.products.title}</h2>
            <p className="mt-4 max-w-prose text-grafite">{t.products.text}</p>
            <ul className="mt-6 border-t border-linha">
              {PRODUCT_IDS.map((id) => (
                <li key={id} className="border-b border-linha">
                  <Link href={href(id, locale)} className="group flex items-center gap-4 py-4">
                    <Image src={p.items[id].icon} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
                    <span>
                      <span className="block font-semibold group-hover:text-azul group-hover:underline">{p.items[id].name}</span>
                      <span className="block text-small text-grafite">{p.items[id].short}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={href('products', locale)} className="link mt-6 inline-block">
              {t.products.link}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="clientes-titulo" className="border-t border-linha py-12">
        <div className="wrap">
          <h2 id="clientes-titulo" className="text-small font-semibold text-grafite">
            {t.clientsTitle}
          </h2>
          <ul className="mt-6 grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {CLIENTS.map((client) => (
              <li key={client.name} className="flex h-16 items-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={64}
                  className="max-h-14 w-auto object-contain opacity-80 mix-blend-multiply grayscale"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="dia-na-obra" aria-labelledby="dia-titulo" className="border-t border-linha py-16 md:py-24">
        <div className="wrap">
          <div className="ruled">
            <h2 id="dia-titulo" className="t-h2 max-w-[26ch]">
              {t.day.title}
            </h2>
            <p className="mt-4 max-w-prose text-grafite">{t.day.intro}</p>
          </div>
          <ol className="mt-10 border-t border-linha">
            {t.day.events.map((e) => (
              <li key={e.time} className="grid gap-2 border-b border-linha py-5 md:grid-cols-[8rem_minmax(0,1fr)]">
                <time className="t-data text-base font-medium">{e.time}</time>
                <p className="max-w-prose">{e.text}</p>
              </li>
            ))}
          </ol>
          <Link href={href('constructionEasier', locale)} className="link mt-8 inline-block">
            {t.day.link}
          </Link>
        </div>
      </section>

      <section id="testimonials" aria-labelledby="testemunhos-titulo" className="border-t border-linha py-16 md:py-24">
        <div className="wrap">
          <h2 id="testemunhos-titulo" className="t-h2">
            {t.testimonialsTitle}
          </h2>
          <Testimonials locale={locale} />
        </div>
      </section>

      <ContactBand locale={locale} title={t.contact.title} text={t.contact.text} subject="projeto" cta={c.cta.project} />
    </SiteShell>
  )
}
