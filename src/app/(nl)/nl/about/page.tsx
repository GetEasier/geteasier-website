import AboutPage from '@/components/pages/AboutPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('about', 'nl')

export default function Page() {
  return <AboutPage locale="nl" />
}
