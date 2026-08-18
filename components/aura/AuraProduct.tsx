'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

export default function AuraProduct() {
  return (
    <div
      id="aura-product"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden flex items-center"
    >
      {/* Product cutout */}
      <div className="pointer-events-none absolute right-[-6%] sm:right-0 bottom-0 top-[16%] sm:top-[12%] w-[62%] sm:w-[48%] lg:w-[40%]">
        <Image
          src={asset('/b2.png')}
          alt="Aura bottle"
          fill
          sizes="(max-width: 1024px) 60vw, 40vw"
          className="object-contain object-bottom rotate-[9deg] drop-shadow-2xl"
        />
      </div>

      {/* Content — Vertically Centered */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 py-24 lg:py-0 flex flex-col justify-center">
        
        <div className="space-y-6 sm:space-y-7">
          {/* Wordmark + subtitle */}
          <div>
            <h2 className="font-editorial tracking-[-0.02em] leading-[0.86] text-[var(--brand-cream)] text-[clamp(60px,13vw,160px)]">
              AURA
            </h2>
            <p className="font-suisse text-[var(--brand-cream)]/65 text-[14px] sm:text-[16px] lg:text-[17px] mt-2">
              Pearl Skinwear SPF 40 · PA+++ · All weathers · 50g
            </p>
          </div>

          {/* Transparent Glass Box */}
          <div className="w-full max-w-[340px] p-3.5 sm:p-4 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-editorial text-[var(--brand-cream)] text-[22px] sm:text-[24px] leading-none">
                ₹1,799 <span className="font-suisse text-xs text-[var(--brand-cream)]/60">· 50g</span>
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
          <div className="pt-2 sm:pt-3 w-full max-w-[540px]">
            <h3 className="font-editorial text-[var(--brand-cream)] text-[clamp(26px,3.8vw,42px)] leading-[1.15] tracking-tight max-w-[18ch]">
              Some sunscreen you use.<br />
              This one you’ll reach for.
            </h3>
            <p className="font-editorial not-italic text-[var(--brand-cream)]/70 text-[17px] sm:text-[20px] mt-2.5 whitespace-nowrap">
              What&apos;s your skin wearing today?
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}