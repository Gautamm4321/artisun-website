'use client';

import React, { useRef, useState, Suspense } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '@/lib/asset';

type Product = {
  id: string;
  name: string;
  type: string;
  leftTitle: string;
  leftSub: string;
  rightTitle: string;
  rightSub: string;
  desc: string;
  specs: string;
  ingredients: string;
  model: string;
  scale: number;
  thumb: string;
  href: string;
};

const PRODUCTS: Product[] = [
  {
    id: 'origin',
    name: 'Origin',
    type: '4-in-1 Milk Emulsion',
    leftTitle: 'Four steps',
    leftSub: 'Serum, moisturiser, primer, SPF',
    rightTitle: 'done in one',
    rightSub: 'lightweight milky step.',
    desc: 'Best for all weathers, all cities.\nNo matter where you are or what \nthe day looks like.',
    specs: 'SPF 50+ · PA++++',
    ingredients: ' Fromulated with Beta-glucan and Camellia Sinensis Extract',
    model: asset('/1.glb'),
    scale: 0.48,
    thumb: asset('/about-media/origin-hero.jpg'),
    href: '/origin',
  },
  {
    id: 'aura',
    name: 'Aura',
    type: 'Pearl Skinwear™',
    leftTitle: 'Pearls that\nmelt into',
    leftSub: '',
    rightTitle: 'sun\nprotection',
    rightSub: '',
    desc: 'Best for: When you need something\nto adjust to changing weathers, or\nwhen your day is moody.',
    specs: 'SPF 40 · PA++++',
    ingredients: 'Formulated with Ectoin and Bisabolol',
    model: asset('/1.glb'),
    scale: 0.48,
    thumb: asset('/about-media/aura-1.jpg'),
    href: '/aura',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function ModelItem({
  modelPath,
  isActive,
  scale,
}: {
  modelPath: string;
  isActive: boolean;
  scale: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(modelPath);
  const cloned = React.useMemo(() => scene.clone(true), [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.visible = isActive;
    if (!isActive) return;

    // Smooth continuous 360-degree rotation (frame-rate independent)
    groupRef.current.rotation.y += delta * 0.75;
    groupRef.current.position.y = Math.sin(Date.now() * 0.0018) * 0.05;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}

export default function ProductShowcaseSection() {
  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];

  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden z-[110] flex items-center justify-center text-[var(--brand-cream,#f5f0eb)] px-3 sm:px-5 lg:px-6 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:py-16"
      style={{
        background:
          'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
      }}
    >
      {/* Center Dividing Line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/15 z-0 pointer-events-none" />

      {/* 3D Bottle Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <Canvas
          style={{ pointerEvents: 'none' }}
          dpr={[1, 2]}
          camera={{ position: [0, 0.2, 5], fov: 36 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
            alpha: true,
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={2.0} />
          <directionalLight position={[-4, 3, -5]} intensity={0.6} color="#ffcc88" />
          <pointLight position={[0, 0.8, -1.2]} intensity={3.5} color="#ffaa66" distance={8} decay={2} />
          <spotLight position={[0, 10, 4]} angle={0.32} penumbra={1} intensity={2.2} />

          <Suspense fallback={null}>
            <ModelItem
              key={product.id}
              modelPath={product.model}
              isActive={true}
              scale={product.scale}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Container (Full Width Bleed) */}
      <div className="relative z-20 w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 mx-auto min-h-[85vh] flex flex-col justify-between">

        {/* ── ROW 1: TOP SWITCH CARDS (Shifted Together to Right) ── */}
        <div className="relative z-[120] flex items-center justify-end gap-3 sm:gap-4 w-full mt-2 sm:mt-4 pointer-events-auto">
          {/* Origin Card */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(0);
            }}
            aria-label="Switch to Origin"
            className={`cursor-pointer relative z-[120] flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px] rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${active === 0
              ? 'border-white/90 bg-black/50 scale-105 shadow-xl ring-2 ring-white/40'
              : 'border-white/20 bg-black/20 opacity-60 hover:opacity-100 hover:scale-100'
              }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCTS[0].thumb}
              alt="Origin"
              className="h-full w-full object-cover pointer-events-none"
            />
            {active === 0 && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white shadow-glow pointer-events-none" />
            )}
          </button>

          {/* Aura Card */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(1);
            }}
            aria-label="Switch to Aura"
            className={`cursor-pointer relative z-[120] flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px] rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${active === 1
              ? 'border-white/90 bg-black/50 scale-105 shadow-xl ring-2 ring-white/40'
              : 'border-white/20 bg-black/20 opacity-60 hover:opacity-100 hover:scale-100'
              }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCTS[1].thumb}
              alt="Aura"
              className="h-full w-full object-cover pointer-events-none"
            />
            {active === 1 && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white shadow-glow pointer-events-none" />
            )}
          </button>
        </div>

        {/* ── MIDDLE ROW: MAIN TITLES BESIDE BOTTLE (Edge to Center Dot) ── */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center my-auto w-full">
          {/* Left Title: Spans from screen edge directly to bottle dot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-center-left'}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-start text-left w-full pl-0 sm:pl-2"
            >
              <h2 className="font-editorial text-[clamp(44px,7.2vw,118px)] leading-[0.88] tracking-[-0.02em] whitespace-pre-line drop-shadow-md">
                {product.leftTitle}
              </h2>
              <p className="font-suisse text-sm sm:text-base lg:text-[24px] leading-snug text-white/90 mt-3 sm:mt-5 tracking-wide">
                {product.leftSub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Right Title: Spans from bottle dot directly to screen edge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-center-right'}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-end text-right w-full pr-0 sm:pr-2"
            >
              <h2 className="font-editorial text-[clamp(44px,7.2vw,118px)] leading-[0.88] tracking-[-0.02em] whitespace-pre-line drop-shadow-md">
                {product.rightTitle}
              </h2>
              <p className="font-suisse text-sm sm:text-base lg:text-[24px] leading-snug text-white/90 mt-3 sm:mt-5 tracking-wide">
                {product.rightSub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      {/* ── BOTTOM ROW: DESCRIPTION & CTA SPECS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-end w-full pb-6 sm:pb-8 lg:pb-10 -translate-y-3 sm:-translate-y-4">
          {/* Bottom Left: Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-desc'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[560px] text-left pl-0 sm:pl-2"
            >
              <p 
                style={{ color: '#E8C5A5' }}
                className="font-suisse text-base sm:text-lg lg:text-[24px] leading-[1.35] whitespace-pre-line drop-shadow-sm font-light"
              >
                {product.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Right: Button + Specs + Formula */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-meta'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-end text-right space-y-0.5 sm:space-y-1"
            >
              <Link
                href={product.href}
                style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}
                className="pointer-events-auto font-suisse text-xs sm:text-sm tracking-wider uppercase px-7 sm:px-9 py-2.5 sm:py-3 font-medium hover:opacity-90 transition-opacity shadow-lg rounded-none mb-1.5"
              >
                Add to bag
              </Link>
              <p 
                style={{ color: '#edc6a2' }}
                className="font-editorial text-base sm:text-lg lg:text-[19px] leading-tight tracking-wider"
              >
                {product.specs}
              </p>
              <p 
                style={{ color: '#edc6a2' }}
                className="font-suisse text-[14px] sm:text-[16px] lg:text-[18px] leading-tight tracking-wide"
              >
                {product.ingredients}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

useGLTF.preload(asset('/1.glb'));