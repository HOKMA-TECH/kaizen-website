'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const links = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#imoveis', label: 'Imóveis' },
  { href: '#jornada', label: 'Jornada' },
]

export function NavbarV3() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-500 md:px-6 ${
          scrolled ? 'v3-glass py-2' : 'py-2'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/logo-kaizen.png?v=6"
            alt="Kaizen"
            width={34}
            height={34}
            unoptimized
            className="h-8 w-8 object-contain"
          />
          <span className="text-sm font-semibold tracking-wide">
            Kaizen<span className="text-[var(--v3-cyan)]"> · V3</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="rounded-full bg-[var(--v3-cyan)] px-5 py-2 text-sm font-semibold text-[#06070d] transition-transform hover:scale-105 active:scale-95"
        >
          Fale conosco
        </a>
      </div>
    </header>
  )
}
