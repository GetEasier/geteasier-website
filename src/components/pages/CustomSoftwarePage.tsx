import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SpecList from '@/components/ui/SpecList'
import ContactBand from '@/components/ui/ContactBand'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import { customSoftware } from '@/content/custom-software'
import { common } from '@/content/common'
import { products } from '@/content/products'
import { href, type Locale } from '@/lib/seo.config'

export default function CustomSoftwarePage({ locale }: { locale: Locale }) {
  const t = customSoftware[locale]
  const c = common[locale]
  const p = products[locale]

  return (
    <SiteShell pageId="customSoftware" locale={locale}>
      <PageHeader pageId="customSoftware" locale={locale} title={t.h1} lead={t.lead}>
        <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn-primary">
          {c.cta.project}
        </Link>
      </PageHeader>

      <Section id="o-que-construimos" title={t.buildTitle}>
        <SpecList items={t.build} />
      </Section>

      <Section id="como-trabalhamos" title={t.processTitle} intro={t.processIntro}>
        <SpecList items={t.process} numbered />
      </Section>

      <section id="caso-de-estudo" aria-labelledby="caso-titulo" className="bg-tinta py-16 text-white md:py-24">
        <div className="wrap">
          <h2 id="caso-titulo" className="t-h2 max-w-[30ch]">
            {t.proofTitle}
          </h2>
          <p className="mt-4 max-w-prose text-lead text-white/80">{t.proofIntro}</p>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <ol className="border-t border-white/20" data-arch-steps>
              {t.proof.map((item) => (
                <li key={item.key} data-arch-step={item.key} className="border-b border-white/20 py-5">
                  <h3 className="font-semibold">{item.term}</h3>
                  <p className="mt-1 max-w-prose text-white/80">{item.desc}</p>
                </li>
              ))}
            </ol>
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
              <ArchitectureDiagram locale={locale} caption={t.proofFigure} />
            </div>
          </div>
          <p className="mt-12 text-white/80">{t.proofLinks}</p>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {(['timeEasier', 'constructionEasier'] as const).map((id) => (
              <li key={id}>
                <Link href={href(id, locale)} className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                  {p.items[id].name}: {p.items[id].short}
                </Link>
              </li>
            ))}
            <li>
              <Link href={href('products', locale)} className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                {p.indexH1}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <Section id="tecnologia" title={t.stackTitle} intro={t.stackIntro}>
        <SpecList items={t.stack} />
      </Section>

      <ContactBand locale={locale} title={t.contactTitle} text={t.contactText} subject="projeto" cta={c.cta.project} />
    </SiteShell>
  )
}
