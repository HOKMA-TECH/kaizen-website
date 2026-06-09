// Conteúdo da V3 — copy idêntica à do site original; imóveis em conteúdo demo
// estático (o preview não depende do Supabase).

export type DemoProperty = {
  id: string
  slug: string
  title: string
  neighborhood: string
  city: string
  status: string
  price: string
  type: string
  beds: number
  baths: number
  parking: number
  area: number
  image: string
}

export const demoProperties: DemoProperty[] = [
  {
    id: 'cobertura-aurora',
    slug: 'cobertura-aurora',
    title: 'Cobertura Aurora',
    neighborhood: 'Recreio dos Bandeirantes',
    city: 'Rio de Janeiro',
    status: 'À venda',
    price: 'R$ 2.480.000',
    type: 'Cobertura',
    beds: 4,
    baths: 5,
    parking: 3,
    area: 320,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'residencia-horizonte',
    slug: 'residencia-horizonte',
    title: 'Residência Horizonte',
    neighborhood: 'Barra da Tijuca',
    city: 'Rio de Janeiro',
    status: 'À venda',
    price: 'R$ 3.150.000',
    type: 'Casa',
    beds: 5,
    baths: 6,
    parking: 4,
    area: 480,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'apartamento-lumen',
    slug: 'apartamento-lumen',
    title: 'Apartamento Lúmen',
    neighborhood: 'Campo Grande',
    city: 'Rio de Janeiro',
    status: 'À venda',
    price: 'R$ 890.000',
    type: 'Apartamento',
    beds: 3,
    baths: 2,
    parking: 2,
    area: 124,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
  },
]

// Hero — copy original
export const hero = {
  badge: 'Rio de Janeiro & Região',
  title: 'Realizando sonhos através do imóvel ideal',
  subtitle:
    'Encontre o imóvel perfeito com a expertise da Kaizen Soluções Imobiliárias. Casas, apartamentos, terrenos e muito mais em Campo Grande e toda região do Rio de Janeiro.',
  btnPrimary: 'Buscar Imóveis',
  btnSecondary: 'Fale com um Corretor',
  stats: [
    { value: '3+', label: 'Anos de Experiência' },
    { value: '100+', label: 'Famílias Atendidas' },
    { value: '98%', label: 'Clientes Satisfeitos' },
    { value: '200+', label: 'Imóveis Disponíveis' },
  ],
}

// Destaques — copy original
export const featured = {
  label: 'Destaques',
  title: 'Imóveis em Destaque',
  subtitle:
    'Confira nossa seleção especial de imóveis com as melhores oportunidades do mercado',
  btn: 'Ver Todos os Imóveis',
}

// Diferenciais — copy original (6 itens, mesmos ícones)
export const differentialsBlock = {
  label: 'Por que nos escolher',
  title: 'Nossos Diferenciais',
  subtitle:
    'Somos muito mais que uma imobiliária. Somos parceiros na realização do seu sonho',
}

export type DifferentialItem = {
  icon: 'shield' | 'star' | 'clock' | 'handshake' | 'trending' | 'award'
  title: string
  desc: string
}

export const differentials: DifferentialItem[] = [
  { icon: 'shield', title: 'Segurança Garantida', desc: 'Toda documentação verificada e transações seguras para sua tranquilidade.' },
  { icon: 'star', title: 'Atendimento Premium', desc: 'Suporte personalizado do início ao fim, cuidando de cada detalhe da sua negociação.' },
  { icon: 'clock', title: 'Agilidade no Processo', desc: 'Processos otimizados para que você realize seu sonho no menor tempo possível.' },
  { icon: 'handshake', title: 'Parceria de Confiança', desc: 'Mais de 10 anos construindo relacionamentos sólidos com nossos clientes.' },
  { icon: 'trending', title: 'Melhor Investimento', desc: 'Orientação especializada para garantir o melhor retorno no seu investimento imobiliário.' },
  { icon: 'award', title: 'Corretores Certificados', desc: 'Equipe altamente qualificada com certificação CRECI e vasta experiência no mercado.' },
]

// CTA — copy original
export const cta = {
  badge: 'Pronto para começar?',
  title: 'Encontre seu imóvel hoje mesmo',
  subtitle:
    'Nossa equipe de especialistas está pronta para ajudá-lo a encontrar o imóvel dos seus sonhos. Entre em contato agora mesmo!',
  features: ['Atendimento rápido', 'Corretores especializados', 'Visitas presenciais e virtuais'],
  whatsapp: '5521999999999',
  whatsappMsg: 'Olá! Gostaria de agendar uma visita a um imóvel da Kaizen Soluções Imobiliárias.',
}
