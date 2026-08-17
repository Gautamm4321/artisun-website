'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

export default function OriginProduct() {
  return (
    <div
      id="origin-product"
      className="origin-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden"
    >
      {/* Product cutout — tilted, overlapping on the right */}
      <div className="pointer-events-none absolute right-[-6%] sm:right-0 bottom-0 top-[16%] sm:top-[12%] w-[62%] sm:w-[48%] lg:w-[40%]">
        <Image
          src={asset('/b2.png')}
          alt="Origin bottle"
          fill
          sizes="(max-width: 1024px) 60vw, 40vw"
          className="object-contain object-bottom rotate-[9deg] drop-shadow-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 pt-24 lg:pt-[104px] pb-10 lg:pb-10 flex flex-col justify-between">
        
        {/* Top Section: Wordmark + Glass Box + Statements */}
        <div className="space-y-6 sm:space-y-7">
          {/* Wordmark + subtitle */}
          <div>
            <h2 className="font-editorial tracking-[-0.02em] leading-[0.86] text-[var(--brand-cream)] text-[clamp(66px,14vw,168px)]">
              ORIGIN
            </h2>
            <p className="font-suisse text-[var(--brand-cream)]/65 text-[15px] sm:text-[18px] mt-2 lg:mt-3">
              4-in-1 Milk Emulsion SPF 50+ · Skinwear
            </p>
          </div>

          {/* Transparent Glass Box */}
          <div className="w-full max-w-[340px] p-4 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-editorial text-[var(--brand-cream)] text-[22px] sm:text-[24px] leading-none">
                ₹1,499 <span className="font-suisse text-xs text-[var(--brand-cream)]/60">· 50ml</span>
              </span>
              <button className="pointer-events-auto font-suisse text-[11px] sm:text-xs uppercase tracking-wider px-4 py-2 bg-[var(--brand-cream)] text-[var(--brand-dark,#1a1a1a)] font-medium hover:bg-white transition-colors">
                Add to bag
              </button>
            </div>
            <p className="font-suisse text-[11px] text-[var(--brand-cream)]/50 pt-1 border-t border-white/10">
              Free shipping · Delivered in 3–5 days
            </p>
          </div>

          {/* Statements */}
          <div className="pt-2 sm:pt-4 w-full max-w-[420px]">
            <h3 className="font-editorial text-[var(--brand-cream)] text-[clamp(28px,4.5vw,46px)] leading-[1.12] tracking-tight">
              One layer.<br />
              Every morning.<br />
              Sorted.
            </h3>
            <p className="font-editorial non-italic text-[var(--brand-cream)]/70 text-[18px] sm:text-[22px] mt-3 whitespace-nowrap">
              What&apos;s your skin wearing today?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}