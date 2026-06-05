'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle, Bed, Bath, Maximize2 } from 'lucide-react'
import Mascot from '@/components/brand/Mascot'
import { formatCurrency, formatArea, getPropertyStatusLabel } from '@/lib/utils'
import type { Property } from '@/types'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface CinematicHomeProps {
  content?: Record<string, string>
  featured: Property[]
  whatsapp: string
}

const chapters = ['Início', 'Manifesto', 'Seleção', 'Diferenciais', 'Convite']

export default function CinematicHome({ content = {}, featured, whatsapp }: CinematicHomeProps) {
  const [active, setActive] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(idx)) setActive(idx)
          }
        })
      },
      { threshold: 0.55 }
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setRef = (idx: number) => (el: HTMLElement | null) => {
    sectionRefs.current[idx] = el
  }

  const scrollTo = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#05070D] text-white">
      {/* Indicador de capítulos */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4">
        {chapters.map((label, i) => (
          <button
            key={label}
            onClick={() => scrollTo(i)}
            className="group flex items-center gap-3"
            aria-label={`Ir para ${label}`}
          >
            <span
              className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                active === i ? 'text-white opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-100'
              }`}
            >
              {label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                active === i ? 'w-10 bg-[#3B82F6]' : 'w-5 bg-white/30 group-hover:bg-white/60'
              }`}
            />
          </button>
        ))}
      </nav>

      <Opening content={content} setRef={setRef(0)} />
      <Manifesto content={content} setRef={setRef(1)} />
      <Selection featured={featured} setRef={setRef(2)} />
      <Differentials content={content} setRef={setRef(3)} />
      <Invitation content={content} whatsapp={whatsapp} setRef={setRef(4)} />
    </div>
  )
}

/* ----------------------------- Capítulo 1: Abertura ----------------------------- */

function Opening({ content, setRef }: { content: Record<string, string>; setRef: (el: HTMLElement | null) => void }) {
  const ref = useRef<HTMLElement | null>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, reduce ? 1.12 : 1.32])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.95])

  const bg =
    content['hero_background_image'] ||
    content['background_image'] ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80'
  const title = content['hero_title'] || 'Seu próximo endereço começa aqui'
  const subtitle =
    content['hero_subtitle'] ||
    'Imóveis selecionados em Campo Grande e toda a região do Rio de Janeiro — com a curadoria da Kaizen.'

  const words = title.split(' ')

  return (
    <section
      ref={(el) => {
        ref.current = el
        setRef(el)
      }}
      data-index={0}
      className="relative h-screen w-full overflow-hidden flex items-end"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <Image src={bg} alt="" fill priority quality={90} sizes="100vw" className="object-cover" />
      </motion.div>
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-[#05070D]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/40 to-transparent" />

      <div className="relative z-10 px-6 md:px-12 pb-24 max-w-5xl">
        <h1 className="text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.07 }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="mt-8 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Indicador de rolagem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Role</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-px bg-gradient-to-b from-white/70 to-transparent"
        />
      </motion.div>
    </section>
  )
}

/* ----------------------------- Capítulo 2: Manifesto ----------------------------- */

