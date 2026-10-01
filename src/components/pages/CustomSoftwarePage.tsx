import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import HeroPlanta from '@/components/HeroPlanta'
import ContactBand from '@/components/ui/ContactBand'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import { ARROW, BUILD_ICONS, PROCESS_ICONS, PROOF_ICONS } from '@/components/custom/icons'
import '@/components/custom/custom-software.css'
import { customSoftware } from '@/content/custom-software'
import { common } from '@/content/common'
import { CLIENTS } from '@/content/home'
import { products } from '@/content/products'
import { href, type Locale } from '@/lib/seo.config'

// Software à medida (revisão de 01/10): hero da marca como o início, cartões compactos com cor e ícones,
// etapas sem números, caso de estudo em cartões e tecnologia em azulejos. Pouco texto, uma linha por cartão.
export default function CustomSoftwarePage({ locale }: { locale: Locale }) {
  const t = customSoftware[locale]
  const c = common[locale]
  const p = products[locale]
  const contact = `${href('contact', locale)}?assunto=projeto`

  return (
    <SiteShell pageId="customSoftware" locale={locale}>
      <section className="cs-hero hero-brand overflow-x-clip text-white">
        <div className="wrap pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs pageId="customSoftware" locale={locale} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
            <div>
              <h1 className="t-h1 max-w-[20ch]">{t.h1}</h1>
              <p className="mt-6 max-w-[44ch] text-lead text-white/80">{t.lead[0]}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={contact} className="btn bg-ciano text-tinta hover:bg-white">
                  {c.cta.project}
                </Link>
                <a href="#caso-de-estudo" className="btn-on-dark">
                  {t.heroCase}
                </a>
              </div>
            </div>
            <div className="cs-sheet">
              <HeroPlanta locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="clientes-titulo" className="bg-white py-10">
        <div className="wrap">
          <h2 id="clientes-titulo" className="text-center text-small font-semibold uppercase tracking-[0.08em] text-grafite">
            {t.clientsTitle}
          </h2>
          <ul className="cs-clients mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
            {CLIENTS.map((client) => (
              <li key={client.name} className="clientes-tile">
                <Image src={client.logo} alt={client.name} width={160} height={64} className="max-h-14 w-auto object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="o-que-construimos" aria-labelledby="o-que-construimos-titulo" className="py-16 md:py-24">
        <div className="wrap">
          <h2 id="o-que-construimos-titulo" className="t-h2">
            {t.buildTitle}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.build.map((item, i) => (
              <li key={item.term} className="reveal-panel cs-card" data-c={i}>
                <span className="cs-icon">{BUILD_ICONS[i]}</span>
                <div className="relative min-w-0">
                  <h3 className="font-semibold leading-snug">{item.term}</h3>
                  <p className="mt-1 text-small text-grafite">{item.desc}</p>
                </div>
              </li>
            ))}
            <li className="reveal-panel">
              <Link href={contact} className="cs-card cs-card-cta h-full items-center">
                <span className="cs-icon">{ARROW}</span>
                <span className="relative min-w-0">
                  <span className="block font-semibold leading-snug">{t.buildCta.term}</span>
                  <span className="mt-1 block text-small text-white/80">{t.buildCta.desc}</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section id="como-trabalhamos" aria-labelledby="como-trabalhamos-titulo" className="bg-white py-16 md:py-24">
        <div className="wrap">
          <h2 id="como-trabalhamos-titulo" className="t-h2">
            {t.processTitle}
          </h2>
          <ol className="cs-steps mt-10 grid gap-4 md:grid-cols-5 md:gap-5">
            {t.process.map((s, i) => (
              <li key={s.term} className="reveal-panel cs-step flex gap-4 md:block md:text-center" data-c={i}>
                <span className="cs-icon">{PROCESS_ICONS[i]}</span>
                <span className="block md:mt-4">
                  <span className="block font-semibold leading-snug">{s.term}</span>
                  <span className="mt-1 block text-small text-grafite">{s.desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="caso-de-estudo" aria-labelledby="caso-titulo" className="hero-brand py-16 text-white md:py-24">
        <div className="wrap">
          <h2 id="caso-titulo" className="t-h2 max-w-[30ch]">
            {t.proofTitle}
          </h2>
          <p className="mt-4 max-w-prose text-lead text-white/80">{t.proofIntro}</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <ul className="grid gap-3" data-arch-steps>
              {t.proof.map((item, i) => (
                <li key={item.key} data-arch-step={item.key} className="cs-proof-item" data-c={i}>
                  <span className="cs-icon">{PROOF_ICONS[item.key]}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug">{item.term}</h3>
                    <p className="mt-0.5 text-small text-white/75">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
              <ArchitectureDiagram locale={locale} caption={t.proofFigure} />
            </div>
          </div>
          <p className="mt-12 text-small font-semibold uppercase tracking-[0.08em] text-white/70">{t.proofLinks}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {(['timeEasier', 'constructionEasier'] as const).map((id) => (
              <li key={id}>
                <Link href={href(id, locale)} className="cs-product">
                  <Image src={p.items[id].icon} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
                  {p.items[id].name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={href('products', locale)} className="btn-on-dark">
                {c.cta.products}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section id="tecnologia" aria-labelledby="tecnologia-titulo" className="py-16 md:py-24">
        <div className="wrap">
          <h2 id="tecnologia-titulo" className="t-h2">
            {t.stackTitle}
          </h2>
          <p className="mt-3 text-lead text-grafite">{t.stackIntro}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.stack.map((item, i) => (
              <li key={item.term} className="reveal-panel cs-tech" data-c={i}>
                <span className="cs-tech-badge">{item.badge}</span>
                <h3 className="mt-4 font-semibold leading-snug">{item.term}</h3>
                <p className="mt-1 text-small text-grafite">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand locale={locale} title={t.contactTitle} text={t.contactText} subject="projeto" cta={c.cta.project} />
    </SiteShell>
  )
}
