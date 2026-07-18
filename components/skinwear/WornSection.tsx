'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Verbatim copy — the em-dash is kept because the brand copy was supplied exactly. */
const PARAGRAPH =
  'The difference is small in language and large in feel. Worn assumes a relationship — something you choose, something you reach for, something that sits on your skin the way a favourite shirt sits on your shoulders. Worn is what we wanted sun care to feel like. So we built it that way.';

export default function WornSection({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  wordsRef.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(wordsRef.current, { opacity: 1, filter: 'blur(0px)' });
        return;
      }
      // Words rise out of the ember haze as the block crosses the viewport —
      // reveals the paragraph in reading order without hijacking the scroll.
      gsap.to(wordsRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'bottom 62%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const words = PARAGRAPH.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-[90svh] w-full items-center justify-center px-6 py-28 md:px-12 md:py-40"
    >
      <p className="mx-auto flex max-w-[22ch] flex-wrap justify-center gap-x-[0.28em] gap-y-[0.12em] text-center font-editorial font-normal leading-[1.28] tracking-[-0.005em] text-[var(--brand-cream)] text-[clamp(1.9rem,4.6vw,4rem)] md:max-w-[20ch]">
        {words.map((word, i) => {
          // "Worn" is the pivot of the whole idea, so let it carry the accent.
          const isWorn = word.replace(/[^A-Za-z]/g, '') === 'Worn';
          return (
            <span
              key={i}
              ref={(el) => { wordsRef.current.push(el); }}
              className={`inline-block opacity-[0.14] ${isWorn ? 'italic text-[#F3C48A]' : ''}`}
              style={{ filter: 'blur(4px)', willChange: 'opacity, filter' }}
            >
              {word}
            </span>
          );
        })}
      </p>
    </section>
  );
}
