import ProductPage from '@/components/pages/ProductPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('constructionEasier', 'es')

export default function Page() {
  return <ProductPage locale="es" id="constructionEasier" />
}
