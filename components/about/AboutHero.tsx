'use client';

import React, { useRef, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { asset } from '@/lib/asset';

const HERO_SUB =
  'Artisun is an Indian sun-care house, built around the sun and the way we live with it. We make Skinwear — wearable layers that protect, hydrate, and move with the day. For the Indian skin. For the Indian climate.';

/* ── The revolving Origin bottle (same model as the home page) ── */
function OriginBottle({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(asset('/1.glb'));
  const cloned = React.useMemo(() => scene.clone(true), [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Idle revolve + scroll-driven spin — the product turns as you scroll.
    const idle = clock.elapsedTime * 0.35;
    const scrollSpin = scrollRef.current * Math.PI * 2.2;
    const float = Math.sin(clock.elapsedTime * 0.7) * 0.04;
    groupRef.current.rotation.set(0, idle + scrollSpin, 0);
    groupRef.current.position.set(0, float, 0);
  });

  return (
    <group ref={groupRef} scale={0.5}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}

function HeroScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.9} />
      <directionalLight position={[-4, 3, -5]} intensity={0.55} color="#ffcc88" />
      <pointLight position={[0, 1, -2.2]} intensity={3.4} color="#ffcc66" distance={14} decay={2} />
      <spotLight position={[0, 10, 4]} angle={0.34} penumbra={1} intensity={2.4} />
      <pointLight position={[3, -1, 3]} intensity={1.2} color="#ff8a4d" distance={12} decay={2} />
      <Suspense fallback={null}>
        <OriginBottle scrollRef={scrollRef} />
      </Suspense>
    </>
  );
}

export default function AboutHero() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY / Math.max(1, window.innerHeight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center">
      {/* Soft dark stage glow so the wordmark + bottle read against the molten bg */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 52%, rgba(20,3,2,0.55), rgba(20,3,2,0.18) 45%, transparent 72%)',
        }}
      />

      {/* Giant ARTISUN wordmark — the typographic backdrop (GAZU-style) */}
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-2">
        <Image
          src={asset('/logo.png')}
          alt="ARTISUN"
          width={2000}
          height={445}
          priority
          className="w-[96vw] max-w-[1500px] object-contain select-none"
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: 0.9,
            mixBlendMode: 'soft-light',
          }}
        />
      </div>

      {/* Revolving 3D product — sits in front of the wordmark, like the figure over GAZU */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0.25, 5], fov: 40 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.02, alpha: true }}
        >
          <HeroScene scrollRef={scrollRef} />
        </Canvas>
      </div>

      {/* Top-left kicker (GAZU's "fashion that moves with you") */}
      <div className="absolute left-6 top-28 md:left-12 md:top-32 z-[5] pointer-events-none">
        <p className="font-suisse uppercase tracking-[0.32em] text-[10px] md:text-[12px] text-[var(--brand-cream)]/70 leading-[1.9]">
          <br />
          
        </p>
      </div>

      {/* Intro paragraph — bottom-left, editorial, matching the site aesthetic */}
      <div className="absolute left-6 bottom-14 md:left-12 md:bottom-16 z-[5] max-w-[92vw] md:max-w-[420px]">
        <p className="font-editorial text-[var(--brand-cream)]/85 text-[15px] md:text-[18px] leading-[1.6]">
          {HERO_SUB}
        </p>
      </div>

      {/* Scroll cue — bottom-right (GAZU's "new collection 2024") */}
      <div className="hidden md:block absolute right-6 bottom-14 md:right-12 md:bottom-16 z-[5] pointer-events-none text-right">
        <p className="font-suisse uppercase tracking-[0.28em] text-[10px] md:text-[11px] text-[var(--brand-cream)]/55">
          Scroll to
          <br />
          discover
        </p>
      </div>
    </section>
  );
}

useGLTF.preload(asset('/1.glb'));
