'use client'

import { LenisProvider } from '@/components/v3/providers/LenisProvider'
import { ClientScene } from '@/components/v3/canvas/ClientScene'
import { NavbarV3 } from '@/components/v3/layout/NavbarV3'
import { FooterV3 } from '@/components/v3/layout/FooterV3'
import { Hero } from '@/components/v3/sections/Hero'
import { Manifesto } from '@/components/v3/sections/Manifesto'
import { Differentials } from '@/components/v3/sections/Differentials'
import { FeaturedProperties } from '@/components/v3/sections/FeaturedProperties'
import { Journey } from '@/components/v3/sections/Journey'
import { Cta } from '@/components/v3/sections/Cta'

export function HomeExperience() {
  return (
    <LenisProvider>
      <div className="v3-root relative min-h-screen overflow-x-clip">
        {/* cena 3D fixa ao fundo */}
        <ClientScene />

        {/* vinheta para legibilidade do texto sobre a cena */}
        <div
          className="pointer-events-none fixed inset-0 z-[1]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 40%, transparent 30%, rgba(6,7,13,0.55) 75%, rgba(6,7,13,0.9) 100%)',
          }}
        />

        <NavbarV3 />

        <main className="relative">
          <Hero />
          <Manifesto />
          <Differentials />
          <FeaturedProperties />
          <Journey />
          <Cta />
        </main>

        <FooterV3 />

        {/* grão de filme */}
        <div className="v3-grain" aria-hidden="true" />
      </div>
    </LenisProvider>
  )
}
