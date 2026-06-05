# Kaizen Redesign v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar todo o site público da Kaizen (home, imóveis, blog, sobre, contato + shell) com um visual cinematográfico, moderno e animado, incorporando logo e mascote, **sem tocar nos contratos de dados/CMS/admin** e **sem afetar produção** (trabalho 100% na branch `redesign-v2` → preview Vercel).

**Architecture:** Refactor de apresentação. Adicionamos uma camada de design system (tokens Tailwind + globals), um módulo central de motion (Framer Motion), componentes reutilizáveis (`Reveal`, `Mascot`, `SectionHeading`) e então reescrevemos o JSX/estilo de cada componente público preservando integralmente queries Supabase, props `content`, `section-mapper`, metadata e rotas.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion 11, Supabase, lucide-react, Montserrat/Inter (next/font).

---

## Notas de verificação (ler antes de começar)

Este é um trabalho **visual**, não há testes unitários significativos. A verificação de cada task é:

1. **Build/type/lint passa:** `npm run build` (ou `npx tsc --noEmit` para checagem rápida de tipos) e `npm run lint`.
2. **Verificação visual:** `npm run dev` e abrir a rota afetada em `http://localhost:3000`.
3. **Regra de ouro (não quebrar dados):** nunca alterar queries Supabase, nomes de chaves em `content[...]`, props, `section-mapper`, metadata ou rotas. Só muda JSX/classes/animação.
4. **Acessibilidade:** todo movimento novo deve degradar com `prefers-reduced-motion` (usaremos o helper `useReducedMotion` do Framer Motion ou variantes do módulo `motion.ts`).

Commits frequentes, um por task. Mensagens em português, prefixo `feat:`/`style:`/`refactor:`.

---

## File Structure

**Novos arquivos (fundação compartilhada):**
- `src/lib/motion.ts` — variantes Framer Motion reutilizáveis + easing cinematográfico.
- `src/components/motion/Reveal.tsx` — wrapper de scroll reveal (`whileInView`), respeita reduced-motion.
- `src/components/brand/Mascot.tsx` — mascote reutilizável com placeholder até o PNG chegar.
- `src/components/ui/section-heading.tsx` — cabeçalho de seção (label + título + subtítulo) padronizado.
- `src/app/not-found.tsx` — página 404 com mascote (se ainda não existir; verificar antes).

**Modificados (apresentação):**
- `tailwind.config.ts` — novos tokens (gradientes, sombras, keyframes, blur).
- `src/app/globals.css` — utilitários do design system (glass, text-gradient, reduced-motion).
- `src/components/ui/button.tsx` — refinamento de variantes/sombras (mantém API).
- Shell: `src/components/layout/Navbar.tsx`, `Footer.tsx`, `WhatsAppButton.tsx`, `src/app/(public)/loading.tsx`.
- Home: `src/components/home/HeroSection.tsx`, `FeaturedProperties.tsx`, `Differentials.tsx`, `CallToAction.tsx`.
- Imóveis: `src/components/properties/PropertyCard.tsx`, `PropertyFilter.tsx`, `src/app/(public)/imoveis/page.tsx`, `src/app/(public)/imoveis/[slug]/page.tsx`, `src/app/(public)/imoveis/favoritos/page.tsx`.
- Blog: `src/app/(public)/blog/page.tsx`, `src/app/(public)/blog/[slug]/page.tsx`.
- Institucional: `src/app/(public)/sobre/page.tsx`, `src/app/(public)/contato/page.tsx`, `src/components/contact/ContactFormClient.tsx`.

---

## Task 1: Fundação do design system (tokens Tailwind + globals)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Estender tokens no Tailwind**

Em `tailwind.config.ts`, dentro de `theme.extend`, **adicionar** (sem remover nada existente) ao objeto `backgroundImage`, `boxShadow`, `keyframes`, `animation` e um novo `backdropBlur`/`blur` se necessário:

