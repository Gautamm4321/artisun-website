'use client';

import Image from 'next/image';

export default function SkinwearDailyLife() {
  return (
    <section className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 z-[16]">
      <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center text-center">
        
        {/* 1. TOP LANDSCAPE IMAGE CARD */}
        <div className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[260px] relative overflow-hidden rounded-sm shadow-2xl mb-4 md:mb-6">
          <Image
            src="/skinwear.shrink.img.jpeg"
            alt="What's your skin wearing today"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* 2. BIG EDITORIAL HEADING */}
        <h2 className="font-editorial text-[var(--brand-cream)] text-[clamp(2.2rem,5vw,5rem)] leading-[1.08] tracking-[-0.02em] mb-1 md:mb-2">
          What&apos;s your skin wearing today?
        </h2>

        {/* 3. SMALL SUBTEXT (PARAGRAPH) */}
        <p className="font-suisse text-[var(--brand-cream)]/90 text-[16px] md:text-[20px] lg:text-[22px] font-normal leading-[1.4] max-w-[720px] mb-2 md:mb-3">
          Before every event, everyone asks what you&apos;re wearing.
          <br className="hidden sm:inline" />
          We&apos;re asking the same about your skin.
        </p>

        {/* 4. PILL-SHAPED CTA BUTTON */}
        <button
          type="button"
          className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-[#EAE3D2] hover:bg-[#F2EBDC] text-[#8B1E13] font-editorial text-[18px] md:text-[22px] font-medium transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
        >
          Wear Now
        </button>

      </div>
    </section>
  );
}