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
      className="origin-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden flex flex-col justify-center"
    >
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 pt-16 sm:pt-20 lg:pt-20 pb-20 flex flex-col justify-start">
        {/* ── Heading ── */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="font-editorial text-[var(--brand-cream)] text-[30px] sm:text-[42px] lg:text-[50px] leading-[1.08] tracking-tight">
            The good vision of everything.
          </h2>
        </div>

        {/* ── 4 Images in a Line (4:6 Aspect Ratio) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
          {INGREDIENTS_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.name}
                className="group relative flex flex-col bg-white/[0.06] border border-white/15 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/30 shadow-xl"
              >
                {/* 4:6 Aspect Ratio Image Container */}
                <div className="relative w-full aspect-[4/6] max-h-[44vh] overflow-hidden bg-black/20">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Country Badge Top Left */}
                  <span className="absolute top-3.5 left-3.5 font-suisse text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90">
                    {item.country}
                  </span>
                </div>

                {/* Info Bar (Only bottom name + button) */}
                <div className="p-3.5 sm:p-4 flex flex-col bg-black/25 border-t border-white/10">
                  <div
                    onClick={() => toggleAccordion(idx)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <h3 className="font-suisse font-medium text-[15px] sm:text-[16px] text-[var(--brand-cream)] tracking-tight">
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

                  {/* Expandable Hook & Detail */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                      isOpen ? 'grid-rows-[1fr] mt-2.5 pt-2.5 border-t border-white/10' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden space-y-1.5 max-h-[16vh] overflow-y-auto no-scrollbar">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}