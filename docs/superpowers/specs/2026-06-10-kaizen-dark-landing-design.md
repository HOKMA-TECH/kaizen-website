# Kaizen Landing Dark — Design Spec

**Data:** 2026-06-10 · **Status:** Aprovado pelo usuário

## Objetivo

Landing page premium para a Kaizen Soluções Imobiliárias ("a melhor imobiliária de Campo Grande, Zona Oeste, RJ"). Tema escuro preto + azul, experiência "awwwards-worthy" na direção **híbrido minimalista**: Three.js discreto + GSAP moderado, priorizando confiança, sobriedade e velocidade. Projeto separado da versão clara (`kaizen-landing`), que permanece intacta.

## Stack

- Next.js 16.2.7 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- GSAP 3 + @gsap/react (ScrollTrigger) · Lenis (smooth scroll)
- Three.js via @react-three/fiber (cena de fundo do hero)
- Fontes via `next/font`: Sora (títulos) + Inter (corpo)

## Identidade visual

- Fundo: `#05080F` (preto-azulado profundo); superfícies `#0A111F`
- Marca: azul royal `#1565E0` (do logo), glow `#3B82F6`, gradientes azul→transparente
- Texto: branco `#F4F7FB`, secundário `#8B99B0`
- Bordas sutis `rgba(59,130,246,0.15)`; cards com hover glow azul

## Experiência

- **Hero 3D discreto:** plano de ondas (vertex displacement senoidal) em tons de azul sobre preto, rotação lenta, sem interação obrigatória. DPR ≤ 1.5, `frameloop` pausado fora da viewport, fallback gradiente CSS estático sob `prefers-reduced-motion`.
- **GSAP moderado:** reveals on-scroll (fade+translateY), contadores animados nas estatísticas, parallax leve, navbar com fundo que aparece ao rolar.
- **Lenis** para scroll suave (desativado se reduced-motion).

## Seções (uma página, âncoras)

1. Navbar fixa (vidro escuro, logo, links, CTA WhatsApp)
2. Hero — headline + subcopy + 2 CTAs + ondas 3D
3. Sobre + estatísticas (contadores: 3+ anos, 1500+ famílias, 100% satisfação, 200+ imóveis)
4. Imóveis em destaque (cards, dados estáticos em `lib/properties.ts`)
5. Diferenciais (grid de 4–6 cards)
6. Processo (4 passos)
7. Depoimentos
8. Contato (formulário mailto/WhatsApp + dados: CRECI-RJ 010143/O, (21) 98657-4084, Rua Engenheiro Trindade 99, 9º andar)
9. Footer + botão WhatsApp flutuante + barra de progresso de scroll

## Dados de negócio

Reusar `lib/site.ts` e `lib/properties.ts` da versão clara (mesmos contatos, redes e imóveis).

## Mobile & acessibilidade

Mobile-first, alvos de toque ≥ 44px, contraste AA sobre fundo escuro, `prefers-reduced-motion` respeitado em GSAP/Lenis/Three, imagens com `alt`.

## Critérios de sucesso

- `npm run build` sem erros; página renderiza nas larguras 390px e 1440px
- Sem erros no console; cena 3D não bloqueia o first paint (lazy/client-only)
- Todos os CTAs apontam para WhatsApp/contatos reais