```ts
// backgroundImage — adicionar estas chaves às já existentes:
'gradient-radial': 'radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.25) 0%, rgba(10,42,102,0) 70%)',
'gradient-deep': 'linear-gradient(160deg, #061A3F 0%, #0A2A66 45%, #153AAC 100%)',
'gradient-sheen': 'linear-gradient(110deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 70%)',

// boxShadow — adicionar:
'glow': '0 0 40px rgba(59,130,246,0.35)',
'card-hover': '0 20px 50px -12px rgba(10,42,102,0.35)',

// keyframes — adicionar:
'float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
'shimmer': { '100%': { transform: 'translateX(100%)' } },
'gradient-pan': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },

// animation — adicionar:
'float': 'float 6s ease-in-out infinite',
'shimmer': 'shimmer 2.2s infinite',
'gradient-pan': 'gradient-pan 12s ease infinite',
```

- [ ] **Step 2: Adicionar utilitários ao globals.css**

No final de `src/app/globals.css`, adicionar:

```css
@layer utilities {
  .glass {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  .glass-light {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  .text-gradient {
    background: linear-gradient(120deg, #ffffff 0%, #bcd0ff 60%, #3B82F6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .text-gradient-blue {
    background: linear-gradient(120deg, #0A2A66 0%, #1E4ED8 60%, #3B82F6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

/* Respeita usuários que pedem menos movimento */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build conclui sem erros.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: tokens e utilitarios do design system v2 (glass, gradientes, reduced-motion)"
```

---

## Task 2: Módulo central de motion

**Files:**
- Create: `src/lib/motion.ts`

- [ ] **Step 1: Criar o módulo de variantes**

Criar `src/lib/motion.ts`:

```ts
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
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion.ts
git commit -m "feat: modulo central de variantes Framer Motion"
```

---

## Task 3: Componente Reveal (scroll reveal reutilizável)

**Files:**
- Create: `src/components/motion/Reveal.tsx`

- [ ] **Step 1: Criar o componente**

Criar `src/components/motion/Reveal.tsx`:

```tsx
'use client'

import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { fadeUp, revealViewport, staggerContainer } from '@/lib/motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
  /** Quando true, vira container com stagger para filhos <Reveal.Item/> */
  stagger?: boolean
  as?: 'div' | 'section' | 'ul' | 'li' | 'span'
}

export function Reveal({ children, className, variants = fadeUp, delay = 0, stagger = false, as = 'div' }: RevealProps) {
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
export function RevealItem({ children, className, variants = fadeUp, as = 'div' }: Omit<RevealProps, 'stagger' | 'delay'>) {
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
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/Reveal.tsx
git commit -m "feat: componente Reveal para scroll reveal acessivel"
```

---

## Task 4: Componente Mascot (com placeholder)

**Files:**
- Create: `src/components/brand/Mascot.tsx`

Decisão: mascote por **placeholder** até o PNG chegar. O componente lê `/mascote-kaizen.png` se existir, senão mostra um placeholder estilizado (monograma flutuante). A troca futura é só colocar o arquivo em `public/mascote-kaizen.png`.

- [ ] **Step 1: Criar o componente**

Criar `src/components/brand/Mascot.tsx`:

