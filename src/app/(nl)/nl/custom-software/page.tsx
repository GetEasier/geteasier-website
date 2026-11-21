import CustomSoftwarePage from '@/components/pages/CustomSoftwarePage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('customSoftware', 'nl')

export default function Page() {
  return <CustomSoftwarePage locale="nl" />
}
