import type { Metadata } from 'next'
import ConciergeExperience from '@/components/experiments/ConciergeExperience'
import { getShowcaseProperties } from '@/lib/properties/showcase'
import { getSiteSettings } from '@/lib/cms/server'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Concierge Kaizen (experimento)',
  robots: { index: false, follow: false },
}

export default async function ConciergePage() {
  const [properties, settings] = await Promise.all([
    getShowcaseProperties(24),
    getSiteSettings(['contact_info']),
  ])
  const contactInfo = settings.contact_info ?? {}
  const whatsapp =
    (typeof contactInfo.whatsapp === 'string' && contactInfo.whatsapp) ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '5521999999999'

  return <ConciergeExperience properties={properties} whatsapp={whatsapp} />
}
