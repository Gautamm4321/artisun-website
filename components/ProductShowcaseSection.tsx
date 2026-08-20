'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '@/lib/asset';

type Product = {
  id: string;
  name: string;
  type: string;
  hook: string;
  support: string;
  spec: string[];
  bestFor: string;
  image: string;
  href: string;
  accent: string;
};

const PRODUCTS: Product[] = [
  {
    id: 'origin',
    name: 'Origin',
    type: '4-in-1 Milk Emulsion',
    hook: 'Your whole routine. Done.',
    support: 'Your serum, moisturiser, primer and SPF, done in one lightweight milky step.',
    spec: ['SPF 50+ · PA++++', 'Ectoin & Bisabolol'],
    bestFor: 'All weathers, all cities. No matter where you are or what the day looks like.',
    image: asset('/about-media/origin-hero.jpg'),
    href: '/origin',
    accent: '#E8601A',
  },
  {
    id: 'aura',
    name: 'Aura',
    type: 'Pearl Skinwear™',
    hook: 'Pearls that melt into sun protection.',
    support: 'Beads that break on contact with skin and disappear — obviously, no white cast.',
    spec: ['SPF 40 · PA++++', 'Broad Spectrum', 'Ectoin · Bisabolol'],
    bestFor: 'When you need something that adjusts to changing weather, or when your day is moody.',
    image: asset('/about-media/aura-1.jpg'),
    href: '/aura',
    accent: '#C0392B',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: 70 * d, scale: 0.92 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: -70 * d, scale: 0.92 }),
};

export default function ProductShowcaseSection() {
  const [active, setActive] = useState(0);
  const dir = useRef(1); // slide direction for the switch
  const product = PRODUCTS[active];

  const go = (next: number) => {
    if (next === active) return;
    dir.current = next > active ? 1 : -1;
    setActive(next);
  };

  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden z-20 flex items-center py-28 md:py-24"
      style={{ background: 'radial-gradient(125% 120% at 50% 42%, #2A0A08 0%, #1A0605 45%, #0C0403 78%, #070302 100%)' }}
    >
      {/* Accent glow behind the product, tinted to the active product */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[720px] aspect-square rounded-full pointer-events-none blur-[70px]"
        animate={{ backgroundColor: product.accent, opacity: 0.22 }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Vertical social rail (image-5 detail) */}
      <div className="hidden lg:flex flex-col items-center gap-4 absolute left-6 top-1/2 -translate-y-1/2 z-20">
        {['Instagram', 'TikTok', 'Journal'].map((s) => (
          <span key={s} className="[writing-mode:vertical-rl] rotate-180 font-suisse text-[10px] tracking-[0.24em] uppercase text-[var(--brand-cream)]/40 hover:text-[var(--brand-cream)]/80 transition-colors cursor-pointer">
            {s}
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center">
        {/* ── LEFT: copy ── */}
        <div className="md:col-span-4 order-2 md:order-1 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-copy'}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span className="font-suisse text-[11px] md:text-[12px] tracking-[0.28em] uppercase text-[var(--brand-cream)]/55">
                {product.name} · {product.type}
              </span>
              <h2 className="mt-4 font-editorial text-[var(--brand-cream)] text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05]">
                {product.hook}
              </h2>
              <p className="mt-5 font-suisse text-[14px] md:text-[15px] leading-relaxed text-[var(--brand-cream)]/75 max-w-[42ch] mx-auto md:mx-0">
                {product.support}
              </p>
            </motion.div>
          </AnimatePresence>

          <Link
            href={product.href}
            className="mt-8 inline-flex items-center gap-4 group"
            aria-label={`Shop ${product.name}`}
          >
            <span className="font-suisse text-[12px] tracking-[0.18em] uppercase text-[var(--brand-cream)] px-7 py-4 rounded-full border border-white/25 group-hover:bg-[var(--brand-cream)] group-hover:text-[#1A0605] transition-all duration-500">
              Shop {product.name}
            </span>
            <span className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-[var(--brand-cream)] group-hover:translate-x-1 transition-transform duration-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </Link>
        </div>

        {/* ── CENTER: active product ── */}
        <div className="md:col-span-5 order-1 md:order-2 relative flex items-center justify-center min-h-[46vh] md:min-h-[64vh]">
          <AnimatePresence mode="popLayout" custom={dir.current}>
            <motion.div
              key={product.id}
              custom={dir.current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: EASE }}
              className="relative w-[74%] sm:w-[62%] md:w-[86%] max-w-[440px] aspect-[3/4]"
            >
              <Image
                src={product.image}
                alt={`${product.name} — ${product.type}`}
                fill
                sizes="(max-width: 768px) 70vw, 440px"
                className="object-contain"
                style={{
                  WebkitMaskImage: 'radial-gradient(72% 80% at 50% 48%, #000 66%, transparent 100%)',
                  maskImage: 'radial-gradient(72% 80% at 50% 48%, #000 66%, transparent 100%)',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RIGHT: switcher + details ── */}
        <div className="md:col-span-3 order-3 flex flex-col gap-8">
          {/* Thumbnails — click to switch */}
          <div className="flex md:flex-col items-center md:items-stretch justify-center gap-4">
            {PRODUCTS.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.id}
                  onClick={() => go(i)}
                  aria-label={`View ${p.name}`}
                  aria-pressed={on}
                  className="group flex flex-col items-center gap-2"
                >
                  <span
                    className={`relative block h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-2xl border transition-all duration-500 ${on ? 'border-white/55 scale-100' : 'border-white/12 scale-[0.92] opacity-55 group-hover:opacity-90'}`}
                    style={on ? { boxShadow: `0 10px 30px ${p.accent}44` } : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${on ? 'bg-[var(--brand-cream)] scale-125' : 'bg-white/25'}`} />
                </button>
              );
            })}
          </div>

          {/* Spec + best-for, crossfading with the product */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-detail'}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="text-center md:text-left"
            >
              <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-2">
                {product.spec.map((s, i) => (
                  <span key={i} className="font-suisse text-[11px] tracking-[0.08em] uppercase text-[var(--brand-cream)]/80 whitespace-nowrap">
                    {s}{i < product.spec.length - 1 && <span className="ml-3 text-[var(--brand-cream)]/25">|</span>}
                  </span>
                ))}
              </div>
              <p className="mt-5 font-suisse text-[13px] leading-relaxed text-[var(--brand-cream)]/60">
                <span className="text-[var(--brand-cream)]/85">Best for </span>{product.bestFor}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
