import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import InstagramFeed from '@/components/InstagramFeed'
import { TEAM, about } from '@/content/about'
import { COMPANY } from '@/lib/site'
import { href, route, type Locale } from '@/lib/seo.config'

export default function AboutPage({ locale }: { locale: Locale }) {
  const t = about[locale]
  const a = COMPANY.address
  return (
    <SiteShell pageId="about" locale={locale}>
      <PageHeader pageId="about" locale={locale} title={t.h1} lead={t.lead} />

      <Section id="equipa" title={t.teamTitle}>
        <ul className="grid gap-10 sm:grid-cols-3">
          {TEAM.map((m) => (
            <li key={m.name}>
              <Image
                src={m.photo}
                alt={m.name}
                width={480}
                height={600}
                sizes="(min-width: 640px) 30vw, 100vw"
                className="aspect-[4/5] w-full rounded-frame object-cover grayscale"
              />
              <p className="mt-4 font-semibold">{m.name}</p>
              <p className="text-small text-grafite">{t.roles[m.role]}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="empresa" title={t.companyTitle}>
        <dl className="spec">
          <div>
            <dt>{t.company.legalName}</dt>
            <dd>
              {COMPANY.name}, {COMPANY.legalName}
            </dd>
          </div>
          <div>
            <dt>{t.company.vat}</dt>
            <dd className="t-data text-base">{COMPANY.vatId}</dd>
          </div>
          <div>
            <dt>{t.company.address}</dt>
            <dd>
              {a.street}, {a.postalCode} {a.locality}, {a.region}, Portugal
            </dd>
          </div>
        </dl>
      </Section>

      <Section id="financiamento" title={t.fundingTitle}>
        <p className="max-w-prose">{t.fundingText}</p>
        <a href={COMPANY.funding.pdf} download className="link mt-4 inline-block">
          {t.fundingLink}
        </a>
      </Section>

      <InstagramFeed title={t.instagramTitle} linkText={t.instagramLink} href={COMPANY.socials[1].href} />

      <nav aria-labelledby="continuar" className="wrap border-t border-linha py-12">
        <h2 id="continuar" className="t-h3">
          {t.nextTitle}
        </h2>
        <ul className="mt-5 space-y-3">
          {(['customSoftware', 'products', 'contact'] as const).map((id) => (
            <li key={id}>
              <Link href={href(id, locale)} className="link">
                {route(id, locale).breadcrumb}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </SiteShell>
  )
}
