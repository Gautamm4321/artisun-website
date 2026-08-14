'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { asset } from '@/lib/asset';

const HERO_SUB =
  'Artisun is an Indian sun-care house, built around the sun and the way we live with it. We make Skinwear — wearable layers that protect, hydrate, and move with the day.';

/* ── The revolving Origin bottle (same model as the home page) ── */
function OriginBottle({
  scrollRef,
  scale,
}: {
  scrollRef: React.MutableRefObject<number>;
  scale: number;
}) {
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
    <group ref={groupRef} scale={scale}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}

function HeroScene({
  scrollRef,
  scale,
}: {
  scrollRef: React.MutableRefObject<number>;
  scale: number;
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.9} />
      <directionalLight position={[-4, 3, -5]} intensity={0.55} color="#ffcc88" />
      <pointLight position={[0, 1, -2.2]} intensity={3.4} color="#ffcc66" distance={14} decay={2} />
      <spotLight position={[0, 10, 4]} angle={0.34} penumbra={1} intensity={2.4} />
      <pointLight position={[3, -1, 3]} intensity={1.2} color="#ff8a4d" distance={12} decay={2} />
      <Suspense fallback={null}>
        <OriginBottle scrollRef={scrollRef} scale={scale} />
      </Suspense>
    </>
  );
}

export default function AboutHero() {
  const scrollRef = useRef(0);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY / Math.max(1, window.innerHeight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

 useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setScale(0.22); // small phones
      } else if (w < 768) {
        setScale(0.28); // phablets / small tabs
      } else if (w < 1024) {
        setScale(0.32); // 800px - 1000px screens (perfect "I" fit)
      } else if (w < 1280) {
        setScale(0.38); // 1000px - 1200px laptops
      } else {
        setScale(0.45); // large desktops
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <section className="relative w-full h-[65svh] sm:h-[75svh] md:h-screen lg:h-screen overflow-hidden flex items-center justify-center">
      
      {/* ── Exact About Page Molten Core Ambient Setup ── */}
      {/* Layer 1: Molten Core Gradient (Deep Crimson Red to Glowing Ember Base) */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(130% 95% at 50% 75%, #D4481E 0%, #B0281F 30%, #7A1416 65%, #420608 100%)',
        }}
      />

      {/* Layer 2: Top Ambient Vignette (Matches AboutHero Stage Glow) */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(245, 130, 45, 0.28) 0%, rgba(20, 3, 2, 0.45) 70%, rgba(20, 3, 2, 0.75) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Layer 3: Film Grain Overlay for Luxury Velvet Feel */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Giant ARTISUN wordmark — Proper breathing margin on all screens */}
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-6 sm:px-10 md:px-14">
        <Image
          src={asset('/logo.png')}
          alt="ARTISUN"
          width={2000}
          height={445}
          priority
          className="w-[85vw] sm:w-[88vw] max-w-[1350px] object-contain select-none"
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
          <HeroScene scrollRef={scrollRef} scale={scale} />
        </Canvas>
      </div>

      {/* Top-left kicker (GAZU's "fashion that moves with you") */}
      <div className="absolute left-6 top-28 md:left-12 md:top-32 z-[5] pointer-events-none">
        <p className="font-suisse uppercase tracking-[0.32em] text-[10px] md:text-[12px] text-[var(--brand-cream)]/70 leading-[1.9]">
          <br />

        </p>
      </div>



      {/* Scroll cue — bottom-right (GAZU's "new collection 2024") */}
      <div className="hidden md:block absolute right-6 bottom-14 md:right-12 md:bottom-16 z-[5] pointer-events-none text-right">
        <p className="font-suisse uppercase tracking-[0.28em] text-[10px] md:text-[11px] text-[var(--brand-cream)]/55">

          <br />

        </p>
      </div>
    </section>
  );
}

useGLTF.preload(asset('/1.glb'));