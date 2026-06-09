'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Search, ArrowRight, MapPin } from 'lucide-react'
import { gsap } from 'gsap'
import { hero } from '@/components/v3/data/demo'
import { Counter } from '@/components/v3/ui/Counter'
import { ScrollCue } from '@/components/v3/ui/ScrollCue'
import { useParallax } from '@/components/v3/hooks/useParallax'
import { prefersReducedMotion } from '@/components/v3/hooks/scrollStore'

const HERO_BG =
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=2000&q=80'

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  useParallax(bgRef, 8)

  useEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero="badge"]', { y: 20, opacity: 0, duration: 0.7 })
        .from(
          '[data-hero="word"]',
          { yPercent: 115, duration: 0.9, stagger: 0.06 },
          '-=0.3',
        )
        .from('[data-hero="sub"]', { y: 24, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('[data-hero="btn"]', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.4')
        .from('[data-hero="stat"]', { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.3')
        .from('[data-hero="cue"]', { opacity: 0, duration: 0.8 }, '-=0.2')
    }, el)
    return () => ctx.revert()
  }, [])

  const words = hero.title.split(' ')

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 -inset-y-[8%]">
        <Image src={HERO_BG} alt="" fill priority quality={85} sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A2A66]/90 via-[#0A2A66]/70 to-[#1E4ED8]/60" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-24 text-center">
        <span
          data-hero="badge"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100 backdrop-blur-sm"
        >
          <MapPin className="h-4 w-4 text-[#3B82F6]" />
          {hero.badge}
        </span>

        <h1 className="v3-display text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <span key={i} className="v3-mask mr-[0.25em] inline-block align-bottom">
              <span data-hero="word" className="inline-block">
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero="sub"
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-blue-100 md:text-lg"
        >
          {hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            data-hero="btn"
            href="#imoveis"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1E4ED8] px-7 py-3.5 font-semibold text-white shadow-xl transition-all hover:bg-white hover:text-[#0A2A66] active:scale-95"
          >
            <Search className="h-5 w-5" />
            {hero.btnPrimary}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            data-hero="btn"
            href="#contato"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-7 py-3.5 font-semibold text-white transition-all hover:bg-white hover:text-[#0A2A66] active:scale-95"
          >
            {hero.btnSecondary}
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {hero.stats.map((s) => (
            <div
              key={s.label}
              data-hero="stat"
              className="rounded-xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm"
            >
              <p className="text-3xl font-bold text-white">
                <Counter value={s.value} />
              </p>
              <p className="mt-1 text-xs text-blue-200">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div data-hero="cue" className="absolute inset-x-0 bottom-8 flex justify-center">
        <ScrollCue />
      </div>
    </section>
  )
}
