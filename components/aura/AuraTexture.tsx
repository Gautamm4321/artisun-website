'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

export default function AuraTexture() {
  return (
    <div
      id="aura-texture"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden flex flex-col justify-between py-12 lg:py-16 px-5 sm:px-8 lg:px-14 bg-[var(--brand-red,#8B0000)] text-[var(--brand-cream)]"
    >
      {/* Background Subtle Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 50% at 75% 50%, rgba(255,255,255,0.08), transparent 70%)',
        }}
      />

      {/* Main Grid Layout Container */}
      <div className="relative z-10 my-auto w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
          {/* Top Header */}
          <div>
            <span className="font-suisse text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[var(--brand-cream)]/70">
              How it feels
            </span>
            <h2 className="font-editorial text-[28px] sm:text-[42px] lg:text-[52px] leading-[1.08] tracking-tight mt-2 max-w-[20ch]">
              Pillows of gel that vanish the second they touch skin.
            </h2>
          </div>

          {/* Middle Body Copy */}
          <div className="space-y-3 sm:space-y-4 max-w-[48ch]">
            <p className="font-suisse text-[14px] sm:text-[16px] text-[var(--brand-cream)]/80 leading-[1.6]">
              Bead creams are usually heavy — they sit, they grease up, they take forever to sink in.
            </p>
            <p className="font-suisse text-[14px] sm:text-[16px] text-[var(--brand-cream)]/95 font-medium leading-[1.6]">
              Our texture shifts from fluid to plush as you smooth it on, then disappears into skin.
            </p>
          </div>

          {/* Bottom Highlight Statement */}
          <div className="pt-5 border-t border-white/15 max-w-[52ch]">
            <p className="font-editorial text-[18px] sm:text-[24px] lg:text-[28px] leading-[1.25] text-[var(--brand-cream)]/95">
              No heaviness. No grease. No film sitting on top. Just an even, soft, dewy finish that looks like good skin — not like product.
            </p>
          </div>
        </div>

        {/* Right Side: Properly Bounded Product Card */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] rounded-[24px] overflow-hidden border border-white/15 shadow-2xl bg-black/20">
            <Image
              src={asset('/about-media/aura-3.jpg')}
              alt="Aura Texture Feel"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
}