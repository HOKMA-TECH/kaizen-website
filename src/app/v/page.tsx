import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kaizen · Versões experimentais',
  robots: { index: false, follow: false },
}

const versions = [
  {
    href: '/v/concierge',
    tag: 'A',
    name: 'Concierge IA',
    desc: 'O mascote conversa com o visitante e encontra o imóvel na hora. Chat-first, leve, centrado no mascote.',
    palette: 'Midnight · Electric',
    className: 'from-[#0B1020] to-[#101a3a]',
    accent: 'text-[#22D3EE]',
    swatches: ['#0B1020', '#3B82F6', '#22D3EE'],
  },
  {
    href: '/v/mundo',
    tag: 'B',
    name: 'Mundo explorável',
    desc: 'Um espaço que você arrasta e dá zoom. Imóveis são pontos que se abrem em cards imersivos.',
    palette: 'Aurora · Índigo/Violeta',
    className: 'from-[#070318] to-[#1a0b3a]',
    accent: 'text-[#C4B5FD]',
    swatches: ['#070318', '#7C3AED', '#22D3EE'],
  },
  {
    href: '/v/reels',
    tag: 'C',
    name: 'Reels imersivos',
    desc: 'Cada imóvel é uma cena em tela cheia. Você desliza entre elas como em stories. Gesto, não scroll.',
    palette: 'Neon · Duotone',
    className: 'from-black to-[#2a0a2a]',
    accent: 'text-[#F472B6]',
    swatches: ['#000000', '#2563EB', '#D946EF'],
  },
]

export default function VersionsIndex() {
  return (
    <main className="min-h-screen bg-[#05060B] text-white px-5 md:px-10 py-14">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <Image src="/logo-kaizen.png?v=6" alt="Kaizen" width={36} height={36} unoptimized className="h-8 w-8 object-contain" />
          <span className="text-sm uppercase tracking-[0.3em] text-white/60">Kaizen · Laboratório</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Três experiências, três vibes</h1>
        <p className="mt-3 text-white/60 max-w-xl">
          Cada versão é um conceito de site totalmente diferente, com paleta própria — todas lendo os imóveis reais do
          sistema. Abra, sinta e me diga qual seguimos (ou misturamos).
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {versions.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${v.className} p-6 min-h-[260px] flex flex-col justify-between transition-all hover:border-white/30 hover:-translate-y-1`}
            >
              <div>
                <span className="inline-grid h-8 w-8 place-items-center rounded-full border border-white/20 text-sm font-bold">
                  {v.tag}
                </span>
                <h2 className="mt-5 text-2xl font-bold">{v.name}</h2>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{v.desc}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  {v.swatches.map((c) => (
                    <span key={c} className="h-4 w-4 rounded-full ring-1 ring-white/20" style={{ background: c }} />
                  ))}
                  <span className={`ml-2 text-[11px] uppercase tracking-wider ${v.accent}`}>{v.palette}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  Abrir experiência <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-xs text-white/40">
          Produção segue intocada. A home atual (cinematográfica) continua em <span className="text-white/60">/</span>.
        </p>
      </div>
    </main>
  )
}
