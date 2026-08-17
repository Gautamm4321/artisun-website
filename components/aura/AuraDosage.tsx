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
  const [activeTab, setActiveTab] = useState(1);

  const current = PEARL_TABS[activeTab];

  return (
    <div
      id="aura-dosage"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden flex flex-col justify-between py-16 lg:py-20 px-5 sm:px-8 lg:px-14 bg-[var(--brand-red,#8B0000)] text-[var(--brand-cream)]"
    >
      {/* Top Heading */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto pt-6 sm:pt-8 lg:pt-10">
        <div className="w-full max-w-[540px]">
          <span className="font-suisse text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[var(--brand-cream)]/70">
            How to wear
          </span>
          <h2 className="font-editorial text-[28px] sm:text-[40px] lg:text-[48px] leading-[1.08] tracking-tight mt-1.5 text-white">
            The first sunscreen that<br />
            changes with the weather.
          </h2>
          <p className="font-suisse text-[12px] sm:text-[13.5px] text-[var(--brand-cream)]/80 mt-3 leading-[1.6]">
            Two pearls when it’s humid. Three when it’s dry. It flexes to the day — so you’re <br className="hidden sm:inline" />
            never overdoing it in a Bombay summer or under-protected in a Delhi winter.
          </p>
        </div>
      </div>

      {/* Center Grid: Vertical Stack on Right & Sharp Image on Left */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-stretch pt-4">
        
        {/* Left: Image Card (Sharp Corners) */}
        <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-0 overflow-hidden shadow-2xl bg-black/20 flex items-center justify-center transition-all duration-500">
          <Image
            key={current.image}
            src={asset(current.image)}
            alt={current.label}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-all duration-700 ease-out"
            priority
          />

          {/* Bottom Card Glass Overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-4 border border-white/10 z-20">
            <span className="font-editorial text-base sm:text-lg block font-semibold text-white">
              {current.weather}
            </span>
            <span className="font-suisse text-[11px] sm:text-xs text-[var(--brand-cream)]/85 block mt-0.5 leading-snug">
              {current.desc}
            </span>
          </div>
        </div>

        {/* Right: Vertical Stacked Tabs */}
        <div className="flex flex-col justify-center space-y-4 w-full max-w-[520px]">
          <p className="font-suisse text-xs uppercase tracking-[0.18em] opacity-75">
            Select Dose Amount:
          </p>

          <div className="flex flex-col gap-3 w-full">
            {PEARL_TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`w-full py-3.5 px-5 border flex items-center justify-between backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-black border-white shadow-xl'
                      : 'bg-white/[0.05] text-[var(--brand-cream)]/85 border-white/15 hover:border-white/40 hover:bg-white/[0.1]'
                  }`}
                >
                  <div className="text-left">
                    <span className="font-suisse text-xs sm:text-sm uppercase tracking-wider font-semibold block">
                      {tab.label}
                    </span>
                    <span className="font-suisse text-[11px] opacity-70 block mt-0.5">
                      {tab.weather}
                    </span>
                  </div>
                  <span className="font-editorial text-2xl sm:text-3xl leading-none font-medium">
                    {tab.pearls}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Lines */}
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

      <div className="relative z-10 max-w-[1500px] w-full mx-auto pt-2" />
    </div>
  );
}