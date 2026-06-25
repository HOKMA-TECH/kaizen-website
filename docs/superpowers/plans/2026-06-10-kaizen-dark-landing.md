# Kaizen Landing Dark — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing page dark premium (preto + azul) para Kaizen Soluções Imobiliárias, direção "híbrido minimalista" — Three.js discreto + GSAP moderado.

**Architecture:** Next.js 16 App Router, página única composta por seções client-side. Fundo 3D (ondas) isolado num componente lazy client-only para não bloquear first paint. Animações centralizadas num utilitário `Reveal` + hooks GSAP locais por seção. Dados de negócio em `src/lib` (sem CMS).

**Tech Stack:** Next.js 16.2.7, React 19, Tailwind 4 (`@theme`), GSAP 3 + ScrollTrigger, Lenis, three + @react-three/fiber.

**Verificação:** projeto sem suíte de testes (decisão YAGNI, igual à versão clara). Cada tarefa é verificada com `npm run build` e/ou preview visual (390px e 1440px), conforme critérios do spec.

---

## Mapa de arquivos

| Arquivo | Responsabilidade |
|---|---|
| `src/app/globals.css` | Design system dark: tokens `@theme`, botões, cards, glow, eyebrow, scrollbar, reduced-motion |
| `src/app/layout.tsx` | Fontes Sora/Inter, metadata SEO (dark), Navbar/ScrollProgress/WhatsApp/SmoothScroll |
| `src/app/page.tsx` | Composição das seções |
| `src/lib/site.ts` | Dados de negócio (copiado da versão clara) |
| `src/lib/properties.ts` | Imóveis localizados em Campo Grande/Zona Oeste + diferenciais + depoimentos |
| `src/components/SmoothScroll.tsx` | Lenis + sync ScrollTrigger (portado da versão clara) |
| `src/components/ScrollProgress.tsx` | Barra de progresso azul no topo |
| `src/components/Reveal.tsx` | Wrapper GSAP fade+translateY on-scroll |
| `src/components/Navbar.tsx` | Fixa, vidro escuro ao rolar, menu mobile, CTA WhatsApp |
| `src/components/WhatsAppButton.tsx` | FAB WhatsApp |
| `src/components/Footer.tsx` | Footer dark com contatos/redes/CRECI |
| `src/components/PropertyCard.tsx` | Card de imóvel com hover glow azul |
| `src/components/three/WaveField.tsx` | Cena R3F: malha de pontos com deslocamento senoidal, azul sobre preto; DPR ≤1.5, `frameloop="demand"`-like via visibilidade, fallback reduced-motion |
| `src/components/sections/Hero.tsx` | Headline + CTAs + stats, monta WaveField via `next/dynamic` (ssr:false) |
| `src/components/sections/About.tsx` | Sobre + contadores GSAP |
| `src/components/sections/FeaturedProperties.tsx` | Grid de imóveis |
| `src/components/sections/Differentials.tsx` | Grid diferenciais |
| `src/components/sections/Process.tsx` | 4 passos |
| `src/components/sections/Testimonials.tsx` | Depoimentos |
| `src/components/sections/Contact.tsx` | Formulário (handoff p/ WhatsApp) + dados de contato |

## Tarefas

### Task 1: Fundação
- [ ] `git init` + commit do scaffold (configs, spec, plano)
- [ ] `globals.css` com tokens dark (`--color-night #05080F`, `--color-panel #0A111F`, azuis #1565E0/#3B82F6, texto #F4F7FB/#8B99B0), classes `.btn-*`, `.card-dark`, `.eyebrow`, `[data-reveal]`, reduced-motion
- [ ] `layout.tsx` (fontes, metadata pt-BR, themeColor #05080F), `page.tsx` placeholder
- [ ] Copiar `site.ts`; escrever `properties.ts` com 6 imóveis de Campo Grande/Zona Oeste (preços realistas R$ 250k–950k, bairros: Campo Grande centro, Pina/Vila Jardim, Senador Vasconcelos, Inhoaíba, Cosmos, Guaratiba)
- [ ] Verificar: `npm run build` passa · Commit

### Task 2: Infra de animação e navegação
- [ ] Portar `SmoothScroll.tsx` (Lenis+ScrollTrigger), `ScrollProgress.tsx`, `Reveal.tsx` adaptados ao dark
- [ ] `Navbar.tsx` (transparente → vidro escuro `backdrop-blur` ao rolar; menu mobile full-screen; CTA WhatsApp), `WhatsAppButton.tsx`
- [ ] Verificar build · Commit

### Task 3: Cena 3D WaveField
- [ ] `three/WaveField.tsx`: `<Canvas dpr={[1,1.5]}>`, grade de pontos (~120×60) com ondas senoidais compostas no `useFrame`, cor azul com fog/fade para o preto; pausa via `IntersectionObserver`; se `prefers-reduced-motion`, não renderiza (retorna null → fica o gradiente CSS do Hero)
- [ ] Verificar build · Commit

### Task 4: Hero
- [ ] `sections/Hero.tsx`: WaveField via `next/dynamic` ssr:false, eyebrow "Campo Grande · Zona Oeste · RJ", headline display ("A melhor imobiliária de Campo Grande"), sub, CTAs (WhatsApp primário, "Ver imóveis" secundário), entrada GSAP timeline, indicador de scroll
- [ ] Verificar visual no preview (1440px e 390px) · Commit

### Task 5: Seções de conteúdo
- [ ] `About.tsx` (texto + contadores STATS animados com ScrollTrigger `once`)
- [ ] `PropertyCard.tsx` + `FeaturedProperties.tsx`
- [ ] `Differentials.tsx`, `Process.tsx` (4 passos), `Testimonials.tsx`
- [ ] `Contact.tsx` (form que monta mensagem e abre wa.me) + `Footer.tsx`
- [ ] Compor tudo em `page.tsx`
- [ ] Verificar build · Commit

### Task 6: Verificação final
- [ ] Preview: console sem erros, screenshots desktop/mobile, testar menu mobile e âncoras
- [ ] `npm run build` final · Commit final

## Self-review
- Cobertura do spec: tokens/identidade (T1), Lenis/GSAP (T2), Three discreto+fallback (T3), seções 1–9 (T4–T5), critérios de sucesso (T6). ✓
- Sem placeholders; nomes de arquivos consistentes com o mapa. ✓
