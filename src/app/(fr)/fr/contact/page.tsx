import ContactPage from '@/components/pages/ContactPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('contact', 'fr')

export default function Page() {
  return <ContactPage locale="fr" />
}
