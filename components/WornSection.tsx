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
      className="group flex items-center gap-3 w-[220px] sm:w-[240px] md:w-[255px] p-2.5 sm:p-3 rounded-[18px] bg-black/40 backdrop-blur-md border border-white/20 transition-all duration-300 hover:border-white/40 hover:bg-black/55 shadow-none"
    >
      <span className="relative block h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 overflow-hidden rounded-[10px] ring-1 ring-white/20 bg-black/20">
        <Image
          src={card.img}
          alt={card.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </span>

      <span className="flex-1 min-w-0">
        <span className="block font-editorial text-white text-[15px] md:text-[16px] leading-none">
          {card.name}
        </span>
        <span className="mt-1 block font-suisse text-[10px] md:text-[11px] text-white/75 truncate">
          {card.sub}
        </span>
        <span className="mt-0.5 block font-suisse text-[8.5px] md:text-[9px] tracking-[0.12em] uppercase text-white/50">
          {card.spec}
        </span>
      </span>

      <span className="shrink-0 text-white opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <div className="absolute -left-[5%] sm:left-0 bottom-0 top-0 z-10 w-[55%] sm:w-[50%] lg:w-[48%] max-w-[700px] h-full pointer-events-none flex items-end">
        <div className="relative w-full h-full">
          <Image
            src={asset('/3.png')}
            alt="Artisun Model"
            fill
            priority
            sizes="(max-width: 1024px) 50vw, 48vw"
            className="object-cover sm:object-contain object-left-bottom select-none"
          />
        </div>
      </div>

      {/* ── 2. RIGHT-ALIGNED TEXT BLOCK ── */}
      <div
        className="relative z-20 w-full max-w-[830px] ml-auto flex flex-col items-end text-right pt-6 sm:pt-0"
      >
        {/* Main 2-Line Headline */}
        <h2 className="font-editorial text-[var(--brand-cream,#f5f0eb)] text-[clamp(28px,3.8vw,62px)] leading-[1.08] tracking-[-0.02em] font-normal drop-shadow-md">
          Most sunscreens are made to be<br />
          tolerated, ours is designed to be worn.
        </h2>

        {/* 2-Line Sub-Description */}
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)]/90 text-[clamp(14px,1.3vw,20px)] leading-[1.4] font-normal mt-8 sm:mt-12 md:mt-16 max-w-[420px] drop-shadow-sm">
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