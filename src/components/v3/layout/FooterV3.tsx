'use client'

import Image from 'next/image'

export function FooterV3() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#06070d]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-kaizen.png?v=6"
                alt="Kaizen"
                width={34}
                height={34}
                unoptimized
                className="h-8 w-8 object-contain"
              />
              <span className="text-sm font-semibold tracking-wide">Kaizen Soluções Imobiliárias</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Realizando sonhos através do imóvel ideal. Campo Grande e toda a região do Rio de Janeiro.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="v3-eyebrow mb-3">Navegar</p>
              <ul className="space-y-2 text-white/60">
                <li><a href="#manifesto" className="hover:text-white">Manifesto</a></li>
                <li><a href="#diferenciais" className="hover:text-white">Diferenciais</a></li>
                <li><a href="#imoveis" className="hover:text-white">Imóveis</a></li>
              </ul>
            </div>
            <div>
              <p className="v3-eyebrow mb-3">Empresa</p>
              <ul className="space-y-2 text-white/60">
                <li><a href="#jornada" className="hover:text-white">Jornada</a></li>
                <li><a href="#cta" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <p className="v3-eyebrow mb-3">Preview</p>
              <p className="text-white/40">Versão experimental V3 · 3D</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Kaizen Soluções Imobiliárias.</span>
          <span>Experiência V3 — Next.js · Three.js · GSAP</span>
        </div>
      </div>
    </footer>
  )
}
