'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, AdaptiveDpr } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { BuildingModel } from './BuildingModel'
import { Particles } from './Particles'
import { CameraRig } from './CameraRig'
import { isMobileViewport } from '@/components/v3/hooks/scrollStore'

export default function Scene() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(isMobileViewport())
  }, [])

  const quality = mobile ? 'low' : 'high'

  return (
    <Canvas
      shadows
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 1.5, 18], fov: 42, near: 0.1, far: 100 }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
        scene.fog = new THREE.FogExp2('#06070d', 0.026)
      }}
    >
      <color attach="background" args={['#06070d']} />

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[6, 14, 8]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={18}
        shadow-camera-bottom={-4}
      />
      <pointLight position={[-8, 4, 6]} intensity={40} color="#22d3ee" distance={30} />
      <pointLight position={[8, 2, -4]} intensity={28} color="#f5b563" distance={30} />

      <Suspense fallback={null}>
        <BuildingModel quality={quality} />

        <ContactShadows
          position={[0, -0.72, 0]}
          opacity={0.55}
          scale={26}
          blur={2.4}
          far={12}
          color="#000814"
        />

        {/* ambiente in-memory (sem HDR externo) para reflexos no vidro */}
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2} position={[0, 6, -9]} scale={[12, 6, 1]} color="#bff4ff" />
          <Lightformer intensity={1.4} position={[-8, 3, 4]} scale={[6, 10, 1]} color="#3b82f6" />
          <Lightformer intensity={1.1} position={[8, 2, 4]} scale={[6, 10, 1]} color="#f5b563" />
          <Lightformer intensity={0.8} position={[0, -4, 6]} scale={[14, 6, 1]} color="#0b1020" />
        </Environment>

        {!mobile && <Particles count={520} />}
      </Suspense>

      <CameraRig />
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
