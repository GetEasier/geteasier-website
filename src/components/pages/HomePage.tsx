import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import LegacyHashRedirect from '@/components/LegacyHashRedirect'
import ProductPanels from '@/components/ProductPanels'
import TeamGrid from '@/components/TeamGrid'
import CheckInHero from '@/components/checkin/CheckInHero'
import ChaosToControl from '@/components/home/ChaosToControl'
import HomeMotion from '@/components/home/HomeMotion'
import Stats from '@/components/home/Stats'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'
import Faq from '@/components/ui/Faq'
import { COMPANY } from '@/lib/site'
import { CLIENTS, home } from '@/content/home'
import { common } from '@/content/common'
import { href, type Locale } from '@/lib/seo.config'

// Início (DESIGN_NOTES.md): o check-in é o único momento orquestrado; cada secção abaixo tem o
// seu efeito ao descer, sem repetir o mesmo em todas.
export default function HomePage({ locale }: { locale: Locale }) {
  const t = home[locale]
  const c = common[locale]

  return (
    <SiteShell pageId="home" locale={locale}>
      <LegacyHashRedirect locale={locale} />
      <HomeMotion />

      {/* Hero: fundo Betão, o título em HTML estático (visível antes de qualquer JS) e o check-in ao lado */}
      <section className="overflow-x-clip bg-betao">
        <div className="wrap grid items-center gap-8 pb-12 pt-10 md:pb-20 md:pt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div>
            <h1 className="t-display max-w-[16ch] max-sm:text-[2.125rem] max-sm:[font-stretch:104%]">{t.h1}</h1>
            <p className="mt-5 max-w-[36ch] text-lead text-grafite">{t.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn-primary">
                {c.cta.project}
              </Link>
              <Link href={href('products', locale)} className="btn-secondary">
                {c.cta.products}
              </Link>
            </div>
          </div>
          <CheckInHero t={t.hero} />
        </div>
      </section>

      <section aria-labelledby="clientes-titulo" className="border-y border-caixa bg-white py-10">
        <div className="wrap">
          <h2 id="clientes-titulo" className="text-small font-semibold text-grafite">
            {t.clientsTitle}
          </h2>
          <ul className="mt-5 grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {CLIENTS.map((client) => (
              <li key={client.name} className="flex h-16 items-center">
                <Image src={client.logo} alt={client.name} width={160} height={64} data-client-logo className="max-h-14 w-auto object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Software à medida: a fotografia real da equipa abre como um portão de obra */}
      <section aria-labelledby="medida-titulo" className="overflow-x-clip py-16 md:py-24">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div data-gate>
            <Image
              src="/images/home/team-get-easier.jpeg"
              alt={t.custom.photoAlt}
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div data-gate-text>
            <h2 id="medida-titulo" className="t-h2">
              {t.custom.title}
            </h2>
            <p className="mt-4 max-w-prose text-lead text-grafite">{t.custom.text}</p>
            <ul className="mt-6 border-t border-caixa">
              {t.custom.items.map((item, i) => (
                <li key={item} className="flex items-center gap-3 border-b border-caixa py-3 font-semibold">
                  <span aria-hidden="true" className="text-azul">
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

      <section aria-labelledby="produtos-titulo" className="overflow-x-clip bg-white py-16 md:py-24">
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
          <ProductPanels locale={locale} headingLevel="h3" className="mt-10" mini />
        </div>
      </section>

      <section aria-labelledby="caos-titulo" className="overflow-x-clip bg-betao py-16 md:py-24">
        <div className="wrap">
          <ChaosToControl t={t.chaos} headingId="caos-titulo" />
        </div>
      </section>

      <section id="testimonials" aria-labelledby="testemunhos-titulo" className="py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <h2 id="testemunhos-titulo" className="t-h2">
              {t.testimonialsTitle}
            </h2>
            <div className="mt-8">
              <TestimonialCarousel labels={t.carousel} lang={locale} />
            </div>
          </div>
          <div>
            <h3 className="t-h3">{t.stats.title}</h3>
            <div className="mt-6 [&_dl]:sm:grid-cols-1">
              <Stats items={t.stats.items} note={t.stats.note} />
            </div>
          </div>
        </div>
      </section>

      <section id="team" aria-labelledby="equipa-titulo" className="overflow-hidden bg-tinta py-16 text-white md:py-24">
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
          <TeamGrid locale={locale} className="mt-10" dark parallax />
        </div>
      </section>

      <section aria-labelledby="faq-titulo" className="bg-betao py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <h2 id="faq-titulo" className="t-h2">
              {t.faqTitle}
            </h2>
            <div className="mt-8">
              <Faq items={t.faq} />
            </div>
            <p className="mt-6">
              <Link href={href('plans', locale)} className="link">
                {t.faqPlans}
              </Link>
            </p>
          </div>
          <div id="contacto" className="self-start border-t-4 border-azul bg-white p-7 lg:sticky lg:top-24">
            <h2 className="t-h3">{t.contact.title}</h2>
            <p className="mt-3 text-grafite">{t.contact.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn-primary">
                {c.cta.project}
              </Link>
              <a href={COMPANY.whatsapp.href} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                {c.cta.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>
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
