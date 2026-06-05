'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MascotProps {
  /** Caminho do PNG do mascote quando disponível */
  src?: string
  size?: number
  className?: string
  /** Animação de flutuar suave */
  float?: boolean
  alt?: string
  priority?: boolean
}

export default function Mascot({
  src = '/mascote-kaizen.png',
  size = 220,
  className,
  float = true,
  alt = 'Mascote da Kaizen Soluções Imobiliárias',
  priority = false,
}: MascotProps) {
  const [failed, setFailed] = useState(false)
  const reduce = useReducedMotion()

  const inner = failed ? (
    // Placeholder estilizado: bloco de vidro com monograma, mantém o espaço/composição
    <div
      className="relative flex items-center justify-center rounded-3xl glass shadow-glow"
      style={{ width: size, height: size }}
      aria-label={alt}
      role="img"
    >
      <Image
        src="/logo-kaizen.png?v=6"
        alt={alt}
        width={Math.round(size * 0.55)}
        height={Math.round(size * 0.55)}
        unoptimized
        className="object-contain drop-shadow-[0_8px_24px_rgba(59,130,246,0.45)]"
      />
    </div>
  ) : (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      onError={() => setFailed(true)}
      className="object-contain drop-shadow-[0_18px_40px_rgba(10,42,102,0.45)]"
    />
  )

  if (reduce || !float) {
    return <div className={cn('select-none', className)}>{inner}</div>
  }

  return (
    <motion.div
      className={cn('select-none', className)}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
    >
      {inner}
    </motion.div>
  )
}
