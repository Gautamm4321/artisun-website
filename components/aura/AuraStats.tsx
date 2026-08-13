'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { asset } from '@/lib/asset';
import CountUp from '@/components/origin/CountUp';

type Stat = { index: string; label: string; value: number; suffix: string; copy: string };

const STATS: Stat[] = [
  { index: '01', label: 'Protection', value: 97, suffix: '%', copy: 'of UVB rays blocked — tested broad spectrum shield.' },
  { index: '02', label: 'Pollution', value: 40, suffix: '%', copy: 'less pollution-induced damage on city days.' },
  { index: '03', label: 'Calming', value: 25, suffix: '%', copy: 'less skin sensitivity & redness over time.' },
  { index: '04', label: 'Moisture', value: 3, suffix: '×', copy: 'the moisture retention, powered by German Ectoin.' },
  { index: '05', label: 'Hold', value: 8, suffix: ' hrs', copy: 'photostable protection through heat & sweat.' },
];

const BG_IMAGE = '/skinwear-media/worn-product.jpg';

export default function AuraStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-15%' });

  return (
    <div
      id="aura-stats"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden text-[var(--brand-cream)]"
    >
      {/* Full-bleed background */}
      <Image src={asset(BG_IMAGE)} alt="" fill sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 pt-24 pb-12 lg:pt-[116px] lg:pb-12 flex flex-col justify-between gap-10">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-start">
          <div>
            <span className="font-suisse text-[11px] tracking-[0.14em] uppercase text-[var(--brand-cream)]/70">
              The Specifics
            </span>
            <h2 className="font-editorial text-[30px] sm:text-[44px] lg:text-[54px] leading-[1.05] tracking-tight mt-2 max-w-[15ch]">
              Backed by real numbers. Designed for real skin.
            </h2>
          </div>

          {/* Footer Badges from Miro */}
          <div className="flex flex-wrap gap-2.5 lg:pt-4 lg:justify-end">
            <span className="font-suisse text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm">
              Broad spectrum
            </span>
            <span className="font-suisse text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm">
              All skin types
            </span>
            <span className="font-suisse text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm">
              Made in India
            </span>
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6 lg:gap-x-0"
        >
          {STATS.map((s) => (
            <div
              key={s.index}
              className="flex flex-col lg:px-7 lg:border-l lg:border-[var(--brand-cream)]/18 lg:first:border-l-0 lg:first:pl-0"
            >
              <div className="font-suisse text-[11px] tracking-[0.14em] uppercase text-[var(--brand-cream)]/55">
                {s.index} · {s.label}
              </div>
              <div className="font-editorial text-[var(--brand-cream)] text-[42px] sm:text-[54px] lg:text-[60px] leading-none mt-2 tabular-nums">
                <CountUp end={s.value} suffix={s.suffix} play={inView} duration={2} />
              </div>
              <p className="font-suisse text-[13px] sm:text-sm leading-[1.5] text-[var(--brand-cream)]/70 mt-3">
                {s.copy}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}