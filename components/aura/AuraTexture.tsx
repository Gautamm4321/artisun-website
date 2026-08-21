'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

export default function AuraTexture() {
  return (
    <div
      id="aura-texture"
      className="aura-panel relative w-screen shrink-0 h-[100svh] overflow-hidden text-[var(--brand-cream)]"
    >
      {/* ── Top on Mobile / Left on Desktop: Product Image ── */}
      <div className="absolute top-0 left-0 w-full h-1/2 lg:w-1/2 lg:h-full overflow-hidden bg-[#120302]">
        <Image
          src={asset('/about-media/aura-1.jpg')}
          alt="Aura Product"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </div>

      {/* ── Bottom on Mobile / Right on Desktop: Red-Orange-Black Texture ── */}
      <div
        className="absolute bottom-0 left-0 lg:top-0 lg:left-auto lg:right-0 w-full h-1/2 lg:w-1/2 lg:h-full overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, #c43a1d 0%, #70160b 45%, #180302 85%, #050001 100%)',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 mix-blend-overlay" />
      </div>

      {/* ── Center Divider Line (Horizontal on Mobile / Vertical on Desktop) ── */}
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 lg:top-0 lg:left-1/2 lg:w-px lg:h-full lg:-translate-x-1/2 lg:translate-y-0 bg-white/20 z-20 pointer-events-none" />

      {/* ── Center Container: Exact Heading & Description ── */}
      <div className="relative z-30 h-full w-full flex flex-col items-center justify-center pointer-events-none px-6 sm:px-12">

        {/* Centered Eyebrow Label directly above heading */}
        <span className="font-suisse text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[var(--brand-cream)]/75 font-medium mb-3 sm:mb-4 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          HOW IT FEELS
        </span>

        {/* Exact Center Heading */}
        <h2 className="font-editorial text-[clamp(24px,4vw,56px)] leading-[1.08] text-white tracking-tight text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] max-w-[900px]">
          Pillows of gel that vanish<br />
          the second they touch skin.
        </h2>

        {/* Subtext: Parallel width & right-offset in exact 3 lines */}
        <div className="w-full max-w-[860px] grid grid-cols-1 lg:grid-cols-2 mt-4 sm:mt-6">
          <div className="hidden lg:block" /> {/* Left side empty spacer */}

          <div className="text-center lg:text-left lg:pl-6 px-4 sm:px-0">
            <p className="font-suisse text-[11px] sm:text-[12px] lg:text-[12.5px] leading-[1.5] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-[34ch] mx-auto lg:mx-0">
              Our texture shifts from fluid to plush as you smooth it on, then disappears into skin. No heaviness. No grease. No film sitting on top.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}