import ContactPage from '@/components/pages/ContactPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('contact', 'nl')

export default function Page() {
  return <ContactPage locale="nl" />
}
