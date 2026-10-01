import { COMPANY } from '@/lib/site'
import { common } from '@/content/common'
import type { Locale } from '@/lib/seo.config'

// Faixa da newsletter no topo de todas as páginas, por cima do menu (sai com o scroll; o menu fica).
// O formulário abre a página de subscrição do Substack com o email já preenchido, sem JS nem iframe.
export default function NewsletterBar({ locale }: { locale: Locale }) {
  const t = common[locale].footer.newsletter
  return (
    <aside aria-labelledby="newsletter-titulo" className="news-bar text-white">
      <div className="wrap flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
        <p className="flex items-center gap-2 text-small">
          <span aria-hidden="true" className="news-bar-ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="M3.5 7l8.5 6 8.5-6" />
            </svg>
          </span>
          <span>
            <strong id="newsletter-titulo" className="font-semibold">
              {t.title}:
            </strong>{' '}
            <span className="text-white/75">{t.text}</span>
          </span>
        </p>
        <form action={`${COMPANY.newsletter}/subscribe`} method="get" target="_blank" className="news-bar-form">
          <label htmlFor="news-bar-email" className="sr-only">
            {t.label}
          </label>
          <input id="news-bar-email" type="email" name="email" required autoComplete="email" placeholder={t.placeholder} />
          <button type="submit">{t.button}</button>
        </form>
      </div>
    </aside>
  )
}
