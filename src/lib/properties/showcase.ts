import 'server-only'

import createServerClient from '@/lib/supabase/server'
import type { Property } from '@/types'

/**
 * Busca imóveis publicados para as experiências experimentais (/v/*).
 * Retorna [] em qualquer falha para que a UI sempre renderize.
 */
export async function getShowcaseProperties(limit = 12): Promise<Property[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerClient() as any
    const { data } = await supabase
      .from('properties')
      .select(
        'id, slug, title, description, type, status, price, area, bedrooms, bathrooms, parking_spaces, address, neighborhood, city, state, latitude, longitude, images, featured, created_at'
      )
      .eq('publication_status', 'published')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit)

    return (data ?? []) as Property[]
  } catch {
    return []
  }
}
