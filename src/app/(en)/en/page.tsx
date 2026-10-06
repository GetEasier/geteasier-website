import HomePage from '@/components/pages/HomePage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('home', 'en')

export default function Page() {
  return <HomePage locale="en" />
}
