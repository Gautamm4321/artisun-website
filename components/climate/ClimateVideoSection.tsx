'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Four Indian cities. Every image is the SAME product in the SAME spot —
// only the weather around it changes. Scrolling crossfades one weather into
// the next, so it reads as a single scene the seasons move through.
const CARDS = [
  {
    city: 'Shimla',
    condition: 'Dry cold',
    image: asset('/climate-weather/shimla.webp'),
    text: 'A Shimla winter pulls all the moisture out, and by afternoon your skin’s tight and flaking.',
  },
  {
    city: 'Jaipur',
    condition: 'Dry heat',
    image: asset('/climate-weather/jaipur.webp'),
    text: 'In the Jaipur heat, whatever you put on is gone before noon.',
  },
  {
    city: 'Bangalore',
    condition: 'Humid',
    image: asset('/climate-weather/bangalore.webp'),
    text: 'Bangalore’s humidity leaves everything sitting greasy, pilling the moment you touch makeup.',
  },
  {
    city: 'Bombay',
    condition: 'Monsoon',
    image: asset('/climate-weather/bombay.webp'),
    text: 'And in Bombay, all it takes is one downpour, and your face is an oily mess.',
  },
];

const N = CARDS.length;

// Word-by-word highlight — the same "dim → bright as you scroll" reveal used on
// the home page (TextRevealSection): words sit at 0.2 opacity and light up in a
// left-to-right stagger, here scoped to each city's own scroll window.
const DIM = 0.2; // matches Tailwind opacity-20 used on the home page
const REVEAL_START = 0.05; // where in a city's segment the reveal begins (0..1)
const REVEAL_SPAN = 0.6; // how much of the segment the reveal takes
const STAGGER_SPREAD = 0.7; // portion of the reveal used to stagger word starts
const WORD_FADE = 0.3; // each word's own fade length

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

// Opacity of city `i` given the continuous scroll position `u` in [0, N].
// Each city holds fully in the middle of its unit segment and crossfades over a
// symmetric band centred on each boundary — the rising city and the falling
// city share the exact same ramp, so their opacities always sum to 1 (no flash,
// no gap). First and last cities never fade on the outer edge.
const BAND = 0.55; // width of each crossfade, in segments (1 = one full city)
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
      // Initial state: only the first weather / first line is visible.
      imageRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      textRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 }));
      fillRefs.current.forEach((el) => el && gsap.set(el, { scaleX: 0 }));

      const render = (progress: number) => {
        const u = progress * N; // 0 → N across the pinned range

        for (let i = 0; i < N; i++) {
          const op = cityOpacity(i, u);

          const img = imageRefs.current[i];
          if (img) img.style.opacity = String(op);

          const txt = textRefs.current[i];
          if (txt) {
            // Incoming line drifts up from just below; outgoing line lifts away.
            const rel = clamp(u - (i + 0.5), -1, 1);
            txt.style.opacity = String(op);
            txt.style.transform = `translate3d(0, ${(-rel * 10).toFixed(2)}px, 0)`;
          }

          // Word-by-word highlight, scoped to this city's own scroll window.
          // Block opacity (above) handles the crossfade between cities; this
          // handles the dim→bright reveal within the one that's on screen.
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
        // ~0.9 viewport of scroll per weather — unhurried, but never draggy.
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
    <section ref={sectionRef} className="relative w-full bg-[#0b0605] z-20">
      <div
        ref={pinRef}
        className="relative w-full h-[100svh] min-h-[620px] overflow-hidden flex flex-col lg:flex-row"
      >
        {/* ── LEFT (66%) — full-bleed weather stack. Product never moves; the
              weather crossfades around it. ── */}
        <div className="relative w-full h-[56svh] lg:h-full lg:w-2/3 overflow-hidden bg-[#07100e]">
          {CARDS.map((card, i) => (
            <div
              key={card.city}
              ref={(el) => { imageRefs.current[i] = el; }}
              className="absolute inset-0 will-change-[opacity]"
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

          {/* Seam softeners: darken the edge that meets the text panel so the
              two halves read as one composition. */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{ background: 'linear-gradient(90deg, transparent 78%, rgba(11,6,5,0.55) 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none lg:hidden"
            style={{ background: 'linear-gradient(to top, #0b0605 0%, transparent 100%)' }}
          />
        </div>

        {/* ── RIGHT (33%) — text, vertically centred, left aligned. ── */}
        <div className="relative w-full flex-1 lg:w-1/3 lg:h-full bg-[#0b0605]">
          {/* subtle warmth so the panel isn't flat black */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(120% 90% at 0% 30%, rgba(201,59,26,0.10) 0%, transparent 60%)' }}
          />

          {/* Crossfading lines, all stacked so they swap in place */}
          <div className="relative h-full w-full">
            {CARDS.map((card, i) => (
              <div
                key={card.city}
                ref={(el) => { textRefs.current[i] = el; }}
                className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 pb-16 lg:pb-20 will-change-[opacity,transform]"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-suisse text-[12px] tracking-[0.28em] uppercase text-[var(--brand-cream)]/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px w-8 bg-[var(--brand-cream)]/25" />
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F2812E]" />
                    <span className="font-suisse text-[11px] tracking-[0.16em] uppercase text-white/85">{card.condition}</span>
                  </span>
                </div>

                <h3 className="mt-4 font-editorial text-[var(--brand-cream)] text-[34px] sm:text-[44px] lg:text-[46px] xl:text-[54px] leading-[1.02]">
                  {card.city}
                </h3>

                <p className="mt-4 font-editorial text-[var(--brand-cream)] text-[19px] sm:text-[23px] lg:text-[22px] xl:text-[26px] leading-[1.34] max-w-[24ch]">
                  {card.text.split(' ').map((word, j) => (
                    <span
                      key={j}
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
                </p>
              </div>
            ))}
          </div>

          {/* Segmented progress — one bar per weather, fills as you scroll through it */}
          <div className="absolute bottom-8 lg:bottom-10 left-6 sm:left-10 lg:left-12 xl:left-16 right-6 sm:right-10 lg:right-12 xl:right-16">
            <div className="flex items-center gap-2">
              {CARDS.map((card, i) => (
                <div key={card.city} className="relative h-[3px] flex-1 rounded-full bg-[var(--brand-cream)]/15 overflow-hidden">
                  <span
                    ref={(el) => { fillRefs.current[i] = el; }}
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
