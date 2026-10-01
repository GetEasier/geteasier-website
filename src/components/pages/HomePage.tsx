import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import LegacyHashRedirect from '@/components/LegacyHashRedirect'
import ProductPanels from '@/components/ProductPanels'
import TeamGrid from '@/components/TeamGrid'
import BuildHero from '@/components/home/BuildHero'
import ChaosToControl from '@/components/home/ChaosToControl'
import ClientMarquee from '@/components/home/ClientMarquee'
import TestimonialMarquee from '@/components/home/TestimonialMarquee'
import HomeMotion from '@/components/home/HomeMotion'
import Newsletter from '@/components/site/Newsletter'
import Stats from '@/components/home/Stats'
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

      {/* Newsletter logo a seguir ao hero, antes dos clientes (pedido do Alexandre; sem pop-up) */}
      <section aria-labelledby="news-inicio-titulo" className="bg-white pt-10">
        <div className="wrap">
          <Newsletter locale={locale} variant="band" id="news-inicio" />
        </div>
      </section>

      {/* Em números: logo no início, antes dos clientes */}
      <section aria-labelledby="numeros-titulo" className="bg-white pt-6">
        <div className="wrap">
          <div className="hero-brand rounded-[28px] p-7 text-white shadow-[0_30px_60px_-30px_rgba(6,8,60,.55)] md:p-10">
            <h2 id="numeros-titulo" className="text-small font-semibold uppercase tracking-[0.08em] text-ciano">
              {t.stats.title}
            </h2>
            <div className="mt-5">
              <Stats items={t.stats.items} note={t.stats.note} dark />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="clientes-titulo" className="overflow-x-clip bg-white pb-6 pt-12">
        <ClientMarquee title={t.clientsTitle} />
      </section>

      {/* Software à medida: a fotografia real da equipa abre como um portão de obra; ao lado, os três tipos de trabalho em cartões compactos */}
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
              <ul className="mt-7 grid gap-3">
                {t.custom.items.map((item, i) => (
                  <li key={item.title} className="medida-card" data-kind={i}>
                    <span aria-hidden="true" className="medida-icon">
                      {ICONS[i]}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-1 text-small text-grafite">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href={href('customSoftware', locale)} className="btn-primary mt-8">
                {t.custom.link}
              </Link>
            </div>
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

      {/* Testemunhos: cartões de cor numa faixa que anda na horizontal */}
      <section id="testimonials" aria-labelledby="testemunhos-titulo" className="overflow-x-clip bg-white py-16 md:py-24">
        <div className="wrap">
          <h2 id="testemunhos-titulo" className="t-h2">
            {t.testimonialsTitle}
          </h2>
        </div>
        <div className="mt-10">
          <TestimonialMarquee />
        </div>
        <div className="wrap">
          {locale === 'en' && <p className="mt-4 text-small text-grafite">Quoted in the original Portuguese.</p>}
        </div>
      </section>

      {/* Equipa: fundo da marca com grelha, factos em pílulas e cartões que reagem ao rato */}
      <section id="team" aria-labelledby="equipa-titulo" className="team-section hero-brand overflow-hidden py-16 text-white md:py-24">
        <div className="wrap relative">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="equipa-titulo" className="t-h2">
                {t.teamTitle}
              </h2>
              <p className="mt-3 text-lead text-white/80">{t.teamText}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {t.teamFacts.map((f, i) => (
                  <li key={f} className="team-fact">
                    <span aria-hidden="true">{FACT_ICONS[i]}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={href('about', locale)} className="btn-on-dark">
              {t.teamLink}
            </Link>
          </div>
          <TeamGrid locale={locale} className="mt-12" dark parallax lively />
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
            <ul className="mt-6 space-y-3 border-t border-white/15 pt-6">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="contact-ico">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 13.5l.9-2.7A5.5 5.5 0 1 1 5.6 12.9z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-small text-white/60">{t.contact.whatsapp}</span>
                  <a href={COMPANY.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-ciano">
                    {COMPANY.whatsapp.display}
                  </a>
                </span>
              </li>
            </ul>
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


const FACT_ICONS = [
  <svg key="spark" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 1.5L3.5 9H8l-1 5.5L12.5 7H8z" />
  </svg>,
  <svg key="team" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="5.5" r="2.3" />
    <path d="M1.8 13.5c.6-2.3 2.2-3.5 4.2-3.5s3.6 1.2 4.2 3.5M10.5 3.4a2.3 2.3 0 0 1 0 4.3M12 10.2c1.1.5 1.9 1.6 2.2 3.3" />
  </svg>,
  <svg key="cycle" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.5 8A5.5 5.5 0 0 1 3.6 11.3M2.5 8a5.5 5.5 0 0 1 9.9-3.3" />
    <path d="M12.6 2v2.8H9.8M3.4 14v-2.8h2.8" />
  </svg>,
]
