import AboutPage from '@/components/pages/AboutPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('about', 'pt')

export default function Page() {
  return <AboutPage locale="pt" />
}
