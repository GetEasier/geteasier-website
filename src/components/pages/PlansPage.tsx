import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import ContactBand from '@/components/ui/ContactBand'
import { PLAN_MODULES, plans } from '@/content/plans'
import { products } from '@/content/products'
import { href, type Locale } from '@/lib/seo.config'

function Mark({ on, yes, no }: { on: boolean; yes: string; no: string }) {
  return on ? (
    <span className="inline-flex text-estado-valido">
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
        <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">{yes}</span>
    </span>
  ) : (
    <span className="inline-flex text-linha">
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
        <path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="sr-only">{no}</span>
    </span>
  )
}

export default function PlansPage({ locale }: { locale: Locale }) {
  const t = plans[locale]
  const p = products[locale]
  return (
    <SiteShell pageId="plans" locale={locale}>
      <PageHeader pageId="plans" locale={locale} title={t.h1} lead={[t.lead]} />

      <nav aria-label={t.h1} className="wrap -mt-6 pb-10">
        <ul className="flex flex-wrap gap-3">
          {PLAN_MODULES.map((m) => (
            <li key={m.id}>
              <a href={`#${m.id}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-ctl border border-linha bg-white px-3 font-medium hover:border-tinta">
                <Image src={p.items[m.product].icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                {p.items[m.product].name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {PLAN_MODULES.map((m) => {
        const item = p.items[m.product]
        return (
          <section key={m.id} id={m.id} aria-labelledby={`${m.id}-titulo`} className="border-t border-linha py-14">
            <div className="wrap">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 id={`${m.id}-titulo`} className="t-h2">
                  {item.name}
                </h2>
                <Link href={href(m.product, locale)} className="link">
                  {t.productLink(item.name)}
                </Link>
              </div>
              {m.singlePlan && <p className="mt-3 text-grafite">{t.singlePlan}</p>}
              <div className="relative mt-8 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left">
                  <caption className="sr-only">
                    {item.name}: {t.h1}
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-tinta">
                      <th scope="col" className="py-3 pr-4 font-semibold">
                        {t.feature}
                      </th>
                      {!m.singlePlan &&
                        t.plans.map((name) => (
                          <th key={name} scope="col" className="w-24 py-3 text-center font-semibold sm:w-32">
                            {name}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {m.rows.map((row) => (
                      <tr key={row.pt} className="border-b border-linha">
                        <th scope="row" className="py-3 pr-4 font-normal">
                          {row[locale]}
                          {row.beOnly && <span className="t-data ml-2 whitespace-nowrap text-grafite">({t.beOnly})</span>}
                        </th>
                        {!m.singlePlan &&
                          row.plans.map((on, i) => (
                            <td key={t.plans[i]} className="py-3 text-center">
                              <Mark on={on} yes={t.included} no={t.notIncluded} />
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )
      })}

      <aside aria-label={locale === 'pt' ? 'Notas' : 'Notes'} className="border-t border-linha py-10">
        <ul className="wrap space-y-2 text-small text-grafite">
          {t.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </aside>

      <ContactBand locale={locale} title={t.ctaTitle} text={t.ctaText} subject="planos" cta={t.ctaButton} />
    </SiteShell>
  )
}
