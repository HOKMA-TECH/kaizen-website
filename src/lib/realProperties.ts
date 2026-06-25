import { supabase } from "@/lib/supabase";

export type RealPropertyType =
  | "casa"
  | "apartamento"
  | "terreno"
  | "comercial"
  | "cobertura"
  | "sala";

export type RealPropertyStatus = "venda" | "aluguel" | "venda_aluguel";

export type RealProperty = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  type: RealPropertyType;
  status: RealPropertyStatus;
  price: number | null;
  rent_price: number | null;
  area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking_spaces: number | null;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  images: string[] | null;
  cover_image_url: string | null;
  features: string[] | null;
  featured: boolean | null;
  created_at: string;
};

const LIST_COLUMNS =
  "id, slug, title, type, status, price, rent_price, area, bedrooms, bathrooms, parking_spaces, neighborhood, city, state, images, cover_image_url, featured, created_at";

const DETAIL_COLUMNS = `${LIST_COLUMNS}, description, address, features`;

export const TYPE_LABELS: Record<RealPropertyType, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  comercial: "Comercial",
  cobertura: "Cobertura",
  sala: "Sala",
};

export const STATUS_LABELS: Record<RealPropertyStatus, string> = {
  venda: "Venda",
  aluguel: "Aluguel",
  venda_aluguel: "Venda e aluguel",
};

/** Opções para os selects de filtro. */
export const TYPE_OPTIONS = (Object.keys(TYPE_LABELS) as RealPropertyType[]).map((v) => ({
  value: v,
  label: TYPE_LABELS[v],
}));

export const STATUS_OPTIONS: { value: RealPropertyStatus; label: string }[] = [
  { value: "venda", label: "Venda" },
  { value: "aluguel", label: "Aluguel" },
];

export function formatPrice(p: RealProperty): string {
  const isRent = p.status === "aluguel";
  const value = isRent ? p.rent_price ?? p.price : p.price;
  if (value == null) return "Sob consulta";
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
  return isRent ? `${formatted}/mês` : formatted;
}

export function coverOf(p: RealProperty): string | null {
  return p.cover_image_url || p.images?.[0] || null;
}

/** Imóveis publicados, mais recentes primeiro. */
export async function getPublishedProperties(): Promise<RealProperty[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("properties")
    .select(LIST_COLUMNS)
    .eq("publication_status", "published")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[properties] list error:", error.message);
    return [];
  }
  return (data ?? []) as RealProperty[];
}

/** Destaques publicados (cai para os mais recentes se não houver featured). */
export async function getFeaturedProperties(limit = 6): Promise<RealProperty[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("properties")
    .select(LIST_COLUMNS)
    .eq("publication_status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[properties] featured error:", error.message);
    return [];
  }
  if (data && data.length > 0) return data as RealProperty[];
  // fallback: mais recentes
  const recent = await getPublishedProperties();
  return recent.slice(0, limit);
}

export async function getPropertyBySlug(slug: string): Promise<RealProperty | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("properties")
    .select(DETAIL_COLUMNS)
    .eq("slug", slug)
    .eq("publication_status", "published")
    .maybeSingle();
  if (error) {
    console.error("[properties] detail error:", error.message);
    return null;
  }
  return (data as RealProperty) ?? null;
}
