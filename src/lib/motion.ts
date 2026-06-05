import type { Variants, Transition } from 'framer-motion'

// Easing cinematográfico (mesmo já usado na Navbar)
export const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const baseTransition: Transition = { duration: 0.6, ease: cinematicEase }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: baseTransition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: baseTransition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: baseTransition },
}

// Container com stagger para listas/grids
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

// Viewport padrão para scroll reveal (anima uma vez, com margem)
export const revealViewport = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' } as const
