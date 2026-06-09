'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollStore, prefersReducedMotion, isMobileViewport } from '@/components/v3/hooks/scrollStore'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reduced = prefersReducedMotion()
    scrollStore.reducedMotion = reduced
    scrollStore.isMobile = isMobileViewport()

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      scrollStore.progress = e.progress
      scrollStore.velocity = e.velocity
      ScrollTrigger.update()
    })

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // mantém a média entre Lenis e ScrollTrigger sincronizada em resize
    const onResize = () => {
      scrollStore.isMobile = isMobileViewport()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    // garante medidas corretas após o layout assentar
    const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      gsap.ticker.remove(raf)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(refreshTimeout)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return <>{children}</>
}
