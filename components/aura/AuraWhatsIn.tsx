'use client';

import { useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

type Ingredient = {
  name: string;
  source: string;
  hook: string;
  long: string;
};

const INGREDIENTS: Ingredient[] = [
  {
    name: 'Ectoin',
    source: 'Germany',
    hook: '20x Deeper hydration than hyaluronic acid.',
    long: 'A powerful hydrating active from Germany. It locks moisture into the skin and keeps it there through heat, pollution and long days — so skin stays soft and comfortable all day.',
  },
  {
    name: 'Bisabolol',
    source: 'Chamomile',
    hook: 'Calms and soothes sensitive skin.',
    long: 'The calming part of chamomile. Soothes redness and keeps sensitive skin settled and even.',
  },
  {
    name: 'Sodium Hyaluronate',
    source: 'Refined HA',
    hook: 'Plumps the skin and gives it a healthy glow.',
    long: 'A refined form of hyaluronic acid that holds water in the skin — giving it a fresh, plumped, healthy-looking glow.',
  },
];

export default function AuraWhatsIn() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      id="aura-whatsin"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden flex flex-col justify-between py-20 lg:py-24 px-5 sm:px-8 lg:px-14 bg-[var(--brand-red,#8B0000)] text-[var(--brand-cream)]"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 50%, rgba(255,255,255,0.08), transparent 70%)',
        }}
      />

      <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto flex flex-col justify-between">
        {/* Heading */}
        <div>
          <span className="font-suisse text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[var(--brand-cream)]/70">
            What&apos;s in it
          </span>
          <h2 className="font-editorial text-[30px] sm:text-[46px] lg:text-[58px] leading-[1.05] tracking-tight mt-2 max-w-[18ch]">
            Sourced better than they needed to be.
          </h2>
        </div>

        {/* Center Grid: Left Product Image + Right Interactive Ingredient Cards */}
        <div className="my-auto pt-6 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Visual Image */}
          <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
            <Image
              src={asset('/about-media/aura-1.jpg')}
              alt="Aura Ingredients"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Right Ingredient Accordion List */}
          <div className="flex flex-col space-y-3">
            {INGREDIENTS.map((ing, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={ing.name}
                  className="border border-white/10 rounded-2xl p-5 bg-white/[0.03] backdrop-blur-sm transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left flex items-start justify-between gap-4 group"
                  >
                    <div>
                      <div className="font-suisse text-base sm:text-lg font-medium text-[var(--brand-cream)]">
                        {ing.name} <span className="text-[var(--brand-cream)]/50 text-sm font-normal">· {ing.source}</span>
                      </div>
                      <div className="font-suisse text-xs sm:text-sm text-[var(--brand-cream)]/75 mt-1">
                        {ing.hook}
                      </div>
                    </div>
                    <span className="text-xl text-[var(--brand-cream)]/50 transition-transform duration-300">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-[400ms] ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-suisse text-xs sm:text-sm leading-[1.6] text-[var(--brand-cream)]/65 pt-3 border-t border-white/10 mt-3">
                        {ing.long}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Subline - Line removed as requested */}
        <div className="mt-auto pt-4">
          <p className="font-suisse text-xs text-[var(--brand-cream)]/60">
            Fuller version available on click.
          </p>
        </div>
      </div>
    </div>
  );
}