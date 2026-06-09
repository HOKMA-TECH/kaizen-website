'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/components/v3/hooks/scrollStore'

type Props = {
  children: React.ReactNode
  className?: string
  /** atraso em segundos */
  delay?: number
  /** distância inicial em y (px) */
  y?: number
  as?: 'div' | 'section' | 'li' | 'span'
}

export function Reveal({ children, className, delay = 0, y = 44, as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y })
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [delay, y])

  const Tag = as as React.ElementType
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
