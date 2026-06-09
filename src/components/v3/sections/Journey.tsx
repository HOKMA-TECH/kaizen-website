import { Reveal } from '@/components/v3/ui/Reveal'
import { journeySteps } from '@/components/v3/data/demo'

export function Journey() {
  return (
    <section id="jornada" className="relative z-10 px-6 py-32 md:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="v3-eyebrow">Como funciona</p>
          <h2 className="v3-display mt-5 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
            Quatro passos até as chaves.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-px">
          {journeySteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group flex flex-col gap-3 border-t border-white/10 py-8 transition-colors hover:bg-white/[0.03] md:flex-row md:items-center md:gap-10">
                <span className="text-5xl font-semibold text-white/15 transition-colors group-hover:text-[var(--v3-cyan)] md:w-28">
                  {s.n}
                </span>
                <h3 className="text-2xl font-semibold md:w-56">{s.title}</h3>
                <p className="flex-1 text-white/60">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
