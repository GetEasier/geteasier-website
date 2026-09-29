import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SpecList from '@/components/ui/SpecList'
import RelatedLinks from '@/components/ui/RelatedLinks'
import ContactBand from '@/components/ui/ContactBand'
import Testimonials from '@/components/Testimonials'
import YouTubeFacade from '@/components/YouTubeFacade'
import { products } from '@/content/products'
import { common } from '@/content/common'
import { href, type Locale, type ProductId } from '@/lib/seo.config'

export default function ProductPage({ id, locale }: { id: ProductId; locale: Locale }) {
  const p = products[locale]
  const item = p.items[id]
  const c = common[locale]
  const demo = c.cta.demo(item.name)

  return (
    <SiteShell pageId={id} locale={locale}>
      <PageHeader
        pageId={id}
        locale={locale}
        title={item.h1}
        lead={item.lead}
        before={
          <Image
            src={item.logo.src}
            alt={item.name}
            width={item.logo.width}
            height={item.logo.height}
            priority
            sizes="240px"
            className="h-9 w-auto md:h-11"
          />
        }
      >
        <Link href={`${href('contact', locale)}?assunto=${item.demoSubject}`} className="btn-primary">
          {demo}
        </Link>
        <Link href={`${href('plans', locale)}#${item.planAnchor}`} className="btn-secondary">
          {c.cta.plans}
        </Link>
      </PageHeader>

      <Section id="como-funciona" title={item.stepsTitle} intro={item.stepsIntro}>
        <ol className="border-t border-linha" data-demo-steps={id}>
          {item.steps.map((step, i) => (
            <li key={step} className="grid gap-2 border-b border-linha py-5 md:grid-cols-[4rem_minmax(0,1fr)]">
              <span className="t-data text-grafite" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="max-w-prose">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="funcionalidades" title={item.featuresTitle}>
        <SpecList items={item.features} />
        <p className="mt-8">
          <Link href={`${href('plans', locale)}#${item.planAnchor}`} className="link">
            {p.planIncluded}
          </Link>
        </p>
      </Section>

      {id === 'woodEasier' && (
        <>
          <Section id="video" title={p.videoTitle}>
            <YouTubeFacade videoId="BKbbl5TJGko" label={p.videoButton} note={p.videoNote} />
          </Section>
          <Section id="quem-usa" title={p.testimonialTitle}>
            <Testimonials locale={locale} only="Diogo Silva" />
          </Section>
        </>
      )}

      <RelatedLinks title={p.relatedTitle} links={item.related} locale={locale} />

      <ContactBand
        locale={locale}
        title={locale === 'pt' ? `Ver o ${item.name} a funcionar` : `See ${item.name} in action`}
        text={locale === 'pt' ? 'Mostramos o produto com dados de exemplo e respondemos às perguntas da sua equipa.' : 'We show you the product with sample data and answer your team’s questions.'}
        subject={item.demoSubject}
        cta={demo}
      />
    </SiteShell>
  )
}
