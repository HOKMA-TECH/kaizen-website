# Kaizen Soluções Imobiliárias — Redesign v2 (Design Spec)

**Data:** 2026-06-05
**Branch:** `redesign-v2`
**Status:** Aprovado para implementação

## 1. Objetivo

Criar uma versão mais bonita, moderna, cinematográfica e interativa do site da Kaizen
Soluções Imobiliárias, com excelente experiência de usuário, incorporando o **logo** e o
**mascote 3D** da marca — **sem tirar a versão atual de produção do ar**.

## 2. Estratégia de deploy seguro (risco zero)

- Todo o trabalho acontece na branch `redesign-v2`.
- A Vercel gera um **Preview Deployment automático** dessa branch (URL própria, ex:
  `kaizen-website-git-redesign-v2.vercel.app`).
- A produção (`main`) permanece **100% intocada e no ar** durante todo o desenvolvimento.
- Mesmas variáveis de ambiente e mesmo Supabase do projeto (sem migração de dados).
- O "go-live" só acontece com um merge explícito de `redesign-v2` → `main`, decidido pelo usuário.

## 3. Princípio mestre: refactor de apresentação

O redesign é **puramente de apresentação**. Mantêm-se **intactos**:

- Queries Supabase (`properties`, `nav_tabs`, CMS settings, blog).
- `src/lib/cms/section-mapper.ts` e o contrato de `content: Record<string, string>` das seções.
- Props dos componentes públicos (ex: `<HeroSection content={...} />`).
- Metadata/SEO (`generateMetadata`), rotas, sitemap.
- Painel admin, CMS e login — **não são tocados**.

**Garantia:** como os contratos de dados não mudam, o admin continua gerenciando o conteúdo
exatamente como hoje, e nada de produção quebra. Mudamos somente a camada visual/JSX/estilo
e adicionamos um sistema de design + motion + mascote.

## 4. Decisões do usuário (travadas)

| Tema | Decisão |
|------|---------|
| Mascote | **Toques pontuais** — guia simpático em momentos-chave (não protagonista) |
| Escopo desta entrega | **Site público inteiro** (home, imóveis, blog, sobre, contato + shell) |
| Intensidade de animação | **Equilibrado e elegante** — scroll reveals, parallax suave, micro-interações, respeitando performance e `prefers-reduced-motion` |
| Assets | **Logo atual** (`/logo-kaizen.png`) + **mascote por placeholder** até o usuário enviar o PNG |
| Conteúdo/textos | Reaproveitar 100% do conteúdo da v1 (tagline, stats, CRECI, rodapé "Desenvolvido por HOKMA TECH", etc.) |

## 5. Sistema de design

### 5.1 Tokens visuais
- Paleta da marca: `#0A2A66` (dark) → `#1E4ED8` (medium) → `#3B82F6` (light) + branco.
- Acentos: gradientes profundos azuis, glassmorphism (vidro fosco), sombras suaves em camadas,
  raios de borda generosos.
- Estende `tailwind.config.ts` com novos gradientes, sombras, keyframes e utilitários (sem
  remover tokens existentes, para não quebrar telas legadas/admin).

### 5.2 Tipografia
- Marca: **Montserrat** (já em uso). Corpo: **Inter** (já em uso).
- Escala "display" para títulos grandes e marcantes; hierarquia clara de pesos e tracking.

### 5.3 Motion system
- Módulo central `src/lib/motion.ts` com variantes reutilizáveis de Framer Motion
  (fade, slide, stagger, scale).
- Componentes utilitários: `Reveal` (scroll reveal via `whileInView`), parallax suave.
- Transições de página cinematográficas (a partir do padrão já existente na Navbar).
- Micro-interações em botões e cards (hover/tap).
- **Acessibilidade:** todas as animações respeitam `prefers-reduced-motion` (degradam para
  fade simples ou nenhum movimento).

### 5.4 Mascote
- Componente reutilizável `src/components/brand/Mascot.tsx`.
- Aparições pontuais: detalhe no hero, estados vazios (ex: "nenhum imóvel encontrado"),
  bloco de CTA, página 404 e confirmações/sucesso.
- Usa um **placeholder** elegante (silhueta/área reservada estilizada) enquanto o PNG real
  não chega; a troca pelo arquivo final é trivial (props `src`).

## 6. Escopo de páginas (site público inteiro)

### Shell compartilhado
- **Navbar**: efeito de scroll (transparente no topo → sólido ao rolar), logo, links, botão Entrar, menu mobile animado. Mantém prefetch e a barra de transição de rota existentes.
- **Footer**: mesmo conteúdo (links, tipos de imóveis, contato, CRECI, copyright), visual refinado.
- **WhatsApp flutuante**: botão animado.
- **loading.tsx**: skeleton/spinner com a marca.

### Home (`/`)
- Hero imersivo (parallax suave, badge, título, subtítulo, CTAs, stats em cards de vidro, toque do mascote).
- Imóveis em Destaque (cards premium, scroll reveal, skeleton de carregamento).
- Diferenciais (grid de cards com ícones, hover/reveal).
- CTA (gradiente, mascote, botões WhatsApp/contato).

### Imóveis
- **Lista** (`/imoveis`): filtros (`PropertyFilter`), grid de `PropertyCard` premium, estado vazio com mascote, paginação/contagem como hoje.
- **Detalhe** (`/imoveis/[slug]`): galeria de imagens, características, descrição, CTA de contato/WhatsApp.
- **Favoritos** (`/imoveis/favoritos`): mantém comportamento, visual atualizado.

### Blog
- **Lista** (`/blog`): cards de post com reveal.
- **Detalhe** (`/blog/[slug]`): leitura confortável, `ShareButton`.

### Sobre (`/sobre`) e Contato (`/contato`)
- Sobre: história, valores, time (seções CMS existentes), visual cinematográfico.
- Contato: formulário (`ContactFormClient`) + informações, com micro-interações.

## 7. Qualidade

- **Acessibilidade:** foco visível, contraste adequado, `prefers-reduced-motion`, labels/aria.
- **Performance:** `next/image` otimizado, animações em propriedades aceleradas por GPU
  (transform/opacity), evitar layout thrash, lazy onde fizer sentido.
- **Responsivo:** mobile-first impecável em todos os breakpoints.
- **Build:** `next build` deve passar sem erros de tipo/lint introduzidos.

## 8. Fora de escopo

- Painel admin, CMS, login (não tocados nesta entrega).
- Mudanças de schema/dados no Supabase.
- Novas páginas ou novas funcionalidades de negócio (é redesign, não novas features).
- Substituição do arquivo final do mascote (entra depois, via troca de `src`).

## 9. Critérios de sucesso

1. Produção (`main`) permanece no ar e intocada durante todo o processo.
2. Preview na Vercel mostra a v2 completa do site público.
3. Admin/CMS continua gerenciando o conteúdo sem qualquer alteração.
4. Todas as páginas públicas redesenhadas, com animações equilibradas e mascote em toques pontuais.
5. `prefers-reduced-motion` respeitado; build passa; responsivo em mobile/desktop.
6. Conteúdo/textos da v1 preservados.
