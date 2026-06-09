'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/components/v3/hooks/scrollStore'

// Anima de 0 até o valor numérico, preservando sufixos como "+" ou "%".
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const match = value.match(/^(\d+)(.*)$/)
    if (!match) {
      el.textContent = value
      return
    }
    const target = parseInt(match[1], 10)
    const suffix = match[2] || ''

    if (prefersReducedMotion()) {
      el.textContent = value
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const obj = { n: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`
        },
      })
    }, el)

    return () => ctx.revert()
  }, [value])

  return <span ref={ref} className={className}>0{value.replace(/^\d+/, '')}</span>
}
