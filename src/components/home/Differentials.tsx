import React from 'react'
import { Shield, Star, Clock, HeartHandshake, TrendingUp, Award } from 'lucide-react'
import SectionHeading from '@/components/ui/section-heading'
import { Reveal, RevealItem } from '@/components/motion/Reveal'

interface DifferentialsProps {
  content?: Record<string, string>
}

const icons = [Shield, Star, Clock, HeartHandshake, TrendingUp, Award]
const colors = ['bg-blue-50', 'bg-indigo-50', 'bg-sky-50', 'bg-blue-50', 'bg-indigo-50', 'bg-sky-50']
const iconColors = ['text-[#1E4ED8]', 'text-[#0A2A66]', 'text-[#3B82F6]', 'text-[#1E4ED8]', 'text-[#0A2A66]', 'text-[#3B82F6]']

const defaultTitles = [
  'Segurança Garantida', 'Atendimento Premium', 'Agilidade no Processo',
  'Parceria de Confiança', 'Melhor Investimento', 'Corretores Certificados',
]
const defaultDescs = [
  'Toda documentação verificada e transações seguras para sua tranquilidade.',
  'Suporte personalizado do início ao fim, cuidando de cada detalhe da sua negociação.',
  'Processos otimizados para que você realize seu sonho no menor tempo possível.',
  'Mais de 10 anos construindo relacionamentos sólidos com nossos clientes.',
  'Orientação especializada para garantir o melhor retorno no seu investimento imobiliário.',
  'Equipe altamente qualificada com certificação CRECI e vasta experiência no mercado.',
]

export default function Differentials({ content = {} }: DifferentialsProps) {
  const label = content['diferenciais_label'] || 'Por que nos escolher'
  const title = content['diferenciais_title'] || 'Nossos Diferenciais'
  const subtitle = content['diferenciais_subtitle'] || 'Somos muito mais que uma imobiliária. Somos parceiros na realização do seu sonho'

  const differentials = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    icon: icons[i],
    title: content[`diferenciais_${n}_title`] || defaultTitles[i],
    description: content[`diferenciais_${n}_desc`] || defaultDescs[i],
    color: colors[i],
    iconColor: iconColors[i],
  }))

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <SectionHeading label={label} title={title} subtitle={subtitle} />
        </Reveal>

        <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <RevealItem
              key={index}
              className="group relative p-6 rounded-2xl border border-gray-100 hover:border-[#1E4ED8]/30 hover:shadow-card-hover transition-all duration-300 bg-white hover:-translate-y-1.5 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0A2A66] via-[#1E4ED8] to-[#3B82F6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`h-7 w-7 ${item.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-[#0A2A66] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
