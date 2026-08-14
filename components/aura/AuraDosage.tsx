'use client';

import { useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

type PearlTab = {
  pearls: number;
  label: string;
  weather: string;
  desc: string;
  image: string;
};

const PEARL_TABS: PearlTab[] = [
  {
    pearls: 1,
    label: '1 Pearl',
    weather: 'Humid & Sticky',
    desc: 'Light, weightless coverage for high humidity days when skin needs minimal layers.',
    image: '/about-media/aura-1.jpg',
  },
  {
    pearls: 2,
    label: '2 Pearls',
    weather: 'Mild & Everyday',
    desc: 'Two pearls when it’s humid. Perfect balance for your standard daily commute.',
    image: '/about-media/aura-2.jpg',
  },
  {
    pearls: 3,
    label: '3 Pearls',
    weather: 'Dry & Cold Winter',
    desc: 'Three when it’s dry. Deeper hydration so you are never under-protected in a Delhi winter.',
    image: '/about-media/aura-3.jpg',
  },
];

export default function AuraDosage() {
  const [activeTab, setActiveTab] = useState(1); // Default to 2 pearls (index 1)

  const current = PEARL_TABS[activeTab];

  return (
    <div
      id="aura-dosage"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden flex flex-col justify-between py-8 lg:py-12 px-5 sm:px-8 lg:px-14 bg-[var(--brand-red,#8B0000)] text-[var(--brand-cream)]"
    >
      {/* Top Heading */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto">
        <span className="font-suisse text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[var(--brand-cream)]/70">
          Dosage Guide
        </span>
        <h2 className="font-editorial text-[26px] sm:text-[38px] lg:text-[46px] leading-tight mt-1 max-w-[20ch]">
          The first sunscreen that changes with the weather.
        </h2>
        <p className="font-suisse text-[13px] sm:text-[15px] text-[var(--brand-cream)]/80 mt-2 max-w-[55ch] leading-relaxed">
          Two pearls when it’s humid. Three when it’s dry. It flexes to the day — so you’re never overdoing it in a Bombay summer or under-protected in a Delhi winter.
        </p>
      </div>



      {/* Center Interactive Visual Display */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center pt-2">
        
        {/* Left: Image Card - Perfect bounded height so text is never cut off */}
        <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[20px] overflow-hidden border border-white/15 shadow-2xl bg-black/20 flex items-center justify-center">
          <Image
            key={current.image}
            src={asset(current.image)}
            alt={current.label}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-all duration-500"
            priority
          />

          {/* Bottom Card Overlay Text */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/10 z-20">
            <span className="font-editorial text-base sm:text-lg block font-semibold text-white">
              {current.weather}
            </span>
            <span className="font-suisse text-[11px] sm:text-xs text-[var(--brand-cream)]/85 block mt-0.5 leading-snug">
              {current.desc}
            </span>
          </div>
        </div>


{/* Right: Vertical Stack (Select Dose -> 1 Pearl -> 2 Pearls -> 3 Pearls -> Bottom Lines) */}
        <div className="flex flex-col justify-center space-y-3.5 w-full max-w-[480px]">
          {/* 1. Top Header */}
          <p className="font-suisse text-xs uppercase tracking-[0.16em] opacity-75">
            Select Dose Amount:
          </p>

          {/* 2. Vertically Stacked Boxes (Ek ke neeche ek) */}
          <div className="flex flex-col gap-2.5 w-full">
            {PEARL_TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`w-full py-3 px-5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-black border-white shadow-lg scale-[1.01]'
                      : 'bg-black/20 text-[var(--brand-cream)]/80 border-white/15 hover:border-white/40 hover:bg-black/30'
                  }`}
                >
                  <span className="font-suisse text-xs sm:text-sm uppercase tracking-wider font-semibold">
                    {tab.label}
                  </span>
                  <span className="font-editorial text-2xl sm:text-3xl leading-none">
                    {tab.pearls}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3. Remaining Bottom Lines */}
          <div className="pt-3 border-t border-white/15 space-y-1">
            <p className="font-editorial text-base sm:text-lg italic text-[var(--brand-cream)]/90">
              One sunscreen. Every season. Never the wrong amount.
            </p>
            <p className="font-suisse text-[11px] sm:text-xs text-[var(--brand-cream)]/60">
              Applied with the spatula, melts on contact.
            </p>
          </div>
        </div>


      </div>
    </div>
  );
}