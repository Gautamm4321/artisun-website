'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { asset } from '@/lib/asset';
import CountUp from './CountUp';

type Stat = { index: string; label: string; value: number; suffix: string; copy: string; mobileCopy: string };

const STATS: Stat[] = [
  { index: '01', label: 'Serum', value: 20, suffix: '%', copy: "deeper hydration than hyaluronic acid — the Beta-Glucan that does a serum's barrier work.", mobileCopy: 'deeper hydration than hyaluronic acid' },
  { index: '02', label: 'Moisturiser', value: 72, suffix: ' hrs', copy: 'of continuous moisture — hydration that holds, long after it goes on.', mobileCopy: 'of continuous moisture' },
  { index: '03', label: 'Sunscreen', value: 98, suffix: '%', copy: 'of UVB blocked — a full SPF 50+ PA++++ shield, tested to protect.', mobileCopy: 'of UVB blocked' },
  { index: '04', label: 'Primer', value: 0, suffix: '', copy: 'pilling or slide — a smooth, even base makeup grips to.', mobileCopy: 'pilling or slide' },
  { index: '05', label: 'Over time', value: 4, suffix: ' weeks', copy: 'to a visibly stronger skin barrier, used daily.', mobileCopy: 'to a visibly stronger skin barrier, used daily.' },
];

const BG_IMAGE = '/skinwear-media/worn-product.jpg';

export default function OriginWhy() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-15%' });

  return (
    <div id="origin-why" className="origin-panel relative w-screen shrink-0 h-[100svh] overflow-hidden">
      {/* Full-bleed background */}
      <Image src={asset(BG_IMAGE)} alt="" fill sizes="100vw" className="object-cover object-center" />
      {/* Scrims for legibility: overall darken + stronger top & bottom */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-14 pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-[104px] lg:pb-16 flex flex-col justify-between overflow-hidden">
        {/* Top: hook + subline stacked right below on mobile */}
        {/* Top: hook (2 lines) + subline (3 lines) on mobile */}
        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-16 items-start shrink-0">
          <h2 className="font-editorial text-[var(--brand-cream)] text-[22px] sm:text-[34px] lg:text-[54px] leading-[1.08] tracking-tight max-w-[22ch] lg:max-w-[15ch]">
            The most boring step in your morning, <br className="hidden sm:inline lg:hidden" />finally worth it.
          </h2>
          <p className="font-suisse text-[var(--brand-cream)]/80 text-[11px] sm:text-[14px] lg:text-[20px] leading-[1.45] lg:leading-[1.5] max-w-[34ch] sm:max-w-[48ch] lg:max-w-[48ch] lg:pt-2 lg:justify-self-end">
            <span className="lg:hidden">
              You use four products before you&apos;ve even left the house — serum, moisturiser, sunscreen, primer, one after the other. Origin is all four, in one light layer.
            </span>
            <span className="hidden lg:inline">
              You use four products before you&apos;ve even left the house — serum, moisturiser, sunscreen, primer, one after the other. Origin is all four, in one light layer.
            </span>
          </p>
        </div>

       {/* Bottom-aligned stats: Glassy Swipe Boxes on Mobile | Original Full Columns on Desktop */}
        <div
          ref={statsRef}
          data-lenis-prevent="true"
          className="flex lg:grid lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-x-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 [scrollbar-width:none] snap-x snap-mandatory shrink-0"
        >
          {STATS.map((s) => (
            <div
              key={s.index}
              className="snap-start shrink-0 w-[145px] sm:w-[170px] lg:w-auto p-3 sm:p-3.5 lg:p-0 rounded-xl lg:rounded-none bg-white/[0.08] lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/15 lg:border-0 lg:border-l lg:border-[var(--brand-cream)]/18 lg:first:border-l-0 lg:px-7 lg:first:pl-0 flex flex-col justify-between shadow-lg lg:shadow-none"
            >
              <div>
                <div className="font-suisse text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.14em] uppercase text-[var(--brand-cream)]/60">
                  {s.index} · {s.label}
                </div>
                <div className="font-editorial text-[var(--brand-cream)] text-[28px] sm:text-[36px] lg:text-[60px] leading-none mt-1.5 lg:mt-2 tabular-nums">
                <CountUp end={s.value} suffix={s.suffix} play={inView} duration={2} />
                </div>
              </div>
              
              {/* Short copy on mobile, Full copy on desktop */}
              <p className="font-suisse text-[10px] sm:text-[11.5px] lg:text-[13px] leading-[1.3] lg:leading-[1.5] text-[var(--brand-cream)]/75 mt-2 lg:mt-3">
                <span className="lg:hidden">{s.mobileCopy}</span>
                <span className="hidden lg:inline">{s.copy}</span>
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}