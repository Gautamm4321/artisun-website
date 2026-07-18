'use client';

import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import EmberField from '../about/EmberField';

/* ── Content (verbatim) ─────────────────────────────────────────────── */
const TITLE = 'Dedicated to you';
const BODY =
  'Skinwear is more than a formula inside a bottle. It is different answers for different mornings, all held to the same climate-smart standard. The texture matters. The weight in your hand matters. The way the bottle sits on a shelf next to your other essentials matters. We make these decisions with the same care a tailor brings to a garment.';

/* Per-word / per-char spans so each char animates independently. Word gaps are
   dedicated nbsp spans BETWEEN the word blocks — a trailing space inside an
   inline-block gets trimmed by CSS whitespace processing (which is exactly how
   the title once rendered as "Dedicatedtoyou"), so the joiner must be its own
   non-collapsible element. */
function CharLine({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="inline" aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          {wi > 0 && (
            <span aria-hidden className="inline-block">
              {' '}
            </span>
          )}
          <span className="inline-block whitespace-nowrap" aria-hidden>
            {word.split('').map((ch, ci) => (
              <span key={ci} className="sw-char inline-block will-change-[transform,filter,opacity]">
                {ch}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

export default function DedicatedSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          ['.ded-emblem', '.ded-title .sw-char', '.ded-body', '.ded-rule', '.ded-field', '.ded-cloth-field', '.ded-blooms', '.ded-embers', '.ded-cta'],
          {
            opacity: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
            filter: 'blur(0px)',
          }
        );
        gsap.set('.ded-rule', { scaleX: 1 });
        return;
      }

      /* ── Background fade-in — the entire decorative field fades in smoothly
             with scroll. No dark stage, no hard edges — just a clean, gradual
             reveal of the warm blooms / ribbons / embers over the existing
             molten-core surface. ── */
      gsap.fromTo(
        '.ded-field',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: root,
            start: 'top 100%',
            end: 'top 30%',
            scrub: 2,
          },
        }
      );

      /* Sun emblem — blooms into place first, announcing the finale */
      gsap.fromTo(
        '.ded-emblem',
        { opacity: 0, scale: 0.55, y: 26 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.ded-copy', start: 'top 80%', once: true },
        }
      );

      /* Title — characters rise out of a blur, following the emblem */
      gsap.set('.ded-title .sw-char', { yPercent: 118, opacity: 0, filter: 'blur(12px)' });
      ScrollTrigger.create({
        trigger: '.ded-copy',
        start: 'top 80%',
        once: true,
        onEnter: () =>
          gsap.to('.ded-title .sw-char', {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            delay: 0.25,
            ease: 'expo.out',
            stagger: { each: 0.03, from: 'start' },
          }),
      });

      /* Hairline draws in beneath the title */
      gsap.fromTo(
        '.ded-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          delay: 0.55,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.ded-copy', start: 'top 80%', once: true },
        }
      );

      /* Body — line-by-line clip reveal */
      const bodyEl = root.querySelector<HTMLElement>('.ded-body');
      if (bodyEl) {
        const split = new SplitText(bodyEl, { type: 'lines', mask: 'lines' });
        gsap.set(split.lines, { yPercent: 110, opacity: 0 });
        ScrollTrigger.create({
          trigger: bodyEl,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(split.lines, {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
              delay: 0.35,
              ease: 'power3.out',
              stagger: 0.11,
            }),
        });
      }

      /* CTA button — rises in after the body copy */
      gsap.fromTo(
        '.ded-cta',
        { y: 30, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ded-body', start: 'top 80%', once: true },
        }
      );

      /* Scroll-linked depth: ribbons drift down slightly slower than the page,
         the copy a touch slower still — layered parallax as the finale passes */
      gsap.fromTo(
        '.ded-cloth-field',
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
        }
      );
      gsap.to('.ded-copy', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: 1.2 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative z-[2] flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-32 md:px-16"
    >
      {/* Breathing turbulence filter for the ribbon field (scoped id) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="dedTurbulence" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" numOctaves={2} seed={7} result="noise">
            <animate
              attributeName="baseFrequency"
              values="0.006 0.012;0.010 0.007;0.006 0.012"
              dur="22s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={55} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>


      {/* ── Background: silk ribbons + warm blooms + drifting embers ──
          The fabric-in-air ribbons deliberately echo the closing line of the
          copy — "the same care a tailor brings to a garment".
          The whole field fades in with scroll — no dark stage needed. */}
      <div className="ded-field" aria-hidden>
        <div className="ded-cloth-field">
          <div className="clothing-ribbon clothing-ribbon-1" />
          <div className="clothing-ribbon clothing-ribbon-2" />
          <div className="clothing-ribbon clothing-ribbon-3" />
          <div className="clothing-ribbon clothing-ribbon-4" />
        </div>
        <div className="ded-blooms absolute inset-0">
          <div className="ded-bloom ded-drift-a" />
          <div className="ded-bloom ded-drift-b" />
          <div className="ded-bloom ded-sun" />
        </div>
        <div className="ded-embers absolute inset-0">
          <EmberField />
        </div>
      </div>

      {/* ── Copy ── */}
      <div className="ded-copy relative z-10 mx-auto w-full max-w-[1100px] text-center">
        {/* glowing sun emblem — the About-page mark, closing the loop */}
        <div className="ded-emblem relative mx-auto mb-10 h-24 w-24 md:mb-12 md:h-28 md:w-28">
          <div
            className="ded-emblem-halo absolute inset-0 rounded-full blur-[28px]"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,186,96,0.65), rgba(232,96,26,0.24) 60%, transparent 80%)',
            }}
          />
          <div
            className="absolute inset-[32%] rounded-full"
            style={{
              background: 'radial-gradient(circle at 50% 38%, #FFE9C6, #F2A65C 52%, #C9401A)',
              boxShadow: '0 0 46px rgba(242,166,92,0.6)',
            }}
          />
        </div>

        <h2 className="ded-title sw-grad-light sw-shimmer font-editorial leading-[1.02] tracking-[-0.02em] text-[clamp(2.8rem,8vw,6.5rem)]">
          <CharLine text={TITLE} />
        </h2>

        <span className="ded-rule mx-auto mt-8 block h-px w-[min(38rem,80%)] origin-center bg-[rgba(232,220,200,0.28)] md:mt-10" />

        <p className="ded-body mx-auto mt-9 max-w-[64ch] font-suisse text-[clamp(1.05rem,1.55vw,1.35rem)] font-light leading-[1.62] text-[var(--brand-cream)]/72 md:mt-11">
          {BODY}
        </p>

        {/* CTA — "Buy Now" */}
        <div className="ded-cta mt-12 md:mt-16">
          <a
            href="#"
            className="group relative inline-flex items-center gap-4 rounded-full border border-[var(--brand-cream)]/15 px-10 py-4 backdrop-blur-md transition-all duration-700 hover:border-[var(--brand-cream)]/40 md:px-12 md:py-5"
          >
            <div
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(105deg, transparent 20%, rgba(232,223,197,0.08) 45%, rgba(232,223,197,0.15) 50%, rgba(232,223,197,0.08) 55%, transparent 80%)',
              }}
            />
            <span className="relative z-10 font-suisse text-[10px] uppercase tracking-[0.3em] text-[var(--brand-cream)]/80 transition-colors duration-500 group-hover:text-[var(--brand-cream)] md:text-[11px]">
              Buy Now
            </span>
            <span className="relative z-10 text-sm text-[var(--brand-cream)]/50 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-[var(--brand-cream)]">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
