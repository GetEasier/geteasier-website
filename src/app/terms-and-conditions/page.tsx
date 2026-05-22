import type { Metadata } from 'next'
import LegalDocument from '@/components/LegalDocument'
import { termsOfUsePt } from '@/content/legal/terms-of-use.pt'

export const metadata: Metadata = {
  title: 'Termos e Condições | GetEasier',
  description:
    'Termos e Condições de Utilização e Prestação de Serviços da Plataforma GetEasier.',
}

export default function TermsAndConditionsPage() {
  return <LegalDocument document={termsOfUsePt} />
}
