'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ProductCard = {
  href: string;
  img: string;
  name: string;
  sub: string;
  spec: string;
};

const CARDS: ProductCard[] = [
  {
    href: '/origin',
    img: asset('/about-media/origin-hero.jpg'),
    name: 'Origin',
    sub: '4-in-1 Milk Emulsion',
    spec: 'SPF 50+ · PA++++',
  },
  {
    href: '/aura',
    img: asset('/about-media/aura-1.jpg'),
    name: 'Aura',
    sub: 'Pearl Skinwear™',
    spec: 'SPF 40 · PA+++',
  },
];

function GlassCard({ card }: { card: ProductCard }) {
  return (
    <Link
      href={card.href}
      aria-label={`${card.name} — ${card.sub}`}
      className="group flex items-center gap-3.5 w-[240px] sm:w-[260px] md:w-[280px] p-3 sm:p-3.5 rounded-[20px] bg-white/[0.08] backdrop-blur-xl border border-white/25 transition-all duration-300 hover:border-white/50 hover:bg-white/[0.14] shadow-none"
    >
      <span className="relative block h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-[12px] ring-1 ring-white/30 bg-black/10">
        <Image
          src={card.img}
          alt={card.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>

      <span className="flex-1 min-w-0">
        <span className="block font-editorial text-white text-[16px] md:text-[18px] leading-none">
          {card.name}
        </span>
        <span className="mt-1 block font-suisse text-[11px] md:text-[12px] text-white/85 truncate">
          {card.sub}
        </span>
        <span className="mt-0.5 block font-suisse text-[9px] md:text-[10px] tracking-[0.12em] uppercase text-white/60">
          {card.spec}
        </span>
      </span>

      <span className="shrink-0 text-white opacity-80 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function WornSection() {
  return (
    <section
      className="relative w-full min-h-[100svh] z-20 flex items-center justify-between overflow-hidden px-6 sm:px-10 md:px-14 lg:px-20"
    >

      {/* Background Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
        }}
      />

      {/* ── 1. LEFT: FULL-HEIGHT BLEED MODEL IMAGE ── */}
      <div className="absolute left-0 bottom-0 top-0 z-10 w-[90%] sm:w-[76%] lg:w-[54%] h-full pointer-events-none flex items-end overflow-hidden">
        <div className="relative w-full h-full scale-[1.10] origin-left translate-y-3">
          <Image
            src={asset('/3.png')}
            alt="Artisun Model"
            fill
            priority
            sizes="(max-width: 1024px) 72vw, 52vw"
            className="object-contain object-left-bottom select-none"
          />
        </div>
      </div>

      {/* ── 2. RIGHT-ALIGNED TEXT BLOCK ── */}
      <div
        className="relative z-20 w-full max-w-[1000px] lg:max-w-[1050px] ml-auto flex flex-col items-end text-right pt-6 sm:pt-0"
      >
        {/* Main 2-Line Headline */}
        <h2 className="font-editorial text-[var(--brand-cream,#f5f0eb)] text-[clamp(38px,3.2vw,56px)] leading-[1.12] tracking-[-0.02em] font-normal drop-shadow-md">
          <span className="block whitespace-nowrap">Most sunscreens are made to be</span>
          <span className="block whitespace-nowrap">tolerated, ours is designed to be worn.</span>
        </h2>

        {/* 2-Line Sub-Description */}
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)]/90 text-[clamp(18px,1.2vw,18px)] leading-[1.4] font-normal mt-6 sm:mt-8 md:mt-10 max-w-[460px] drop-shadow-sm">
          Because you’ll only wear it every day if it<br className="hidden sm:inline" /> survives every kind of day.
        </p>
      </div>

      {/* ── 3. BOTTOM-RIGHT HORIZONTAL PRODUCT CARDS ── */}
      <div className="absolute right-6 sm:right-10 md:right-14 lg:right-20 bottom-6 sm:bottom-8 md:bottom-10 z-30 flex flex-row items-center gap-3 sm:gap-4 overflow-x-auto max-w-[calc(100vw-3rem)] sm:max-w-none">
        {CARDS.map((card) => (
          <GlassCard key={card.href} card={card} />
        ))}
      </div>
    </section>
  );
}