'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

export default function OriginProduct() {
  return (
    <div
      id="origin-product"
      className="origin-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden"
    >
      {/* Product cutout — tilted, overlapping on the right (FORMORA-style) */}
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
      <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 pt-24 lg:pt-[104px] pb-10 lg:pb-10 flex flex-col">
        {/* Wordmark + subtitle */}
        <div>
          <h2 className="font-editorial tracking-[-0.02em] leading-[0.86] text-[var(--brand-cream)] text-[clamp(66px,14vw,168px)]">
            ORIGIN
          </h2>
          <p className="font-suisse text-[var(--brand-cream)]/65 text-[15px] sm:text-[18px] mt-2 lg:mt-3">
            4-in-1 Milk Emulsion SPF 50+ · Skinwear
          </p>
        </div>

        {/* Buy row */}
        <div className="mt-7 lg:mt-9 max-w-[30ch]">
          <p className="font-suisse text-[var(--brand-cream)] text-[17px] sm:text-[19px]">
            ₹599 · 50ml —{' '}
            <button className="pointer-events-auto underline underline-offset-4 decoration-1 hover:text-[var(--brand-red)] transition-colors">
              [ Add to bag ]
            </button>
          </p>
          <p className="font-suisse text-[var(--brand-cream)]/45 text-[13px] sm:text-sm mt-2">
            Free shipping · Delivered in 3–5 days
          </p>
        </div>

        {/* Bottom statements */}
        <div className="mt-auto max-w-[16ch] sm:max-w-[20ch]">
          <h3 className="font-editorial text-[var(--brand-cream)] text-[clamp(28px,5.5vw,50px)] leading-[1.06] tracking-tight">
            One layer. Every morning. Sorted.
          </h3>
          <p className="font-editorial italic text-[var(--brand-cream)]/70 text-[20px] sm:text-[24px] mt-4">
            What&apos;s your skin wearing today?
          </p>
        </div>
      </div>
    </div>
  );
}
