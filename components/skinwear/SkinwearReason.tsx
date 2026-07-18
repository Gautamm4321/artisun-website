'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── Content (verbatim) ──────────────────────────────────────────────── */

// Hero — staggered lines, oevra-style. The turn lands on "designed to be worn".
const HERO_L1 = 'Most sunscreens are designed';
const HERO_L2 = 'to be tolerated.';
const HERO_L3 = 'is designed to be worn.';
// Subtitle — brand copy supplied verbatim.
const HERO_DESC =
  'The difference is small in language and large in feel. Worn assumes a relationship — something you choose, something you reach for, something that sits on your skin the way a favourite shirt sits on your shoulders. Worn is what we wanted sun care to feel like. So we built it that way.';

/* Splits a string into per-word / per-char spans so each char can animate
   independently while words never break across lines (matches the reference). */
function CharLine({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`sw-splitline inline ${className}`} aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {word.split('').map((ch, ci) => (
            <span key={ci} className="sw-char inline-block will-change-[transform,filter,opacity]">
              {ch}
            </span>
          ))}
          {wi < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

export default function SkinwearReason() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(['.sw-char', '.sw-hero-glow'], {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
        });
        gsap.set('.sw-underline', { scaleX: 1 });
        return;
      }

      /* ── Hero entrance — slow, deliberate, expo easing ─────────────── */
      const hero = gsap.timeline({ defaults: { ease: 'expo.out' } });

      hero
        .fromTo(
          '.sw-hero-glow',
          { opacity: 0, scale: 0.86 },
          { opacity: 1, scale: 1, duration: 2.0, ease: 'power2.out' },
          0
        )
        .fromTo(
          '.sw-hero-title .sw-char',
          { yPercent: 118, opacity: 0, filter: 'blur(14px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            stagger: { each: 0.018, from: 'start' },
          },
          0.15
        )
        .fromTo(
          '.sw-underline',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.3, ease: 'power2.inOut', stagger: 0.18 },
          '-=1.1'
        )
        .fromTo(
          '.sw-hero-fade',
          { opacity: 0, y: 24, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.14 },
          '-=1.0'
        );

      /* ── 1. Pin the hero for a brief moment so the user can read the morphed text ── */
      ScrollTrigger.create({
        trigger: '.sw-hero',
        start: 'top top',
        end: '+=600', // Pin for 600px of scroll
        pin: true,
      });

      /* ── 2. Content drifts + fades as it actually scrolls away ── */
      gsap.to('.sw-hero-content', {
        yPercent: -20,
        opacity: 0,
        filter: 'blur(8px)',
        ease: 'none',
        scrollTrigger: {
          trigger: root, // Use the root wrapper
          start: 'top -600px', // Start exactly when the 600px pin finishes
          end: 'top -1200px', // Fade out over the next 600px
          scrub: true,
        },
      });

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="sw-reason-root relative w-full bg-transparent">
      {/* ── SECTION 1 — HERO (OEVRA CASCADE) ─────────────────────────── */}
      <section id="sw-reason-hero" className="sw-hero relative z-[2] h-[100svh] w-full overflow-hidden">
        {/* Aura bottle slot — rides down the left as the cascade reads */}
        <div
          data-aura-anchor
          data-aura-scale="0.46"
          className="pointer-events-none absolute left-1/2 top-[42%] h-0 w-0 -translate-x-1/2 md:left-[14%] md:translate-x-0"
          aria-hidden
        />
        <div className="sw-hero-content relative mx-auto flex h-full max-w-[1500px] flex-col px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-28">
          {/* Headline — a left-anchored, right-ragged cascade: each line sits at
              its own indent so the block reads as a confident diagonal, with the
              rules filling the negative space (matches the reference). */}
          <div className="relative flex flex-1 items-center">
            {/* soft warm halo behind the headline for depth */}
            <div
              className="sw-hero-glow pointer-events-none absolute left-[38%] top-1/2 -z-10 h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(255,178,104,0.20), rgba(232,96,26,0.08) 55%, transparent 72%)',
              }}
              aria-hidden
            />
            <h1 className="sw-hero-title sw-grad-light sw-shimmer pointer-events-none w-full max-w-[86rem] text-center font-editorial leading-[1.12] tracking-[-0.02em] text-[clamp(1.5rem,4.2vw,3.9rem)] md:text-left md:leading-[1.05]">
              {/* line 1 — centered, slight offset */}
              <span className="mt-2 flex w-full items-center justify-center md:mt-1 md:-ml-[4%] md:whitespace-nowrap">
                <CharLine text={HERO_L1} />
              </span>
              {/* line 2 — shifted left, long rule reaching right */}
              <span className="mt-2 flex w-full items-center justify-center gap-4 md:mt-1 md:-ml-[16%] md:gap-6 md:whitespace-nowrap">
                <CharLine text={HERO_L2} />
                <span className="sw-underline hidden h-px w-[clamp(6rem,18vw,22rem)] shrink-0 origin-left bg-[rgba(232,220,200,0.6)] md:block" />
              </span>
              {/* line 3 — shifted right, short rule to its left */}
              <span className="mt-2 flex w-full items-center justify-center gap-4 md:mt-1 md:ml-[16%] md:gap-6 md:whitespace-nowrap">
                <span className="sw-underline hidden h-px w-[8rem] shrink-0 origin-right bg-[rgba(232,220,200,0.6)] md:block" />
                <div className="flex items-center">
                  <span id="skinwear-target-word" className="opacity-0">Skinwear</span>
                  <span className="opacity-0">&nbsp;</span>
                  <CharLine text={HERO_L3} />
                </div>
              </span>
            </h1>
          </div>

          {/* bottom row: scroll cue (left) + subtitle & CTA (right) */}
          <div className="relative z-10 flex shrink-0 flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
            {/* rotated scroll cue, matching the reference */}
            <div className="sw-hero-fade order-2 hidden origin-bottom-left -rotate-90 items-center gap-3 md:order-1 md:flex">
              <span className="font-suisse text-[12px] uppercase tracking-[0.3em] text-[var(--brand-cream)]/55">
                scroll
              </span>
              <span className="h-px w-10 bg-[rgba(232,220,200,0.35)]" />
            </div>

            {/* subtitle */}
            <div className="sw-hero-fade order-1 max-w-[52ch] md:order-2 md:text-right">
              <p className="font-suisse text-[clamp(0.95rem,1.15vw,1.15rem)] font-light leading-relaxed text-[var(--brand-cream)]/70">
                {HERO_DESC}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
