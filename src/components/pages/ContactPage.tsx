import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import ContactForm from '@/components/ContactForm'
import { contact } from '@/content/contact'
import { COMPANY } from '@/lib/site'
import { href, type Locale } from '@/lib/seo.config'

export default function ContactPage({ locale }: { locale: Locale }) {
  const t = contact[locale]
  const a = COMPANY.address
  return (
    <SiteShell pageId="contact" locale={locale}>
      <PageHeader pageId="contact" locale={locale} title={t.h1} lead={[t.lead]} />
      <div className="border-t border-linha">
        <div className="wrap grid gap-14 py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:py-20">
          <ContactForm labels={t.form} subjects={t.subjects} privacyHref={href('privacy', 'pt')} />

          <aside aria-labelledby="outros-contactos" className="lg:border-l lg:border-linha lg:pl-12">
            <h2 id="outros-contactos" className="t-h3">
              {t.otherTitle}
            </h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="font-semibold">{t.whatsapp}</dt>
                <dd className="mt-1">
                  <a href={COMPANY.whatsapp.href} className="link t-data text-base" target="_blank" rel="noopener noreferrer">
                    {COMPANY.whatsapp.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">{t.social}</dt>
                <dd className="mt-1">
                  <ul className="space-y-1">
                    {COMPANY.socials.map((s) => (
                      <li key={s.name}>
                        <a href={s.href} className="link" target="_blank" rel="noopener noreferrer">
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">{t.address}</dt>
                <dd className="mt-1 text-grafite">
                  <address className="not-italic">
                    {COMPANY.name}, {COMPANY.legalName}
                    <br />
                    {a.street}
                    <br />
                    {a.postalCode} {a.locality}
                  </address>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </SiteShell>
  )
}
