export type LegalSection = {
  id?: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
  subsections?: LegalSection[]
}

export type LegalDocument = {
  title: string
  subtitle?: string
  lastUpdated: string
  introduction?: string[]
  sections: LegalSection[]
}
