'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const links = [
  { href: '#imoveis', label: 'Imóveis' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#contato', label: 'Contato' },
]

export function NavbarV3() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-white/90 shadow-[0_8px_30px_-12px_rgba(10,42,102,0.25)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/logo-kaizen.png?v=6"
            alt="Kaizen Soluções Imobiliárias"
            width={36}
            height={36}
            unoptimized
            className="h-9 w-9 object-contain"
          />
          <span className={`text-sm font-bold tracking-wide transition-colors ${scrolled ? 'text-[#0A2A66]' : 'text-white'}`}>
            Kaizen
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-[#0A2A66]/70 hover:text-[#1E4ED8]' : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
            scrolled
              ? 'bg-[#1E4ED8] text-white shadow-lg'
              : 'border border-white/40 bg-white/10 text-white backdrop-blur-sm'
          }`}
        >
          Fale com um Corretor
        </a>
      </div>
    </header>
  )
}
