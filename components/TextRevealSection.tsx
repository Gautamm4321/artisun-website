'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sentence = "And your city decides what kind of day your skin gets.";

export default function TextRevealSection() {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Clear refs on every render
  wordsRef.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=140%',
        pin: true,
        anticipatePin: 1,
        scrub: 1.2,
      },
    });

    // Word by word high-impact reveal animation
    tl.to(wordsRef.current, {
      opacity: 1,
      stagger: 0.15,
      ease: 'power1.inOut',
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="text-reveal-trigger relative w-full h-[100svh] bg-transparent z-10 flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 select-none"
    >
      <div className="w-full max-w-[1100px] mx-auto text-center flex flex-wrap justify-center items-center gap-x-[0.28em] gap-y-[0.18em] font-editorial font-normal text-[clamp(28px,4.5vw,64px)] leading-[1.18] tracking-tight text-[var(--brand-cream,#f5f0eb)]">
        {sentence.split(' ').map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              if (el) wordsRef.current.push(el);
            }}
            className="opacity-20 transition-opacity duration-200 inline-block"
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}