'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/components/v3/hooks/scrollStore'

type Props = {
  children: React.ReactNode
  className?: string
  /** intensidade do parallax vertical (px) */
  parallax?: number
  /** flutuação contínua suave */
  float?: boolean
}

export function FloatingCard({ children, className = '', parallax = 60, float = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // parallax dirigido pelo scroll
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          y: -parallax,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )
      // flutuação contínua
      if (float) {
        gsap.to(el, {
          y: '+=10',
          duration: 3.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }
    }, el)

    return () => ctx.revert()
  }, [parallax, float])

  return (
    <div
      ref={ref}
      className={`v3-glass rounded-3xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}
    >
      {children}
    </div>
  )
}
