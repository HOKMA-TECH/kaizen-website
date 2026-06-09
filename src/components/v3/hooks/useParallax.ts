'use client'

import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/components/v3/hooks/scrollStore'

/**
 * Parallax vertical dirigido pelo scroll.
 * @param amount deslocamento total em % da altura do elemento.
 */
export function useParallax(ref: RefObject<HTMLElement>, amount = 14) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [ref, amount])
}
