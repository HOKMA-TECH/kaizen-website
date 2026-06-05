import React from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Mascot from '@/components/brand/Mascot'
import { Reveal } from '@/components/motion/Reveal'

interface CallToActionProps {
  content?: Record<string, string>
}

export default function CallToAction({ content = {} }: CallToActionProps) {
  const badge = content['cta_badge'] || 'Pronto para começar?'
  const title = content['cta_title'] || 'Encontre seu imóvel hoje mesmo'
  const subtitle = content['cta_subtitle'] || 'Nossa equipe de especialistas está pronta para ajudá-lo a encontrar o imóvel dos seus sonhos. Entre em contato agora mesmo!'
  const whatsappNumberRaw = content['contact_whatsapp'] || content['cta_whatsapp'] || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5521999999999'
  const whatsappNumber = whatsappNumberRaw.replace(/\D/g, '') || '5521999999999'
  const feature1 = content['cta_feature1'] || 'Atendimento rápido'
  const feature2 = content['cta_feature2'] || 'Corretores especializados'
  const feature3 = content['cta_feature3'] || 'Visitas presenciais e virtuais'

  const whatsappMsg = 'Olá! Gostaria de agendar uma visita a um imóvel da Kaizen Soluções Imobiliárias.'

  return (
    <section className="py-24 bg-gradient-deep bg-[length:200%_200%] animate-gradient-pan relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 bg-gradient-radial" />

      {/* Mascote — toque pontual */}
      <Mascot size={160} className="hidden md:block absolute left-8 bottom-0 z-10 opacity-95" />

      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div>
            <span className="inline-block glass text-blue-100 text-sm px-4 py-2 rounded-full mb-6">
              {badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">{subtitle}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="xl" className="bg-[#25D366] hover:bg-[#20BA5A] text-white w-full sm:w-auto shadow-xl group active:scale-[0.98]">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Link href="/contato">
              <Button size="xl" variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0A2A66] w-full sm:w-auto transition-all duration-300 active:scale-[0.98]">
                <Phone className="h-5 w-5 mr-2" />
                Fale Conosco
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />{feature1}
            </div>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />{feature2}
            </div>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />{feature3}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
