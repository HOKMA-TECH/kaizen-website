import { Reveal } from '@/components/v3/ui/Reveal'
import { ScrollCue } from '@/components/v3/ui/ScrollCue'

export function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="v3-eyebrow">Kaizen · Soluções Imobiliárias</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="v3-display mt-6 text-5xl sm:text-7xl md:text-8xl">
            O imóvel ideal
            <br />
            <span className="v3-gradient-text">ganha dimensão.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">
            Uma nova forma de descobrir onde você vai morar — cinematográfica, imersiva e
            guiada por pessoas. Em Campo Grande e em toda a região do Rio.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#imoveis"
              className="rounded-full bg-[var(--v3-cyan)] px-7 py-3.5 text-sm font-semibold text-[#06070d] transition-transform hover:scale-105 active:scale-95"
            >
              Explorar imóveis
            </a>
            <a
              href="#manifesto"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/50"
            >
              Nosso jeito
            </a>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <ScrollCue />
      </div>
    </section>
  )
}
