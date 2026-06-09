'use client'

import Image from 'next/image'

export function FooterV3() {
  return (
    <footer className="relative z-10 bg-[#0A2A66] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-kaizen.png?v=6"
                alt="Kaizen"
                width={36}
                height={36}
                unoptimized
                className="h-9 w-9 object-contain"
              />
              <span className="text-sm font-bold tracking-wide">Kaizen Soluções Imobiliárias</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-blue-100/70">
              Realizando sonhos através do imóvel ideal. Campo Grande e toda a região do Rio de Janeiro.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">Navegar</p>
              <ul className="space-y-2 text-blue-100/70">
                <li><a href="#imoveis" className="hover:text-white">Imóveis</a></li>
                <li><a href="#diferenciais" className="hover:text-white">Diferenciais</a></li>
                <li><a href="#contato" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">Empresa</p>
              <ul className="space-y-2 text-blue-100/70">
                <li>Campo Grande · RJ</li>
                <li>CRECI certificado</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">Preview</p>
              <p className="text-blue-100/50">Versão experimental V3</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-blue-100/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Kaizen Soluções Imobiliárias.</span>
          <span>Experiência V3 — Next.js · GSAP</span>
        </div>
      </div>
    </footer>
  )
}
