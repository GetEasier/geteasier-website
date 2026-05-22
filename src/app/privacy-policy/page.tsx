import type { Metadata } from 'next'
import LegalDocument from '@/components/LegalDocument'
import { privacyPolicyPt } from '@/content/legal/privacy-policy.pt'

export const metadata: Metadata = {
  title: 'Política de Privacidade | GetEasier',
  description:
    'Política de Privacidade e Proteção de Dados (RGPD) da GetEasier — website e plataforma.',
}

export default function PrivacyPolicyPage() {
  return <LegalDocument document={privacyPolicyPt} />
}
