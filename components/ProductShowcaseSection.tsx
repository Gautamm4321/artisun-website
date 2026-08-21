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
    desc: 'Best for all weathers, all cities.\nNo matter where you are or what \n the day looks like.',
    specs: 'SPF 50+ · PA++++',
    ingredients: 'Formulated with Ectoin Bisabolol',
    model: asset('/1.glb'),
    scale: 0.38,
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
    ingredients: 'Ectoin, Bisabolol & Sodium Hyaluronate',
    model: asset('/1.glb'),
    scale: 0.42,
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

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.visible = isActive;
    if (!isActive) return;

    const idleFloat = Math.sin(clock.elapsedTime * 0.7) * 0.04;
    const idleSpin = clock.elapsedTime * 0.25;
    groupRef.current.position.set(0, idleFloat, 0);
    groupRef.current.rotation.set(0, idleSpin, 0);
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
      className="relative w-full min-h-[100svh] overflow-hidden z-20 flex items-center justify-center text-[var(--brand-cream,#f5f0eb)] px-6 sm:px-10 lg:px-16 py-16 sm:py-20"
      style={{
        background:
          'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
      }}
    >
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/20 z-0 pointer-events-none" />

      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <Canvas
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
            {PRODUCTS.map((p, i) => (
              <ModelItem
                key={p.id}
                modelPath={p.model}
                isActive={active === i}
                scale={p.scale}
              />
            ))}
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-20 w-full max-w-[1270px] mx-auto h-full flex flex-col justify-between py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-2 gap-6 sm:gap-12 lg:gap-16 items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-top-left'}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col"
            >
              <h2 className="font-editorial text-[clamp(38px,5.5vw,90px)] leading-[0.92] tracking-tight">
                {product.leftTitle}
              </h2>
              <p className="font-suisse text-sm sm:text-base lg:text-[18px] text-white/85 mt-3 sm:mt-4">
                {product.leftSub}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-top-right'}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-end text-right"
            >
              <h2 className="font-editorial text-[clamp(38px,5.5vw,90px)] leading-[0.92] tracking-tight">
                {product.rightTitle}
              </h2>
              <p className="font-suisse text-sm sm:text-base lg:text-[18px] text-white/85 mt-3 sm:mt-4">
                {product.rightSub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-end mt-24 sm:mt-32 lg:mt-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-desc'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[340px]"
            >
              <p className="font-suisse text-sm sm:text-[15px] lg:text-[18px] leading-[1.45] text-white/85 whitespace-pre-line">
                {product.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row items-end justify-end gap-6 sm:gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id + '-meta'}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-end text-right space-y-2"
              >
                <Link
                  href={product.href}
                  className="pointer-events-auto font-suisse text-xs sm:text-sm tracking-wider uppercase px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--brand-cream,#f5f0eb)] text-[var(--brand-dark,#1a1a1a)] font-medium hover:bg-white transition-colors shadow-lg rounded-sm"
                >
                  Add to bag
                </Link>
                <p className="font-editorial text-sm sm:text-base tracking-wide text-white/95 pt-1">
                  {product.specs}
                </p>
                <p className="font-suisse text-[13px] sm:text-[10px] lg:text-[12px] text-white/80 mt-1">
                  {product.ingredients}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex sm:flex-col items-center gap-3 shrink-0 pt-2 sm:pt-0">
              {PRODUCTS.map((p, i) => {
                const on = i === active;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActive(i)}
                    aria-label={`Switch to ${p.name}`}
                    className={`group relative flex items-center justify-center h-16 w-20 sm:h-20 sm:w-20 md:h-[90px] md:w-[94px] rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${on
                        ? 'border-white/70 bg-black/40 scale-105 shadow-xl'
                        : 'border-white/20 bg-black/20 opacity-60 hover:opacity-100 hover:scale-100'
                      }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.thumb}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                    {on && (
                      <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-white shadow-glow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload(asset('/1.glb'));