import ProductPage from '@/components/pages/ProductPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('stockEasier', 'es')

export default function Page() {
  return <ProductPage locale="es" id="stockEasier" />
}