function Manifesto({ content, setRef }: { content: Record<string, string>; setRef: (el: HTMLElement | null) => void }) {
  const stats = [
    { value: content['hero_stat1_value'] || '3+', label: content['hero_stat1_label'] || 'Anos de experiência' },
    { value: content['hero_stat2_value'] || '100+', label: content['hero_stat2_label'] || 'Famílias atendidas' },
    { value: content['hero_stat3_value'] || '98%', label: content['hero_stat3_label'] || 'Clientes satisfeitos' },
    { value: content['hero_stat4_value'] || '200+', label: content['hero_stat4_label'] || 'Imóveis disponíveis' },
  ]

  const lines = [
    'Kaizen, em japonês,',
    'significa melhoria contínua.',
    'É assim que tratamos cada',
    'negociação: com cuidado,',
    'transparência e dedicação.',
  ]

  return (
    <section
      ref={setRef}
      data-index={1}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-28 bg-[#05070D]"
    >
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="relative z-10 max-w-5xl">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#3B82F6] mb-8 block">Manifesto</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="inline-block text-white/90"
                initial={{ y: '110%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>

      <div className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-5xl">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            className="bg-[#05070D] px-6 py-8"
          >
            <p className="text-4xl md:text-5xl font-bold text-white">{s.value}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-white/50">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------- Capítulo 3: Seleção (imóveis) ----------------------------- */

function Selection({ featured, setRef }: { featured: Property[]; setRef: (el: HTMLElement | null) => void }) {
  if (!featured || featured.length === 0) {
    return (
      <section ref={setRef} data-index={2} className="relative min-h-screen flex items-center justify-center px-6 bg-[#070A12]">
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#3B82F6] mb-6 block">Seleção</span>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">Imóveis chegando em breve</h2>
          <Link href="/imoveis" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            Ver portfólio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section ref={setRef} data-index={2} className="relative bg-[#070A12]">
      <div className="px-6 md:px-12 pt-28 pb-10 max-w-7xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#3B82F6] mb-4 block">Seleção</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl">
          Uma curadoria de lugares para viver
        </h2>
      </div>

      <div className="flex flex-col">
        {featured.map((property, i) => (
          <FeaturedSlide key={property.id} property={property} index={i} />
        ))}
      </div>

      <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <Link
          href="/imoveis"
          className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-semibold tracking-tight text-white/90 hover:text-white transition-colors"
        >
          Ver todos os imóveis
          <span className="grid place-items-center h-12 w-12 md:h-16 md:w-16 rounded-full border border-white/30 group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] transition-all">
            <ArrowUpRight className="h-6 w-6" />
          </span>
        </Link>
      </div>
    </section>
  )
}

function FeaturedSlide({ property, index }: { property: Property; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? '0%' : '-8%', reduce ? '0%' : '8%'])
  const imageUrl = property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80'

  return (
    <Link href={`/imoveis/${property.slug}`} className="group block">
      <div ref={ref} className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 -inset-y-[10%] will-change-transform">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/30 to-[#05070D]/20" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-10 bg-white/40" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#9DC0FF]">
                {getPropertyStatusLabel(property.status)}
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              {property.title}
            </h3>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70">
              <span className="inline-flex items-center gap-1.5 text-sm">
                <MapPin className="h-4 w-4 text-[#3B82F6]" />
                {property.neighborhood}, {property.city}
              </span>
              {property.area ? (
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <Maximize2 className="h-4 w-4 text-[#3B82F6]" />
                  {formatArea(property.area)}
                </span>
              ) : null}
              {property.bedrooms ? (
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <Bed className="h-4 w-4 text-[#3B82F6]" />
                  {property.bedrooms}
                </span>
              ) : null}
              {property.bathrooms ? (
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <Bath className="h-4 w-4 text-[#3B82F6]" />
                  {property.bathrooms}
                </span>
              ) : null}
            </div>
            <div className="mt-6 flex items-center gap-5">
              <span className="text-2xl md:text-3xl font-bold">
                {formatCurrency(property.price)}
                {property.status === 'aluguel' && <span className="text-base font-normal text-white/50">/mês</span>}
              </span>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 group-hover:gap-3 transition-all">
                Ver detalhes <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ----------------------------- Capítulo 4: Diferenciais ----------------------------- */

function Differentials({ content, setRef }: { content: Record<string, string>; setRef: (el: HTMLElement | null) => void }) {
  const defaults = [
    { t: 'Segurança garantida', d: 'Documentação verificada e transações seguras do início ao fim.' },
    { t: 'Atendimento premium', d: 'Suporte personalizado, cuidando de cada detalhe da negociação.' },
    { t: 'Agilidade real', d: 'Processos otimizados para você realizar seu sonho no menor tempo.' },
    { t: 'Corretores certificados', d: 'Equipe qualificada, com CRECI e vasta experiência de mercado.' },
  ]
  const items = [1, 2, 3, 4].map((n, i) => ({
    t: content[`diferenciais_${n}_title`] || defaults[i].t,
    d: content[`diferenciais_${n}_desc`] || defaults[i].d,
  }))

  return (
    <section ref={setRef} data-index={3} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-28 bg-[#05070D]">
      <div className="max-w-7xl mx-auto w-full">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#3B82F6] mb-10 block">Por que Kaizen</span>
        <div className="divide-y divide-white/10 border-t border-white/10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease }}
              className="group grid grid-cols-12 gap-4 items-baseline py-8 md:py-10"
            >
              <span className="col-span-2 md:col-span-1 text-sm text-white/40 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="col-span-10 md:col-span-5 text-2xl md:text-4xl font-semibold tracking-tight group-hover:text-[#9DC0FF] transition-colors">
                {item.t}
              </h3>
              <p className="col-span-12 md:col-span-6 text-white/60 leading-relaxed md:text-lg">
                {item.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Capítulo 5: Convite (CTA) ----------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

function Invitation({
  content,
  whatsapp,
  setRef,
}: {
  content: Record<string, string>
  whatsapp: string
  setRef: (el: HTMLElement | null) => void
}) {
  const title = content['cta_title'] || 'Vamos encontrar o seu lugar'
  const subtitle =
    content['cta_subtitle'] ||
    'Conte para a nossa equipe o que você procura. Cuidamos do resto, do primeiro contato às chaves na sua mão.'
  const number = (whatsapp || '5521999999999').replace(/\D/g, '') || '5521999999999'
  const msg = encodeURIComponent('Olá! Vim pelo site da Kaizen e gostaria de encontrar um imóvel.')

  return (
    <section
      ref={setRef}
      data-index={4}
      className="relative min-h-screen flex items-center justify-center text-center px-6 py-28 bg-gradient-to-b from-[#05070D] to-[#0A1838] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial" />
      <Mascot size={150} className="absolute bottom-6 right-6 md:right-16 opacity-90 hidden sm:block" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 max-w-3xl"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#3B82F6] mb-6 block">Convite</span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">{title}</h2>
        <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl mx-auto">{subtitle}</p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${number}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-full font-medium transition-all active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Falar no WhatsApp
          </a>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white hover:text-[#05070D] px-8 py-4 rounded-full font-medium transition-all active:scale-[0.98]"
          >
            Fale conosco
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
