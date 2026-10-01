import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import Faq from '@/components/ui/Faq'
import ModulesHero from '@/components/custom/ModulesHero'
import ArchitectureScroll from '@/components/custom/ArchitectureScroll'
import { ARCH_ICONS, ARROW, BUILD_ICONS, PROCESS_ICONS, STACK_ICONS } from '@/components/custom/icons'
import '@/components/custom/custom-software.css'
import { customSoftware } from '@/content/custom-software'
import { common } from '@/content/common'
import { TESTIMONIALS } from '@/content/home'
import { href, type Locale } from '@/lib/seo.config'

// Software à medida (revisão de 01/10): hero da marca com uma aplicação a ganhar módulos, cartões
// compactos com cor, etapas sem números, arquitetura genérica montada ao scroll, tecnologia por
// necessidade, um testemunho e perguntas frequentes. O convite final é o do rodapé. Pouco texto, uma linha por cartão.
const QUOTE = TESTIMONIALS[0]

export default function CustomSoftwarePage({ locale }: { locale: Locale }) {
  const t = customSoftware[locale]
  const c = common[locale]
  const contact = `${href('contact', locale)}?assunto=projeto`
  const faqLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }).replace(/</g, '\\u003c')

  return (
    <SiteShell pageId="customSoftware" locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />

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
                <a href="#arquitetura" className="btn-on-dark">
                  {t.heroArch}
                </a>
              </div>
            </div>
            <ModulesHero t={t.hero} />
          </div>
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

      <section id="arquitetura" aria-labelledby="arquitetura-titulo" className="hero-brand pt-16 text-white md:pt-24">
        <div className="wrap">
          <h2 id="arquitetura-titulo" className="t-h2 max-w-[30ch]">
            {t.archTitle}
          </h2>
          <p className="mt-4 max-w-prose text-lead text-white/80">{t.archIntro}</p>
          <div className="mt-10">
            <ArchitectureScroll t={t} icons={ARCH_ICONS} />
          </div>
        </div>
      </section>

      <section id="tecnologia" aria-labelledby="tecnologia-titulo" className="py-16 md:py-24">
        <div className="wrap">
          <h2 id="tecnologia-titulo" className="t-h2">
            {t.stackTitle}
          </h2>
          <p className="mt-3 text-lead text-grafite">{t.stackIntro}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.stack.map((item, i) => (
              <li key={item.key} className="reveal-panel cs-tech" data-c={i % 5}>
                <div className="flex items-center gap-3">
                  <span className="cs-icon">{STACK_ICONS[item.key]}</span>
                  <h3 className="font-semibold leading-snug">{item.term}</h3>
                </div>
                <p className="mt-3 text-small text-grafite">{item.desc}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.chips.map((chip) => (
                    <li key={chip} className="cs-chip">
                      {chip}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="testemunho-titulo" className="bg-white py-16 md:py-24">
        <div className="wrap">
          <h2 id="testemunho-titulo" className="sr-only">
            {t.quoteTitle}
          </h2>
          <figure className="cs-quote">
            <svg viewBox="0 0 32 24" className="h-8 w-10 text-ciano" fill="currentColor" aria-hidden="true">
              <path d="M0 24V14C0 6 4 1.5 12 0l1.5 3C9 4.5 7 7.5 7 11h6v13zm18 0V14c0-8 4-12.5 12-14l1.5 3C27 4.5 25 7.5 25 11h6v13z" />
            </svg>
            <blockquote className="mt-5 max-w-[52ch] text-[1.375rem] font-medium leading-snug md:text-[1.625rem]">{QUOTE.quote}</blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-4">
              <Image src={QUOTE.photo} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover ring-2 ring-white/30" />
              <span>
                <span className="block font-semibold">{QUOTE.name}</span>
                <span className="block text-small text-white/75">{QUOTE.company}</span>
              </span>
              <span className="ml-auto rounded-xl bg-white px-3 py-2">
                <Image src={QUOTE.logo} alt={QUOTE.company} width={120} height={48} className="h-9 w-auto object-contain" />
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="perguntas" aria-labelledby="perguntas-titulo" className="py-16 md:py-24">
        <div className="wrap max-w-3xl">
          <h2 id="perguntas-titulo" className="t-h2">
            {t.faqTitle}
          </h2>
          <div className="mt-8">
            <Faq items={t.faq} />
          </div>
        </div>
      </section>

    </SiteShell>
  )
}
