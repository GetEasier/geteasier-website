import PlansPage from '@/components/pages/PlansPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('plans', 'es')

export default function Page() {
  return <PlansPage locale="es" />
}
