import ProductPage from '@/components/pages/ProductPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('timeEasier', 'fr')

export default function Page() {
  return <ProductPage locale="fr" id="timeEasier" />
}
