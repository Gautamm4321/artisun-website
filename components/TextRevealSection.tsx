'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sentence = 'And your city decides what kind of day your skin gets.';

export default function TextRevealSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.reveal-word');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=140%',
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        words,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.15,
          ease: 'none',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="text-reveal-trigger relative w-full h-[100svh] z-10 flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 select-none overflow-hidden"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
        }}
      />

      <div className="w-full max-w-[1100px] mx-auto text-center flex flex-wrap justify-center items-center gap-x-[0.28em] gap-y-[0.18em] font-editorial font-normal text-[clamp(28px,4.5vw,64px)] leading-[1.18] tracking-tight text-[var(--brand-cream,#f5f0eb)]">
        {sentence.split(' ').map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="reveal-word opacity-20 inline-block will-change-[opacity]"
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}