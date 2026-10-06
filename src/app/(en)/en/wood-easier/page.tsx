import ProductPage from '@/components/pages/ProductPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('woodEasier', 'en')

export default function Page() {
  return <ProductPage locale="en" id="woodEasier" />
}
