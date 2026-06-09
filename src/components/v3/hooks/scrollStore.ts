// Singleton compartilhado entre a árvore DOM e a árvore R3F (Canvas).
// Atualizado pelo LenisProvider; lido pelo CameraRig dentro do useFrame.

export const scrollStore = {
  /** progresso global da página, 0..1 */
  progress: 0,
  /** velocidade instantânea do scroll (px/frame aprox.) */
  velocity: 0,
  /** o usuário pediu menos movimento? */
  reducedMotion: false,
  /** viewport estreita (mobile)? */
  isMobile: false,
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches
}
