'use client';

import { asset } from '@/lib/asset';

export default function ClimateModelSection() {
  return (
    <section className="relative w-full h-[100svh] min-h-[680px] overflow-hidden select-none bg-[#0a0504]">
      
      {/* 1. Background City Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-75 brightness-[0.75]"
        >
          <source src={asset('/2026-08-15_17-15-36_0.mp4')} type="video/mp4" />
        </video>
      </div>

      {/* 2. Cinematic Atmospheric Gradient & Vignette Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,3,2,0.7) 100%), linear-gradient(to bottom, rgba(15,3,2,0.4) 0%, transparent 35%, rgba(15,3,2,0.85) 100%)',
        }}
      />

      {/* 3. Model Cutout (Enlarged and Grounded to Bottom) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center">
        <img
          src={asset('/700211e6d574c25b6404e29a33e7111c.jpg-removebg-preview.png')}
          alt="Model wearing Artisun"
          className="h-[88vh] sm:h-[94vh] lg:h-[98vh] w-auto max-w-[95vw] object-contain object-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* 4. Left Side Text Block */}
      <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-12 lg:left-16 z-30 max-w-[340px] sm:max-w-[440px] text-left pointer-events-auto">
        <h3 className="font-editorial text-[var(--brand-cream,#f5f0eb)] text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.12] tracking-tight drop-shadow-md">
          So we made one that&rsquo;s ready for all of it.
        </h3>
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)]/85 text-[13px] sm:text-[15px] lg:text-[15.5px] leading-relaxed mt-3 drop-shadow-sm">
          The first Climate Smart&trade; sun care line &mdash; Built for your day &amp; weather, not just your skin type.
        </p>
      </div>

    </section>
  );
}