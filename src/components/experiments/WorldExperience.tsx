'use client'

import React, { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Minus, Hand, X, MapPin, Bed, Maximize2, ArrowRight } from 'lucide-react'
import { formatCurrency, formatArea, getPropertyTypeLabel } from '@/lib/utils'
import type { Property } from '@/types'

interface Props {
  properties: Property[]
}

const CANVAS_W = 2600
const CANVAS_H = 1700
const GOLDEN = 137.50776405003785

export default function WorldExperience({ properties }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [selected, setSelected] = useState<Property | null>(null)

  // Constelação determinística (espiral áurea) — estável entre renders
  const positions = useMemo(() => {
    return properties.map((_, i) => {
      const radius = 140 + i * 52
      const angle = (i * GOLDEN * Math.PI) / 180
      return {
        x: CANVAS_W / 2 + radius * Math.cos(angle),
        y: CANVAS_H / 2 + radius * Math.sin(angle) * 0.62,
      }
    })
  }, [properties])

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#070318] text-white select-none">
      {/* Fundo aurora */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_20%,rgba(124,58,237,0.35),transparent_60%),radial-gradient(50%_50%_at_80%_70%,rgba(34,211,238,0.25),transparent_60%),radial-gradient(60%_60%_at_50%_100%,rgba(30,78,216,0.4),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top bar */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-5 md:px-8 h-16">
        <Link href="/v" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
          <ArrowLeft className="h-4 w-4" /> versões
        </Link>
        <span className="text-xs uppercase tracking-[0.25em] text-white/60">Kaizen · Mundo</span>
        <span className="w-16" />
      </header>

      {/* Dica */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-xs text-white/80">
        <Hand className="h-3.5 w-3.5" /> Arraste para explorar · clique num ponto
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(1.6, z + 0.2))}
          className="h-10 w-10 grid place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
          aria-label="Aproximar"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
          className="h-10 w-10 grid place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
          aria-label="Afastar"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* Viewport arrastável */}
      <div ref={viewportRef} className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <motion.div
          drag
          dragConstraints={viewportRef}
          dragElastic={0.06}
          dragTransition={{ power: 0.2, timeConstant: 200 }}
          style={{ width: CANVAS_W, height: CANVAS_H, scale: zoom }}
          className="relative will-change-transform"
        >
          {properties.map((p, i) => (
            <Pin key={p.id} property={p} x={positions[i].x} y={positions[i].y} onClick={() => setSelected(p)} />
          ))}
        </motion.div>
      </div>

      {/* Card imersivo */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute z-50 left-1/2 bottom-6 md:bottom-1/2 md:translate-y-1/2 -translate-x-1/2 w-[92vw] max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#0B0820]/90 backdrop-blur-xl shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 h-9 w-9 grid place-items-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative h-52">
                <Image
                  src={selected.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&q=80'}
                  alt={selected.title}
                  fill
                  sizes="(max-width:768px) 92vw, 28rem"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0820] to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs">
                  {getPropertyTypeLabel(selected.type)}
                </span>
              </div>
              <div className="p-5">
                <p className="text-2xl font-bold text-[#C4B5FD]">{formatCurrency(selected.price)}</p>
                <h3 className="mt-1 font-semibold text-lg leading-snug">{selected.title}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/60">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#22D3EE]" />{selected.neighborhood}, {selected.city}</span>
                  {selected.area ? <span className="inline-flex items-center gap-1.5"><Maximize2 className="h-4 w-4 text-[#22D3EE]" />{formatArea(selected.area)}</span> : null}
                  {selected.bedrooms ? <span className="inline-flex items-center gap-1.5"><Bed className="h-4 w-4 text-[#22D3EE]" />{selected.bedrooms}</span> : null}
                </div>
                <Link
                  href={`/imoveis/${selected.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-5 py-3 font-medium text-white hover:brightness-110 transition-all active:scale-[0.98]"
                >
                  Ver imóvel completo <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function Pin({ property, x, y, onClick }: { property: Property; x: number; y: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ left: x, top: y }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      onPointerDownCapture={(e) => e.stopPropagation()}
    >
      <span className="relative grid place-items-center">
        <span className="absolute h-10 w-10 rounded-full bg-[#22D3EE]/30 blur-md group-hover:bg-[#22D3EE]/60 transition-all" />
        <span className="relative h-3.5 w-3.5 rounded-full bg-[#22D3EE] ring-2 ring-white/70 group-hover:scale-125 transition-transform" />
      </span>
      <span className="mt-2 whitespace-nowrap rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium opacity-80 group-hover:opacity-100 group-hover:bg-white/20 transition-all">
        {formatCurrency(property.price)}
      </span>
    </button>
  )
}
