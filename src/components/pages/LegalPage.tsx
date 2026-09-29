import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import type { LegalDocument, LegalSection } from '@/content/legal/types'
import type { PageId } from '@/lib/seo.config'

function renderSection(section: LegalSection, depth = 0) {
  const Heading = depth === 0 ? 'h2' : depth === 1 ? 'h3' : 'h4'
  const cls = depth === 0 ? 't-h3 mt-12 mb-4' : depth === 1 ? 'mt-8 mb-3 text-lead font-semibold' : 'mt-6 mb-2 font-semibold'
  return (
    <section key={section.id ?? section.title} id={section.id} className="scroll-mt-24">
      <Heading className={cls}>{section.title}</Heading>
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mb-4">
          {p}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mb-4 list-disc space-y-2 pl-6">
          {section.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {section.subsections?.map((s) => renderSection(s, depth + 1))}
    </section>
  )
}

export default function LegalPage({ pageId, doc }: { pageId: PageId; doc: LegalDocument }) {
  return (
    <SiteShell pageId={pageId} locale="pt">
      <article className="wrap pb-20 pt-8 md:pt-10">
        <Breadcrumbs pageId={pageId} locale="pt" />
        <header className="mt-10 max-w-prose border-b border-linha pb-8">
          <h1 className="t-h1">{doc.title}</h1>
          {doc.subtitle && <p className="mt-4 text-lead text-grafite">{doc.subtitle}</p>}
          <p className="t-data mt-4 text-grafite">Última atualização: {doc.lastUpdated}</p>
          {doc.introduction?.map((p, i) => (
            <p key={i} className="mt-6">
              {p}
            </p>
          ))}
        </header>
        <div className="max-w-prose">{doc.sections.map((s) => renderSection(s))}</div>
      </article>
    </SiteShell>
  )
}
