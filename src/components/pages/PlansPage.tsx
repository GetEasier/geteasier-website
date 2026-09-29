import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import ContactBand from '@/components/ui/ContactBand'
import PlanTabs from '@/components/PlanTabs'
import { PLAN_MODULES, plans } from '@/content/plans'
import { products } from '@/content/products'
import { href, type Locale } from '@/lib/seo.config'
import { PRODUCT_THEME } from '@/lib/product-theme'
import { cn } from '@/lib/utils'

function Mark({ on, yes, no, hex }: { on: boolean; yes: string; no: string; hex: string }) {
  return on ? (
    <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ backgroundColor: hex }}>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5">
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

function Tick({ hex }: { hex: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: hex }}>
      <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PlansPage({ locale }: { locale: Locale }) {
  const t = plans[locale]
  const p = products[locale]
  const quote = `${href('contact', locale)}?assunto=planos`

  const panels = PLAN_MODULES.map((m) => {
    const item = p.items[m.product]
    const theme = PRODUCT_THEME[m.product]
    // O que cada plano acrescenta ao anterior: a coluna que passa de "não" a "sim".
    const tiers = [0, 1, 2].map((i) => m.rows.filter((r) => r.plans[i] && (i === 0 || !r.plans[i - 1])))
    const cards = m.singlePlan
      ? [{ name: t.single, intro: t.allFeatures, rows: m.rows, dark: false }]
      : t.plans.map((name, i) => ({ name, intro: i === 0 ? t.base : t.everything(t.plans[i - 1]), rows: tiers[i], dark: i === 2 }))

    return (
      <section key={m.id} aria-labelledby={`${m.id}-titulo`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Image src={item.logo.src} alt="" width={item.logo.width} height={item.logo.height} className="h-8 w-auto" />
            <h2 id={`${m.id}-titulo`} className="sr-only">
              {item.name}
            </h2>
            <p className="mt-3 max-w-prose text-grafite">{m.singlePlan ? t.singlePlan : item.short}</p>
          </div>
          <Link href={href(m.product, locale)} className="link">
            {t.productLink(item.name)}
          </Link>
        </div>

        <ul className={cn('mt-8 grid gap-5', m.singlePlan ? 'max-w-xl' : 'lg:grid-cols-3')}>
          {cards.map((c, i) => (
            <li
              key={c.name}
              className={cn(
                'plan-card flex flex-col rounded-frame border p-6 md:p-7',
                c.dark ? 'hero-dark border-transparent text-white' : 'border-linha bg-white',
              )}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="block h-1.5 w-12 rounded-full" style={{ backgroundColor: c.dark ? '#6CD3E6' : theme.hex }} />
              <h3 className="mt-5 text-h3 font-semibold">{c.name}</h3>
              <p className={cn('mt-1 text-small', c.dark ? 'text-white/70' : 'text-grafite')}>
                {t.price} · {t.count(m.rows.filter((r) => r.plans[m.singlePlan ? 0 : i]).length)}
              </p>
              <Link
                href={quote}
                className={cn('btn mt-6 justify-center', c.dark ? 'bg-ciano text-tinta hover:opacity-90' : cn('text-white hover:opacity-90', theme.solid))}
              >
                {t.ctaButton}
              </Link>
              <p className={cn('mt-6 text-small font-semibold', c.dark ? 'text-white/80' : 'text-tinta')}>{c.intro}</p>
              <ul className="mt-3 space-y-2.5 text-small">
                {c.rows.map((r) => (
                  <li key={r.pt} className="flex gap-2.5">
                    <Tick hex={c.dark ? '#6CD3E6' : theme.hex} />
                    <span>
                      {r[locale]}
                      {r.beOnly && <span className={cn('ml-1', c.dark ? 'text-white/60' : 'text-grafite')}>({t.beOnly})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {!m.singlePlan && (
          <details className="plan-compare group mt-8 rounded-frame border border-linha bg-white" open>
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 font-semibold md:px-6">
              {t.compare}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-open:rotate-180">
                <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="relative overflow-x-auto border-t border-linha">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <caption className="sr-only">
                  {item.name}: {t.h1}
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-4 text-small font-semibold text-grafite md:px-6">
                      {t.feature}
                    </th>
                    {t.plans.map((name, i) => (
                      <th
                        key={name}
                        scope="col"
                        className={cn('w-24 py-4 text-center font-semibold sm:w-32', i === 2 && 'bg-tinta text-white')}
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {m.rows.map((row) => (
                    <tr key={row.pt} className="border-t border-linha transition-colors hover:bg-papel">
                      <th scope="row" className="px-5 py-3 font-normal md:px-6">
                        {row[locale]}
                        {row.beOnly && <span className="t-data ml-2 whitespace-nowrap text-grafite">({t.beOnly})</span>}
                      </th>
                      {row.plans.map((on, i) => (
                        <td key={t.plans[i]} className={cn('py-3 text-center', i === 2 && 'bg-tinta/[0.04]')}>
                          <Mark on={on} yes={t.included} no={t.notIncluded} hex={theme.hex} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}
      </section>
    )
  })

  return (
    <SiteShell pageId="plans" locale={locale}>
      <div className="bg-gradient-to-b from-[#E8EEF9] to-papel">
        <PageHeader pageId="plans" locale={locale} title={t.h1} lead={[t.lead]} />
      </div>

      <div className="wrap -mt-6 pb-16 md:pb-24">
        <PlanTabs
          label={t.choose}
          tabs={PLAN_MODULES.map((m) => ({
            id: m.id,
            label: p.items[m.product].name,
            icon: p.items[m.product].icon,
            hex: PRODUCT_THEME[m.product].hex,
          }))}
          panels={panels}
        />

        <ul className="mt-12 grid gap-3 text-small text-grafite md:grid-cols-3">
          {t.notes.map((n) => (
            <li key={n} className="flex gap-3 rounded-ctl bg-white p-4">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-azul" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="8" cy="8" r="6.5" />
                <path d="M8 7.2v4M8 4.8v.4" strokeLinecap="round" />
              </svg>
              {n}
            </li>
          ))}
        </ul>
      </div>

      <ContactBand locale={locale} title={t.ctaTitle} text={t.ctaText} subject="planos" cta={t.ctaButton} />
    </SiteShell>
  )
}
