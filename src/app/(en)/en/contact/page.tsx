import ContactPage from '@/components/pages/ContactPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('contact', 'en')

export default function Page() {
  return <ContactPage locale="en" />
}
