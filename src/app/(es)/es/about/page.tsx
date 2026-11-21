import AboutPage from '@/components/pages/AboutPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('about', 'es')

export default function Page() {
  return <AboutPage locale="es" />
}