```tsx
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
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros. (O `onError` em `next/image` é suportado; se o arquivo não existir em build, o fallback assume em runtime.)

- [ ] **Step 3: Verificação visual**

`npm run dev`, criar uso temporário ou checar via Storybook não-existente — pular: será validado nas tasks que consomem o Mascot (Task 6, 8, 11, 14).

- [ ] **Step 4: Commit**

```bash
git add src/components/brand/Mascot.tsx
git commit -m "feat: componente Mascot com fallback de placeholder"
```

---

## Task 5: SectionHeading reutilizável

**Files:**
- Create: `src/components/ui/section-heading.tsx`

- [ ] **Step 1: Criar o componente**

Criar `src/components/ui/section-heading.tsx`:

```tsx
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
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/section-heading.tsx
git commit -m "feat: componente SectionHeading reutilizavel"
```

---

## Task 6: Hero cinematográfico (Home)

**Files:**
- Modify: `src/components/home/HeroSection.tsx`

**Preservar:** todas as chaves `content['hero_*']`, os links `/imoveis` e `/contato`, o array `stats`, a imagem de fundo via `backgroundImage`. Só muda visual + animação + adicionar mascote pontual.

- [ ] **Step 1: Reescrever o Hero**

Transformar `HeroSection.tsx` em client component cinematográfico mantendo a lógica de conteúdo. Diretrizes concretas:
- Tornar `'use client'` (necessário para parallax/motion).
- Manter leitura de `content` e `stats` exatamente como hoje.
- Fundo: `Image` com `fill` + overlay em camadas (`bg-gradient-deep` + `bg-gradient-radial`) + uma grade/vinheta sutil.
- Parallax suave do fundo usando `useScroll`+`useTransform` do Framer Motion (degradar com `useReducedMotion`).
- Entrada do conteúdo com `staggerContainer`/`fadeUp` (badge → título → subtítulo → botões → stats).
- Título usa `text-gradient` para destaque.
- Stats em cartões `.glass`.
- Adicionar `<Mascot size={180} className="hidden lg:block absolute right-8 bottom-24" />` como toque pontual (não cobre o texto).

Exemplo do esqueleto de parallax (aplicar ao container do fundo):

```tsx
'use client'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import Mascot from '@/components/brand/Mascot'
// ...
const ref = useRef<HTMLElement>(null)
const reduce = useReducedMotion()
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
const yBg = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
// <section ref={ref}> ... <motion.div style={{ y: yBg }} className="absolute inset-0"> <Image .../> </motion.div>
// conteúdo: <motion.div variants={staggerContainer()} initial="hidden" animate="show"> ... itens com variants={fadeUp} </motion.div>
```

Manter os botões com os mesmos textos/links; refinar com `whileHover`/`whileTap` (scale 1.03 / 0.97).

- [ ] **Step 2: Verificar build + visual**

Run: `npm run build` (Expected: passa). Depois `npm run dev` e abrir `/` — hero anima na entrada, parallax ao rolar, mascote visível em desktop, stats em vidro, textos idênticos aos atuais.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/HeroSection.tsx
git commit -m "feat: hero cinematografico com parallax, glass e mascote"
```

---

## Task 7: FeaturedProperties + PropertyCard premium

**Files:**
- Modify: `src/components/properties/PropertyCard.tsx`
- Modify: `src/components/home/FeaturedProperties.tsx`

**Preservar:** query Supabase em `FeaturedProperties` (campos, filtros `publication_status='published'`, `featured=true`, limit 3), tipos `Property`, props, textos `content['destaques_*']`, o link `/imoveis` e a rota `/imoveis/${property.slug}` no card.

- [ ] **Step 1: PropertyCard premium**

Em `PropertyCard.tsx` manter toda a lógica/dados. Refinar visual:
- Card com `rounded-2xl`, borda sutil, `hover:shadow-card-hover`, `hover:-translate-y-1.5` (transição suave).
- Imagem com zoom no hover (já existe `group-hover:scale-105`) + um overlay gradiente no rodapé da imagem para legibilidade dos badges.
- Badges com leve `backdrop-blur`.
- Preço com `text-gradient-blue`.
- Botão "Ver Detalhes" com seta que desliza no hover (ícone `ArrowRight` de lucide, `group-hover:translate-x-1`).
Não envolver em `motion` aqui (o reveal vem do pai); manter como componente apresentacional.

- [ ] **Step 2: FeaturedProperties com reveal/stagger**

Em `FeaturedProperties.tsx` manter o `useEffect`/query. Trocar o cabeçalho manual por `<SectionHeading label={label} title={title} subtitle={subtitle} />`. Envolver o grid com `<Reveal stagger>` e cada card com `<RevealItem>`. Manter skeleton de loading (refinar com `animate-shimmer` opcional). Botão "Ver Todos" mantém texto/link.

