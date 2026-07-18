'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/* ── Content (verbatim — em-dashes kept because the brand copy was supplied exactly) ── */
const STATEMENT = 'Skinwear is sun care designed as a wardrobe.';
const PARA_WEAR =
  'Just like you choose what to wear based on the day ahead — a light shirt for a hot afternoon, something warmer for a cool evening — sun protection should work the same way.';
const PARA_WEAR_PUNCH = 'Different formulas for different mornings.';
const PARA_LIVE =
  'Each one designed to hold its own through the conditions Indian skin actually meets — heat, humidity, sweat, pollution. Each one made to slip into the way you already live, through commutes, work, evenings, and everything in between.';
const CLOSE_TITLE = 'Meet Skinwear,';
const CLOSE_SUB = 'Clothing for your skin, built for daily life';

/* Per-word / per-char spans so each char can animate independently while
   words never break across lines (same treatment as the reason hero). */
function CharLine({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="inline" aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {word.split('').map((ch, ci) => (
            <span key={ci} className="sw-char inline-block will-change-[transform,filter,opacity]">
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

export default function MeetSkinwear() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(['.sw-meet-close .sw-char', '.sw-meet-word', '.sw-meet-punch', '.sw-meet-close-sub', '.sw-meet-glow'], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          filter: 'blur(0px)',
        });
        return;
      }

      /* ── Act II — statement: words surface out of the haze in reading
             order, tied to the scrollbar so the reveal is the reading pace ── */
      gsap.to('.sw-meet-word', {
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: '.sw-meet-statement',
          start: 'top 76%',
          end: 'bottom 56%',
          scrub: 1,
        },
      });

      /* ── Act III — paragraphs: line-by-line clip reveal ── */
      gsap.utils.toArray<HTMLElement>('.sw-meet-body').forEach((el) => {
        const split = new SplitText(el, { type: 'lines', mask: 'lines' });
        gsap.set(split.lines, { yPercent: 110, opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () =>
            gsap.to(split.lines, {
              yPercent: 0,
              opacity: 1,
              duration: 1.0,
              ease: 'power3.out',
              stagger: 0.12,
            }),
        });
      });
      gsap.fromTo(
        '.sw-meet-punch',
        { opacity: 0, y: 26, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.sw-meet-punch', start: 'top 84%', once: true },
        }
      );

      /* ── Act IV — closing: the halo blooms with scroll, then the sign-off
             lands with the same character cascade the page opened with ── */
      gsap.fromTo(
        '.sw-meet-glow',
        { opacity: 0, scale: 0.78 },
        {
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.sw-meet-close-sec',
            start: 'top 85%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
      gsap.set('.sw-meet-close .sw-char', { yPercent: 118, opacity: 0, filter: 'blur(12px)' });
      gsap.set('.sw-meet-close-sub', { opacity: 0, y: 22, filter: 'blur(6px)' });
      ScrollTrigger.create({
        trigger: '.sw-meet-close-sec',
        start: 'top 62%',
        once: true,
        onEnter: () => {
          gsap
            .timeline({ defaults: { ease: 'expo.out' } })
            .to('.sw-meet-close .sw-char', {
              yPercent: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.5,
              stagger: { each: 0.032, from: 'start' },
            })
            .to(
              '.sw-meet-close-sub',
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
              '-=0.9'
            );
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="sw-meet-root relative w-full bg-transparent">
      {/* ── ACT I — THE WARDROBE STATEMENT ────────────────────────────── */}
      <section className="sw-meet-statement-sec relative z-[2] flex min-h-[100svh] items-center justify-center px-6 pt-40 pb-24 md:px-12 md:pt-48 md:pb-32">
        {/* Aura bottle slot — right of the centred statement */}
        <div
          data-aura-anchor
          data-aura-scale="0.52"
          className="pointer-events-none absolute right-1/2 top-[56%] h-0 w-0 translate-x-1/2 md:right-[15%] md:translate-x-0"
          aria-hidden
        />
        <p className="sw-meet-statement mx-auto flex max-w-[16ch] flex-wrap justify-center gap-x-[0.28em] gap-y-[0.1em] text-center font-editorial leading-[1.24] tracking-[-0.01em] text-[var(--brand-cream)] text-[clamp(2rem,5.2vw,4.4rem)]">
          {STATEMENT.split(' ').map((word, i) => {
            /* "wardrobe" is the pivot of the whole idea, so it carries the accent */
            const isPivot = word.replace(/[^A-Za-z]/g, '') === 'wardrobe';
            return (
              <span
                key={i}
                className={`sw-meet-word inline-block opacity-[0.12] ${isPivot ? 'italic pb-1 text-[#F3C48A]' : ''}`}
                style={{ filter: 'blur(5px)', willChange: 'opacity, filter' }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </section>

      {/* ── ACT III — THE TWO PARAGRAPHS (asymmetric editorial blocks) ── */}
      <section className="relative z-[2] px-6 pb-36 md:px-16 md:pb-52">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative md:w-[44rem]">
            <p className="sw-meet-body font-suisse text-[clamp(1.05rem,1.6vw,1.35rem)] font-light leading-[1.55] text-[var(--brand-cream)]/75">
              {PARA_WEAR}
            </p>
            <p className="sw-meet-punch mt-10 pb-1 font-editorial italic leading-[1.25] tracking-[-0.01em] text-[var(--brand-cream)] text-[clamp(1.6rem,3vw,2.6rem)] md:mt-12">
              {PARA_WEAR_PUNCH}
            </p>
            {/* Aura bottle slot — floats in the empty right column beside this block */}
            <div
              data-aura-anchor
              data-aura-scale="0.42"
              className="pointer-events-none absolute top-1/2 right-[-13rem] hidden h-0 w-0 md:block"
              aria-hidden
            />
          </div>

          <div className="relative mt-24 md:ml-auto md:mt-44 md:w-[46rem]">
            <p className="sw-meet-body font-suisse text-[clamp(1.05rem,1.6vw,1.35rem)] font-light leading-[1.55] text-[var(--brand-cream)]/75">
              {PARA_LIVE}
            </p>
            {/* Aura bottle slot — swings to the empty left column beside this block */}
            <div
              data-aura-anchor
              data-aura-scale="0.42"
              className="pointer-events-none absolute top-1/2 left-[-13rem] hidden h-0 w-0 md:block"
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* ── ACT IV — CLOSING ──────────────────────────────────────────── */}
      <section className="sw-meet-close-sec relative z-[2] flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">
        {/* Aura bottle slot — the finale: settles centred near the bottom,
            directly beneath the sign-off */}
        <div
          data-aura-anchor
          data-aura-scale="0.56"
          className="pointer-events-none absolute bottom-[14%] left-1/2 h-0 w-0 -translate-x-1/2"
          aria-hidden
        />
        {/* warm halo that blooms behind the sign-off as it arrives */}
        <div
          className="sw-meet-glow pointer-events-none absolute inset-0 -z-10 m-auto h-[72vmin] w-[72vmin] rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,178,104,0.22), rgba(232,96,26,0.09) 55%, transparent 72%)',
          }}
          aria-hidden
        />
        <h3 className="sw-meet-close sw-grad-light sw-shimmer font-editorial leading-[1.08] tracking-[-0.02em] text-[clamp(2.8rem,8vw,7rem)] pb-3">
          <CharLine text={CLOSE_TITLE} />
        </h3>
        <p className="sw-meet-close-sub mt-8 max-w-[34ch] font-suisse text-[clamp(1rem,1.4vw,1.2rem)] font-light leading-relaxed text-[var(--brand-cream)]/70 md:mt-10">
          {CLOSE_SUB}
        </p>
      </section>
    </div>
  );
}
