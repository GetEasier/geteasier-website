'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { href, type Locale } from '@/lib/seo.config'

// Mantém os endereços antigos da página inicial (/#contact, /#team, /#products-list).
export default function LegacyHashRedirect({ locale }: { locale: Locale }) {
  const router = useRouter()
  useEffect(() => {
    const map: Record<string, string> = {
      '#contact': href('contact', locale),
      '#team': href('about', locale),
      '#products': href('products', locale),
      '#products-list': href('products', locale),
    }
    const target = map[window.location.hash]
    if (target) router.replace(target)
  }, [locale, router])
  return null
}
