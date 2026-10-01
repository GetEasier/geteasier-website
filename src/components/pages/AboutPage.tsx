import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import InstagramFeed from '@/components/InstagramFeed'
import TeamGrid from '@/components/TeamGrid'
import ClientMarquee from '@/components/home/ClientMarquee'
import { about } from '@/content/about'
import { home } from '@/content/home'
import { common } from '@/content/common'
import { products } from '@/content/products'
import { COMPANY } from '@/lib/site'
import { href, PRODUCT_IDS, type Locale } from '@/lib/seo.config'

// Sobre: hero escuro da marca com a fotografia da equipa, as duas frentes em cartões de cor, a equipa
// com os mesmos cartões do início, clientes, e os dados da empresa e do financiamento em cartões compactos.
export default function AboutPage({ locale }: { locale: Locale }) {
  const t = about[locale]
  const h = home[locale]
  const c = common[locale]
  const p = products[locale].items
  const a = COMPANY.address
  const fullAddress = `${a.street}, ${a.postalCode} ${a.locality}`
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${fullAddress}, Portugal`)}`

  return (
    <SiteShell pageId="about" locale={locale}>
      <section className="team-section hero-brand overflow-x-clip text-white">
        <div className="wrap relative grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14">
          <div>
            <div className="[&_a:hover]:text-white [&_a]:decoration-white/30 [&_nav]:text-white/60 [&_[aria-current]]:text-white">
              <Breadcrumbs pageId="about" locale={locale} />
            </div>
            <h1 className="t-h1 mt-10 max-w-[18ch]">{t.h1}</h1>
            <p className="mt-5 max-w-[40ch] text-lead text-white/80">{t.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {h.teamFacts.map((f, i) => (
                <li key={f} className="team-fact">
                  <span aria-hidden="true">{FACT_ICONS[i]}</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn bg-ciano text-tinta hover:bg-white">
                {c.cta.project}
              </Link>
              <a href="#equipa" className="btn-on-dark">
                {t.teamTitle}
              </a>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/home/team-get-easier.jpeg"
              alt={h.custom.photoAlt}
              width={1200}
              height={800}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)] ring-1 ring-white/10"
            />
            <span className="absolute -bottom-4 left-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-small font-semibold text-tinta shadow-lg">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 text-azul" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 14.5s5-4.3 5-8.2A5 5 0 0 0 3 6.3c0 3.9 5 8.2 5 8.2z" />
                <circle cx="8" cy="6.3" r="1.8" />
              </svg>
              {t.place}
            </span>
          </div>
        </div>
      </section>

      {/* As duas frentes: um cartão azul da marca e um branco com os quatro produtos */}
      <section aria-labelledby="frentes-titulo" className="py-16 md:py-24">
        <div className="wrap">
          <h2 id="frentes-titulo" className="t-h2">
            {t.frontsTitle}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Link
              href={href('customSoftware', locale)}
              className="group flex flex-col rounded-[24px] bg-azul p-7 text-white shadow-[0_24px_48px_-28px_rgba(27,84,184,.8)] transition-transform hover:-translate-y-1"
            >
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
                </svg>
              </span>
              <h3 className="t-h3 mt-5">{t.fronts.custom.title}</h3>
              <p className="mt-2 text-white/85">{t.fronts.custom.text}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-ciano">
                {t.fronts.custom.link}
                <Arrow />
              </span>
            </Link>
            <Link
              href={href('products', locale)}
              className="group flex flex-col rounded-[24px] bg-white p-7 shadow-[0_24px_48px_-30px_rgba(6,8,60,.35)] ring-1 ring-linha transition-transform hover:-translate-y-1"
            >
              <ul className="flex gap-2" aria-hidden="true">
                {PRODUCT_IDS.map((id) => (
                  <li key={id}>
                    <Image src={p[id].icon} alt="" width={44} height={44} className="h-11 w-11 rounded-2xl object-contain" />
                  </li>
                ))}
              </ul>
              <h3 className="t-h3 mt-5">{t.fronts.products.title}</h3>
              <p className="mt-2 text-grafite">{t.fronts.products.text}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-azul">
                {t.fronts.products.link}
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Equipa: os mesmos cartões do início (inclinação e luz com o rato) */}
      <section id="equipa" aria-labelledby="equipa-titulo" className="team-section hero-brand overflow-hidden py-16 text-white md:py-24">
        <div className="wrap relative">
          <h2 id="equipa-titulo" className="t-h2">
            {t.teamTitle}
          </h2>
          <p className="mt-3 max-w-[48ch] text-lead text-white/80">{t.teamText}</p>
          <TeamGrid locale={locale} className="mt-10" dark parallax lively />
        </div>
      </section>

      <section aria-labelledby="clientes-titulo" className="overflow-x-clip bg-white py-12">
        <ClientMarquee title={h.clientsTitle} labels={h.clientsPause} />
      </section>

      {/* Empresa e financiamento: dois cartões compactos lado a lado */}
      <section aria-label={t.companyTitle} className="py-16 md:py-24">
        <div className="wrap grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="rounded-[24px] bg-white p-7 shadow-[0_24px_48px_-30px_rgba(6,8,60,.35)] ring-1 ring-linha">
            <h2 className="t-h3">{t.companyTitle}</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Fact label={t.company.legalName} icon={ICON_BUILDING}>
                {COMPANY.name}, {COMPANY.legalName}
              </Fact>
              <Fact label={t.company.vat} icon={ICON_ID}>
                <span className="t-data text-base">{COMPANY.vatId}</span>
              </Fact>
              <Fact label={t.company.address} icon={ICON_PIN} wide>
                {fullAddress}, {a.region}
                <a href={mapHref} target="_blank" rel="noopener noreferrer" className="link ml-2 whitespace-nowrap">
                  {t.mapLink}
                </a>
              </Fact>
            </dl>
          </div>
          <div id="financiamento" className="flex flex-col rounded-[24px] bg-white p-7 shadow-[0_24px_48px_-30px_rgba(6,8,60,.35)] ring-1 ring-linha">
            <h2 className="t-h3">{t.fundingTitle}</h2>
            <div className="mt-5 rounded-2xl bg-tinta px-5 py-4">
              <Image src={COMPANY.funding.logo} alt="PRR, República Portuguesa, NextGenerationEU" width={600} height={87} className="h-auto w-full max-w-[22rem]" />
            </div>
            <p className="mt-4 text-grafite">{t.fundingText}</p>
            <a href={COMPANY.funding.pdf} download className="btn mt-6 self-start border border-linha bg-white text-tinta hover:border-azul hover:text-azul">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13.5h10" />
              </svg>
              {t.fundingLink}
            </a>
          </div>
        </div>
      </section>

      <InstagramFeed title={t.instagramTitle} linkText={t.instagramLink} href={COMPANY.socials[1].href} />

      {/* Fecho: cartão escuro da marca com contacto e redes sociais */}
      <section aria-labelledby="contacto-titulo" className="pb-16 md:pb-24">
        <div className="wrap">
          <div className="hero-brand grid gap-8 rounded-[28px] p-8 text-white shadow-[0_30px_60px_-30px_rgba(6,8,60,.55)] md:p-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
            <div>
              <h2 id="contacto-titulo" className="t-h2">
                {t.contactTitle}
              </h2>
              <p className="mt-3 max-w-[44ch] text-lead text-white/80">{t.contactText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn bg-ciano text-tinta hover:bg-white">
                  {c.cta.project}
                </Link>
                <a href={COMPANY.whatsapp.href} className="btn-on-dark" target="_blank" rel="noopener noreferrer">
                  {c.cta.whatsapp}
                </a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <p className="text-small font-semibold uppercase tracking-[0.08em] text-white/60">{t.followTitle}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {COMPANY.socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="team-fact hover:bg-white/10">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

function Fact({ label, icon, wide, children }: { label: string; icon: React.ReactNode; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl bg-betao p-4 ${wide ? 'sm:col-span-2' : ''}`}>
      <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-azul/10 text-azul">
        {icon}
      </span>
      <div>
        <dt className="text-small text-grafite">{label}</dt>
        <dd className="font-semibold">{children}</dd>
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

const svg = (d: React.ReactNode) => (
  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
)
const ICON_BUILDING = svg(<path d="M3 14V3.5h6V14M9 6.5h4V14M2 14h12M5 6h2M5 8.5h2M5 11h2M11 9h0M11 11.5h0" />)
const ICON_ID = svg(
  <>
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
    <path d="M5 7h3M5 9.5h6" />
  </>,
)
const ICON_PIN = svg(
  <>
    <path d="M8 14.5s5-4.3 5-8.2A5 5 0 0 0 3 6.3c0 3.9 5 8.2 5 8.2z" />
    <circle cx="8" cy="6.3" r="1.8" />
  </>,
)

const FACT_ICONS = [
  svg(<path d="M9 1.5L3.5 9H8l-1 5.5L12.5 7H8z" />),
  svg(
    <>
      <circle cx="6" cy="5.5" r="2.3" />
      <path d="M1.8 13.5c.6-2.3 2.2-3.5 4.2-3.5s3.6 1.2 4.2 3.5M10.5 3.4a2.3 2.3 0 0 1 0 4.3M12 10.2c1.1.5 1.9 1.6 2.2 3.3" />
    </>,
  ),
  svg(
    <>
      <path d="M13.5 8A5.5 5.5 0 0 1 3.6 11.3M2.5 8a5.5 5.5 0 0 1 9.9-3.3" />
      <path d="M12.6 2v2.8H9.8M3.4 14v-2.8h2.8" />
    </>,
  ),
]