- [ ] **Step 3: Build + visual**

Run: `npm run build` (passa) e `npm run dev` → `/`: cards entram com stagger ao rolar, hover premium, dados idênticos.

- [ ] **Step 4: Commit**

```bash
git add src/components/properties/PropertyCard.tsx src/components/home/FeaturedProperties.tsx
git commit -m "feat: cards de imovel premium com reveal e stagger"
```

---

## Task 8: Differentials + CallToAction

**Files:**
- Modify: `src/components/home/Differentials.tsx`
- Modify: `src/components/home/CallToAction.tsx`

**Preservar:** chaves `content['diferenciais_*']` e `content['cta_*']`, lógica de WhatsApp em `CallToAction` (montagem da URL e `whatsappMsg`), ícones e textos default.

- [ ] **Step 1: Differentials**

Manter os 6 itens e textos. Trocar cabeçalho por `<SectionHeading>`. Envolver o grid em `<Reveal stagger>` + `<RevealItem>` por card. Refinar card: ícone em "pill" com gradiente sutil, `hover:-translate-y-1`, `hover:shadow-card-hover`, borda que acende para `#1E4ED8/30`. Sem mudar conteúdo.

- [ ] **Step 2: CallToAction com mascote**

Manter lógica de WhatsApp/links e textos. Visual: fundo `bg-gradient-deep` com `animate-gradient-pan` (degradado em movimento lento) + blobs já existentes. Adicionar `<Mascot size={160} className="hidden md:block absolute left-8 bottom-0" />` como toque pontual. Conteúdo central envolto em `<Reveal>`. Botões com micro-interação (`whileHover`/`whileTap` via wrapper motion ou classes de transform).

- [ ] **Step 3: Build + visual**

