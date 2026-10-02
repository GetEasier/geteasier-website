import type { ReactNode } from 'react'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import type { Locale, PageId } from '@/lib/seo.config'
import { CinematicText } from '@/components/interactions/CinematicText'

type Props = { pageId: PageId; locale: Locale; title: string; lead?: string[]; children?: ReactNode; aside?: ReactNode; before?: ReactNode }

export default function PageHeader({ pageId, locale, title, lead, children, aside, before }: Props) {
  return (
    <div className="wrap pb-14 pt-8 md:pb-20 md:pt-10">
      <Breadcrumbs pageId={pageId} locale={locale} />
      <div className={aside ? 'mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'mt-10'}>
        <div>
          {before && <div className="mb-6">{before}</div>}
          <CinematicText as="h1" className="t-h1 max-w-[22ch]">{title}</CinematicText>
          {lead && (
            <div className="mt-6 max-w-prose space-y-4 text-lead text-grafite">
              {lead.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside}
      </div>
    </div>
  )
}
