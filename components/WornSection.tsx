'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// The brand thesis. Line 2 is the turn — it carries the emphasis.
const LINES = [
  { text: 'Most sunscreens are made to be tolerated.', emphasis: false },
  { text: 'Ours is designed to be worn.', emphasis: true },
  { text: 'Because you’ll only wear it every day if it survives every kind of day.', emphasis: false },
];

export default function WornSection() {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  wordsRef.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=170%',
        pin: true,
        anticipatePin: 1,
        scrub: 1.5,
      },
    });

    tl.to(wordsRef.current, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] z-10 flex items-center justify-center overflow-hidden px-6 md:px-16"
    >
      {/* Red field — deep at the top, warming toward the base, matching the brand's molten world */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(130% 120% at 50% -10%, #B52212 0%, #9A1810 34%, #7E0E0B 62%, #5A0806 100%)',
        }}
      />
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(232,96,26,0.16) 100%)' }}
      />

      <div className="w-full max-w-[92vw] md:max-w-[1000px] mx-auto text-center">
        {LINES.map((line, li) => (
          <p
            key={li}
            className={
              line.emphasis
                ? 'font-editorial text-[var(--brand-cream)] my-[0.35em] text-[30px] md:text-[52px] lg:text-[66px] leading-[1.12]'
                : 'font-editorial text-[var(--brand-cream)] text-[22px] md:text-[34px] lg:text-[42px] leading-[1.28]'
            }
          >
            <span className="inline-flex flex-wrap justify-center gap-x-[0.26em] gap-y-[0.12em]">
              {line.text.split(' ').map((word, wi) => (
                <span
                  key={`${li}-${wi}`}
                  ref={(el) => { if (el) wordsRef.current.push(el); }}
                  className="opacity-15 inline-block"
                >
                  {word}
                </span>
              ))}
            </span>
          </p>
        ))}
      </div>
    </section>
  );
}
