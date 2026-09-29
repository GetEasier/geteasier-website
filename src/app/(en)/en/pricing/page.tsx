import PlansPage from '@/components/pages/PlansPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('plans', 'en')

export default function Page() {
  return <PlansPage locale="en" />
}
