'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ProductCard = {
  href: string;
  img: string;
  name: string;
  sub: string;
  spec: string;
  align: 'left' | 'right';
};

const CARDS: ProductCard[] = [
  {
    href: '/origin',
    img: asset('/about-media/origin-hero.jpg'),
    name: 'Origin',
    sub: '4-in-1 Milk Emulsion',
    spec: 'SPF 50+ · PA++++',
    align: 'left',
  },
  {
    href: '/aura',
    img: asset('/about-media/aura-1.jpg'),
    name: 'Aura',
    sub: 'Pearl Skinwear™',
    spec: 'SPF 40 · PA+++',
    align: 'right',
  },
];

function GlassCard({ card }: { card: ProductCard }) {
  return (
    <Link
      href={card.href}
      aria-label={`${card.name} — ${card.sub}`}
      className="liquid-glass hero-card group flex items-center gap-4 w-full md:w-[330px] p-3 md:p-3.5"
    >
      <span className="relative block h-16 w-16 md:h-[74px] md:w-[74px] shrink-0 overflow-hidden rounded-[14px] ring-1 ring-white/25">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.img}
          alt={card.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </span>

      <span className="flex-1 min-w-0">
        <span className="block font-editorial text-[var(--brand-cream)] text-[19px] md:text-[22px] leading-none">
          {card.name}
        </span>
        <span className="mt-1 block font-suisse text-[11px] md:text-[12px] text-white/70 truncate">
          {card.sub}
        </span>
        <span className="mt-1.5 block font-suisse text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-white/55">
          {card.spec}
        </span>
      </span>

      <span className="shrink-0 self-center text-[var(--brand-cream)] opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function HeroSection({ ready = false }: { ready?: boolean }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(imgRef.current, { scale: 1.12 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0);
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 24, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      0.4
    );
    tl.fromTo(
      cardsRef.current ? Array.from(cardsRef.current.querySelectorAll('.hero-card')) : [],
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: 'power3.out' },
      0.7
    );

    // Retire the tagline early on scroll so it never collides with the wordmark
    // shrinking down through the same space. immediateRender:false keeps this from
    // clobbering the entrance fade above at creation time.
    const fade = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: () => window.innerHeight * 0.3,
      scrub: true,
      animation: gsap.fromTo(
        taglineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -24, ease: 'none', immediateRender: false }
      ),
    });

    return () => {
      tl.kill();
      fade.kill();
    };
  }, [ready]);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden z-[1]">
      {/* Full-bleed hero image */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={asset('/skinwear-media/model-portrait.jpg')}
          alt="ARTISUN — worn every day"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 28%' }}
        />
      </div>

      {/* Legibility gradients: top for the header, bottom to ground the cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12,4,2,0.55) 0%, rgba(12,4,2,0.0) 18%, rgba(12,4,2,0.0) 55%, rgba(10,3,2,0.55) 82%, rgba(8,2,1,0.86) 100%)',
        }}
      />
      {/* soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(120% 80% at 50% 42%, transparent 55%, rgba(6,2,1,0.42) 100%)' }}
      />

      {/* Hero tagline — sits below the big wordmark, above the cards */}
      <div
        ref={taglineRef}
        className="absolute left-1/2 top-[52%] md:top-[54%] -translate-x-1/2 -translate-y-1/2 text-center px-6 opacity-0 pointer-events-none"
      >
        <p className="font-suisse text-[10px] md:text-[12px] tracking-[0.34em] uppercase text-[var(--brand-cream)]/70">
          Skinwear™ · Broad Spectrum
        </p>
        <p className="mt-3 md:mt-4 font-editorial text-[var(--brand-cream)] text-[26px] md:text-[40px] lg:text-[48px] leading-[1.12]">
          A new language of suncare
        </p>
      </div>

      {/* Two clickable liquid-glass product cards, bottom corners */}
      <div
        ref={cardsRef}
        className="absolute inset-x-0 bottom-6 md:bottom-9 px-5 md:px-11 z-20"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6">
          {CARDS.map((c) => (
            <GlassCard key={c.href} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
