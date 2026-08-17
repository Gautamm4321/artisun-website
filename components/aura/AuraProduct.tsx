'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

export default function AuraProduct() {
  return (
    <div
      id="aura-product"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden"
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

      {/* Content wrapper with direct fixed bottom padding */}
      <div 
        className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 pt-24 lg:pt-[104px] flex flex-col justify-between"
        style={{ paddingBottom: '90px' }}
      >
        {/* Top: Wordmark + Subtitle */}
        <div>
          <h2 className="font-editorial tracking-[-0.02em] leading-[0.86] text-[var(--brand-cream)] text-[clamp(66px,14vw,168px)]">
            AURA
          </h2>
          <p className="font-suisse text-[var(--brand-cream)]/75 text-[15px] sm:text-[18px] mt-2 lg:mt-3">
            Aura · Pearl Skinwear SPF 40 · PA+++ · Broad spectrum · 50g
          </p>
        </div>

        {/* Middle: Pricing & Buy Action */}
        <div className="my-auto py-4 max-w-[36ch]">
          <p className="font-suisse text-[var(--brand-cream)] text-[18px] sm:text-[20px] font-medium">
            <span className="font-bold">₹1,799</span> —{' '}
            <button className="pointer-events-auto underline underline-offset-4 decoration-1 hover:text-[var(--brand-red)] transition-colors">
              [ Add to bag ]
            </button>{' '}
            ·{' '}
            <button className="pointer-events-auto underline underline-offset-4 decoration-1 hover:text-[var(--brand-red)] transition-colors">
              [ Buy now ]
            </button>
          </p>
          <p className="font-suisse text-[var(--brand-cream)]/50 text-[13px] sm:text-sm mt-2">
            Free shipping · Delivered in 3 days
          </p>
        </div>

        {/* Bottom Statements — Exact 3-line format */}
        <div className="mt-auto" style={{ maxWidth: '440px', paddingBottom: '20px' }}>
          <h3 
            className="font-editorial text-[var(--brand-cream)] tracking-tight"
            style={{ 
              fontSize: 'clamp(26px, 3.4vw, 40px)', 
              lineHeight: '1.15',
              whiteSpace: 'normal' 
            }}
          >
            Some sunscreen you use.<br />
            This one you’ll<br />
            reach for.
          </h3>
          <p 
            className="font-editorial italic text-[var(--brand-cream)]/70 mt-4"
            style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}
          >
            What’s your skin wearing today?
          </p>
        </div>

      </div>
    </div>
  );
}