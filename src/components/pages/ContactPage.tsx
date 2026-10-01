import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import ContactForm from '@/components/ContactForm'
import { contact } from '@/content/contact'
import { COMPANY } from '@/lib/site'
import { href, type Locale } from '@/lib/seo.config'

const TILE = 'flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.86.25-1.45 1.5-1.45h1.6V4.48A21 21 0 0 0 14.27 4.4c-2.3 0-3.87 1.4-3.87 3.97v2.13H7.8v3h2.6V21z" />
    </svg>
  ),
}

export default function ContactPage({ locale }: { locale: Locale }) {
  const t = contact[locale]
  const a = COMPANY.address
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.postalCode} ${a.locality}`)}`

  return (
    <SiteShell pageId="contact" locale={locale}>
      {/* Hero escuro com a luz da marca: título curto e, ao lado, os canais diretos (os mesmos do cartão de contacto da Início) */}
      <section className="hero-brand overflow-x-clip text-white">
        <div className="wrap pb-14 pt-8 md:pb-20 md:pt-10">
          <div className="[&_[aria-current]]:text-white [&_a:hover]:text-white [&_a]:decoration-white/30 [&_nav]:text-white/60">
            <Breadcrumbs pageId="contact" locale={locale} />
          </div>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <h1 className="t-display max-w-[16ch] max-sm:text-[2.125rem]">{t.h1}</h1>
              <p className="mt-5 max-w-[38ch] text-lead text-white/80">{t.lead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#mensagem" className="btn bg-ciano text-tinta hover:bg-white">
                  {t.form.title}
                </a>
                <a href={COMPANY.whatsapp.href} className="btn-on-dark" target="_blank" rel="noopener noreferrer">
                  {t.whatsappCta}
                </a>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <li className={TILE}>
                <span aria-hidden="true" className="contact-ico">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 13.5l.9-2.7A5.5 5.5 0 1 1 5.6 12.9z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-small text-white/60">{t.whatsapp}</span>
                  <a href={COMPANY.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-ciano">
                    {COMPANY.whatsapp.display}
                  </a>
                </span>
              </li>
              <li className={TILE}>
                <span aria-hidden="true" className="contact-ico">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 14.5s5-4.3 5-8.2A5 5 0 0 0 3 6.3c0 3.9 5 8.2 5 8.2z" />
                    <circle cx="8" cy="6.3" r="1.8" />
                  </svg>
                </span>
                <span>
                  <span className="block text-small text-white/60">{t.where}</span>
                  <a href={mapHref} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-ciano">
                    {a.locality}
                  </a>
                </span>
              </li>
              <li className={`${TILE} sm:col-span-2 lg:col-span-1`}>
                <span aria-hidden="true" className="contact-ico">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="4" cy="8" r="1.8" />
                    <circle cx="12" cy="4" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <path d="M5.6 7.2l4.8-2.4M5.6 8.8l4.8 2.4" />
                  </svg>
                </span>
                <span className="flex flex-1 flex-wrap items-center justify-between gap-3">
                  <span className="text-small text-white/60">{t.social}</span>
                  <span className="flex gap-2">
                    {COMPANY.socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        title={s.name}
                        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-ciano hover:text-tinta [&_svg]:h-[18px] [&_svg]:w-[18px]"
                      >
                        {SOCIAL_ICONS[s.name]}
                      </a>
                    ))}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formulário num cartão branco; ao lado, a morada completa com ligação ao mapa */}
      <section id="mensagem" className="scroll-mt-20 py-14 md:py-20">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_24px_50px_-30px_rgba(6,8,60,.35)] ring-1 ring-tinta/5 md:p-10">
            <ContactForm labels={t.form} subjects={t.subjects} chips={t.chips} privacyHref={href('privacy', 'pt')} />
          </div>

          <aside aria-labelledby="sede-titulo" className="rounded-[28px] bg-white p-6 shadow-[0_24px_50px_-30px_rgba(6,8,60,.35)] ring-1 ring-tinta/5 md:p-8 lg:sticky lg:top-24">
            <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-2xl bg-azul/10 text-azul">
              <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 14.5h11M3.5 14.5V6l4.5-3 4.5 3v8.5M6.5 14.5v-3.5h3v3.5" />
              </svg>
            </span>
            <h2 id="sede-titulo" className="mt-4 t-h3">
              {t.address}
            </h2>
            <address className="mt-3 not-italic text-grafite">
              {COMPANY.name}, {COMPANY.legalName}
              <br />
              {a.street}
              <br />
              {a.postalCode} {a.locality}
            </address>
            <a href={mapHref} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6 w-full">
              {t.map}
            </a>
          </aside>
        </div>
      </section>
    </SiteShell>
  )
}
