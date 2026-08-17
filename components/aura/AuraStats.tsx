'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { asset } from '@/lib/asset';
import CountUp from '@/components/origin/CountUp';

type Stat = {
  value: number;
  suffix: string;
  copy: string;
};

const STATS: Stat[] = [
  { value: 97, suffix: '%', copy: 'of UVB rays blocked' },
  { value: 40, suffix: '%', copy: 'less pollution-induced damage' },
  { value: 25, suffix: '%', copy: 'less skin sensitivity' },
  { value: 3, suffix: '×', copy: 'the moisture, from Ectoin' },
  { value: 8, suffix: ' hrs', copy: 'photostable protection' },
];

const BG_IMAGE = '/skinwear-media/worn-product.jpg';

export default function AuraStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-15%' });

  return (
    <div
      id="aura-stats"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden text-[var(--brand-cream)] flex items-center"
    >
      {/* Full-bleed background */}
      <Image
        src={asset(BG_IMAGE)}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/80" />

      {/* Main Layout Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14">
        
        {/* LEFT COLUMN: The Specifics Heading + Badges */}
        <div className="w-full lg:max-w-[500px] flex flex-col space-y-6">
          <div>
            <span className="font-suisse text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[var(--brand-cream)]/70 font-medium">
              The Specifics
            </span>
            <h2 className="font-editorial text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.08] tracking-tight mt-2 text-white">
              Backed by real numbers. Designed for real skin.
            </h2>
          </div>

          {/* 3 Badges under heading */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="font-suisse text-[10.5px] sm:text-[11.5px] uppercase tracking-wider px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md text-white/90 shadow-sm">
              Broad spectrum
            </span>
            <span className="font-suisse text-[10.5px] sm:text-[11.5px] uppercase tracking-wider px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md text-white/90 shadow-sm">
              All skin types
            </span>
            <span className="font-suisse text-[10.5px] sm:text-[11.5px] uppercase tracking-wider px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md text-white/90 shadow-sm">
              Made in India
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Floating Small Stat Card Boxes */}
        <div
          ref={statsRef}
          className="w-full lg:w-auto flex flex-col gap-3 sm:gap-3.5 lg:min-w-[320px] max-w-[380px]"
        >
          {STATS.map((s, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-start gap-4 px-5 py-3.5 sm:py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              {/* Left Side: Animated Stat Value */}
              <div className="font-editorial text-white text-[24px] sm:text-[28px] leading-none tabular-nums shrink-0 text-left min-w-[70px] font-medium">
                <CountUp end={s.value} suffix={s.suffix} play={inView} duration={1.8} />
              </div>

              {/* Right Side: Text Copy */}
              <p className="font-suisse text-[12px] sm:text-[13px] leading-snug text-white/85 flex-1">
                {s.copy}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}