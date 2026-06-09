import { Reveal } from '@/components/v3/ui/Reveal'
import { FloatingCard } from '@/components/v3/ui/FloatingCard'
import { demoProperties } from '@/components/v3/data/demo'
import { BedDouble, Bath, Maximize } from 'lucide-react'

export function FeaturedProperties() {
  return (
    <section id="imoveis" className="relative z-10 px-6 py-32 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="v3-eyebrow">Seleção</p>
          <h2 className="v3-display mt-5 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
            Imóveis que flutuam acima do comum.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2">
          {demoProperties.map((p, i) => (
            <FloatingCard
              key={p.id}
              parallax={30 + (i % 2) * 30}
              float={false}
              className="group overflow-hidden"
            >
              <div
                className="relative h-60 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${p.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur">
                  {p.type}
                </span>
              </div>
              <div className="p-7">
                <p className="text-xs uppercase tracking-widest text-white/45">{p.location}</p>
                <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-xl font-semibold text-[var(--v3-amber)]">{p.price}</p>

                <div className="mt-5 flex items-center gap-6 text-sm text-white/55">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4" /> {p.beds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4" /> {p.baths}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Maximize className="h-4 w-4" /> {p.area} m²
                  </span>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
