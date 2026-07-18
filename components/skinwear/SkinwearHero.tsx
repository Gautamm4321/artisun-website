'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkinwearBottle from './SkinwearBottle';

/* Verbatim copy */
const HEADLINE = 'Skinwear.';
const TAGLINE_1 = 'Most sunscreens are designed to be tolerated.';
const TAGLINE_2 = 'Skinwear is designed to be worn.';

export default function SkinwearHero({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottleWrapRef = useRef<HTMLDivElement>(null);
  // Bottle rotation eases on as the hero scrolls away, so the product "turns
  // to face you" on entry and keeps turning as you leave — one continuous move.
  const bottleSpin = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Entrance: headline + tagline + bottle rise in ──
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.sw-hero-word',
        { opacity: 0, yPercent: 120, rotateX: -40 },
        { opacity: 1, yPercent: 0, rotateX: 0, duration: 1.1, stagger: 0.12 }
      )
        .fromTo(
          '.sw-hero-line',
          { opacity: 0, y: 22, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, stagger: 0.14 },
          '-=0.6'
        )
        .fromTo(
          bottleWrapRef.current,
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power2.out' },
          '-=1.1'
        );

      if (reduced) {
        gsap.set(['.sw-hero-word', '.sw-hero-line', bottleWrapRef.current], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          clearProps: 'all',
        });
        return;
      }

      // ── Scroll-linked: bottle keeps turning + content lifts away on exit ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          bottleSpin.current = self.progress * 0.6;
        },
        animation: gsap.to(contentRef.current, { y: -60, opacity: 0.15, ease: 'none' }),
      });

      // Slow parallax drift on the bottle as it leaves.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        animation: gsap.to(bottleWrapRef.current, { yPercent: 12, ease: 'none' }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-[100svh] w-full overflow-hidden"
    >
      <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-4 px-6 pt-28 pb-16 md:grid-cols-12 md:px-12 md:pt-24 lg:px-16">
        {/* ── Text column ── */}
        <div
          ref={contentRef}
          className="relative z-20 order-2 col-span-1 text-center md:order-1 md:col-span-6 md:text-left lg:col-span-5"
          style={{ willChange: 'transform, opacity' }}
        >
          <h1
            className="font-editorial text-[var(--brand-cream)] leading-[0.9] tracking-[-0.02em] text-[clamp(4.5rem,17vw,11rem)]"
            style={{ perspective: '600px' }}
          >
            <span className="sw-hero-word inline-block" style={{ willChange: 'transform, opacity' }}>
              {HEADLINE}
            </span>
          </h1>

          <div className="mt-8 md:mt-10 mx-auto md:mx-0 max-w-[34ch] space-y-1.5">
            <p
              className="sw-hero-line font-suisse font-light text-[var(--brand-cream)]/60 text-[clamp(1rem,1.5vw,1.3rem)] leading-relaxed"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              {TAGLINE_1}
            </p>
            <p
              className="sw-hero-line font-editorial italic text-[var(--brand-cream)] text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.15] pb-1"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              {TAGLINE_2}
            </p>
          </div>
        </div>

        {/* ── 3D bottle column ── */}
        <div
          ref={bottleWrapRef}
          className="relative order-1 col-span-1 h-[46svh] md:order-2 md:col-span-6 md:h-[80svh] lg:col-span-7"
          style={{ willChange: 'transform, opacity' }}
        >
          <SkinwearBottle
            scrollRef={bottleSpin}
            reduced={reduced}
            scale={0.62}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
