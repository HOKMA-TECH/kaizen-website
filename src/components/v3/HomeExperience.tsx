'use client'

import { LenisProvider } from '@/components/v3/providers/LenisProvider'
import { ScrollProgressBar } from '@/components/v3/ui/ScrollProgressBar'
import { NavbarV3 } from '@/components/v3/layout/NavbarV3'
import { FooterV3 } from '@/components/v3/layout/FooterV3'
import { Hero } from '@/components/v3/sections/Hero'
import { FeaturedProperties } from '@/components/v3/sections/FeaturedProperties'
import { Differentials } from '@/components/v3/sections/Differentials'
import { Cta } from '@/components/v3/sections/Cta'

export function HomeExperience() {
  return (
    <LenisProvider>
      <div className="v3-root relative min-h-screen overflow-x-clip">
        <ScrollProgressBar />
        <NavbarV3 />

        <main className="relative">
          <Hero />
          <FeaturedProperties />
          <Differentials />
          <Cta />
        </main>

        <FooterV3 />
      </div>
    </LenisProvider>
  )
}
