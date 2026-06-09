import { Shield, Star, Clock, HeartHandshake, TrendingUp, Award, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/v3/ui/Reveal'
import { differentials, differentialsBlock, type DifferentialItem } from '@/components/v3/data/demo'

const iconMap: Record<DifferentialItem['icon'], LucideIcon> = {
  shield: Shield,
  star: Star,
  clock: Clock,
  handshake: HeartHandshake,
  trending: TrendingUp,
  award: Award,
}

export function Differentials() {
  return (
    <section id="diferenciais" className="relative z-10 bg-white px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="v3-eyebrow">{differentialsBlock.label}</p>
          <h2 className="v3-display mt-3 text-3xl text-[#0A2A66] md:text-5xl">
            {differentialsBlock.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{differentialsBlock.subtitle}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08} y={36}>
                <div className="group h-full rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_4px_24px_-12px_rgba(10,42,102,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1E4ED8]/30 hover:shadow-[0_24px_50px_-18px_rgba(10,42,102,0.35)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A2A66] to-[#1E4ED8] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[#0A2A66]">{item.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
