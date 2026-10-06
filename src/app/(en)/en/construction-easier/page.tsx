import ProductPage from '@/components/pages/ProductPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('constructionEasier', 'en')

export default function Page() {
  return <ProductPage locale="en" id="constructionEasier" />
}
