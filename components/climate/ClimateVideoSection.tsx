'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Four Indian cities, each with the weather that quietly undoes skin.
const CARDS = [
  {
    city: 'Shimla',
    condition: 'Dry cold',
    image: asset('/climate-cards/face.jpg'),
    text: 'A Shimla winter pulls all the moisture out, and by afternoon your skin’s tight and flaking.',
  },
  {
    city: 'Jaipur',
    condition: 'Dry heat',
    image: asset('/climate-cards/sun.jpg'),
    text: 'In the Jaipur heat, whatever you put on is gone before noon.',
  },
  {
    city: 'Bangalore',
    condition: 'Humid',
    image: asset('/climate-cards/hand.jpg'),
    text: 'Bangalore’s humidity leaves everything sitting greasy, pilling the moment you touch makeup.',
  },
  {
    city: 'Bombay',
    condition: 'Monsoon',
    image: asset('/climate-cards/fabric.jpg'),
    text: 'And in Bombay, all it takes is one downpour, and your face is an oily mess.',
  },
];

export default function ClimateVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (introRef.current) {
        gsap.fromTo(
          introRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: introRef.current, start: 'top 82%' },
          }
        );
      }

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const media = card.querySelector('.cc-media') as HTMLElement | null;
        const words = Array.from(card.querySelectorAll('.cc-word')) as HTMLElement[];
        const meta = Array.from(card.querySelectorAll('.cc-meta')) as HTMLElement[];

        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );

        // Calm parallax settle on the image, tied to scroll.
        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.16, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 },
            }
          );
        }

        if (words.length) {
          gsap.fromTo(
            words,
            { opacity: 0.16 },
            {
              opacity: 1,
              stagger: 0.5,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top 78%', end: 'top 42%', scrub: 1 },
            }
          );
        }
        if (meta.length) {
          gsap.fromTo(
            meta,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 80%' },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0b0605] z-20 py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-16"
    >
      <div ref={introRef} className="max-w-[1200px] mx-auto mb-14 md:mb-20">
        <span className="cc-eyebrow block font-suisse text-[11px] md:text-[12px] tracking-[0.34em] uppercase text-[var(--brand-cream)]/55">
          Climate-smart™ · Built for India
        </span>
        <h2 className="mt-4 font-editorial text-[var(--brand-cream)] text-[30px] sm:text-[40px] lg:text-[54px] leading-[1.1] max-w-[16ch]">
          Every city has its own way of undoing your skin.
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-5 md:gap-7">
        {CARDS.map((card, i) => (
          <div
            key={card.city}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="cc-card group relative overflow-hidden rounded-[20px] md:rounded-[26px] border border-white/10 bg-white/[0.02] flex flex-col md:flex-row"
          >
            {/* LEFT — moody city image */}
            <div className="relative w-full md:w-[62%] aspect-[16/10] md:aspect-auto md:min-h-[300px] lg:min-h-[360px] overflow-hidden">
              <div className="cc-media absolute inset-0 will-change-transform">
                <Image
                  src={card.image}
                  alt={`${card.city} — ${card.condition}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 62vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
              {/* edge + bottom scrim for warmth and pill legibility */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(8,4,3,0.30) 0%, transparent 26%, transparent 72%, rgba(8,4,3,0.5) 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,4,3,0.7) 0%, transparent 100%)' }} />
              <span className="cc-meta absolute bottom-4 left-4 md:bottom-5 md:left-5 inline-flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-3.5 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2812E]" />
                <span className="font-suisse text-[11px] md:text-[12px] tracking-[0.14em] uppercase text-white/90">{card.condition}</span>
              </span>
            </div>

            {/* RIGHT — text panel */}
            <div className="w-full md:w-[38%] p-6 sm:p-8 md:p-9 lg:p-11 flex flex-col justify-center bg-gradient-to-b from-white/[0.04] to-transparent">
              <span className="cc-meta font-suisse text-[11px] md:text-[12px] tracking-[0.26em] uppercase text-[var(--brand-cream)]/50">
                {String(i + 1).padStart(2, '0')} — {card.city}
              </span>
              <p className="mt-3 md:mt-4 font-editorial text-[var(--brand-cream)] text-[21px] sm:text-[26px] lg:text-[30px] leading-[1.28]">
                {card.text.split(' ').map((w, wi) => (
                  <span key={wi} className="cc-word inline-block">{w}&nbsp;</span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
