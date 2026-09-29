import PlansPage from '@/components/pages/PlansPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('plans', 'pt')

export default function Page() {
  return <PlansPage locale="pt" />
}
