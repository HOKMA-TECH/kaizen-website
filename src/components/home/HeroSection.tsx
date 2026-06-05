'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ArrowRight, MapPin } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Mascot from '@/components/brand/Mascot'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface HeroSectionProps {
  content?: Record<string, string>
}

export default function HeroSection({ content = {} }: HeroSectionProps) {
  const badge = content['hero_badge'] || 'Rio de Janeiro & Região'
  const title = content['hero_title'] || 'Realizando sonhos através do imóvel ideal'
  const subtitle = content['hero_subtitle'] || 'Encontre o imóvel perfeito com a expertise da Kaizen Soluções Imobiliárias. Casas, apartamentos, terrenos e muito mais em Campo Grande e toda região do Rio de Janeiro.'
  const btnPrimary = content['hero_btn_primary'] || 'Buscar Imóveis'
  const btnSecondary = content['hero_btn_secondary'] || 'Fale com um Corretor'
  const backgroundImage =
    content['hero_background_image'] ||
    content['backgroundImage'] ||
    content['background_image'] ||
    'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1920&q=80'

  const stats = [
    { value: content['hero_stat1_value'] || '3+', label: content['hero_stat1_label'] || 'Anos de Experiência' },
    { value: content['hero_stat2_value'] || '100+', label: content['hero_stat2_label'] || 'Famílias Atendidas' },
    { value: content['hero_stat3_value'] || '98%', label: content['hero_stat3_label'] || 'Clientes Satisfeitos' },
    { value: content['hero_stat4_value'] || '200+', label: content['hero_stat4_label'] || 'Imóveis Disponíveis' },
  ]

  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1])
  const opacityContent = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.4])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com parallax */}
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 will-change-transform">
        <Image
          src={backgroundImage}
          alt="Imagem de destaque da Kaizen"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlays em camadas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061A3F]/95 via-[#0A2A66]/80 to-[#1E4ED8]/60" />
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,0,0,0.35),_transparent_60%)]" />

      {/* Mascote — toque pontual (desktop) */}
      <Mascot
        size={190}
        priority
        className="hidden lg:block absolute right-10 bottom-28 z-10 opacity-95"
      />

      {/* Content */}
      <motion.div style={{ opacity: opacityContent }} className="relative z-20 container mx-auto w-full px-4 max-w-7xl pt-24 pb-16">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="w-full max-w-3xl mx-auto text-center px-1 sm:px-0"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 glass text-blue-100 text-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="h-4 w-4 text-[#3B82F6]" />
              {badge}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 break-words text-gradient"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/imoveis">
              <Button
                size="xl"
                className="bg-[#1E4ED8] hover:bg-white hover:text-[#0A2A66] text-white w-full sm:w-auto shadow-xl transition-all duration-300 group active:scale-[0.98]"
              >
                <Search className="h-5 w-5 mr-2" />
                {btnPrimary}
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0A2A66] w-full sm:w-auto transition-all duration-300 active:scale-[0.98]"
              >
                {btnSecondary}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer(0.08, 0.3)}
          initial="hidden"
          animate="show"
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="glass rounded-xl p-4 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-blue-200 text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="text-blue-200/70 text-xs uppercase tracking-widest">Role para ver mais</span>
        <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/70 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
