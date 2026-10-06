import { COMPANY } from '@/lib/site'
import { common } from '@/content/common'
import type { Locale } from '@/lib/seo.config'

// Inscrição na newsletter do Substack. O formulário abre a página de subscrição do Substack com o
// email já preenchido (sem JS nem iframe). "band": faixa clara no início, logo a seguir ao hero;
// "footer": cartão no topo do rodapé das outras páginas.
export default function Newsletter({ locale, variant, id }: { locale: Locale; variant: 'band' | 'footer'; id: string }) {
  const t = common[locale].footer.newsletter
  return (
    <div className={`news news-${variant} grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-center`}>
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="news-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="M3.5 7l8.5 6 8.5-6" />
          </svg>
        </span>
        <div>
          <h2 id={`${id}-titulo`} className="news-title font-semibold">
            {variant === 'band' ? t.bandTitle : t.title}
          </h2>
          <p className="news-text mt-1 text-small">{t.text}</p>
        </div>
      </div>
      <form action={`${COMPANY.newsletter}/subscribe`} method="get" target="_blank" className="news-form" aria-labelledby={`${id}-titulo`}>
        <label htmlFor={`${id}-email`} className="sr-only">
          {t.label}
        </label>
        <input id={`${id}-email`} type="email" name="email" required autoComplete="email" placeholder={t.placeholder} />
        <button type="submit">{t.button}</button>
      </form>
    </div>
  )
}
