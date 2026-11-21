import CustomSoftwarePage from '@/components/pages/CustomSoftwarePage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('customSoftware', 'fr')

export default function Page() {
  return <CustomSoftwarePage locale="fr" />
}
