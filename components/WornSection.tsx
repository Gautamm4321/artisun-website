'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
};

const CARDS: ProductCard[] = [
  {
    href: '/origin',
    img: asset('/about-media/origin-hero.jpg'),
    name: 'Origin',
    sub: '4-in-1 Milk Emulsion',
    spec: 'SPF 50+ · PA++++',
  },
  {
    href: '/aura',
    img: asset('/about-media/aura-1.jpg'),
    name: 'Aura',
    sub: 'Pearl Skinwear™',
    spec: 'SPF 40 · PA+++',
  },
];

function GlassCard({ card }: { card: ProductCard }) {
  return (
    <Link
      href={card.href}
      aria-label={`${card.name} — ${card.sub}`}
      className="liquid-glass group flex items-center gap-3 w-full sm:w-[240px] md:w-[260px] p-2.5 md:p-3 rounded-[16px] bg-black/25 backdrop-blur-md border border-white/15 transition-all duration-300 hover:border-white/30 hover:bg-black/35 shadow-lg"
    >
      <span className="relative block h-11 w-11 md:h-12 md:w-12 shrink-0 overflow-hidden rounded-[10px] ring-1 ring-white/20">
        <Image
          src={card.img}
          alt={card.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </span>

      <span className="flex-1 min-w-0">
        <span className="block font-editorial text-white text-[15px] md:text-[17px] leading-none">
          {card.name}
        </span>
        <span className="mt-1 block font-suisse text-[10.5px] md:text-[11px] text-white/75 truncate">
          {card.sub}
        </span>
        <span className="mt-0.5 block font-suisse text-[9px] md:text-[9.5px] tracking-[0.12em] uppercase text-white/55">
          {card.spec}
        </span>
      </span>

      <span className="shrink-0 text-white opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function WornSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        anticipatePin: 1,
        scrub: 1,
      },
    });

    tl.fromTo(
      contentRef.current,
      { opacity: 0.2, y: 30 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 1 }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] z-20 flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Exact Origin Red-Orange Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
        }}
      />

      {/* ── 1. LEFT SIDE: BIG IMAGE ATTACHED DIRECTLY TO BOTTOM ── */}
      <div className="absolute left-0 bottom-0 z-10 w-[320px] sm:w-[420px] md:w-[500px] lg:w-[580px] xl:w-[650px] h-[70vh] sm:h-[78vh] md:h-[88vh] pointer-events-none flex items-end">
        <div className="relative w-full h-full">
          <Image
            src={asset('/frame-2.png')}
            alt="Artisun Model"
            fill
            priority
            sizes="(max-width: 768px) 420px, 650px"
            className="object-contain object-left-bottom select-none"
          />
        </div>
      </div>

     {/* ── 2. CENTER: HIGH-IMPACT 2-LINE HEADLINE + 3-LINE DESCRIPTION ── */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-[990px] mx-auto flex flex-col items-center text-center pl-0 md:pl-[150px] lg:pl-[220px]"
      >
        {/* Stronger, Bolder 2-Line Main Heading */}
        <h2 className="font-editorial text-[var(--brand-cream,#f5f0eb)] text-[clamp(26px,3.3vw,52px)] leading-[1.12] tracking-[-0.02em] font-normal drop-shadow-md">
          Most sunscreens are made to be<br />
          tolerated. Ours is designed to be worn.
        </h2>

        {/* Scaled-up 2-Line Description */}
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)]/90 text-[clamp(18px,1.2vw,30px)] leading-[1.45] font-normal mt-5 sm:mt-6 max-w-[460px] drop-shadow-sm">
          Because you’ll only wear it everyday<br />
          it everyday if it survives every kind of day<br />
        </p>
      </div>

      {/* ── 3. BOTTOM-RIGHT CORNER PRODUCT CARDS ── */}
      <div className="absolute right-4 sm:right-8 md:right-10 bottom-5 md:bottom-7 z-30 flex flex-col gap-2.5 max-w-[90vw] sm:max-w-none">
        {CARDS.map((card) => (
          <GlassCard key={card.href} card={card} />
        ))}
      </div>
    </section>
  );
}