import PlansPage from '@/components/pages/PlansPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('plans', 'fr')

export default function Page() {
  return <PlansPage locale="fr" />
}
