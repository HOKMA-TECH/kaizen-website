// Conteúdo demo/estático para o preview da V3 — não depende do Supabase.

export type DemoProperty = {
  id: string
  title: string
  location: string
  price: string
  type: string
  beds: number
  baths: number
  area: number
  image: string
}

export const demoProperties: DemoProperty[] = [
  {
    id: 'cobertura-aurora',
    title: 'Cobertura Aurora',
    location: 'Recreio dos Bandeirantes · RJ',
    price: 'R$ 2.480.000',
    type: 'Cobertura',
    beds: 4,
    baths: 5,
    area: 320,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1100&q=80',
  },
  {
    id: 'residencia-horizonte',
    title: 'Residência Horizonte',
    location: 'Barra da Tijuca · RJ',
    price: 'R$ 3.150.000',
    type: 'Casa',
    beds: 5,
    baths: 6,
    area: 480,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1100&q=80',
  },
  {
    id: 'apartamento-lumen',
    title: 'Apartamento Lúmen',
    location: 'Campo Grande · RJ',
    price: 'R$ 890.000',
    type: 'Apartamento',
    beds: 3,
    baths: 2,
    area: 124,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1100&q=80',
  },
  {
    id: 'loft-meridiano',
    title: 'Loft Meridiano',
    location: 'Centro · RJ',
    price: 'R$ 740.000',
    type: 'Loft',
    beds: 1,
    baths: 1,
    area: 78,
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1100&q=80',
  },
]

export const differentials = [
  {
    title: 'Curadoria humana',
    desc: 'Cada imóvel é visitado e validado pela nossa equipe antes de chegar até você.',
    metric: '100%',
    metricLabel: 'verificados',
  },
  {
    title: 'Decisão com dados',
    desc: 'Avaliação de mercado, liquidez e potencial de valorização em um só lugar.',
    metric: '+12k',
    metricLabel: 'análises',
  },
  {
    title: 'Do interesse à chave',
    desc: 'Acompanhamento jurídico e financeiro completo até a assinatura.',
    metric: '0',
    metricLabel: 'surpresas',
  },
]

export const journeySteps = [
  { n: '01', title: 'Conheça', desc: 'Conte o que você procura. Entendemos seu momento, não só seu orçamento.' },
  { n: '02', title: 'Selecione', desc: 'Recebe uma curadoria enxuta — só o que faz sentido para você.' },
  { n: '03', title: 'Visite', desc: 'Agendamos visitas guiadas, presenciais ou imersivas.' },
  { n: '04', title: 'Realize', desc: 'Fechamos com segurança jurídica do primeiro contato à entrega das chaves.' },
]
