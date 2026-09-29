import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import ContactBand from '@/components/ui/ContactBand'
import { products } from '@/content/products'
import { href, type Locale } from '@/lib/seo.config'
import ProductPanels from '@/components/ProductPanels'

export default function ProductsPage({ locale }: { locale: Locale }) {
  const p = products[locale]
  return (
    <SiteShell pageId="products" locale={locale}>
      <PageHeader pageId="products" locale={locale} title={p.indexH1} lead={[p.indexLead]} />

      <section aria-label={p.indexH1} className="pb-6">
        <div className="wrap">
          <ProductPanels locale={locale} long />
        </div>
        <div className="wrap grid gap-8 py-14 md:grid-cols-2">
          <p className="max-w-prose">
            {p.plansLine}{' '}
            <Link href={href('plans', locale)} className="link">
              {p.plansLink}
            </Link>
          </p>
          <p className="max-w-prose">
            {p.indexSame}{' '}
            <Link href={href('customSoftware', locale)} className="link">
              {p.indexSameLink}
            </Link>
          </p>
        </div>
      </section>

      <ContactBand
        locale={locale}
        title={locale === 'pt' ? 'Ajudamos a escolher o produto e o plano' : 'We can help you choose a product and plan'}
        text={locale === 'pt' ? 'Diga-nos o que quer controlar e quantas pessoas tem. Indicamos o produto e o plano que fazem sentido.' : 'Tell us what you want to keep track of and how many people you have. We will point you to the right product and plan.'}
        subject="planos"
        cta={locale === 'pt' ? 'Pedir ajuda para escolher' : 'Ask for help choosing'}
      />
    </SiteShell>
  )
}
