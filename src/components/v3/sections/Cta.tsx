import { MessageCircle, Phone, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/v3/ui/Reveal'
import { cta } from '@/components/v3/data/demo'

export function Cta() {
  const number = cta.whatsapp.replace(/\D/g, '')
  const msg = encodeURIComponent(cta.whatsappMsg)
  const featureDots = ['bg-[#25D366]', 'bg-[#3B82F6]', 'bg-yellow-400']

  return (
    <section
      id="contato"
      className="relative z-10 overflow-hidden bg-gradient-to-br from-[#0A2A66] to-[#1E4ED8] px-6 py-28 md:px-8"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />

      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100">
          {cta.badge}
        </span>
        <h2 className="v3-display mt-6 text-3xl text-white md:text-5xl lg:text-6xl">{cta.title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-blue-100">{cta.subtitle}</p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={`https://wa.me/${number}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white shadow-xl transition-all hover:bg-[#20BA5A] active:scale-95"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#top"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-[#0A2A66] active:scale-95"
          >
            <Phone className="h-5 w-5" />
            Fale Conosco
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          {cta.features.map((f, i) => (
            <div key={f} className="flex items-center gap-2 text-sm text-blue-100">
              <span className={`h-2 w-2 rounded-full ${featureDots[i]}`} />
              {f}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
