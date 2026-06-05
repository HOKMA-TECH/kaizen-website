import type { Metadata } from 'next'
import WorldExperience from '@/components/experiments/WorldExperience'
import { getShowcaseProperties } from '@/lib/properties/showcase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mundo Kaizen (experimento)',
  robots: { index: false, follow: false },
}

export default async function MundoPage() {
  const properties = await getShowcaseProperties(28)
  return <WorldExperience properties={properties} />
}
