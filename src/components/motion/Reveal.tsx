'use client'

import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { fadeUp, revealViewport, staggerContainer } from '@/lib/motion'

type RevealTag = 'div' | 'section' | 'ul' | 'li' | 'span'

interface RevealProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
  /** Quando true, vira container com stagger para filhos <RevealItem/> */
  stagger?: boolean
  as?: RevealTag
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  stagger = false,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduce) {
    const Tag = as as React.ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      variants={stagger ? staggerContainer() : variants}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

/** Item filho para usar dentro de um <Reveal stagger> */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = 'div',
}: Omit<RevealProps, 'stagger' | 'delay'>) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduce) {
    const Tag = as as React.ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  )
}
