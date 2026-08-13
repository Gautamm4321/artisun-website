'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

type Weather = { index: string; title: string; copy: string; image: string };

const WEATHER: Weather[] = [
  {
    index: '01',
    title: 'Every region',
    copy: "From Chennai's coast to Manali's cold. From Ahmedabad's dry heat to Kolkata's damp. Wherever you are, it holds.",
    image: '/skinwear-media/worn-product.jpg',
  },
  {
    index: '02',
    title: 'Every season',
    copy: 'Peak summer heat. Sticky monsoon air. Dry winter cold. Polluted city evenings — it holds through all of them.',
    image: '/about-media/aura-2.jpg',
  },
  {
    index: '03',
    title: 'Every skin type',
    copy: 'Oily, dry, combination or sensitive. Every skin type — in just the right amount for the day.. Built for your weather, not just your skin type.',
    image: '/skinwear-media/model-portrait.jpg',
  },
];

export default function AuraWhere() {
  return (
    <div
      id="aura-where"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen flex flex-col bg-[var(--brand-red,#8B0000)] text-[var(--brand-cream)]"
    >
      {/* Heading block */}
      <div className="px-5 sm:px-8 lg:px-14 pt-24 lg:pt-[112px] pb-6 lg:pb-8 max-w-[1500px] w-full mx-auto">
        <span className="font-suisse text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[var(--brand-cream)]/70">
          Where it works
        </span>
        <h2 className="font-editorial text-[30px] sm:text-[46px] lg:text-[58px] leading-[1.03] tracking-tight mt-2">
          Works in every Indian weather. <em className="italic">Actually.</em>
        </h2>
      </div>

      {/* Cards — 3 columns edge-to-edge (desktop) / swipe strip (mobile) */}
      <div className="ow-strip flex-1 flex gap-[10px] px-0 lg:px-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none">
        {WEATHER.map((w) => (
          <article
            key={w.index}
            className="ow-card group relative shrink-0 basis-[82%] sm:basis-[60%] lg:basis-0 lg:flex-1 snap-center overflow-hidden"
          >
            <Image
              src={asset(w.image)}
              alt={w.title}
              fill
              sizes="(max-width: 1024px) 82vw, 33vw"
              className="ow-img object-cover transition-[transform,filter] duration-700 ease-out"
            />
            {/* Darkening gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="ow-veil absolute inset-0 bg-black/0 transition-colors duration-[600ms]" />

            {/* Index top-left */}
            <span className="absolute top-5 left-5 font-suisse text-xs tracking-[0.14em] text-[var(--brand-cream)]/70">
              {w.index}
            </span>

            {/* Bottom-anchored text */}
            <div className="absolute left-6 right-6 bottom-6">
              <h3 className="font-editorial text-[var(--brand-cream)] text-[26px] sm:text-[30px] lg:text-[34px] leading-tight">
                {w.title}
              </h3>

              <div className="ow-desc grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out">
                <div className="overflow-hidden">
                  <p className="font-suisse text-[14px] sm:text-[15px] leading-[1.55] text-[var(--brand-cream)]/95 pt-3 max-w-[38ch]">
                    {w.copy}
                  </p>
                </div>
              </div>

              <span className="ow-hint block font-suisse text-[10px] tracking-[0.18em] uppercase text-[var(--brand-cream)]/55 mt-3 transition-opacity duration-300">
                Hover to read
              </span>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        @media (hover: hover) {
          .ow-card:hover .ow-img {
            filter: blur(8px) brightness(0.4);
            transform: scale(1.06);
          }
          .ow-card:hover .ow-veil {
            background: rgba(0, 0, 0, 0.5);
          }
          .ow-card:hover .ow-desc {
            grid-template-rows: 1fr;
          }
          .ow-card:hover .ow-hint {
            opacity: 0;
          }
        }
        @media (hover: none) {
          .ow-img {
            filter: brightness(0.55);
          }
          .ow-veil {
            background: rgba(0, 0, 0, 0.42);
          }
          .ow-desc {
            grid-template-rows: 1fr;
          }
          .ow-hint {
            display: none;
          }
        }
        .ow-strip::-webkit-scrollbar {
          display: none;
        }
        .ow-strip {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}