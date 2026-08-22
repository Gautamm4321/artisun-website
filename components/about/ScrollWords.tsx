'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  text: string;
  className?: string;
  justify?: 'start' | 'center';
  as?: 'div' | 'h1' | 'h2' | 'p';
};

/**
 * The Artisun headline effect: each word starts faint and brightens word-by-word,
 * scrubbed to scroll (same signature move as the home page). Headlines only —
 * body copy stays static.
 */
export default function ScrollWords({ text, className = '', justify = 'start', as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>('.rw');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.3,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: 1 },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const Comp = as as 'div';

  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={`flex flex-wrap gap-x-[0.28em] gap-y-[0.08em] ${
        justify === 'center' ? 'justify-center text-center' : 'justify-start'
      } ${className}`}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} className="rw opacity-[0.15]">
          {w}
        </span>
      ))}
    </Comp>
  );
}
