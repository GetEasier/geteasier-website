import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import LegacyHashRedirect from '@/components/LegacyHashRedirect'
import ProductPanels from '@/components/ProductPanels'
import TeamGrid from '@/components/TeamGrid'
import BuildHero from '@/components/home/BuildHero'
import ChaosToControl from '@/components/home/ChaosToControl'
import ClientMarquee from '@/components/home/ClientMarquee'
import HomeMotion from '@/components/home/HomeMotion'
import Stats from '@/components/home/Stats'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'
import Faq from '@/components/ui/Faq'
import { COMPANY } from '@/lib/site'
import { home } from '@/content/home'
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

      {/* Hero: fundo tinta com a luz da marca, o título em HTML estático (visível antes de qualquer JS) e, ao lado, como fazemos software à medida */}
      <section className="hero-brand overflow-x-clip text-white">
        <div className="wrap grid items-center gap-8 pb-12 pt-10 md:pb-20 md:pt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div>
            <h1 className="t-display max-w-[16ch] max-sm:text-[2.125rem]">{t.h1}</h1>
            <p className="mt-5 max-w-[36ch] text-lead text-white/80">{t.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn bg-ciano text-tinta hover:bg-white">
                {c.cta.project}
              </Link>
              <Link href={href('products', locale)} className="btn-on-dark">
                {c.cta.products}
              </Link>
            </div>
          </div>
          <BuildHero t={t.build} />
        </div>
      </section>

      <section aria-labelledby="clientes-titulo" className="overflow-x-clip bg-white pb-6 pt-12">
        <ClientMarquee title={t.clientsTitle} labels={t.clientsPause} />
      </section>

      {/* Software à medida: a fotografia real da equipa abre como um portão de obra e, por baixo, os três tipos de trabalho em cartões */}
      <section aria-labelledby="medida-titulo" className="overflow-x-clip py-16 md:py-24">
        <div className="wrap">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div data-gate>
              <Image
                src="/images/home/team-get-easier.jpeg"
                alt={t.custom.photoAlt}
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[4/3] w-full rounded-[20px] object-cover"
              />
            </div>
            <div data-gate-text>
              <h2 id="medida-titulo" className="t-h2">
                {t.custom.title}
              </h2>
              <p className="mt-4 max-w-prose text-lead text-grafite">{t.custom.text}</p>
              <Link href={href('customSoftware', locale)} className="btn-primary mt-8">
                {t.custom.link}
              </Link>
            </div>
          </div>
          <ul className="medida-cards mt-10 grid gap-5 md:grid-cols-3">
            {t.custom.items.map((item, i) => (
              <li key={item.title} className="medida-card group" data-kind={i}>
                <span aria-hidden="true" className="medida-icon">
                  {ICONS[i]}
                </span>
                <h3 className="mt-5 text-[1.1875rem] font-semibold leading-snug">{item.title}</h3>
                <p className="mt-2 text-grafite">{item.text}</p>
                <div aria-hidden="true" className="medida-mini">
                  {MINIS[i]}
                </div>
              </li>
            ))}
          </ul>
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

      <section id="testimonials" aria-labelledby="testemunhos-titulo" className="bg-white py-16 md:py-24">
        <div className="wrap">
          <h2 id="testemunhos-titulo" className="t-h2">
            {t.testimonialsTitle}
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
            <div className="hero-brand rounded-[28px] p-7 text-white shadow-[0_30px_60px_-30px_rgba(6,8,60,.55)] md:p-12">
              <TestimonialCarousel labels={t.carousel} lang={locale} dark />
            </div>
            <div>
              <h3 className="sr-only">{t.stats.title}</h3>
              <Stats items={t.stats.items} note={t.stats.note} tiles />
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
          <div id="contacto" className="hero-brand self-start rounded-[28px] p-8 text-white shadow-[0_30px_60px_-30px_rgba(6,8,60,.55)] lg:sticky lg:top-24">
            <h2 className="t-h3">{t.contact.title}</h2>
            <p className="mt-3 text-white/80">{t.contact.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn bg-ciano text-tinta hover:bg-white">
                {c.cta.project}
              </Link>
              <a href={COMPANY.whatsapp.href} className="btn-on-dark" target="_blank" rel="noopener noreferrer">
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
  <svg key="web" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 8h18M8 21h8" strokeLinecap="round" />
  </svg>,
  <svg key="app" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" strokeLinecap="round" />
  </svg>,
  <svg key="int" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 7h9l-3-3M16 17H7l3 3" />
  </svg>,
]

// Pequena ilustração no fundo de cada cartão de software à medida (decorativa).
const MINIS = [
  <span key="web" className="mini-web">
    {[0.45, 0.7, 0.55, 0.9, 0.65, 0.8].map((h, i) => (
      <i key={i} style={{ ['--h' as string]: h, ['--j' as string]: i }} />
    ))}
  </span>,
  <span key="app" className="mini-app">
    <span className="mini-app-phone">
      <i />
      <i />
      <b />
    </span>
    <span className="mini-app-note">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
      iOS · Android
    </span>
  </span>,
  <span key="int" className="mini-int">
    <span>ERP</span>
    <i />
    <span className="is-app">App</span>
    <i />
    <span>€</span>
  </span>,
]
