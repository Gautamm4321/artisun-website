'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF, Center, ContactShadows, Billboard, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Aura Pearl glow shader ───
   Soft radial bloom sitting behind the bottle. Warm pearl tone so it belongs
   with the brand's molten-orange dome without going full sunshine-gold. */
const PearlGlowMaterial = shaderMaterial(
  { glowColor: new THREE.Color('#ffd9a8'), glowOpacity: 0.85 },
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  `uniform vec3 glowColor; uniform float glowOpacity; varying vec2 vUv;
   void main() {
     float dist = distance(vUv, vec2(0.5));
     float alpha = smoothstep(0.5, 0.0, dist);
     alpha = pow(alpha, 1.5);
     gl_FragColor = vec4(glowColor, alpha * glowOpacity);
   }`
);
extend({ PearlGlowMaterial });

function Model({
  scrollRef,
  scale,
  reduced,
}: {
  scrollRef?: React.MutableRefObject<number>;
  scale: number;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/2.glb');
  // Clone so multiple mounts of the bottle across the page never fight over one instance.
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    // Scroll drives the "presentation" rotation; idle spin keeps it alive.
    const idle = reduced ? 0 : t * 0.24;
    const scroll = scrollRef ? scrollRef.current * Math.PI * 2 : 0;
    group.current.rotation.y = idle + scroll;

    // Subtle cursor-follow tilt — decorative, so springed via lerp for momentum.
    const targetX = reduced ? 0 : pointer.y * 0.12;
    const targetZ = reduced ? 0 : pointer.x * -0.06;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.05);

    // Gentle float.
    group.current.position.y = reduced ? 0 : Math.sin(t * 0.6) * 0.02;
  });

  return (
    <group ref={group} scale={scale}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}

function Scene({
  scrollRef,
  scale,
  reduced,
}: {
  scrollRef?: React.MutableRefObject<number>;
  scale: number;
  reduced: boolean;
}) {
  return (
    <>
      {/* Pearl backlight bloom, fixed behind the bottle */}
      <Billboard position={[0, 0.15, -1.6]}>
        <mesh>
          <planeGeometry args={[9, 9]} />
          {/* @ts-ignore - custom shader material via extend */}
          <pearlGlowMaterial
            glowColor={new THREE.Color('#ffd9a8')}
            glowOpacity={0.85}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Billboard>

      {/* Lighting rig — matches the warm key + cool fill language of the home scene */}
      <pointLight position={[0, 0.5, -1]} intensity={3.2} color="#ffd9a8" distance={5} decay={2} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-4, 3, -5]} intensity={0.45} color="#ffcc88" />
      <spotLight position={[0, 10, 3]} angle={0.3} penumbra={1} intensity={1.8} castShadow />

      <ContactShadows position={[0, -1.25, 0]} opacity={0.35} scale={6} blur={2.6} far={4} color="#8A2718" />

      <Suspense fallback={null}>
        <Model scrollRef={scrollRef} scale={scale} reduced={reduced} />
      </Suspense>
    </>
  );
}

export default function SkinwearBottle({
  scrollRef,
  scale = 0.6,
  reduced = false,
  className = '',
}: {
  /** 0..1 progress ref; drives a full presentation rotation when provided. */
  scrollRef?: React.MutableRefObject<number>;
  scale?: number;
  reduced?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.25, 5], fov: 38 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0, alpha: true }}
      >
        <Scene scrollRef={scrollRef} scale={scale} reduced={reduced} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/2.glb');
