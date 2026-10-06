import LegalPage from '@/components/pages/LegalPage'
import { privacyPolicyPt } from '@/content/legal/privacy-policy.pt'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('privacy', 'pt')

export default function Page() {
  return <LegalPage pageId="privacy" doc={privacyPolicyPt} />
}
