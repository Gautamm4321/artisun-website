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
    ingredients: 'Formulated with Ectoin Bisabolol',
    model: asset('/1.glb'),
    scale: 0.48,
    thumb: asset('/about-media/origin-hero.jpg'),
    href: '/origin',
  },
  {
    id: 'aura',
    name: 'Aura',
    type: 'Pearl Skinwear™',
    leftTitle: 'Pearls melt',
    leftSub: 'Skin protection & adaptive hydration',
    rightTitle: 'into skin',
    rightSub: 'soft, dewy finish, never heavy.',
    desc: 'Pearls you choose as per the weather —\nmore when dry, fewer when humid.',
    specs: 'SPF 40 · PA++++',
    ingredients: 'Formulated with Ectoin Bisabolol',
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
      className="relative w-full min-h-[100svh] overflow-hidden z-[110] flex items-center justify-center text-[var(--brand-cream,#f5f0eb)] px-6 sm:px-10 lg:px-16 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:py-16"
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

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-[1100px] mx-auto min-h-[82vh] flex flex-col justify-between">


        {/* ── ROW 1: TOP SWITCH CARDS ── */}
        <div className="relative z-[120] flex items-center justify-between w-full mt-4 sm:mt-6 md:mt-8 pointer-events-auto">
          {/* Origin Card */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(0);
            }}
            aria-label="Switch to Origin"
            className={`cursor-pointer relative z-[120] flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 md:h-[88px] md:w-[88px] rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
              active === 0
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
              <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-white shadow-glow pointer-events-none" />
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
            className={`cursor-pointer relative z-[120] flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 md:h-[88px] md:w-[88px] rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
              active === 1
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
              <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-white shadow-glow pointer-events-none" />
            )}
          </button>
        </div>


        {/* ── MIDDLE ROW: MAIN TITLES BESIDE BOTTLE (LEFT & RIGHT) ── */}
        <div className="grid grid-cols-2 gap-8 sm:gap-14 lg:gap-24 items-center my-auto w-full">
          {/* Left Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-center-left'}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-start pr-2 sm:pr-6"
            >
              <h2 className="font-editorial text-[clamp(34px,5.4vw,88px)] leading-[0.92] tracking-tight">
                {product.leftTitle}
              </h2>
              <p className="font-suisse text-xs sm:text-sm lg:text-[17px] text-white/85 mt-3 sm:mt-4">
                {product.leftSub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Right Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-center-right'}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-end text-right pl-2 sm:pl-6"
            >
              <h2 className="font-editorial text-[clamp(34px,5.4vw,88px)] leading-[0.92] tracking-tight">
                {product.rightTitle}
              </h2>
              <p className="font-suisse text-xs sm:text-sm lg:text-[16px] text-white/85 mt-3 sm:mt-4">
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
              className="max-w-[340px]"
            >
              <p className="font-suisse text-xs sm:text-sm lg:text-[16px] leading-[1.5] text-white/85 whitespace-pre-line">
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
              className="flex flex-col items-end text-right space-y-1 sm:space-y-1.5"
            >
              <Link
                href={product.href}
                className="pointer-events-auto font-suisse text-xs sm:text-sm tracking-wider uppercase px-7 sm:px-9 py-2.5 sm:py-3 bg-[var(--brand-cream,#f5f0eb)] text-[var(--brand-dark,#1a1a1a)] font-medium hover:bg-white transition-colors shadow-lg rounded-none mb-1"
              >
                Add to bag
              </Link>
              <p className="font-editorial text-sm sm:text-[16px] tracking-wide text-white/95 pt-0.5">
                {product.specs}
              </p>
              <p className="font-suisse text-[12px] sm:text-[13px] text-white/75">
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