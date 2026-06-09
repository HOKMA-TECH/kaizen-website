'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null,
})

// Canvas fixo atrás de todo o conteúdo. O conteúdo DOM rola por cima (z maior).
export function ClientScene() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Scene />
    </div>
  )
}
