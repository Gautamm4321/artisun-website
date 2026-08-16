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
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden text-[var(--brand-cream)] flex items-center"
    >
      {/* Full-bleed background */}
      <Image src={asset(BG_IMAGE)} alt="" fill sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />

      {/* Main Layout Container */}
      <div className="relative z-10 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: The Specifics + Heading + 3 Badges */}
        <div className="w-full lg:max-w-[480px] flex flex-col space-y-6">
          <div>
            <span className="font-suisse text-[11px] tracking-[0.18em] uppercase text-[var(--brand-cream)]/70">
              The Specifics
            </span>
            <h2 className="font-editorial text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.08] tracking-tight mt-2 text-white">
              Backed by real numbers. Designed for real skin.
            </h2>
          </div>

          {/* 3 Badges set directly under the heading */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="font-suisse text-[11px] sm:text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
              Broad spectrum
            </span>
            <span className="font-suisse text-[11px] sm:text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
              All skin types
            </span>
            <span className="font-suisse text-[11px] sm:text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
              Made in India
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Vertically Stacked Digits & Information */}
        <div
          ref={statsRef}
          className="w-full lg:max-w-[560px] flex flex-col divide-y divide-white/15"
        >
          {STATS.map((s) => (
            <div
              key={s.index}
              className="py-4 lg:py-5 first:pt-0 last:pb-0 flex items-center justify-between gap-6"
            >
              {/* Left Info */}
              <div className="flex-1 pr-2">
                <div className="font-suisse text-[11px] tracking-[0.16em] uppercase text-[var(--brand-cream)]/60 mb-1">
                  {s.index} · {s.label}
                </div>
                <p className="font-suisse text-xs sm:text-[13px] leading-relaxed text-[var(--brand-cream)]/75">
                  {s.copy}
                </p>
              </div>

              {/* Animated Digit */}
              <div className="font-editorial text-[var(--brand-cream)] text-[34px] sm:text-[44px] lg:text-[48px] leading-none tabular-nums shrink-0 text-right min-w-[110px]">
                <CountUp end={s.value} suffix={s.suffix} play={inView} duration={2} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}