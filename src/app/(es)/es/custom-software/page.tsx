import CustomSoftwarePage from '@/components/pages/CustomSoftwarePage'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata('customSoftware', 'es')

export default function Page() {
  return <CustomSoftwarePage locale="es" />
}
