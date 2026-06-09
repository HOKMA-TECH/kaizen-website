# Kaizen V3 — Experiência 3D Cinematográfica (Fase 1: Fundação + Home)

**Data:** 2026-06-09
**Branch:** `redesign-v3` (a partir de `redesign-v2`) → preview na Vercel
**Status:** Aprovado pelo usuário, execução autônoma

## Visão

Reconstruir o site da Kaizen Soluções Imobiliárias como uma experiência cinematográfica,
inovadora, com 3D em tempo real e scroll storytelling de alto padrão corporativo. Entregue
em 3 fases; este documento cobre a **Fase 1 (Fundação + Home)**.

Stack adicionada: **Next.js 14 + Tailwind + React** (existentes) + **@react-three/fiber +
@react-three/drei (Three.js)** + **GSAP/ScrollTrigger** + **Lenis** (smooth scroll).

## Decisões travadas

- **Escopo:** site completo, em 3 fases. Fase 1 = Fundação + Home.
- **3D:** modelo **procedural** (edifício moderno de vidro/concreto construído em código,
  sem asset externo). A cena aceita um `.glb` futuro se o usuário fornecer.
- **Conteúdo:** demo/estático embutido (preview não depende de env vars do Supabase).
- **Entrega:** home 3D completa de uma vez, depois deploy.

## Estratégia de branch e rota

- Branch `redesign-v3`; push → Vercel cria preview automático.
- V3 isolado em route group próprio com layout próprio. Entrada: **`/v3`**.
- Site existente permanece intacto; fases 2 e 3 adicionam `/v3/imoveis`, etc.
- `/v3` marcado `robots: noindex` (preview).

## Linguagem visual

- Base midnight `#06070D`; superfícies glass (branco 4–8% + blur); acento primário
  **ciano `#22D3EE`** + highlight **âmbar `#F5B563`**. Harmoniza com o azul Kaizen `#0A2A66`.
- Tipografia display grande, tracking amplo, muito espaço negativo; corpo leve.
- Glassmorphism, glows volumétricos, partículas atmosféricas, grão de filme.

## Cena 3D

- `@react-three/fiber` Canvas **fixo** atrás do conteúdo (z-0); seções DOM rolam por cima.
- Edifício procedural: volumes empilhados de vidro/concreto, materiais PBR, faixas
  emissivas ciano, `Environment` (reflexos) + contact shadows, partículas à deriva.
- **Câmera dirigida pelo scroll**: progresso 0..1 (via Lenis) guardado em ref; `useFrame`
  faz lerp da câmera entre keyframes por capítulo. Auto-rotação suave quando ocioso.

## Home — storytelling em capítulos

1. **Hero** — edifício fullscreen, câmera-in cinematográfica, headline reveal, scroll cue.
2. **Manifesto** — texto pinado revelando; edifício gira conforme o scroll.
3. **Diferenciais** — cards glass flutuando em 3D com parallax.
4. **Imóveis em destaque** — cards flutuantes (dados demo).
5. **Jornada/Processo** — passos dirigidos por scroll.
6. **CTA cinematográfica** — cena de fechamento + contato.
7. **Footer**.

## Arquitetura de arquivos

```
src/app/v3/
  layout.tsx                 # metadata noindex
  page.tsx                   # server; renderiza <HomeExperience/>
src/components/v3/
  HomeExperience.tsx         # 'use client'; LenisProvider + Canvas dinâmico + seções
  providers/LenisProvider.tsx
  hooks/useScrollProgress.ts # ref de progresso 0..1 + bridge GSAP
  canvas/
    ClientScene.tsx          # 'use client' dynamic(ssr:false)
    Scene.tsx                # Canvas + luzes + Environment + shadows
    BuildingModel.tsx        # edifício procedural
    Particles.tsx
    CameraRig.tsx            # câmera scroll-driven
  layout/NavbarV3.tsx
  layout/FooterV3.tsx
  sections/{Hero,Manifesto,Differentials,FeaturedProperties,Journey,Cta}.tsx
  ui/{FloatingCard,Grain,ScrollCue}.tsx
  data/demo.ts               # imóveis demo
```

## Performance & acessibilidade (não-negociável)

- Canvas via `dynamic(ssr:false)` dentro de client component; `<Suspense>` com loader; DPR clamp `[1,2]`.
- **Mobile:** cena simplificada (menos partículas, sem auto-rotação pesada) ou poster estático.
- **`prefers-reduced-motion`:** desliga auto-movimento de câmera e animações de scroll; conteúdo 100% legível.

## Critérios de sucesso (Fase 1)

- `npm run build` e `npm run lint` passam.
- `/v3` renderiza a home com cena 3D e scroll storytelling funcionando em desktop.
- Mobile e reduced-motion não travam nem quebram layout.
- Branch `redesign-v3` no GitHub com preview da Vercel.

## Fora de escopo (Fase 1)

- Páginas de imóveis/detalhe/sobre/contato (Fases 2–3).
- Integração com Supabase real.
- Postprocessing pesado (bloom) — adiado por confiabilidade de build.
