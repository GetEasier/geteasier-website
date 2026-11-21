import ProductPage from '@/components/pages/ProductPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('timeEasier', 'nl')

export default function Page() {
  return <ProductPage locale="nl" id="timeEasier" />
}
