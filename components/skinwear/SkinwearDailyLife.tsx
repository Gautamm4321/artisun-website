'use client';

import Image from 'next/image';

export default function SkinwearDailyLife() {
  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 px-5 sm:px-8 md:px-12 lg:px-20 z-[16]">
      <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center text-center">

        {/* 1. TOP LANDSCAPE IMAGE */}
        <div className="
          w-full relative overflow-hidden rounded-xl shadow-2xl mb-5 sm:mb-6 md:mb-8
          h-[220px] xs:h-[260px] sm:h-[320px] md:h-[380px] lg:h-[280px]
        ">
          <Image
            src="/skinwear.shrink.img.jpeg"
            alt="What's your skin wearing today"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* 2. EDITORIAL HEADING */}
        <h2 className="
          font-editorial text-[var(--brand-cream)] leading-[1.08] tracking-[-0.02em] mb-2 sm:mb-3
          text-[clamp(1.8rem,7.5vw,5rem)]
          max-w-[320px] sm:max-w-none
        ">
          What&apos;s your skin<br className="sm:hidden" /> wearing today?
        </h2>

        {/* 3. SUBTEXT */}
        <p className="
          font-suisse text-[var(--brand-cream)]/90 font-normal leading-[1.5]
          max-w-[300px] sm:max-w-[540px] md:max-w-[720px]
          text-[14px] sm:text-[17px] md:text-[20px] lg:text-[22px]
          mb-4 sm:mb-5 md:mb-6
        ">
          Before every event, everyone asks what you&apos;re wearing.
          We&apos;re asking the same about your skin.
        </p>

        {/* 4. CTA BUTTON */}
        <button
          type="button"
          className="
            px-7 sm:px-9 md:px-10
            py-3 sm:py-3.5 md:py-4
            rounded-full bg-[#EAE3D2] hover:bg-[#F2EBDC]
            text-[#8B1E13] font-editorial font-medium
            text-[16px] sm:text-[19px] md:text-[22px]
            transition-all duration-300 shadow-md
            hover:scale-[1.03] active:scale-[0.97]
            cursor-pointer
          "
        >
          Wear Now
        </button>

      </div>
    </section>
  );
}