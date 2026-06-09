import { Reveal } from '@/components/v3/ui/Reveal'
import { FloatingCard } from '@/components/v3/ui/FloatingCard'
import { differentials } from '@/components/v3/data/demo'

export function Differentials() {
  return (
    <section id="diferenciais" className="relative z-10 px-6 py-32 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="v3-eyebrow">Por que Kaizen</p>
          <h2 className="v3-display mt-5 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
            Três compromissos que mudam tudo.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {differentials.map((d, i) => (
            <FloatingCard key={d.title} parallax={40 + i * 18} className="p-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-[var(--v3-cyan)]">{d.metric}</span>
                <span className="text-xs uppercase tracking-widest text-white/45">
                  {d.metricLabel}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{d.desc}</p>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
