'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

export default function AuraTexture() {
  return (
    <div
      id="aura-texture"
      className="aura-panel relative w-full lg:w-screen shrink-0 h-[100svh] lg:h-screen overflow-hidden text-[var(--brand-cream)]"
    >
      {/* ── Left Half: Product Image ── */}
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#120302]">
        <Image
          src={asset('/about-media/aura-1.jpg')}
          alt="Aura Product"
          fill
          sizes="50vw"
          className="object-cover object-center"
          priority
        />
        {/* Soft darken overlay for text contrast */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>

      {/* ── Right Half: Red-Orange-Black Texture ── */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, #c43a1d 0%, #70160b 45%, #180302 85%, #050001 100%)',
        }}
      >
        {/* Subtle noise/texture overlay effect */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 mix-blend-overlay" />
      </div>

      {/* ── Center Divider Line ── */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/20 z-20 pointer-events-none" />

      {/* ── Center Container: Exact Heading & Description ── */}
      <div className="relative z-30 h-full w-full flex flex-col items-center justify-center pointer-events-none px-6 sm:px-12">
        
        {/* Centered Eyebrow Label directly above heading */}
        <span className="font-suisse text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[var(--brand-cream)]/75 font-medium mb-3 sm:mb-4 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          HOW IT FEELS
        </span>

        {/* Exact Center Heading */}
        <h2 className="font-editorial text-[30px] sm:text-[44px] lg:text-[56px] leading-[1.08] text-white tracking-tight text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] max-w-[900px]">
          Pillows of gel that vanish<br />
          the second they touch skin.
        </h2>

        {/* Subtext Grid: Right-side offset below heading */}
        <div className="w-full max-w-[900px] grid grid-cols-2 mt-5 sm:mt-6">
          <div /> {/* Left empty cell */}
          
          {/* Right cell: small fonts & exact line sequence */}
          <div className="pl-6 sm:pl-10 text-left">
            <p className="font-suisse text-[11px] sm:text-[12px] leading-[1.5] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Our texture shifts from fluid to plush as you<br />
              smooth it on, then disappears into skin. No<br />
              heaviness. No grease. No film sitting on top.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}