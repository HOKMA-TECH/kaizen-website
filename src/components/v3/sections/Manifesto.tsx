import { Reveal } from '@/components/v3/ui/Reveal'

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative z-10 flex min-h-[120vh] items-center px-6 md:px-10"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <p className="v3-eyebrow">Manifesto</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="v3-display mt-8 text-3xl leading-tight sm:text-5xl md:text-6xl">
            Comprar um imóvel não é uma transação.
            <span className="text-white/40"> É uma decisão de vida.</span>
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/60">
            Por isso a Kaizen une curadoria humana, dados de mercado e acompanhamento completo —
            do primeiro café à entrega das chaves. Sem ruído, sem surpresa, sem pressa.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
