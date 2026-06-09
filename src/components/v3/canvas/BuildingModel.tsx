'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '@/components/v3/hooks/scrollStore'

type Floor = { y: number; w: number; d: number; h: number }

// Gera uma torre moderna com recuos (setbacks) — proporção corporativa.
function useFloors(quality: 'high' | 'low'): Floor[] {
  return useMemo(() => {
    const floorH = 0.9
    const count = quality === 'high' ? 11 : 8
    const floors: Floor[] = []
    let y = 0
    let w = 4.2
    let d = 4.2
    for (let i = 0; i < count; i++) {
      // recuos progressivos para silhueta escalonada
      if (i === 4) {
        w -= 0.8
        d -= 0.8
      }
      if (i === 8) {
        w -= 0.9
        d -= 0.9
      }
      floors.push({ y: y + floorH / 2, w, d, h: floorH })
      y += floorH
    }
    return floors
  }, [quality])
}

export function BuildingModel({ quality = 'high' }: { quality?: 'high' | 'low' }) {
  const group = useRef<THREE.Group>(null)
  const floors = useFloors(quality)
  const topY = floors[floors.length - 1].y + floors[floors.length - 1].h / 2

  const concrete = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#20242f',
        roughness: 0.85,
        metalness: 0.1,
      }),
    [],
  )
  const glass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0c1320',
        roughness: 0.08,
        metalness: 0.9,
        envMapIntensity: 1.6,
        transparent: true,
        opacity: 0.78,
      }),
    [],
  )
  const accent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#22d3ee',
        emissive: '#22d3ee',
        emissiveIntensity: 2.4,
        toneMapped: false,
      }),
    [],
  )

  useFrame((state, delta) => {
    if (!group.current) return
    const d = Math.min(delta, 0.05)
    // rotação lenta contínua + leve influência do scroll
    const base = scrollStore.reducedMotion ? 0 : state.clock.elapsedTime * 0.06
    const scrollSpin = scrollStore.progress * Math.PI * 0.6
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      base + scrollSpin,
      d * 2,
    )
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* podium */}
      <mesh position={[0, -0.35, 0]} material={concrete} castShadow receiveShadow>
        <boxGeometry args={[6, 0.7, 6]} />
      </mesh>

      {floors.map((f, i) => (
        <group key={i}>
          {/* laje de concreto */}
          <mesh position={[0, f.y, 0]} material={concrete} castShadow receiveShadow>
            <boxGeometry args={[f.w + 0.12, 0.12, f.d + 0.12]} />
          </mesh>
          {/* corpo de vidro */}
          <mesh position={[0, f.y, 0]} material={glass} castShadow>
            <boxGeometry args={[f.w, f.h - 0.16, f.d]} />
          </mesh>
          {/* faixa emissiva a cada 3 andares */}
          {i % 3 === 0 && (
            <mesh position={[0, f.y - f.h / 2 + 0.06, f.d / 2 + 0.01]} material={accent}>
              <boxGeometry args={[f.w * 0.82, 0.04, 0.02]} />
            </mesh>
          )}
        </group>
      ))}

      {/* coroa / mastro no topo */}
      <mesh position={[0, topY + 0.6, 0]} material={accent}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
      </mesh>
      <mesh position={[0, topY + 0.12, 0]} material={concrete} castShadow>
        <boxGeometry args={[1.4, 0.24, 1.4]} />
      </mesh>
    </group>
  )
}
