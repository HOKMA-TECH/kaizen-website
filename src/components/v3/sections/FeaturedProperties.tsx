'use client'

import { useRef } from 'react'
import { Bed, Bath, Car, Maximize2, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/v3/ui/Reveal'
import { useParallax } from '@/components/v3/hooks/useParallax'
import { demoProperties, featured, type DemoProperty } from '@/components/v3/data/demo'

function PropertyCard({ property, index }: { property: DemoProperty; index: number }) {
  const imgRef = useRef<HTMLDivElement>(null)
  useParallax(imgRef, 10)

  return (
    <Reveal delay={index * 0.1} y={40}>
      <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_-12px_rgba(10,42,102,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(10,42,102,0.4)]">
        <div className="relative h-60 overflow-hidden">
          <div
            ref={imgRef}
            className="absolute inset-0 -inset-y-[10%] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${property.image})` }}
          />
          <span className="absolute left-4 top-4 rounded-full bg-[#0A2A66] px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {property.status}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0A2A66] backdrop-blur">
            {property.type}
          </span>
        </div>

        <div className="p-6">
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="h-4 w-4 text-[#3B82F6]" />
            {property.neighborhood}, {property.city}
          </p>
          <h3 className="mt-2 text-xl font-bold text-[#0A2A66]">{property.title}</h3>

          <div className="mt-4 flex items-center gap-5 border-t border-gray-100 pt-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-[#1E4ED8]" />{property.beds}</span>
            <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-[#1E4ED8]" />{property.baths}</span>
            <span className="flex items-center gap-1.5"><Car className="h-4 w-4 text-[#1E4ED8]" />{property.parking}</span>
            <span className="flex items-center gap-1.5"><Maximize2 className="h-4 w-4 text-[#1E4ED8]" />{property.area} m²</span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-bold text-[#0A2A66]">{property.price}</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E4ED8] transition-all group-hover:gap-2.5">
              Ver detalhes <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function FeaturedProperties() {
  return (
    <section id="imoveis" className="relative z-10 bg-[#f6f8fc] px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="v3-eyebrow">{featured.label}</p>
          <h2 className="v3-display mt-3 text-3xl text-[#0A2A66] md:text-5xl">{featured.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{featured.subtitle}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demoProperties.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <a
            href="#contato"
            className="group inline-flex items-center gap-3 rounded-full bg-[#1E4ED8] px-8 py-4 font-semibold text-white shadow-xl transition-all hover:bg-[#0A2A66] active:scale-95"
          >
            {featured.btn}
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
