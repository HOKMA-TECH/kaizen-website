'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '@/components/v3/hooks/scrollStore'

export function Particles({ count = 600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 36
      arr[i * 3 + 1] = Math.random() * 24 - 2
      arr[i * 3 + 2] = (Math.random() - 0.5) * 36
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!points.current) return
    const d = Math.min(delta, 0.05)
    if (!scrollStore.reducedMotion) {
      points.current.rotation.y += d * 0.02
      points.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.4
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#9fe9f5"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
