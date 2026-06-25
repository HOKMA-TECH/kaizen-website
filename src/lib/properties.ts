export type Property = {
  id: string;
  title: string;
  neighborhood: string;
  city: string;
  price: string;
  type: string;
  status: "Venda" | "Lançamento" | "Exclusivo";
  beds: number;
  baths: number;
  area: number; // m²
  parking: number;
  blurb: string;
  image: string;
};

// Conteúdo de demonstração (mock) — fotos Unsplash, copy persuasiva fictícia.
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const PROPERTIES: Property[] = [
  {
    id: "kz-01",
    title: "Residencial Vila Kaizen",
    neighborhood: "Campo Grande (Centro)",
    city: "Rio de Janeiro",
    price: "R$ 489.000",
    type: "Apartamento 3 quartos",
    status: "Exclusivo",
    beds: 3,
    baths: 2,
    area: 78,
    parking: 1,
    blurb:
      "A poucos minutos do Calçadão e do West Shopping: varanda gourmet, lazer completo e portaria 24h.",
    image: img("photo-1545324418-cc1a3fa10c00"),
  },
  {
    id: "kz-02",
    title: "Casa Jardim das Acácias",
    neighborhood: "Campo Grande (Rio da Prata)",
    city: "Rio de Janeiro",
    price: "R$ 750.000",
    type: "Casa Duplex em Condomínio",
    status: "Venda",
    beds: 4,
    baths: 3,
    area: 180,
    parking: 2,
    blurb:
      "Condomínio fechado com segurança 24h, quintal amplo, área gourmet e acabamento impecável.",
    image: img("photo-1600596542815-ffad4c1539a9"),
  },
  {
    id: "kz-03",
    title: "Reserva do Maciço",
    neighborhood: "Senador Vasconcelos",
    city: "Rio de Janeiro",
    price: "R$ 320.000",
    type: "Casa Linear",
    status: "Venda",
    beds: 2,
    baths: 2,
    area: 95,
    parking: 2,
    blurb:
      "Casa linear reformada com terraço coberto, perto da estação e do comércio local. Pronta para morar.",
    image: img("photo-1600585154340-be6161a56a0c"),
  },
  {
    id: "kz-04",
    title: "Parque das Palmeiras",
    neighborhood: "Inhoaíba",
    city: "Rio de Janeiro",
    price: "R$ 265.000",
    type: "Apartamento 2 quartos",
    status: "Lançamento",
    beds: 2,
    baths: 1,
    area: 52,
    parking: 1,
    blurb:
      "Lançamento com condições facilitadas: use seu FGTS, financie pelo Minha Casa Minha Vida e saia do aluguel.",
    image: img("photo-1512917774080-9991f1c4c750"),
  },
  {
    id: "kz-05",
    title: "Villa Premium Pina",
    neighborhood: "Campo Grande (Pina)",
    city: "Rio de Janeiro",
    price: "R$ 949.000",
    type: "Casa de Alto Padrão",
    status: "Exclusivo",
    beds: 4,
    baths: 4,
    area: 260,
    parking: 4,
    blurb:
      "Alto padrão na região mais valorizada de Campo Grande: piscina, sauna, automação e energia solar.",
    image: img("photo-1564013799919-ab600027ffc6"),
  },
  {
    id: "kz-06",
    title: "Recanto de Guaratiba",
    neighborhood: "Guaratiba",
    city: "Rio de Janeiro",
    price: "R$ 398.000",
    type: "Casa com Quintal",
    status: "Venda",
    beds: 3,
    baths: 2,
    area: 140,
    parking: 2,
    blurb:
      "Verde, tranquilidade e espaço de sobra a minutos das praias da Zona Oeste. Ideal para a família crescer.",
    image: img("photo-1502672260266-1c1ef2d93688"),
  },
];

export const DIFFERENTIALS = [
  {
    title: "Especialistas em Campo Grande",
    desc: "Nascemos e atuamos na Zona Oeste. Conhecemos cada rua, condomínio e oportunidade da região.",
    icon: "map",
  },
  {
    title: "Atendimento ágil",
    desc: "Resposta rápida no WhatsApp e acompanhamento próximo do primeiro contato à entrega das chaves.",
    icon: "bolt",
  },
  {
    title: "Corretores credenciados",
    desc: "Equipe CRECI que negocia as melhores condições e cuida de toda a burocracia por você.",
    icon: "badge",
  },
  {
    title: "Visitas presenciais e virtuais",
    desc: "Conheça cada imóvel de onde estiver, com tours em vídeo e visitas guiadas no seu tempo.",
    icon: "vr",
  },
  {
    title: "Avaliação gratuita",
    desc: "Quer vender? Avaliamos seu imóvel sem custo e com preço de mercado real, baseado em dados.",
    icon: "chart",
  },
  {
    title: "Crédito e financiamento",
    desc: "Parceria com os principais bancos para aprovar seu financiamento com as menores taxas.",
    icon: "bank",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Conte o que você procura",
    desc: "Uma conversa rápida no WhatsApp para entender seu momento: comprar, vender ou investir.",
  },
  {
    step: "02",
    title: "Curadoria personalizada",
    desc: "Selecionamos só os imóveis que fazem sentido para o seu perfil e orçamento — sem enrolação.",
  },
  {
    step: "03",
    title: "Visitas sem compromisso",
    desc: "Agendamos visitas presenciais ou virtuais no seu horário, com corretor especializado na região.",
  },
  {
    step: "04",
    title: "Fechamento seguro",
    desc: "Cuidamos da documentação, financiamento e cartório até a entrega das chaves. Você só comemora.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Mariana e Rafael",
    role: "Compraram em Campo Grande",
    quote:
      "A Kaizen entendeu exatamente o que buscávamos. Em poucas semanas estávamos com as chaves do nosso primeiro lar. Atendimento impecável do início ao fim.",
  },
  {
    name: "Carlos Henrique",
    role: "Investidor na Zona Oeste",
    quote:
      "Profissionalismo e transparência em cada etapa. Fecharam um negócio acima das minhas expectativas e com total segurança jurídica.",
  },
  {
    name: "Família Oliveira",
    role: "Venderam e compraram com a Kaizen",
    quote:
      "Venderam nosso apartamento rápido e ainda encontraram a casa dos sonhos. Equipe que realmente se importa com a família.",
  },
];
