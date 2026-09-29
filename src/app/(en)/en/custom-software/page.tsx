import CustomSoftwarePage from '@/components/pages/CustomSoftwarePage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('customSoftware', 'en')

export default function Page() {
  return <CustomSoftwarePage locale="en" />
}
