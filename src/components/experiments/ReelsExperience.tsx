'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, MapPin, Bed, Bath, Maximize2, ChevronUp, ArrowRight } from 'lucide-react'
import { formatCurrency, formatArea, getPropertyTypeLabel, getPropertyStatusLabel } from '@/lib/utils'
import type { Property } from '@/types'

interface Props {
  properties: Property[]
}

const FAVORITES_KEY = 'favorite_properties'

export default function ReelsExperience({ properties }: Props) {
  const [active, setActive] = useState(0)
  const [favs, setFavs] = useState<string[]>([])
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FAVORITES_KEY)
      setFavs(raw ? (JSON.parse(raw) as string[]) : [])
    } catch {
      setFavs([])
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index)
            if (!Number.isNaN(idx)) setActive(idx)
          }
        })
      },
      { threshold: 0.6 }
    )
    slideRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [properties.length])

  const toggleFav = (slug: string) => {
    setFavs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }

  if (properties.length === 0) {
    return (
      <div className="h-screen grid place-items-center bg-black text-white">
        <p>Nenhum imóvel publicado ainda.</p>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {/* Top bar */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-5 h-16 bg-gradient-to-b from-black/70 to-transparent">
        <Link href="/v" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors">
          <ArrowLeft className="h-4 w-4" /> versões
        </Link>
        <span className="text-xs uppercase tracking-[0.25em] text-white/70">Kaizen · Reels</span>
        <span className="w-16" />
      </header>

      {/* Progress dots */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
        {properties.map((_, i) => (
          <span
            key={i}
            className={`rounded-full transition-all duration-300 ${
              active === i ? 'h-6 w-1.5 bg-white' : 'h-1.5 w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Scroller */}
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none">
        {properties.map((p, i) => (
          <Slide
            key={p.id}
            property={p}
            index={i}
            isFav={favs.includes(p.slug)}
            onFav={() => toggleFav(p.slug)}
            showHint={i === 0}
            setRef={(el) => {
              slideRefs.current[i] = el
            }}
          />
        ))}
      </div>
    </div>
  )
}

function Slide({
  property,
  index,
  isFav,
  onFav,
  showHint,
  setRef,
}: {
  property: Property
  index: number
  isFav: boolean
  onFav: () => void
  showHint: boolean
  setRef: (el: HTMLElement | null) => void
}) {
  const img = property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80'
  // Duotone alterna a vibe por slide
  const duotones = [
    'from-[#1E4ED8]/70 via-transparent to-[#D946EF]/50',
    'from-[#7C3AED]/70 via-transparent to-[#22D3EE]/50',
    'from-[#2563EB]/70 via-transparent to-[#F43F5E]/50',
  ]
  const duo = duotones[index % duotones.length]

  return (
    <section
      ref={setRef}
      data-index={index}
      className="relative h-screen w-full snap-start snap-always overflow-hidden flex items-end"
    >
      <Image src={img} alt={property.title} fill priority={index < 2} sizes="100vw" className="object-cover" />
      {/* Duotone + scrim */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${duo} mix-blend-screen`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

      {/* Like */}
      <button
        onClick={onFav}
        className="absolute right-4 bottom-44 z-20 flex flex-col items-center gap-1"
        aria-label="Favoritar"
      >
        <span className={`grid h-12 w-12 place-items-center rounded-full backdrop-blur transition-all active:scale-90 ${isFav ? 'bg-[#F43F5E]' : 'bg-white/15 hover:bg-white/25'}`}>
          <Heart className={`h-6 w-6 ${isFav ? 'fill-white text-white' : 'text-white'}`} />
        </span>
        <span className="text-[11px] text-white/80">{isFav ? 'Salvo' : 'Salvar'}</span>
      </button>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 pb-12 md:p-10 md:pb-14 max-w-2xl"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs">{getPropertyTypeLabel(property.type)}</span>
          <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs">{getPropertyStatusLabel(property.status)}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight">{property.title}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-white/80 text-sm">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{property.neighborhood}, {property.city}</span>
          {property.area ? <span className="inline-flex items-center gap-1.5"><Maximize2 className="h-4 w-4" />{formatArea(property.area)}</span> : null}
          {property.bedrooms ? <span className="inline-flex items-center gap-1.5"><Bed className="h-4 w-4" />{property.bedrooms}</span> : null}
          {property.bathrooms ? <span className="inline-flex items-center gap-1.5"><Bath className="h-4 w-4" />{property.bathrooms}</span> : null}
        </div>
        <div className="mt-5 flex items-center gap-5">
          <span className="text-2xl md:text-3xl font-extrabold">
            {formatCurrency(property.price)}
            {property.status === 'aluguel' && <span className="text-base font-normal text-white/60">/mês</span>}
          </span>
          <Link
            href={`/imoveis/${property.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition-all active:scale-95"
          >
            Ver detalhes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      {/* Swipe hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/70"
          >
            <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <ChevronUp className="h-5 w-5" />
            </motion.span>
            <span className="text-[11px]">deslize</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
