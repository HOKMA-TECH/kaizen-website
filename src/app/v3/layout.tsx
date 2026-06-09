import type { Metadata } from 'next'
import './v3.css'

export const metadata: Metadata = {
  title: 'Kaizen · V3 (Preview 3D)',
  description: 'Experiência cinematográfica 3D — versão experimental do site Kaizen.',
  robots: { index: false, follow: false },
}

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return children
}
