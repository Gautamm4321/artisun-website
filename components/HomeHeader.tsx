'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * HomeHeader
 * The ARTISUN wordmark opens huge and centred over the hero, then — as the page
 * scrolls its first viewport — shrinks and glides into the top-left corner,
 * handing the bar over to the compact nav (Paloceras-style). The wordmark itself
 * is the only thing that flies; the nav and icons stay put and the bar's tint
 * simply deepens so it reads over the content that scrolls beneath.
 */
export default function HomeHeader({ ready = false }: { ready?: boolean }) {
  const wordmarkRef = useRef<HTMLImageElement>(null);
  const barTintRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = wordmarkRef.current;
    const tint = barTintRef.current;
    const nav = navRef.current;
    if (!img) return;

    // Geometry captured at identity (the big, centred state) and recomputed on
    // every refresh so the flight target stays correct across resizes.
    const geo = { tx: 0, ty: 0, scale: 1 };

    const measure = () => {
      gsap.set(img, { x: 0, y: 0, scale: 1 });
      const r = img.getBoundingClientRect();
      const isMd = window.innerWidth >= 768;
      const padX = isMd ? 44 : 22;   // final left inset
      const padY = isMd ? 30 : 22;   // final top inset
      const compactW = isMd ? 158 : 118;
      // transform-origin is the top-left corner, so scaling pins that corner and
      // the translate simply carries it from the centred spot to the inset spot.
      geo.scale = compactW / r.width;
      geo.tx = padX - r.left;
      geo.ty = padY - r.top;
    };

    const apply = (p: number) => {
      gsap.set(img, {
        x: geo.tx * p,
        y: geo.ty * p,
        scale: 1 + (geo.scale - 1) * p,
        transformOrigin: 'left top',
      });
      if (tint) tint.style.opacity = String(p);
      // Nav + icons drift down a touch while the big wordmark owns the stage,
      // then rise to meet the shrunk logo — a subtle settling, not a big move.
      if (nav) {
        // Hero par 0 se 0.75 tak opacity ZERO rahegi
        // Jab Worn section pura cover karega (0.75 se 1.0), tabhi smooth reveal hoga
        const navOpacity = p < 0.75 ? 0 : (p - 0.75) / 0.25;

        nav.style.transform = `translateY(${(1 - navOpacity) * 8}px)`;
        nav.style.opacity = String(navOpacity);
        nav.style.pointerEvents = navOpacity > 0.5 ? 'auto' : 'none';
      }
    };

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: () => window.innerHeight * 0.85,
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh: () => measure(),
      onUpdate: (self) => apply(self.progress),
    });

    const onLoad = () => {
      measure();
      apply(0);
      ScrollTrigger.refresh();
    };
    if (img.complete) onLoad();
    else img.addEventListener('load', onLoad, { once: true });

    return () => {
      st.kill();
      img.removeEventListener('load', onLoad);
    };
  }, []);

  // Gentle entrance once the loading screen has lifted.
  useEffect(() => {
    if (!ready) return;
    gsap.to(headerRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' });
  }, [ready]);

  const navLink =
    'font-editorial text-[var(--brand-cream)] text-[13px] md:text-[17px] tracking-wide hover:opacity-60 transition-opacity whitespace-nowrap';

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[100] pointer-events-none opacity-0"
    >
      {/* Deepening tint — invisible over the hero, legible once content scrolls under */}
      <div
        ref={barTintRef}
        className="absolute inset-x-0 top-0 h-[92px] md:h-[104px] pointer-events-none"
        style={{
          opacity: 0,
          background:
            'linear-gradient(to bottom, rgba(15,7,4,0.72) 0%, rgba(15,7,4,0.28) 60%, transparent 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      />

      {/* Compact bar row: nav (centre) + cart/account (right). The wordmark lands
          on the left of this same row as it shrinks. */}
      <div className="relative flex items-center justify-between px-[22px] md:px-11 h-[66px] md:h-[76px]">
        {/* spacer holds the left slot the shrunk wordmark flies into */}
        <span aria-hidden className="w-[118px] md:w-[158px] shrink-0" />

        {/* Nav aur Icons dono ko ek common container me wrap kiya hai */}
        <div
          ref={navRef}
          style={{ opacity: 0 }}
          className="flex items-center justify-between flex-1 pl-4"
        >
          <nav className="flex items-center gap-4 sm:gap-6 md:gap-9 mx-auto">
            <Link href="/origin" className={navLink}>Origin</Link>
            <Link href="/aura" className={navLink}>Aura</Link>
            <Link href="/skinwear" className={navLink}>Skinwear™</Link>
            <Link href="/climate" className={`${navLink} hidden sm:inline`}>Climate&#8209;smart</Link>
            <Link href="/about" className={`${navLink} hidden sm:inline`}>About</Link>
          </nav>

          <div className="flex items-center gap-4 md:gap-5 shrink-0">
            <button aria-label="Account" className="hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5 md:w-[22px] md:h-[22px] text-[var(--brand-cream)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </button>
            <button aria-label="Cart" className="hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5 md:w-[22px] md:h-[22px] text-[var(--brand-cream)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8h12l-1 12H7L6 8z" />
                <path d="M9 8a3 3 0 0 1 6 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* The flying wordmark. Base (identity) state = huge & centred near the top.
          transform-origin is set to left-top in JS so the shrink pins the corner. */}
      <Link
        href="/"
        aria-label="ARTISUN — home"
        className="pointer-events-auto absolute left-0 right-0 top-0 flex justify-center pt-[13vh]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={wordmarkRef}
          src={asset('Artisun Primary Logo.png')}
          alt="ARTISUN"
          className="w-[min(90vw,1300px)] h-auto select-none drop-shadow-[0_6px_30px_rgba(0,0,0,0.45)]"
          draggable={false}
        />
      </Link>
    </header>
  );
}
