import type { Metadata } from 'next'
import ReelsExperience from '@/components/experiments/ReelsExperience'
import { getShowcaseProperties } from '@/lib/properties/showcase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Reels Kaizen (experimento)',
  robots: { index: false, follow: false },
}

export default async function ReelsPage() {
  const properties = await getShowcaseProperties(20)
  return <ReelsExperience properties={properties} />
}