Run: `npm run build` (passa) e `npm run dev` → `/`: diferenciais entram com stagger; CTA com gradiente animado e mascote; WhatsApp continua abrindo com a mensagem correta.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/Differentials.tsx src/components/home/CallToAction.tsx
git commit -m "feat: diferenciais com stagger e CTA cinematografico com mascote"
```

---

## Task 9: Navbar com scroll-aware + transições

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

**Preservar:** props `navLinks`, prefetch, lógica de `isRouteTransitioning`, menu mobile, link de login, `pathname` ativo, a barra de transição de rota.

- [ ] **Step 1: Tornar a navbar scroll-aware**

Adicionar estado `scrolled` via listener de scroll (ou `useScroll`): no topo (`scrollY < 24`) a navbar fica translúcida (`bg-[#0A2A66]/70 backdrop-blur` + sem borda); ao rolar, fica sólida (`bg-[#0A2A66]` + sombra sutil). Transição suave de 300ms. Manter altura `h-20` e todo o conteúdo. Refinar hover dos links (underline animado opcional via pseudo-elemento ou `motion` layoutId no item ativo). Não alterar rotas/labels.

```tsx
// dentro do componente:
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])
// className do <nav>: cn('fixed top-0 ... h-20 transition-all duration-300',
//   scrolled ? 'bg-[#0A2A66] shadow-lg' : 'bg-[#0A2A66]/70 backdrop-blur-md')
```

- [ ] **Step 2: Build + visual**

Run: `npm run build` (passa) e `npm run dev`: no topo a navbar é translúcida sobre o hero; ao rolar vira sólida; menu mobile e login funcionam; barra de transição de rota intacta.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: navbar scroll-aware translucida sobre o hero"
```

---

## Task 10: Footer, WhatsAppButton e loading refinados

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/WhatsAppButton.tsx`
- Modify: `src/app/(public)/loading.tsx`

**Preservar:** Footer é server component que lê settings/links do CMS — manter toda a leitura (`getSiteSettings`, `getFooterLinks`), textos, CRECI, "Desenvolvido por HOKMA TECH". WhatsAppButton mantém a resolução do número via CMS.

- [ ] **Step 1: Footer**

Manter dados. Refinar: topo do footer com uma faixa/gradiente sutil de separação, ícones sociais em botões com hover de `scale`, links com seta `›` já existente animando no hover. Adicionar logo com leve brilho. Não mudar estrutura de dados nem textos.

- [ ] **Step 2: WhatsAppButton**

Já usa Framer Motion. Manter lógica do número. Pequenos refinamentos: manter o pulse-ring, garantir `aria-label`, opcional tooltip aparecer 1x após delay. Sem mudanças de dados.

- [ ] **Step 3: loading.tsx**

Refinar o skeleton com `.glass` e `animate-shimmer` mantendo o layout (faixa + grid de 3 cards). Mantém fundo `gradient-deep`.

- [ ] **Step 4: Build + visual**

Run: `npm run build` (passa) e `npm run dev`: footer com hover refinado e dados idênticos; botão WhatsApp anima e abre conversa; loading mais bonito.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/WhatsAppButton.tsx "src/app/(public)/loading.tsx"
git commit -m "feat: footer, botao whatsapp e loading refinados"
```

---

## Task 11: Página de listagem de Imóveis

**Files:**
- Modify: `src/app/(public)/imoveis/page.tsx`
- Modify: `src/components/properties/PropertyFilter.tsx`

**Preservar:** TODA a lógica de busca/filtragem/paginação e queries Supabase desta página e do `PropertyFilter` (props `onFilter`, `initialFilters`, tipos `PropertyFilters`, todos os campos do form). Antes de editar, **ler o arquivo atual** `imoveis/page.tsx` por completo e mapear onde estão: header da página, grid de resultados, estado de loading e estado vazio.

- [ ] **Step 1: Refinar o PropertyFilter**

Manter todos os campos/lógica. Visual: card do filtro com `.glass-light`/sombra suave, inputs com foco azul, botão buscar com micro-interação, transição suave ao expandir "Mais filtros" (envolver o bloco avançado em `AnimatePresence`/`motion` de altura, degradando com reduced-motion).

- [ ] **Step 2: Refinar a página de listagem**

Sem alterar dados: aplicar um cabeçalho de página cinematográfico (faixa com `gradient-deep` + título + contagem de resultados), grid com `<Reveal stagger>` + `<RevealItem>` nos `PropertyCard`. **Estado vazio** ("nenhum imóvel encontrado") recebe `<Mascot size={160} />` + mensagem amigável + botão limpar filtros. Manter skeleton de carregamento.

- [ ] **Step 3: Build + visual**

Run: `npm run build` (passa) e `npm run dev` → `/imoveis`: filtros funcionam igual, resultados entram com stagger, busca/paginação intactas, estado vazio com mascote.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(public)/imoveis/page.tsx" src/components/properties/PropertyFilter.tsx
git commit -m "feat: listagem de imoveis cinematografica com estado vazio com mascote"
```

---

## Task 12: Página de detalhe do Imóvel

**Files:**
- Modify: `src/app/(public)/imoveis/[slug]/page.tsx`

**Preservar:** **ler o arquivo inteiro primeiro.** Manter geração de metadata, query do imóvel por slug, galeria de imagens, todos os campos exibidos (preço, características, descrição, endereço), CTA de contato/WhatsApp e quaisquer `generateMetadata`/`notFound()`.

- [ ] **Step 1: Refinar o detalhe**

Sem mudar dados: galeria com transições suaves (se já houver client de galeria, refinar hover/troca; se for grid estático, manter), seções com `Reveal`, cartão de preço/contato "sticky" elegante, características em chips com ícones. CTA de WhatsApp mantém número/mensagem. Respeitar reduced-motion.

- [ ] **Step 2: Build + visual**

Run: `npm run build` (passa) e `npm run dev` → abrir um imóvel: todos os dados presentes, galeria funciona, CTA abre WhatsApp, animações suaves.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(public)/imoveis/[slug]/page.tsx"
git commit -m "feat: pagina de detalhe do imovel refinada"
```

---

## Task 13: Favoritos, Blog (lista + detalhe)

**Files:**
- Modify: `src/app/(public)/imoveis/favoritos/page.tsx`
- Modify: `src/app/(public)/blog/page.tsx`
- Modify: `src/app/(public)/blog/[slug]/page.tsx`

**Preservar:** **ler cada arquivo primeiro.** Favoritos: manter lógica de favoritos (localStorage/estado) e queries. Blog: manter queries de posts, slugs, metadata e `ShareButton`.

- [ ] **Step 1: Favoritos**

Reaproveitar o `PropertyCard` premium e o padrão de grid com `Reveal`. Estado vazio com `<Mascot>` + CTA para `/imoveis`. Sem mudar a lógica de favoritar.

- [ ] **Step 2: Blog lista**

Cabeçalho cinematográfico, cards de post com `Reveal stagger`, imagem com zoom no hover, data/categoria em chips. Manter dados/queries e links de slug.

- [ ] **Step 3: Blog detalhe**

Leitura confortável (largura de medida ~70ch, tipografia clara), cabeçalho com imagem de capa e overlay, `ShareButton` mantido, conteúdo do post intacto. `Reveal` suave nos blocos.

- [ ] **Step 4: Build + visual**

Run: `npm run build` (passa) e `npm run dev`: `/imoveis/favoritos`, `/blog`, e um post — dados/comportamentos idênticos, visual novo.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(public)/imoveis/favoritos/page.tsx" "src/app/(public)/blog/page.tsx" "src/app/(public)/blog/[slug]/page.tsx"
git commit -m "feat: favoritos e blog (lista/detalhe) redesenhados"
```

---

## Task 14: Sobre, Contato e página 404

**Files:**
- Modify: `src/app/(public)/sobre/page.tsx`
- Modify: `src/app/(public)/contato/page.tsx`
- Modify: `src/components/contact/ContactFormClient.tsx`
- Create/Modify: `src/app/not-found.tsx` (verificar se já existe antes de criar)

**Preservar:** **ler cada arquivo primeiro.** Sobre lê seções do CMS (história/valores/time) — manter o mapeamento. Contato: manter o `ContactFormClient` (submit/validação/envio) e infos de contato. Não alterar a lógica de envio do formulário.

- [ ] **Step 1: Sobre**

Aplicar `SectionHeading`, `Reveal` por seção, hero institucional com `gradient-deep`, números/valores com cartões de vidro, time em cards com hover. Mascote como toque pontual em uma seção (ex: bloco de missão). Conteúdo do CMS intacto.

- [ ] **Step 2: Contato**

Hero curto + grid: formulário (`ContactFormClient`, lógica intacta) à esquerda, infos/mapa à direita. Inputs com foco azul e micro-interações. `Reveal` na entrada. Botão enviar mantém comportamento.

- [ ] **Step 3: not-found (404)**

Verificar se `src/app/not-found.tsx` existe. Se não, criar com: fundo `gradient-deep`, `<Mascot size={200} />`, título "Página não encontrada", botão voltar para `/`. Se já existir, apenas refinar mantendo comportamento.

```tsx
// src/app/not-found.tsx (caso não exista)
import Link from 'next/link'
import Mascot from '@/components/brand/Mascot'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-deep text-white flex flex-col items-center justify-center px-4 text-center gap-6">
      <Mascot size={200} />
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-blue-100 max-w-md">O imóvel dos seus sonhos existe — esta página, não. Vamos te levar de volta.</p>
      <Link href="/"><Button variant="white" size="lg">Voltar ao início</Button></Link>
    </main>
  )
}
```

- [ ] **Step 4: Build + visual**

Run: `npm run build` (passa) e `npm run dev`: `/sobre`, `/contato` (enviar uma mensagem de teste para confirmar que o submit não quebrou), e uma URL inexistente (404) com mascote.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(public)/sobre/page.tsx" "src/app/(public)/contato/page.tsx" src/components/contact/ContactFormClient.tsx src/app/not-found.tsx
git commit -m "feat: sobre, contato e 404 redesenhados com mascote"
```

---

## Task 15: Refino do Button + varredura final de consistência

**Files:**
- Modify: `src/components/ui/button.tsx`
- Varredura: todos os componentes públicos tocados

**Preservar:** API do `Button` (variants/sizes/props). Apenas refinar estilos.

- [ ] **Step 1: Refinar variantes do Button**

Adicionar sombras/transições mais ricas e um leve `active:scale-[0.98]` às variantes principais (`default`, `secondary`, `accent`, `white`). Não remover nem renomear variantes/sizes existentes (admin e outras telas dependem deles).

- [ ] **Step 2: Varredura de consistência**

Conferir visualmente todas as rotas públicas em mobile (DevTools responsive) e desktop: `/`, `/imoveis`, `/imoveis/[slug]`, `/imoveis/favoritos`, `/blog`, `/blog/[slug]`, `/sobre`, `/contato`, 404. Checar: espaçamentos, contraste de texto, nada de overflow horizontal, animações suaves, `prefers-reduced-motion` (ativar em DevTools → Rendering → Emulate prefers-reduced-motion) desliga os movimentos.

- [ ] **Step 3: Build + lint finais**

Run: `npm run build` (Expected: sucesso) e `npm run lint` (Expected: sem novos erros).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/button.tsx
git commit -m "style: refino final do Button e consistencia visual"
```

---

## Task 16: Verificação final e preview

- [ ] **Step 1: Build de produção limpo**

Run: `npm run build`
Expected: compila sem erros; nenhuma rota pública quebrada.

- [ ] **Step 2: Conferir que produção (main) não foi tocada**

Run: `git log --oneline main -3` e confirmar que `main` continua nos commits originais (todo o trabalho está em `redesign-v2`).

- [ ] **Step 3: Push da branch para gerar o Preview na Vercel**

```bash
git push -u origin redesign-v2
```
Expected: a Vercel cria um Preview Deployment automático. Pegar a URL de preview no painel da Vercel / no PR.

- [ ] **Step 4: Checklist de aceite no preview**

Confirmar na URL de preview:
- Home cinematográfica (hero parallax, stats em vidro, mascote).
- Imóveis lista/detalhe/favoritos com dados reais do Supabase.
- Blog lista/detalhe.
- Sobre/Contato (enviar mensagem de teste).
- Admin/CMS continua funcionando (login + editar conteúdo reflete no preview).
- Mobile impecável; reduced-motion respeitado.
- Produção (domínio principal) **inalterada**.

- [ ] **Step 5: Handoff para o usuário**

Avisar o usuário: preview pronto para revisão. O merge `redesign-v2` → `main` (go-live) só acontece com aprovação explícita dele. Lembrar que o PNG do mascote pode ser adicionado em `public/mascote-kaizen.png` a qualquer momento (troca automática do placeholder).

---

## Self-Review (cobertura da spec)

- Deploy seguro (branch/preview/main intocada) → Tasks 16.2, 16.3, 16.4. ✓
- Refactor de apresentação preservando dados/CMS/admin → regra de ouro + "Preservar" em cada task. ✓
- Design system (tokens/glass/gradientes/tipografia) → Tasks 1, 5. ✓
- Motion system + reduced-motion → Tasks 2, 3 + media query Task 1. ✓
- Mascote em toques pontuais → Tasks 4, 6, 8, 11, 13, 14 (hero, CTA, estados vazios, 404, sobre). ✓
- Shell (navbar/footer/whatsapp/loading) → Tasks 9, 10. ✓
- Home completa → Tasks 6, 7, 8. ✓
- Imóveis (lista/detalhe/favoritos) → Tasks 11, 12, 13. ✓
- Blog (lista/detalhe) → Task 13. ✓
- Sobre/Contato → Task 14. ✓
- Qualidade (a11y, performance, responsivo, build) → Tasks 1, 15, 16. ✓
- Conteúdo da v1 preservado → "Preservar" em todas as tasks de página. ✓
```
