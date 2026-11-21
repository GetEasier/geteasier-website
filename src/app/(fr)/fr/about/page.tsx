import AboutPage from '@/components/pages/AboutPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('about', 'fr')

export default function Page() {
  return <AboutPage locale="fr" />
}
