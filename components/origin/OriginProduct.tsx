'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';
import { usePanelEdgeScroll } from '@/hooks/usePanelEdgeScroll';

const BADGES = ['SPF 50+', 'PA++++', 'All Skin Types', 'All Weathers'];

const DETAILS = [
  {
    title: 'WHAT MAKES IT DIFFERENT',
    body: 'Pearls you choose as per the weather — more when it’s dry, fewer when it’s humid.',
  },
  {
    title: 'HOW IT WEARS',
    body: 'Pearls that melt into a fresh gel. A soft, dewy finish, never heavy.',
  },
  {
    title: "WHAT'S INSIDE",
    body: 'Ectoin, Bisabolol and Sodium Hyaluronate',
  },
];

export default function OriginProduct() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  usePanelEdgeScroll(scrollerRef);

  return (
    <div
      id="origin-product"
      className="origin-panel relative w-screen shrink-0 h-[100svh] overflow-hidden"
    >
      {/* Background Radial Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
        }}
      />

      <div
        ref={scrollerRef}
        className="panel-scroll lg:overflow-hidden h-full flex flex-col items-center justify-start lg:justify-center pt-[76px] pb-24 sm:pt-24 sm:pb-24 lg:py-0"
      >
        <div className="w-full max-w-[900px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col items-center gap-4 sm:gap-6 lg:gap-7 my-auto">

          {/* ── IMAGE ON TOP ── */}
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] h-[30vh] sm:h-[34vh] lg:h-[40vh] shrink-0">
            <div
              className="absolute inset-0 z-0 rounded-full blur-2xl opacity-70"
              style={{ background: 'radial-gradient(circle at 50% 45%, rgba(233,85,30,0.35), transparent 65%)' }}
            />
            <Image
              src={asset('/Second last page.png')}
              alt="Origin 4-in-1 Milk Emulsion SPF 50+"
              fill
              sizes="(max-width: 1024px) 90vw, 380px"
              className="relative z-10 object-contain object-center drop-shadow-2xl"
              priority
            />
          </div>

          {/* ── TEXTS ON THE BOTTOM ── */}
          <div className="w-full max-w-[520px] flex flex-col items-center text-center gap-3 sm:gap-4 shrink-0">

            {/* Wordmark + Badges */}
            <div className="flex flex-col items-center">
              <h2 className="font-editorial tracking-[-0.02em] leading-[0.9] text-[var(--brand-cream)] text-[clamp(38px,10vw,86px)]">
                ORIGIN
              </h2>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                {BADGES.map((b) => (
                  <span
                    key={b}
                    className="font-suisse text-[9px] sm:text-[11px] font-medium tracking-wider uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-white/95 backdrop-blur-md bg-white/[0.08] border border-white/20 shadow-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Glass Price Box */}
            <div className="w-full max-w-[360px] p-3 sm:p-4 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg space-y-2 sm:space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-editorial text-[var(--brand-cream)] text-[20px] sm:text-[24px] leading-none">
                  ₹1,499 <span className="font-suisse text-xs text-[var(--brand-cream)]/60">· 50ml</span>
                </span>
                <button className="pointer-events-auto font-suisse text-[10px] sm:text-xs uppercase tracking-wider px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[var(--brand-cream)] text-[var(--brand-dark,#1a1a1a)] font-medium hover:bg-white transition-colors">
                  Add to bag
                </button>
              </div>
              <p className="font-suisse text-[10.5px] sm:text-[11px] text-left text-[var(--brand-cream)]/50 pt-1 border-t border-white/10">
                Free shipping · Delivered in 3–5 days
              </p>
            </div>

            {/* Divided Info Lines */}
            <div className="w-full max-w-[460px] text-left border-t border-b border-[var(--brand-cream)]/15 divide-y divide-[var(--brand-cream)]/15">
              {DETAILS.map((d) => (
                <div key={d.title} className="py-2 sm:py-2.5 lg:py-3">
                  <span className="block font-suisse text-[8px] sm:text-[9.5px] tracking-[0.18em] uppercase text-[var(--brand-cream)]/60 font-semibold mb-0.5">
                    {d.title}
                  </span>
                  <p className="font-suisse text-[11px] sm:text-[13.5px] leading-[1.35] text-[var(--brand-cream)]/90">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Closing Line */}
            <p className="font-editorial not-italic text-[var(--brand-cream)]/75 text-[16px] sm:text-[20px] tracking-tight pt-0.5">
              What&apos;s your skin wearing today?
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
