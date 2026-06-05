import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  /** Tema do texto: claro (sobre fundo escuro) ou escuro (sobre fundo claro) */
  tone?: 'light' | 'dark'
  className?: string
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <div className={cn(isCenter ? 'text-center mx-auto max-w-2xl' : 'text-left', 'mb-12', className)}>
      {label && (
        <span
          className={cn(
            'text-sm font-semibold uppercase tracking-widest mb-3 block',
            tone === 'light' ? 'text-[#3B82F6]' : 'text-[#1E4ED8]'
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight',
          tone === 'light' ? 'text-white' : 'text-[#0A2A66]'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-lg leading-relaxed', tone === 'light' ? 'text-blue-100' : 'text-gray-600')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
