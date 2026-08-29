'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';
import { useCart } from './cart/CartProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeHeader({ ready = false }: { ready?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setOpen: setCartOpen, cart } = useCart();
  const wordmarkRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuLogoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const img = wordmarkRef.current;
    const nav = navRef.current;
    if (!img) return;

    const geo = { tx: 0, ty: 0, scale: 1 };

    const measure = () => {
      gsap.set(img, { x: 0, y: 0, scale: 1 });
      const r = img.getBoundingClientRect();
      const isMd = window.innerWidth >= 768;
      const padY = isMd ? 24 : 18;
      const compactW = isMd ? 140 : 108;

      geo.scale = compactW / r.width;

      // Landing position differs by breakpoint on purpose:
      //   desktop (>=1024) — ORIGINAL behaviour, lands at the left padding edge
      //                      so it sits beside the beige nav tabs.
      //   mobile/tablet    — lands CENTRED, which is what you asked for on
      //                      28 Aug; the corner slot there holds the menu logo.
      // transformOrigin is 'left top', so the scaled width is exactly compactW
      // and the centred target left edge is half the leftover space.
      const isDesktop = window.innerWidth >= 1024;
      const padX = isMd ? 40 : 20;
      const targetLeft = isDesktop ? padX : (window.innerWidth - compactW) / 2;

      geo.tx = targetLeft - r.left;
      geo.ty = padY - r.top;
    };

    const apply = (p: number) => {
      gsap.set(img, {
        x: geo.tx * p,
        y: geo.ty * p,
        scale: 1 + (geo.scale - 1) * p,
        transformOrigin: 'left top',
      });

      if (nav) {
        const navOpacity = p < 0.7 ? 0 : (p - 0.7) / 0.3;
        nav.style.opacity = String(navOpacity);
        nav.style.pointerEvents = navOpacity > 0.5 ? 'auto' : 'none';
      }

      // Fade the small corner wordmark in on the same curve. Before this point
      // the big flying wordmark is still mid-flight, and showing both reads as a
      // duplicate rather than a transition.
      const menuLogo = menuLogoRef.current;
      if (menuLogo) {
        const o = p < 0.75 ? 0 : (p - 0.75) / 0.25;
        menuLogo.style.opacity = String(o);
        menuLogo.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
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

  useEffect(() => {
    if (!ready) return;
    gsap.to(headerRef.current, { opacity: 1, duration: 1.0, ease: 'power2.out' });
  }, [ready]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[100] pointer-events-none opacity-0 flex items-center justify-between px-4 md:px-10 py-4 md:py-6"
      >
        {/* Left: the ARTISUN wordmark IS the menu trigger on mobile, matching
            GlobalHeader on every other route. It only appears once the flying
            wordmark has finished travelling to the centre — otherwise there are
            two copies of the same logo on screen during the scroll. */}
        <div className="flex items-center pointer-events-auto">
          <button
            ref={menuLogoRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center h-[36px] opacity-0 transition-opacity duration-300 hover:opacity-85"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('/logo-artisun.svg')}
              alt=""
              aria-hidden="true"
              className="h-6 w-auto object-contain"
            />
          </button>
          <span className="hidden md:block w-[145px] h-[36px]" aria-hidden />
        </div>


        {/* Right Corner: Small Modular Beige Tabs Box with Exact Color Invert on Hover */}
        <div className="hidden md:flex items-center gap-[4px] pointer-events-auto">
          {/* Climate-smart */}
          <Link
            href="/climate"
            className="group bg-[#E8DAC7] hover:bg-[#A52A2C] text-[#A52A2C] hover:text-[#E8DAC7] font-editorial text-[17px] tracking-tight px-4 py-1.5 flex items-center justify-center transition-all duration-200 whitespace-nowrap h-[36px]"
          >
            Climate-smart
          </Link>

          {/* Origin Bottle Icon (Red Silhouette -> Beige on Hover) */}
          <Link
            href="/origin"
            aria-label="Origin SPF 50+"
            className="group bg-[#E8DAC7] hover:bg-[#A52A2C] px-3.5 py-1.5 flex items-center justify-center transition-all duration-200 h-[36px]"
          >
            <svg className="h-[21px] w-auto fill-[#A52A2C] group-hover:fill-[#E8DAC7] transition-colors duration-200" viewBox="0 0 24 38">
              <circle cx="12" cy="7" r="7" />
              <path d="M7 15 L17 15 L21 38 L3 38 Z" />
            </svg>
          </Link>

          {/* Aura Jar Icon (Red Silhouette -> Beige on Hover) */}
          <Link
            href="/aura"
            aria-label="Aura SPF 40"
            className="group bg-[#E8DAC7] hover:bg-[#A52A2C] px-3.5 py-1.5 flex items-center justify-center transition-all duration-200 h-[36px]"
          >
            <svg className="h-[15px] w-auto fill-[#A52A2C] group-hover:fill-[#E8DAC7] transition-colors duration-200" viewBox="0 0 34 22">
              <path d="M7 6 Q17 0 27 6 Q31 9 27 10 Q17 11 7 10 Q3 9 7 6 Z" />
              <path d="M5 11 L29 11 L33 22 L1 22 Z" />
            </svg>
          </Link>

          {/* Skinwear™ */}
          <Link
            href="/skinwear"
            className="group bg-[#E8DAC7] hover:bg-[#A52A2C] text-[#A52A2C] hover:text-[#E8DAC7] font-editorial text-[17px] tracking-tight px-4 py-1.5 flex items-center justify-center transition-all duration-200 whitespace-nowrap h-[36px]"
          >
            Skinwear™
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="group bg-[#E8DAC7] hover:bg-[#A52A2C] text-[#A52A2C] hover:text-[#E8DAC7] font-editorial text-[17px] tracking-tight px-4 py-1.5 flex items-center justify-center transition-all duration-200 whitespace-nowrap h-[36px]"
          >
            About
          </Link>

          {/* Cart Icon */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart${cart?.totalQuantity ? `, ${cart.totalQuantity} items` : ''}`}
            className="group relative bg-[#E8DAC7] hover:bg-[#A52A2C] px-3.5 py-1.5 flex items-center justify-center transition-all duration-200 h-[36px] cursor-pointer"
          >
            <svg className="w-5 h-5 text-[#A52A2C] group-hover:text-[#E8DAC7] transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1.5"></circle>
              <circle cx="20" cy="21" r="1.5"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {!!cart?.totalQuantity && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#A52A2C] text-[#E8DAC7] text-[10px] font-suisse font-medium grid place-items-center">
                {cart.totalQuantity}
              </span>
            )}
          </button>
        </div>


        {/* Mobile Right Cart Button */}
        <div className="md:hidden flex items-center pointer-events-auto">
          <button type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart${cart?.totalQuantity ? `, ${cart.totalQuantity} items` : ''}`} className="relative text-[var(--brand-cream)] hover:opacity-75 transition-opacity p-1">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1.5"></circle>
              <circle cx="20" cy="21" r="1.5"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>

        {/* Flying Wordmark (Pointer events disabled on parent wrapper to avoid trapezoid hitbox) */}
        <div
          onClick={() => {
            if (window.innerWidth < 768) setMobileMenuOpen(true);
          }}
          className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center pt-[75vh] lg:pt-[13vh]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={wordmarkRef}
            src={asset('Artisun Primary Logo.png')}
            alt="ARTISUN"
            className="pointer-events-auto w-[min(90vw,1300px)] h-auto select-none drop-shadow-[0_6px_30px_rgba(0,0,0,0.45)] cursor-pointer"
            draggable={false}
          />
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        data-lenis-prevent="true"
        className={`fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col justify-between p-7 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/logo-artisun.svg')} alt="Artisun Icon" className="w-full h-full object-contain" />
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-5 my-auto">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-editorial text-[var(--brand-cream)] text-2xl tracking-tight hover:opacity-70 transition-opacity">
            Home
          </Link>
          <Link href="/climate" onClick={() => setMobileMenuOpen(false)} className="font-editorial text-[var(--brand-cream)] text-2xl tracking-tight hover:opacity-70 transition-opacity">
            Climate-smart
          </Link>
          <div className="flex flex-col gap-3 py-2 border-y border-white/10">
            <Link href="/origin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 font-editorial text-[var(--brand-cream)] text-xl hover:opacity-70 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset('/b2.png')} alt="Origin" className="h-6 w-auto object-contain" />
              <span>ORIGIN · SPF 50+</span>
            </Link>
            <Link href="/aura" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 font-editorial text-[var(--brand-cream)] text-xl hover:opacity-70 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset('/b1.png')} alt="Aura" className="h-5 w-auto object-contain" />
              <span>AURA · SPF 40</span>
            </Link>
          </div>
          <Link href="/skinwear" onClick={() => setMobileMenuOpen(false)} className="font-editorial text-[var(--brand-cream)] text-2xl tracking-tight hover:opacity-70 transition-opacity">
            Skinwear™
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="font-editorial text-[var(--brand-cream)] text-2xl tracking-tight hover:opacity-70 transition-opacity">
            About
          </Link>

        </nav>

        <div className="pt-4 border-t border-white/10 text-white/40 text-xs font-suisse tracking-wider uppercase">
          Artisun Skinwear · 2026
        </div>
      </div>
    </>
  );
}