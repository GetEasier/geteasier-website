import ProductsPage from '@/components/pages/ProductsPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('products', 'es')

export default function Page() {
  return <ProductsPage locale="es" />
}
