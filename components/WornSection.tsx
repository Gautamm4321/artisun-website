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
      className="group flex items-center gap-3 sm:gap-3.5 w-[255px] sm:w-[285px] md:w-[298px] p-2.5 sm:p-3 rounded-[20px] bg-transparent border border-white/20 transition-all duration-300 hover:border-white/50 hover:bg-white/[0.05] shadow-none drop-shadow-none"
    >
      {/* Bigger Square Image Box */}
      <span className="relative block h-14 w-14 sm:h-16 sm:w-16 md:h-[68px] md:w-[68px] shrink-0 overflow-hidden rounded-[14px] ring-1 ring-white/35 bg-black/25">
        <Image
          src={card.img}
          alt={card.name}
          fill
          sizes="70px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>

      {/* Compact Info Layout with Bigger Features Text */}
      <span className="flex-1 min-w-0 pr-1">
        <span className="block font-editorial text-white text-[17px] sm:text-[18.5px] md:text-[20px] leading-tight font-normal">
          {card.name}
        </span>
        <span className="mt-1 block font-suisse text-[12.5px] sm:text-[13.5px] md:text-[14.5px] text-white/95 truncate font-normal">
          {card.sub}
        </span>
        <span className="mt-0.5 block font-suisse text-[10px] sm:text-[11px] md:text-[11.5px] tracking-[0.06em] uppercase text-white/80 font-medium">
          {card.spec}
        </span>
      </span>

      {/* Clean Right Arrow */}
      <span className="shrink-0 text-white opacity-75 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        <svg className="h-4.5 w-4.5 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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

      {/* ── 1. LEFT: FULL-HEIGHT BLEED MODEL IMAGE (Flush Left & Scaled to Aura) ── */}
<div className="absolute left-0 bottom-0 top-0 z-10 w-[95vw] sm:w-[85vw] lg:w-[78vw] h-full pointer-events-none flex items-end justify-start overflow-visible">
  <div className="relative w-full h-[120vh] sm:h-[135vh] lg:h-[150vh] origin-bottom-left -translate-x-[13%] lg:-translate-x-[12%] translate-y-0 sm:translate-y-1 lg:translate-y-2">
    <Image
      src={asset('/Without bg.png')}
      alt="Artisun Model"
      fill
      priority
      sizes="(max-width: 1024px) 95vw, 75vw"
      className="object-contain object-left-bottom select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
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
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)]/90 text-[clamp(20px,1.4vw,18px)] leading-[1.4] font-normal mt-6 sm:mt-8 md:mt-10 max-w-[460px] drop-shadow-sm">
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