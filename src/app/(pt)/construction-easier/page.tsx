import ProductPage from '@/components/pages/ProductPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('constructionEasier', 'pt')

export default function Page() {
  return <ProductPage locale="pt" id="constructionEasier" />
}
