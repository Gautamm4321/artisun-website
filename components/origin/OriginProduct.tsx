'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

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
  return (
    <div
      id="origin-product"
      className="origin-panel relative w-screen shrink-0 h-screen overflow-hidden"
    >
      {/* Product cutout: Bottom center on Mobile | Tilted Right on Desktop */}
      <div className="pointer-events-none absolute right-0 lg:right-[-6%] left-0 lg:left-auto bottom-0 lg:top-[12%] h-[32vh] sm:h-[38vh] lg:h-auto w-full lg:w-[40%] z-0 flex justify-center lg:block opacity-65 lg:opacity-100">
        <Image
          src={asset('/b2.png')}
          alt="Origin bottle"
          fill
          sizes="(max-width: 1024px) 80vw, 40vw"
          className="object-contain object-bottom rotate-0 lg:rotate-[9deg] drop-shadow-2xl"
        />
      </div>

      {/* Content */}
      <div data-lenis-prevent="true" className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-14 pt-16 sm:pt-20 lg:pt-[100px] pb-14 sm:pb-16 lg:pb-16 flex flex-col justify-start lg:justify-between gap-3 sm:gap-4 lg:gap-0 overflow-y-auto lg:overflow-hidden [scrollbar-width:none]">

        {/* Top Section: Wordmark + Badges + Glass Box */}
        <div className="space-y-2.5 sm:space-y-4 lg:space-y-5 shrink-0">
          {/* Wordmark + Badges */}
          <div>
            <h2 className="font-editorial tracking-[-0.02em] leading-[0.86] text-[var(--brand-cream)] text-[clamp(40px,11vw,118px)]">
              ORIGIN
            </h2>

            {/* Badges Box Group — Rectangular Shape */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3.5">
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

          {/* Transparent Glass Box */}
          <div className="w-full max-w-full sm:max-w-[340px] p-3 sm:p-4 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-editorial text-[var(--brand-cream)] text-[20px] sm:text-[24px] leading-none">
                ₹1,499 <span className="font-suisse text-xs text-[var(--brand-cream)]/60">· 50ml</span>
              </span>
              <button className="pointer-events-auto font-suisse text-[10px] sm:text-xs uppercase tracking-wider px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[var(--brand-cream)] text-[var(--brand-dark,#1a1a1a)] font-medium hover:bg-white transition-colors">
                Add to bag
              </button>
            </div>
            <p className="font-suisse text-[10.5px] sm:text-[11px] text-[var(--brand-cream)]/50 pt-1 border-t border-white/10">
              Free shipping · Delivered in 3–5 days
            </p>
          </div>
        </div>

        {/* Middle/Lower Section: Divided Info Lines */}
        <div className="w-full max-w-full sm:max-w-[460px] border-t border-b border-[var(--brand-cream)]/15 divide-y divide-[var(--brand-cream)]/15 shrink-0">
          {DETAILS.map((d) => (
            <div key={d.title} className="py-1.5 sm:py-2.5 lg:py-3">
              <span className="block font-suisse text-[8px] sm:text-[9.5px] tracking-[0.18em] uppercase text-[var(--brand-cream)]/60 font-semibold mb-0.5">
                {d.title}
              </span>
              <p className="font-suisse text-[11px] sm:text-[13.5px] leading-[1.35] text-[var(--brand-cream)]/90">
                {d.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Ending Line */}
        <div className="shrink-0 pt-0.5 pb-2 lg:pb-0">
          <p className="font-editorial not-italic text-[var(--brand-cream)]/75 text-[15px] sm:text-[20px] tracking-tight">
            What&apos;s your skin wearing today?
          </p>
        </div>

      </div>
    </div>
  );
}