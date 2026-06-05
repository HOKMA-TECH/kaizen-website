'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, RotateCcw, MessageCircle, MapPin, Bed, Maximize2, Sparkles } from 'lucide-react'
import Mascot from '@/components/brand/Mascot'
import { formatCurrency, formatArea, getPropertyTypeLabel } from '@/lib/utils'
import type { Property } from '@/types'

interface Props {
  properties: Property[]
  whatsapp: string
}

type Answers = { deal?: string; type?: string; neighborhood?: string; price?: string }
type Option = { label: string; value: string }

const PRICE_BUCKETS: Record<string, (p: number) => boolean> = {
  ate300: (p) => p <= 300_000,
  m300_600: (p) => p > 300_000 && p <= 600_000,
  m600_1m: (p) => p > 600_000 && p <= 1_000_000,
  acima1m: (p) => p > 1_000_000,
  any: () => true,
}

export default function ConciergeExperience({ properties, whatsapp }: Props) {
  const [answers, setAnswers] = useState<Answers>({})
  const [step, setStep] = useState(0)
  const [thinking, setThinking] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const neighborhoods = useMemo(() => {
    const set = new Map<string, number>()
    properties.forEach((p) => set.set(p.neighborhood, (set.get(p.neighborhood) ?? 0) + 1))
    return Array.from(set.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([n]) => n)
  }, [properties])

  const steps = useMemo(
    () => [
      {
        key: 'deal' as const,
        prompt: 'Oi! Eu sou o Kai 😎. Vou achar o seu lugar em segundos. Você quer comprar ou alugar?',
        options: [
          { label: '🏠 Comprar', value: 'venda' },
          { label: '🔑 Alugar', value: 'aluguel' },
          { label: 'Tanto faz', value: 'any' },
        ] as Option[],
      },
      {
        key: 'type' as const,
        prompt: 'Show. Que tipo de imóvel combina com você?',
        options: [
          { label: 'Casa', value: 'casa' },
          { label: 'Apartamento', value: 'apartamento' },
          { label: 'Cobertura', value: 'cobertura' },
          { label: 'Terreno', value: 'terreno' },
          { label: 'Tanto faz', value: 'any' },
        ] as Option[],
      },
      {
        key: 'neighborhood' as const,
        prompt: 'Tem uma região preferida?',
        options: [...neighborhoods.map((n) => ({ label: n, value: n })), { label: 'Qualquer região', value: 'any' }] as Option[],
      },
      {
        key: 'price' as const,
        prompt: 'Por último: qual a faixa de preço?',
        options: [
          { label: 'Até R$ 300 mil', value: 'ate300' },
          { label: 'R$ 300–600 mil', value: 'm300_600' },
          { label: 'R$ 600 mil – 1 mi', value: 'm600_1m' },
          { label: 'Acima de R$ 1 mi', value: 'acima1m' },
          { label: 'Tanto faz', value: 'any' },
        ] as Option[],
      },
    ],
    [neighborhoods]
  )

  const labelFor = (stepIndex: number, value: string) =>
    steps[stepIndex].options.find((o) => o.value === value)?.label ?? value

  const results = useMemo(() => {
    if (step < steps.length) return []
    const matches = (relaxPrice: boolean) =>
      properties.filter((p) => {
        if (answers.deal && answers.deal !== 'any') {
          const ok = answers.deal === 'venda' ? p.status === 'venda' || p.status === 'venda_aluguel' : p.status === 'aluguel' || p.status === 'venda_aluguel'
          if (!ok) return false
        }
        if (answers.type && answers.type !== 'any' && p.type !== answers.type) return false
        if (answers.neighborhood && answers.neighborhood !== 'any' && p.neighborhood !== answers.neighborhood) return false
        if (!relaxPrice && answers.price && answers.price !== 'any' && !PRICE_BUCKETS[answers.price](p.price)) return false
        return true
      })
    const strict = matches(false)
    return strict.length > 0 ? strict.slice(0, 4) : matches(true).slice(0, 4)
  }, [step, steps.length, answers, properties])

  useEffect(() => {
    const el = scrollerRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [step, thinking])

  const choose = (value: string) => {
    const key = steps[step].key
    setAnswers((a) => ({ ...a, [key]: value }))
    setThinking(true)
    window.setTimeout(() => {
      setThinking(false)
      setStep((s) => s + 1)
    }, 650)
  }

  const reset = () => {
    setAnswers({})
    setStep(0)
    setThinking(false)
  }

  const done = step >= steps.length

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 relative overflow-hidden">
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-[#3B82F6]/25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#22D3EE]/20 blur-[120px]" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-5 md:px-8 h-16 border-b border-white/5">
        <Link href="/v" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <ArrowLeft className="h-4 w-4" /> versões
        </Link>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
          <Sparkles className="h-3.5 w-3.5 text-[#22D3EE]" /> Concierge Kaizen
        </span>
        <button onClick={reset} className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <RotateCcw className="h-4 w-4" /> recomeçar
        </button>
      </header>

      <div ref={scrollerRef} className="relative z-10 mx-auto max-w-2xl px-4 md:px-6 pt-8 pb-44 h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Histórico */}
        {steps.slice(0, step).map((s, i) => (
          <div key={s.key} className="mb-6">
            <BotBubble>{s.prompt}</BotBubble>
            <UserBubble>{labelFor(i, answers[s.key] ?? '')}</UserBubble>
          </div>
        ))}

        {/* Pergunta atual */}
        {!done && !thinking && (
          <div className="mb-6">
            <BotBubble>{steps[step].prompt}</BotBubble>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-3 flex flex-wrap gap-2 pl-12"
            >
              {steps[step].options.map((o) => (
                <button
                  key={o.value}
                  onClick={() => choose(o.value)}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-[#3B82F6] hover:bg-[#3B82F6]/15 hover:text-white transition-all active:scale-95"
                >
                  {o.label}
                </button>
              ))}
            </motion.div>
          </div>
        )}

        {thinking && <Typing />}

        {/* Resultados */}
        {done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <BotBubble>
              {results.length > 0
                ? `Achei ${results.length} ${results.length === 1 ? 'imóvel' : 'imóveis'} com a sua cara 👇`
                : 'Ainda não temos algo exatamente assim no ar — mas posso te avisar assim que chegar!'}
            </BotBubble>

            <div className="mt-4 pl-0 md:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={`/imoveis/${p.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:border-[#3B82F6]/50 transition-all"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'}
                        alt={p.title}
                        fill
                        sizes="(max-width:768px) 100vw, 320px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 rounded-full bg-[#0B1020]/80 backdrop-blur px-2.5 py-1 text-[11px] text-[#9DC0FF]">
                        {getPropertyTypeLabel(p.type)}
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-[#9DC0FF]">{formatCurrency(p.price)}</p>
                      <p className="text-sm text-slate-200 line-clamp-1">{p.title}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{p.neighborhood}</span>
                        {p.area ? <span className="inline-flex items-center gap-1"><Maximize2 className="h-3 w-3" />{formatArea(p.area)}</span> : null}
                        {p.bedrooms ? <span className="inline-flex items-center gap-1"><Bed className="h-3 w-3" />{p.bedrooms}</span> : null}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pl-0 md:pl-12 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${(whatsapp || '5521999999999').replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Conversei com o Kai no site e quero ver imóveis.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:brightness-110 transition-all active:scale-95"
              >
                <MessageCircle className="h-4 w-4" /> Falar com um corretor
              </a>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm hover:bg-white/5 transition-all active:scale-95"
              >
                <RotateCcw className="h-4 w-4" /> Nova busca
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5 h-9 w-9 rounded-full bg-gradient-to-br from-[#1E4ED8] to-[#22D3EE] p-[2px]">
        <div className="h-full w-full rounded-full bg-[#0B1020] grid place-items-center overflow-hidden">
          <Mascot size={30} float={false} />
        </div>
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/10 px-4 py-3 text-[15px] leading-relaxed max-w-[85%]">
        {children}
      </div>
    </motion.div>
  )
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex justify-end">
      <div className="rounded-2xl rounded-tr-sm bg-[#3B82F6] text-white px-4 py-2.5 text-sm font-medium max-w-[85%]">
        {children}
      </div>
    </motion.div>
  )
}

function Typing() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#1E4ED8] to-[#22D3EE] p-[2px]">
        <div className="h-full w-full rounded-full bg-[#0B1020] grid place-items-center overflow-hidden">
          <Mascot size={30} float={false} />
        </div>
      </div>
      <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-slate-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}
