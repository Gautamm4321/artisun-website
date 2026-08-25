'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    city: 'Shimla',
    condition: 'Dry cold',
    image: asset('/climate-weather/shimla.webp'),
    heading: 'A Shimla winter',
    desc: 'pulls all the moisture out, and by afternoon your skin’s tight and flaking.',
  },
  {
    city: 'Jaipur',
    condition: 'Dry heat',
    image: asset('/climate-weather/jaipur.webp'),
    heading: 'In the Jaipur heat,',
    desc: 'whatever you put on is gone before noon.',
  },
  {
    city: 'Bangalore',
    condition: 'Humid',
    image: asset('/climate-weather/bangalore.webp'),
    heading: 'Bangalore’s humidity',
    desc: 'leaves everything sitting greasy, pilling the moment you touch makeup.',
  },
  {
    city: 'Bombay',
    condition: 'Monsoon',
    image: asset('/climate-weather/bombay.webp'),
    heading: 'And in Bombay,',
    desc: 'all it takes is one downpour, and your face is an oily mess.',
  },
];

const N = CARDS.length;

// Word-by-word highlight configuration
const DIM = 0.2;
const REVEAL_START = 0.05;
const REVEAL_SPAN = 0.6;
const STAGGER_SPREAD = 0.7;
const WORD_FADE = 0.3;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

// Opacity interpolation across scroll progress
const BAND = 0.55;
function cityOpacity(i: number, u: number) {
  const rise = i === 0 ? 1 : smoothstep(i - BAND / 2, i + BAND / 2, u);
  const fall = i === N - 1 ? 1 : 1 - smoothstep(i + 1 - BAND / 2, i + 1 + BAND / 2, u);
  return Math.min(rise, fall);
}

export default function ClimateVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial state setup
      imageRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      textRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 }));
      fillRefs.current.forEach((el) => el && gsap.set(el, { scaleX: 0 }));

      const render = (progress: number) => {
        const u = progress * N;

        for (let i = 0; i < N; i++) {
          const op = cityOpacity(i, u);

          const img = imageRefs.current[i];
          if (img) img.style.opacity = String(op);

          const txt = textRefs.current[i];
          if (txt) {
            const rel = clamp(u - (i + 0.5), -1, 1);
            txt.style.opacity = String(op);
            txt.style.transform = `translate3d(0, ${(-rel * 10).toFixed(2)}px, 0)`;
          }

          // Word-by-word reveal
          const words = wordRefs.current[i];
          if (words && words.length) {
            const r = clamp((u - i - REVEAL_START) / REVEAL_SPAN, 0, 1);
            const W = words.length;
            for (let j = 0; j < W; j++) {
              const wnode = words[j];
              if (!wnode) continue;
              const start = W > 1 ? (j / (W - 1)) * STAGGER_SPREAD : 0;
              const wp = clamp((r - start) / WORD_FADE, 0, 1);
              wnode.style.opacity = String(DIM + (1 - DIM) * wp);
            }
          }

          const fill = fillRefs.current[i];
          if (fill) fill.style.transform = `scaleX(${clamp(u - i, 0, 1)})`;
        }
      };

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => '+=' + window.innerHeight * N * 0.9,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });

      render(0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full z-20"
      style={{
        background:
          'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
      }}
    >
      <div
        ref={pinRef}
        className="relative w-full h-[100svh] min-h-[620px] overflow-hidden flex flex-col lg:flex-row"
      >
        {/* ── LEFT (66%) — full-bleed weather stack ── */}
        <div className="relative w-full h-[56svh] lg:h-full lg:w-2/3 overflow-hidden bg-transparent">
          {CARDS.map((card, i) => (
            <div
              key={card.city}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full will-change-[opacity]"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={`${card.city} — ${card.condition}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: '50% 48%' }}
                draggable={false}
              />
            </div>
          ))}

          {/* Seam softeners */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{ background: 'linear-gradient(90deg, transparent 78%, rgba(11,6,5,0.55) 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none lg:hidden"
            style={{ background: 'linear-gradient(to top, #0b0605 0%, transparent 100%)' }}
          />
        </div>

        {/* ── RIGHT (33%) — text content ── */}
        <div className="relative w-full flex-1 lg:w-1/3 lg:h-full bg-transparent">
          <div className="relative h-full w-full">
            {CARDS.map((card, i) => {
              const headingWords = card.heading.split(' ');
              const descWords = card.desc.split(' ');

              return (
                <div
                  key={card.city}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 pb-16 lg:pb-20 will-change-[opacity,transform]"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {/* 1. Main City Heading */}
                  <h3 className="font-editorial text-[var(--brand-cream)] text-[32px] sm:text-[38px] lg:text-[42px] xl:text-[46px] leading-[1.1] tracking-tight mb-3 sm:mb-4">
                    {headingWords.map((word, j) => (
                      <span
                        key={`h-${j}`}
                        ref={(el) => {
                          if (!wordRefs.current[i]) wordRefs.current[i] = [];
                          wordRefs.current[i][j] = el;
                        }}
                        className="inline-block will-change-[opacity]"
                        style={{ opacity: DIM }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </h3>

                  {/* 2. Smaller Description Text */}
                  <p className="font-suisse text-[var(--brand-cream)]/90 text-[17px] sm:text-[17px] lg:text-[22px] leading-[1.5] max-w-[28ch]">
                    {descWords.map((word, j) => {
                      const totalIdx = headingWords.length + j;
                      return (
                        <span
                          key={`d-${j}`}
                          ref={(el) => {
                            if (!wordRefs.current[i]) wordRefs.current[i] = [];
                            wordRefs.current[i][totalIdx] = el;
                          }}
                          className="inline-block will-change-[opacity]"
                          style={{ opacity: DIM }}
                        >
                          {word}&nbsp;
                        </span>
                      );
                    })}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Segmented progress bar */}
          <div className="absolute bottom-8 lg:bottom-10 left-6 sm:left-10 lg:left-12 xl:left-16 right-6 sm:right-10 lg:right-12 xl:right-16">
            <div className="flex items-center gap-2">
              {CARDS.map((card, i) => (
                <div
                  key={card.city}
                  className="relative h-[3px] flex-1 rounded-full bg-[var(--brand-cream)]/15 overflow-hidden"
                >
                  <span
                    ref={(el) => {
                      fillRefs.current[i] = el;
                    }}
                    className="absolute inset-0 origin-left rounded-full bg-[var(--brand-cream)]"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}