'use client';

import { useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

type IngredientItem = {
  name: string;
  country: string;
  hook: string;
  detail: string;
  image: string;
};

const INGREDIENTS_DATA: IngredientItem[] = [
  {
    name: 'Beta-Glucan',
    country: 'Finland',
    hook: 'Holds moisture deeper than hyaluronic acid.',
    detail:
      'Finland grows the world’s finest cosmetic beta-glucan, with forty years of dermatology behind it. It strengthens the skin’s outer layer and keeps moisture locked in through the day — deeper and longer than hyaluronic acid manages. Not the active you notice. The one you’d notice gone.',
    image: asset('/beta.jpeg'),
  },
  {
    name: 'Camellia Sinensis',
    country: 'Japan',
    hook: 'Green tea, 100× the antioxidant strength of vitamin E.',
    detail:
      'Japanese green tea, refined to its most concentrated form. Up to 100× the antioxidant power of vitamin E, taking on the pollution and particulate matter your skin meets on any ordinary day out. Quietly defensive, always working.',
    image: asset('/camelia.jpeg'),
  },
  {
    name: 'Uvinul A Plus',
    country: 'Germany',
    hook: 'One of the most advanced UVA filters made anywhere in the world.',
    detail:
      'It holds its structure in sunlight instead of degrading through the morning — so the protection you put on at eight is still the protection you have at four.',
    image: asset('/unival.jpeg'),
  },
  {
    name: 'Betaine',
    country: 'Canada',
    hook: 'Sugar Beet — Keeps skin balanced and hydrated as the weather shifts.',
    detail:
      "Drawn from sugar beet, betaine is a natural humectant that pulls moisture into the skin and holds it there. As the weather shifts through the day — dry heat, office air, humidity — it keeps the skin's balance steady, soft and comfortable. The quiet regulator that keeps everything else working.",
    image: asset('/betaine.jpeg'),
  },
];

export default function OriginWhatsIn() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (

    <div
      id="origin-whatsin"
      className="origin-panel relative w-screen shrink-0 h-screen overflow-hidden flex flex-col justify-start lg:justify-center pt-16 pb-14 sm:pt-20 sm:pb-16 lg:py-0"
    >
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col justify-between lg:justify-start h-full max-h-[calc(100svh-115px)] lg:max-h-none lg:h-auto overflow-hidden">
        {/* ── Heading ── */}
        <div className="mb-2 sm:mb-4 lg:mb-10 shrink-0">
          <h2 className="font-editorial text-[var(--brand-cream)] text-[20px] sm:text-[30px] lg:text-[50px] leading-[1.08] tracking-tight">
            The good version of everything.
          </h2>
        </div>

        {/* ── Cards Container: 4 Rows in 1 Frame on Mobile | 4 Columns on Desktop ── */}
        <div
          data-lenis-prevent="true"
          className="flex-1 lg:flex-initial flex flex-col lg:grid lg:grid-cols-4 gap-2 lg:gap-6 items-stretch lg:items-start overflow-hidden lg:overflow-visible"
        >

          {INGREDIENTS_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.name}
                className="group relative w-full flex flex-col bg-white/[0.06] border border-white/15 backdrop-blur-md rounded-lg lg:rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/30 shadow-xl flex-1 min-h-0 lg:flex-none"
              >
                {/* ── MOBILE VIEW (Single Screen Fitted + Split Info) ── */}
                <div className="lg:hidden relative w-full h-full min-h-0 overflow-hidden flex flex-row">
                  {/* Left Half (Image) */}
                  <div className={`relative h-full transition-all duration-500 ease-out overflow-hidden ${isOpen ? 'w-[42%]' : 'w-full'}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top-Left: Country Name */}
                    <span className="absolute top-2 left-2.5 font-suisse text-[8.5px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90">
                      {item.country}
                    </span>

                    {/* Bottom-Right: Ingredient Name (When collapsed) */}
                    {!isOpen && (
                      <h3 className="absolute bottom-2 right-10 font-suisse font-medium text-[13px] sm:text-[14px] text-[var(--brand-cream)] tracking-tight">
                        {item.name}
                      </h3>
                    )}
                  </div>

                  {/* Middle-Right Floating '<' Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    aria-label="Toggle details"
                    className={`absolute z-20 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center bg-black/60 border border-white/30 text-white shadow-lg backdrop-blur-md transition-all duration-500 ${isOpen ? 'left-[42%] -translate-x-1/2 rotate-180' : 'right-2'
                      }`}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  {/* Right Half: Transparent Box with Content (Slides in when opened) */}
                  {isOpen && (
                    <div className="w-[58%] h-full flex flex-col justify-center p-2 pl-3 bg-black/40 backdrop-blur-md border-l border-white/10 overflow-hidden">
                      <h3 className="font-suisse font-semibold text-[11.5px] text-[var(--brand-cream)] leading-tight mb-0.5">
                        {item.name}
                      </h3>
                      <div className="space-y-0.5 overflow-y-auto max-h-[90%] pr-1 [scrollbar-width:none]">
                        <p className="font-suisse text-[9.5px] font-medium text-[var(--brand-cream)]/95 leading-[1.25]">
                          {item.hook}
                        </p>
                        <p className="font-suisse text-[8.5px] text-[var(--brand-cream)]/70 leading-[1.3]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* ── DESKTOP VIEW (100% Original untouched) ── */}
                <div className="hidden lg:flex lg:flex-col w-full">
                  <div className="relative w-full aspect-[4/6] max-h-[44vh] overflow-hidden bg-black/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <span className="absolute top-3.5 left-3.5 font-suisse text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90">
                      {item.country}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col bg-black/25 border-t border-white/10">
                    <div
                      onClick={() => toggleAccordion(idx)}
                      className="flex items-center justify-between cursor-pointer select-none"
                    >
                      <h3 className="font-suisse font-medium text-[16px] text-[var(--brand-cream)] tracking-tight">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        aria-label="Toggle details"
                        className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/25 transition-all duration-300"
                      >
                        <span className={`text-sm font-light leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                          +
                        </span>
                      </button>
                    </div>

                    <div
                      className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? 'grid-rows-[1fr] mt-2.5 pt-2.5 border-t border-white/10' : 'grid-rows-[0fr]'
                        }`}
                    >
                      <div className="overflow-hidden space-y-1.5 max-h-[16vh] overflow-y-auto [scrollbar-width:none]">
                        <p className="font-suisse text-[12px] font-medium text-[var(--brand-cream)] leading-[1.35]">
                          {item.hook}
                        </p>
                        <p className="font-suisse text-[11px] text-[var(--brand-cream)]/70 leading-[1.45]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}