import { Reveal } from '@/components/v3/ui/Reveal'
import { ArrowUpRight } from 'lucide-react'

export function Cta() {
  return (
    <section id="cta" className="relative z-10 px-6 py-40 md:px-10">
      <div className="v3-radial absolute inset-0 -z-10" />
      <Reveal className="mx-auto w-full max-w-3xl text-center">
        <p className="v3-eyebrow">Vamos começar</p>
        <h2 className="v3-display mt-6 text-4xl sm:text-6xl md:text-7xl">
          O próximo capítulo é <span className="v3-gradient-text">seu.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/65">
          Conte o que você procura. Em minutos, a curadoria certa chega até você — sem
          robôs, sem pressa, com gente que entende do assunto.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/5521999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--v3-cyan)] px-8 py-4 text-sm font-semibold text-[#06070d] transition-transform hover:scale-105 active:scale-95"
          >
            Falar no WhatsApp <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#imoveis"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/90 transition-colors hover:border-white/50"
          >
            Ver imóveis
          </a>
        </div>
      </Reveal>
    </section>
  )
}
