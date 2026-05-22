import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import type { LegalDocument as LegalDocumentType } from '@/content/legal/types'

type LegalDocumentProps = {
  document: LegalDocumentType
}

function renderSection(section: LegalDocumentType['sections'][number], depth = 0) {
  const Heading = depth === 0 ? 'h2' : depth === 1 ? 'h3' : 'h4'
  const headingClass =
    depth === 0
      ? 'text-2xl font-semibold text-[#001d3d] mt-10 mb-4'
      : depth === 1
        ? 'text-xl font-semibold text-[#001d3d] mt-6 mb-3'
        : 'text-lg font-medium text-gray-800 mt-4 mb-2'

  return (
    <section key={section.id ?? section.title} id={section.id} className="scroll-mt-24">
      <Heading className={headingClass}>{section.title}</Heading>
      {section.paragraphs?.map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-relaxed mb-4 text-left">
          {paragraph}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700 text-left">
          {section.bullets.map((bullet, index) => (
            <li key={index} className="leading-relaxed">
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {section.subsections?.map((subsection) => renderSection(subsection, depth + 1))}
    </section>
  )
}

const LegalDocument = ({ document }: LegalDocumentProps) => {
  return (
    <MaxWidthWrapper className="py-12 md:py-16">
      <article className="max-w-3xl mx-auto">
        <header className="mb-10 text-left border-b border-gray-200 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#001d3d] mb-3">
            {document.title}
          </h1>
          {document.subtitle && (
            <p className="text-lg text-gray-600 mb-4">{document.subtitle}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Última atualização: {document.lastUpdated}
          </p>
          {document.introduction?.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mt-6">
              {paragraph}
            </p>
          ))}
        </header>
        <div>{document.sections.map((section) => renderSection(section))}</div>
      </article>
    </MaxWidthWrapper>
  )
}

export default LegalDocument
