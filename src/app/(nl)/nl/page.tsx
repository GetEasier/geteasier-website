import HomePage from '@/components/pages/HomePage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('home', 'nl')

export default function Page() {
  return <HomePage locale="nl" />
}
