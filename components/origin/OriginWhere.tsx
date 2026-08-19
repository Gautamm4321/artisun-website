'use client';

import { useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

type Weather = { index: string; title: string; copy: string; image: string };

const WEATHER: Weather[] = [
  {
    index: '01',
    title: 'Every season',
    copy: 'Dry summers and humid days. Polluted evenings and sticky monsoons. Diwali smog and December fog.',
    image: '/skinwear-media/worn-product.jpg',
  },
  {
    index: '02',
    title: 'Every region',
    copy: 'From busy Indian cities to quiet hill stations. From hot coasts to dry plains. From the city you live in to the beach you escape to.',
    image: '/about-media/aura-2.jpg',
  },
  {
    index: '03',
    title: 'Every skin',
    copy: 'Oily, dry, combination or sensitive. One formula that works across all of them — no sorting, no second bottle.',
    image: '/skinwear-media/model-portrait.jpg',
  },
];

export default function OriginWhere() {
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);

  const toggleMobileCard = (idx: number) => {
    setActiveMobileIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      id="origin-where"
      className="origin-panel relative w-screen shrink-0 h-[100svh] flex flex-col"
    >
      {/* Heading block */}
      <div className="px-4 sm:px-8 lg:px-14 pt-16 pb-2.5 sm:pt-20 sm:pb-4 lg:pt-[112px] lg:pb-8 max-w-[1500px] w-full mx-auto shrink-0">
        <h2 className="font-editorial text-[var(--brand-cream)] text-[22px] sm:text-[34px] lg:text-[58px] leading-[1.05] tracking-tight not-italic">
          One sunscreen. Every Indian weather.
        </h2>
        <p className="font-suisse text-[var(--brand-cream)]/60 text-[11.5px] sm:text-[15px] lg:text-[18px] mt-1 lg:mt-3">
          Built for your weather, not just your skin type.
        </p>
      </div>



      {/* Cards — Desktop: 3 Columns Edge-to-Edge | Mobile: 3 Equal Rows in Single Frame */}
      <div
        data-lenis-prevent="true"
        className="ow-strip flex-1 flex flex-col lg:flex-row gap-2 lg:gap-[10px] px-4 sm:px-8 lg:px-0 pb-14 lg:pb-0 overflow-hidden lg:overflow-visible justify-between"
      >
        {WEATHER.map((w, idx) => {
          const isOpen = activeMobileIndex === idx;

          return (
            <article
              key={w.index}
              onClick={() => toggleMobileCard(idx)}
              className="ow-card group relative w-full flex-1 min-h-0 lg:aspect-auto lg:h-full lg:shrink lg:basis-0 overflow-hidden cursor-pointer lg:cursor-default rounded-lg lg:rounded-none"
            >
              <Image
                src={asset(w.image)}
                alt={w.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className={`ow-img object-cover transition-[transform,filter] duration-700 ease-out ${isOpen ? 'brightness-50 blur-[2px]' : ''
                  }`}
              />
              {/* Darkening gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className={`ow-veil absolute inset-0 transition-colors duration-[600ms] ${isOpen ? 'bg-black/40' : 'bg-black/0'}`} />

              {/* Index top-left */}
              <span className="absolute top-2.5 left-3 lg:top-5 lg:left-5 font-suisse text-[10px] lg:text-xs tracking-[0.14em] text-[var(--brand-cream)]/70">
                {w.index}
              </span>

              {/* Bottom text + Mobile '<' toggle button */}
              <div className="absolute left-3 right-3 lg:left-6 lg:right-6 bottom-2.5 lg:bottom-16 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-editorial text-[var(--brand-cream)] text-[16px] sm:text-[20px] lg:text-[34px] leading-tight">
                    {w.title}
                  </h3>

                  {/* '+' toggle button for small screens */}
                  <button
                    type="button"
                    aria-label="Toggle description"
                    className="lg:hidden w-6 h-6 rounded-full flex items-center justify-center bg-white/15 border border-white/20 text-white shrink-0 transition-all"
                  >
                    <span className={`text-sm font-light leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </button>

                </div>

                {/* Description - Accordion on mobile, hover on desktop */}
                <div
                  className={`ow-desc grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-suisse text-[11px] sm:text-[13px] lg:text-[15px] leading-[1.35] text-[var(--brand-cream)]/95 pt-1.5 lg:pt-3 max-w-[38ch]">
                      {w.copy}
                    </p>
                  </div>
                </div>

                <span className="ow-hint hidden lg:block font-suisse text-[10px] tracking-[0.18em] uppercase text-[var(--brand-cream)]/55 mt-3 transition-opacity duration-300">
                  Hover to read
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/*
        Hover-capable devices: blur+scale the image, expand the copy, hide the hint.
        Touch devices (no hover): copy stays open, hint hidden — nothing to reveal.
      */}

      <style jsx>{`
        @media (min-width: 1024px) {
          .ow-card:hover .ow-img {
            filter: blur(8px) brightness(0.4);
            transform: scale(1.06);
          }
          .ow-card:hover .ow-veil {
            background: rgba(0, 0, 0, 0.5);
          }
          .ow-card:hover .ow-desc {
            grid-template-rows: 1fr !important;
          }
          .ow-card:hover .ow-hint {
            opacity: 0;
          }
        }
        .ow-strip::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
}
