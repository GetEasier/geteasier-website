import ProductsPage from '@/components/pages/ProductsPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('products', 'nl')

export default function Page() {
  return <ProductsPage locale="nl" />
}
