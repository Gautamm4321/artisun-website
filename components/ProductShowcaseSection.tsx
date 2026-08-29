'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '@/lib/asset';
import { useCart } from './cart/CartProvider';
import { firstVariant, formatPrice } from '@/lib/shopify';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Product = {
  id: string;
  name: string;
  type: string;
  leftTitle: string;
  leftSub: string;
  rightTitle: string;
  rightSub: string;
  desc: string;
  mobileDesc: string;
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
    desc: 'Best for all weathers, all cities.\nNo matter where you are or what\nthe day looks like.',
    mobileDesc: 'Best for all weathers and cities.',
    specs: 'SPF 50+ · PA++++',
    ingredients: 'Formulated with Beta-Glucan and\nCamellia Sinensis Extract',
    model: asset('/origin.glb'),
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
    mobileDesc: 'Best for: When you need something\nto adjust to changing weathers, or\nwhen your day is moody.',
    specs: 'SPF 40 · PA++++',
    ingredients: 'Formulated with Ectoin and Bisabolol',
    model: asset('/aura.glb'),
    scale: 0.48,
    thumb: asset('/about-media/aura-1.jpg'),
    href: '/aura',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A single bottle.
 *
 * Rotation is driven by SCROLL rather than by a constant `delta` spin. The
 * progress ref is written by ScrollTrigger's onUpdate and read here in useFrame,
 * so the scroll position never triggers a React re-render — a setState per frame
 * would re-mount the Canvas subtree and stutter badly on mobile.
 *
 * `damp` smooths the value: raw scroll on a trackpad is spiky, and mapping it
 * straight to rotation.y makes the bottle judder. Damping lets it keep turning
 * for a beat after the scroll stops, which reads as weight.
 */
function ModelItem({
  modelPath,
  isActive,
  scale,
  isMobile,
  progress,
}: {
  modelPath: string;
  isActive: boolean;
  scale: number;
  isMobile: boolean;
  progress: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(modelPath);
  const cloned = React.useMemo(() => scene.clone(true), [scene]);
  const spin = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.visible = isActive;
    if (!isActive) return;

    // ~1.6 turns across the full pinned scroll, damped so it never snaps.
    const target = progress.current * Math.PI * 3.2;
    spin.current = THREE.MathUtils.damp(spin.current, target, 3.5, delta);
    groupRef.current.rotation.y = spin.current;

    // Slow bob so a stationary scroll still feels alive.
    const yOffset = isMobile ? 0.2 : 0;
    groupRef.current.position.y = Math.sin(Date.now() * 0.0018) * 0.04 + yOffset;

    const targetScale = isMobile ? scale * 0.7 : scale;
    groupRef.current.scale.setScalar(targetScale);
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
  const sectionRef = useRef<HTMLElement>(null);
  const revolveRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { add, products: shopProducts, busy, configured } = useCart();
  const product = PRODUCTS[active];
  const shopProduct = active === 0 ? shopProducts.origin : shopProducts.aura;
  const variant = firstVariant(shopProduct);

  useEffect(() => {
    const checkMob = () => setIsMobile(window.innerWidth < 1024);
    checkMob();
    window.addEventListener('resize', checkMob);

    // Scroll-based seamless 360 swap on mobile & desktop
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=120%',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Feed the 3D rotation and the background revolve through refs — writing
        // these to state would re-render the Canvas on every scroll frame.
        progress.current = self.progress;
        if (revolveRef.current) {
          revolveRef.current.style.transform =
            `rotate(${(self.progress * 210).toFixed(2)}deg) scale(1.9)`;
        }
        setActive(self.progress < 0.5 ? 0 : 1);
      },
    });

    return () => {
      trigger.kill();
      window.removeEventListener('resize', checkMob);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden z-[110] flex items-center justify-center text-[var(--brand-cream,#f5f0eb)] px-3 sm:px-5 lg:px-6 py-6 lg:py-16"
      style={{
        background:
          'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
      }}
    >
      {/* ── Revolving gradient. Rotated by scroll in the ScrollTrigger above, so
          the whole field appears to turn with the bottle. Kept at partial opacity
          and oversized (scale 1.9) so its edges never enter frame while turning. ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={revolveRef}
          className="absolute inset-0 opacity-[0.62] will-change-transform"
          style={{
            transform: 'rotate(0deg) scale(1.9)',
            background:
              'conic-gradient(from 0deg at 50% 50%, #E8551E 0deg, #8D180C 78deg, #F0762B 150deg, #460905 232deg, #C43612 310deg, #E8551E 360deg)',
          }}
        />
        {/* Softens the conic's hard colour seams into the page gradient. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 25%, rgba(232,85,30,0.30) 0%, rgba(70,9,5,0.55) 68%, rgba(70,9,5,0.8) 100%)',
          }}
        />
      </div>
      {/* Horizontal Dividing Line: Darker & clearer visible white line */}
<div className="block lg:hidden absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1.2px] bg-white/45 z-0 pointer-events-none" />

      {/* Desktop Vertical Dividing Line */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/15 z-0 pointer-events-none" />

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
              isMobile={isMobile}
              progress={progress}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 mx-auto h-[92svh] lg:min-h-[85vh] flex flex-col justify-between">

        {/* ── DESKTOP SWITCH CARDS (Hidden on Mobile screens completely) ── */}
        <div className="hidden lg:flex relative z-[120] items-center justify-end gap-3 sm:gap-4 w-full mt-2 sm:mt-4 pointer-events-auto">
          {/* Origin Card */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(0);
            }}
            aria-label="Switch to Origin"
            className={`cursor-pointer relative z-[120] flex items-center justify-center h-16 w-16 md:h-[72px] md:w-[72px] rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
              active === 0
                ? 'border-white/90 bg-black/50 scale-105 shadow-xl ring-2 ring-white/40'
                : 'border-white/20 bg-black/20 opacity-60 hover:opacity-100 hover:scale-100'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRODUCTS[0].thumb} alt="Origin" className="h-full w-full object-cover pointer-events-none" />
            {active === 0 && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white shadow-glow pointer-events-none" />}
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
            className={`cursor-pointer relative z-[120] flex items-center justify-center h-16 w-16 md:h-[72px] md:w-[72px] rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
              active === 1
                ? 'border-white/90 bg-black/50 scale-105 shadow-xl ring-2 ring-white/40'
                : 'border-white/20 bg-black/20 opacity-60 hover:opacity-100 hover:scale-100'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRODUCTS[1].thumb} alt="Aura" className="h-full w-full object-cover pointer-events-none" />
            {active === 1 && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white shadow-glow pointer-events-none" />}
          </button>
        </div>

        {/* Mobile Middle-Right Circular Action Arrow (Positioned exactly on line) */}
        <Link
          href={product.href}
          aria-label={`Go to ${product.name}`}
          className="lg:hidden absolute right-4 sm:right-6 top-[50%] -translate-y-[50%] z-40 w-11 h-11 rounded-full border border-white/80 bg-black/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 shadow-xl pointer-events-auto"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </Link>

        {/* ── MOBILE TOP HEADER (Client Image Match) ── */}
        <div className="lg:hidden w-full flex flex-col items-center text-center pt-6 xs:pt-8 px-3 z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-mobile-top'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full flex flex-col items-center"
            >
              {product.id === 'origin' ? (
                <>
                  <h2 className="font-editorial text-[50px] xs:text-[56px] leading-[0.92] tracking-[-0.01em] text-[var(--brand-cream,#f5f0eb)] whitespace-nowrap drop-shadow-md">
                    4 steps in 1
                  </h2>
                  <p className="font-suisse text-[14px] xs:text-[14.5px] leading-[1.28] text-white/95 mt-2.5 max-w-[290px] xs:max-w-[310px]">
                    Serum, moisturiser, primer, SPF in one<br />
                    lightweight milky step
                  </p>
                </>
              ) : (
                <h2 className="font-editorial text-[38px] xs:text-[44px] leading-[0.98] tracking-tight text-[var(--brand-cream,#f5f0eb)]">
                  Pearls that melt<br />
                  into sun protection
                </h2>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── DESKTOP MIDDLE ROW (Untouched Left/Right Title Columns) ── */}
        <div className="hidden lg:grid grid-cols-2 gap-8 items-center my-auto w-full">
          {/* Left Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-center-left'}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-start text-left w-full pl-2"
            >
              <h2 className="font-editorial text-[clamp(44px,7.2vw,118px)] leading-[0.88] tracking-[-0.02em] whitespace-pre-line drop-shadow-md">
                {product.leftTitle}
              </h2>
              <p className="font-suisse text-[24px] leading-snug text-white/90 mt-5 tracking-wide">
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
              className="flex flex-col items-end text-right w-full pr-2"
            >
              <h2 className="font-editorial text-[clamp(44px,7.2vw,118px)] leading-[0.88] tracking-[-0.02em] whitespace-pre-line drop-shadow-md">
                {product.rightTitle}
              </h2>
              <p className="font-suisse text-[24px] leading-snug text-white/90 mt-5 tracking-wide">
                {product.rightSub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── MOBILE BOTTOM STACK (Pure Image Match Layout) ── */}
        <div className="lg:hidden w-full flex flex-col items-center text-center pb-8 xs:pb-10 px-2 z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-mobile-bottom'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full flex flex-col items-center space-y-2"
            >
              {/* SPF Heading */}
              <h3 className="font-editorial text-[28px] xs:text-[32px] leading-none tracking-tight text-[var(--brand-cream,#f5f0eb)]">
                {product.specs}
              </h3>

              {/* Ingredients formula */}
              <p className="font-suisse text-[15.5px] xs:text-[15px] leading-snug text-white/90 max-w-[340px]">
                {product.ingredients}
              </p>

              {/* Best for Tagline: Locked Line Breaks for Mobile */}
              <div className="font-suisse text-[13.5px] xs:text-[14.5px] font-normal leading-[1.35] text-white/95 pt-2 text-center w-full">
                {product.id === 'origin' ? (
                  <p>Best for all weathers and cities.</p>
                ) : (
                  <p>
                    Best for: When you need something<br />
                    to adjust to changing weathers, or<br />
                    when your day is moody.
                  </p>
                )}
              </div>

              {/* Mobile add to bag */}
              <button
                type="button"
                onClick={() => variant && add(variant.id, 1)}
                disabled={!configured || !variant || busy || !variant.availableForSale}
                style={{ backgroundColor: '#edc6a2', color: '#3A0D08' }}
                className="pointer-events-auto mt-3 font-suisse text-[13px] tracking-wider uppercase px-8 py-3 font-medium active:scale-95 transition-transform shadow-lg disabled:opacity-50"
              >
                {!configured
                  ? 'Add to bag'
                  : busy
                    ? 'Adding…'
                    : !variant
                      ? 'Unavailable'
                      : !variant.availableForSale
                        ? 'Sold out'
                        : `Add to bag — ${formatPrice(variant.price)}`}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── DESKTOP BOTTOM ROW (Explicit Line Breaks) ── */}
        <div className="hidden lg:grid grid-cols-2 gap-16 items-end w-full pb-10 -translate-y-4">
          {/* Bottom Left: Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-desc'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[560px] text-left pl-2"
            >
              {product.id === 'aura' ? (
                <p 
                  style={{ color: '#E8C5A5' }}
                  className="font-suisse text-[18px] leading-[1.35] tracking-wide drop-shadow-sm font-normal"
                >
                  Best for: When you need something<br />
                  to adjust to changing weathers, or<br />
                  when your day is moody.
                </p>
              ) : (
                <p 
                  style={{ color: '#E8C5A5' }}
                  className="font-suisse text-[18px] leading-[1.35] tracking-wide drop-shadow-sm font-normal"
                >
                  Best for all weathers, all cities.<br />
                  No matter where you are or what<br />
                  the day looks like.
                </p>
              )}
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
              className="flex flex-col items-end text-right space-y-1"
            >
              <button
                type="button"
                onClick={() => variant && add(variant.id, 1)}
                disabled={!configured || !variant || busy || !variant.availableForSale}
                style={{ backgroundColor: '#edc6a2', color: '#3A0D08' }}
                className="pointer-events-auto font-suisse text-sm tracking-wider uppercase px-9 py-3 font-medium hover:bg-white transition-colors shadow-lg rounded-none mb-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!configured
                  ? 'Add to bag'
                  : busy
                    ? 'Adding…'
                    : !variant
                      ? 'Unavailable'
                      : !variant.availableForSale
                        ? 'Sold out'
                        : `Add to bag — ${formatPrice(variant.price)}`}
              </button>
              <p 
                style={{ color: '#edc6a2' }}
                className="font-editorial text-[19px] leading-tight tracking-wider"
              >
                {product.specs}
              </p>
              <p
                style={{ color: '#edc6a2' }}
                className="font-suisse text-[18px] leading-tight tracking-wide whitespace-pre-line"
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

useGLTF.preload(asset('/origin.glb'));
useGLTF.preload(asset('/aura.glb'));