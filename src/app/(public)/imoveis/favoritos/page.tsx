'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Trash2 } from 'lucide-react'
import PropertyCard from '@/components/properties/PropertyCard'
import { Button } from '@/components/ui/button'
import Mascot from '@/components/brand/Mascot'
import type { Property } from '@/types'

const FAVORITES_KEY = 'favorite_properties'

export default function FavoritePropertiesPage() {
  const [loading, setLoading] = useState(true)
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([])
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    const readFavorites = () => {
      if (typeof window === 'undefined') return [] as string[]
      try {
        const raw = window.localStorage.getItem(FAVORITES_KEY)
        return raw ? (JSON.parse(raw) as string[]) : []
      } catch {
        return [] as string[]
      }
    }

    const loadFavorites = async () => {
      const slugs = readFavorites()
      setFavoriteSlugs(slugs)

      if (slugs.length === 0) {
        setProperties([])
        setLoading(false)
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabase = (await import('@/lib/supabase/client')).default() as any
      const { data } = await supabase
        .from('properties')
        .select('*')
        .in('slug', slugs)
        .eq('publication_status', 'published')
        .eq('active', true)

      const rows = (data ?? []) as Property[]
      const slugOrder = new Map(slugs.map((slug, index) => [slug, index]))
      rows.sort((a, b) => (slugOrder.get(a.slug) ?? 9999) - (slugOrder.get(b.slug) ?? 9999))
      setProperties(rows)
      setLoading(false)
    }

    loadFavorites()

    const onStorage = (event: StorageEvent) => {
      if (event.key === FAVORITES_KEY) {
        loadFavorites()
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const removedCount = useMemo(() => {
    return Math.max(0, favoriteSlugs.length - properties.length)
  }, [favoriteSlugs.length, properties.length])

  const clearFavorites = () => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(FAVORITES_KEY)
    setFavoriteSlugs([])
    setProperties([])
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="relative bg-gradient-deep bg-[length:200%_200%] animate-gradient-pan py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-[#3B82F6] text-sm font-semibold uppercase tracking-widest mb-3 block">Sua lista</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Imóveis Favoritos</h1>
            <p className="text-blue-100 text-lg">Acompanhe os imóveis que você marcou com o coração</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link href="/imoveis" className="inline-flex items-center gap-2 text-[#1E4ED8] hover:text-[#0A2A66] text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Voltar para imóveis
          </Link>

          {favoriteSlugs.length > 0 && (
            <Button variant="outline" onClick={clearFavorites}>
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar favoritos
            </Button>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-6">
          {loading ? 'Carregando...' : (
            <>
              <span className="font-semibold text-[#0A2A66]">{properties.length}</span>
              {properties.length === 1 ? ' imóvel disponível salvo' : ' imóveis disponíveis salvos'}
              {removedCount > 0 ? ` · ${removedCount} indisponível(is)` : ''}
            </>
          )}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 flex flex-col items-center">
            <Mascot size={170} className="mb-6" />
            <h3 className="text-2xl font-bold text-[#0A2A66] mb-2">Você ainda não tem favoritos</h3>
            <p className="text-gray-500 mb-6 max-w-md">Abra um imóvel e clique no coração para salvar aqui</p>
            <Link href="/imoveis">
              <Button className="active:scale-[0.98]">
                <Search className="h-4 w-4 mr-2" />
                Explorar imóveis
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
