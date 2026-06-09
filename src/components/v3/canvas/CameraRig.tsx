'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { scrollStore } from '@/components/v3/hooks/scrollStore'

// Keyframes de câmera por capítulo (progresso 0..1).
// position = onde a câmera fica; look = ponto que ela observa.
type Key = { at: number; pos: [number, number, number]; look: [number, number, number] }

const KEYS: Key[] = [
  { at: 0.0, pos: [0, 1.5, 12], look: [0, 3.5, 0] }, // Hero
  { at: 0.2, pos: [-7, 4, 9], look: [0, 4, 0] }, // Manifesto (orbita esquerda)
  { at: 0.45, pos: [8, 8, 8], look: [0, 5, 0] }, // Diferenciais (alto, direita)
  { at: 0.68, pos: [0, 2, 14], look: [0, 4, 0] }, // Imóveis (afasta de frente)
  { at: 0.86, pos: [6, 12, 6], look: [0, 6, 0] }, // Jornada (mergulho do topo)
  { at: 1.0, pos: [0, 5, 11], look: [0, 4, 0] }, // CTA
]

function sample(progress: number, key: 'pos' | 'look', out: THREE.Vector3) {
  // encontra os dois keyframes que cercam o progresso e interpola
  let a = KEYS[0]
  let b = KEYS[KEYS.length - 1]
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (progress >= KEYS[i].at && progress <= KEYS[i + 1].at) {
      a = KEYS[i]
      b = KEYS[i + 1]
      break
    }
  }
  const span = b.at - a.at || 1
  const t = THREE.MathUtils.clamp((progress - a.at) / span, 0, 1)
  const e = t * t * (3 - 2 * t) // smoothstep
  out.set(
    THREE.MathUtils.lerp(a[key][0], b[key][0], e),
    THREE.MathUtils.lerp(a[key][1], b[key][1], e),
    THREE.MathUtils.lerp(a[key][2], b[key][2], e),
  )
}

export function CameraRig() {
  const { camera, pointer } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 1.5, 12))
  const targetLook = useRef(new THREE.Vector3(0, 3.5, 0))
  const currentLook = useRef(new THREE.Vector3(0, 3.5, 0))
  const intro = useRef(0)

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05)
    const p = scrollStore.progress

    sample(p, 'pos', targetPos.current)
    sample(p, 'look', targetLook.current)

    // leve parallax pelo mouse (desativado em reduced-motion)
    const parallax = scrollStore.reducedMotion ? 0 : 1
    const px = pointer.x * 0.8 * parallax
    const py = pointer.y * 0.5 * parallax

    // intro cinematográfica: empurra a câmera para dentro nos primeiros frames
    intro.current = THREE.MathUtils.lerp(intro.current, 1, d * 1.4)
    const introPush = (1 - intro.current) * 6

    const damp = scrollStore.reducedMotion ? 1 : 1 - Math.pow(0.0015, d)
    camera.position.lerp(
      new THREE.Vector3(
        targetPos.current.x + px,
        targetPos.current.y + py,
        targetPos.current.z + introPush,
      ),
      damp,
    )
    currentLook.current.lerp(targetLook.current, damp)
    camera.lookAt(currentLook.current)
  })

  return null
}
