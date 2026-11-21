import PlansPage from '@/components/pages/PlansPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('plans', 'nl')

export default function Page() {
  return <PlansPage locale="nl" />
}
