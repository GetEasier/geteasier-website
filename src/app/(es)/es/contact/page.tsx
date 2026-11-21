import ContactPage from '@/components/pages/ContactPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('contact', 'es')

export default function Page() {
  return <ContactPage locale="es" />
}
