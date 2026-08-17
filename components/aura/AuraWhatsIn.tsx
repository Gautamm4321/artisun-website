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
    hook: 'Deeply hydrates and shields from pollution.',
    long: 'A powerful active from Germany that locks moisture into the skin and protects against heat, pollution, and daily UV stress.',
  },
  {
    name: 'Sodium Hyaluronate',
    source: 'Refined HA',
    hook: 'Plumps the skin for a soft, dewy glow.',
    long: 'Refined hyaluronic acid that draws moisture into the skin, giving it a hydrated, lit-from-within finish without any shimmer.',
  },
  {
    name: 'Bisabolol',
    source: 'Chamomile',
    hook: 'Calms redness and soothes sensitive skin.',
    long: 'Extracted from chamomile to soothe irritation, reduce redness, and keep the skin barrier calm and even.',
  },
  {
    name: 'Uvinul A Plus',
    source: 'Germany',
    hook: 'Advanced UVA filter, photostable for 8 hours.',
    long: 'One of the world’s most advanced UVA filters that stays completely stable under direct sunlight throughout the day.',
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

        {/* Center Grid: items-stretch matches Left Image height directly to Right list */}
        <div className="my-auto pt-6 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Visual Image — automatically syncs with right container's height */}
          <div className="relative w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-0 rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-white/5 transition-all duration-500 ease-out">
            <Image
              src={asset('/about-media/aura-1.jpg')}
              alt="Aura Ingredients"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 ease-out"
            />
          </div>

          {/* Right Ingredient Accordion List */}
          <div className="flex flex-col space-y-2.5 sm:space-y-3 justify-center">
            {INGREDIENTS.map((ing, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={ing.name}
                  className={`border rounded-2xl p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 ${
                    isOpen 
                      ? 'border-white/25 bg-white/[0.07] shadow-lg' 
                      : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left flex items-start justify-between gap-4 group"
                  >
                    <div>
                      <div className="font-suisse text-[15px] sm:text-lg font-medium text-[var(--brand-cream)]">
                        {ing.name} <span className="text-[var(--brand-cream)]/50 text-xs sm:text-sm font-normal">· {ing.source}</span>
                      </div>
                      <div className="font-suisse text-xs sm:text-[13px] text-[var(--brand-cream)]/75 mt-1">
                        {ing.hook}
                      </div>
                    </div>
                    <span className="text-xl leading-none text-[var(--brand-cream)]/60 transition-transform duration-300 shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-[400ms] ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-suisse text-xs sm:text-[13.5px] leading-[1.6] text-[var(--brand-cream)]/75 pt-3 border-t border-white/10 mt-3">
                        {ing.long}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Subline */}
        <div className="mt-auto pt-4">
          <p className="font-suisse text-xs text-[var(--brand-cream)]/60">
            Fuller version available on click.
          </p>
        </div>
      </div>
    </div>
  );
}