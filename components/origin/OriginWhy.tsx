'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { asset } from '@/lib/asset';
import CountUp from './CountUp';

type Stat = { index: string; label: string; value: number; suffix: string; copy: string };

const STATS: Stat[] = [
  { index: '01', label: 'Serum', value: 20, suffix: '%', copy: "deeper hydration than hyaluronic acid — the Beta-Glucan that does a serum's barrier work." },
  { index: '02', label: 'Moisturiser', value: 72, suffix: ' hrs', copy: 'of continuous moisture — hydration that holds, long after it goes on.' },
  { index: '03', label: 'Sunscreen', value: 98, suffix: '%', copy: 'of UVB blocked — a full SPF 50+ PA++++ shield, tested to protect.' },
  { index: '04', label: 'Primer', value: 0, suffix: '', copy: 'pilling or slide — a smooth, even base makeup grips to.' },
  { index: '05', label: 'Over time', value: 4, suffix: ' weeks', copy: 'to a visibly stronger skin barrier, used daily.' },
];

const BG_IMAGE = '/skinwear-media/worn-product.jpg';

export default function OriginWhy() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-15%' });

  return (
    <div
      id="origin-why"
      className="origin-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden"
    >
      {/* Full-bleed background */}
      <Image src={asset(BG_IMAGE)} alt="" fill sizes="100vw" className="object-cover object-center" />
      {/* Scrims for legibility: overall darken + stronger top & bottom */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 pt-20 sm:pt-24 lg:pt-[104px] pb-16 sm:pb-20 lg:pb-16 flex flex-col justify-between gap-6 lg:gap-8">
        {/* Top: hook (left) + subline (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-start">
          <h2 className="font-editorial text-[var(--brand-cream)] text-[30px] sm:text-[44px] lg:text-[54px] leading-[1.05] tracking-tight max-w-[15ch]">
            The most boring step in your morning, finally worth it.
          </h2>
          <p className="font-suisse text-[var(--brand-cream)]/80 text-[16px] sm:text-[19px] lg:text-[21px] leading-[1.5] max-w-[52ch] lg:pt-2 lg:justify-self-end">
            You use four products before you&apos;ve even left the house — serum, moisturiser,
            sunscreen, primer, one after the other. Origin is all four, in one light layer.
          </p>
        </div>

        {/* Bottom-aligned stats — no box grid, faint vertical dividers on desktop */}
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
