import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import HeroShowcase from '@/components/HeroShowcase'
import ContactBand from '@/components/ui/ContactBand'
import Testimonials from '@/components/Testimonials'
import LegacyHashRedirect from '@/components/LegacyHashRedirect'
import StoreBadges from '@/components/StoreBadges'
import ProductPanels from '@/components/ProductPanels'
import TeamGrid from '@/components/TeamGrid'
import { CLIENTS, home } from '@/content/home'
import { common } from '@/content/common'
import { href, type Locale } from '@/lib/seo.config'

export default function HomePage({ locale }: { locale: Locale }) {
  const t = home[locale]
  const c = common[locale]

  return (
    <SiteShell pageId="home" locale={locale}>
      <LegacyHashRedirect locale={locale} />

      {/* Início: fundo tinta com a luz azul e ciano do logótipo */}
      <section className="hero-dark relative overflow-hidden text-white">
        <div className="wrap relative grid items-center gap-12 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h1 className="t-h1 max-w-[18ch] lg:text-[3.4rem] lg:leading-[1.05]">{t.h1}</h1>
            <p className="mt-6 max-w-[34ch] text-lead text-white/80">{t.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn bg-ciano text-tinta hover:bg-white">
                {c.cta.project}
              </Link>
              <Link href={href('products', locale)} className="btn-on-dark">
                {c.cta.products}
              </Link>
            </div>
            <StoreBadges locale={locale} className="mt-8" />
          </div>
          <HeroShowcase locale={locale} />
        </div>
      </section>

      <section aria-labelledby="clientes-titulo" className="bg-white py-10">
        <div className="wrap">
          <h2 id="clientes-titulo" className="text-center text-small font-semibold text-grafite">
            {t.clientsTitle}
          </h2>
          <ul className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-10 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {CLIENTS.map((client) => (
              <li key={client.name} className="flex h-16 items-center">
                <Image src={client.logo} alt={client.name} width={160} height={64} className="reveal-logo max-h-14 w-auto object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Software à medida, com a fotografia real da equipa */}
      <section aria-labelledby="medida-titulo" className="py-16 md:py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal-photo relative">
            <Image
              src="/images/home/team-get-easier.jpeg"
              alt={t.custom.photoAlt}
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-frame object-cover shadow-[0_24px_60px_-24px_rgba(6,8,60,.45)]"
            />
            <span aria-hidden="true" className="absolute -bottom-4 -right-4 -z-10 h-2/3 w-2/3 rounded-frame bg-gradient-to-br from-azul to-ciano" />
          </div>
          <div>
            <h2 id="medida-titulo" className="t-h2">
              {t.custom.title}
            </h2>
            <p className="mt-4 max-w-prose text-lead text-grafite">{t.custom.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {t.custom.items.map((item, i) => (
                <li key={item} className="flex items-center gap-3 rounded-frame bg-white p-4 font-semibold shadow-[0_1px_0_#C9D1DE]">
                  <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-ctl bg-gradient-to-br from-azul to-ciano text-white">
                    {ICONS[i]}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href={href('customSoftware', locale)} className="btn-primary mt-8">
              {t.custom.link}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="produtos-titulo" className="bg-white py-16 md:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="produtos-titulo" className="t-h2">
                {t.products.title}
              </h2>
              <p className="mt-3 text-lead text-grafite">{t.products.text}</p>
            </div>
            <Link href={href('products', locale)} className="link">
              {t.products.link}
            </Link>
          </div>
          <ProductPanels locale={locale} headingLevel="h3" className="mt-10" />
        </div>
      </section>

      <section id="testimonials" aria-labelledby="testemunhos-titulo" className="py-16 md:py-24">
        <div className="wrap">
          <h2 id="testemunhos-titulo" className="t-h2">
            {t.testimonialsTitle}
          </h2>
          <Testimonials locale={locale} />
        </div>
      </section>

      <section id="team" aria-labelledby="equipa-titulo" className="hero-dark py-16 text-white md:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="equipa-titulo" className="t-h2">
                {t.teamTitle}
              </h2>
              <p className="mt-3 text-lead text-white/80">{t.teamText}</p>
            </div>
            <Link href={href('about', locale)} className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              {t.teamLink}
            </Link>
          </div>
          <TeamGrid locale={locale} className="mt-10" dark />
        </div>
      </section>

      <ContactBand locale={locale} title={t.contact.title} text={t.contact.text} subject="projeto" cta={c.cta.project} />
    </SiteShell>
  )
}

const ICONS = [
  <svg key="web" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 8h18M8 21h8" strokeLinecap="round" />
  </svg>,
  <svg key="app" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" strokeLinecap="round" />
  </svg>,
  <svg key="int" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 7h9l-3-3M16 17H7l3 3" />
  </svg>,
]
