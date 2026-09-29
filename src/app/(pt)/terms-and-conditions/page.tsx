import LegalPage from '@/components/pages/LegalPage'
import { termsOfUsePt } from '@/content/legal/terms-of-use.pt'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('terms', 'pt')

export default function Page() {
  return <LegalPage pageId="terms" doc={termsOfUsePt} />
}
