'use client';
import { useState } from 'react';
import Link from 'next/link';
import { asset } from '@/lib/asset';

export default function GlobalHeader({ startHidden = false }: { startHidden?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-5 py-5 md:px-12 md:py-8 z-[100] hero-header bg-gradient-to-b from-black/60 to-transparent ${
          startHidden ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Left: Monogram Logo (Mobile: Opens Menu | Desktop: Goes to Home) */}
        <div className="flex items-center">
          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-8 h-8 flex items-center justify-center pointer-events-auto hover:opacity-80 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={asset('/logo-artisun.svg')} 
              alt="Artisun Icon" 
              className="w-full h-full object-contain"
            />
          </button>

          {/* Desktop Link */}
          <Link 
            href="/" 
            className="hidden md:flex w-10 h-10 items-center justify-center pointer-events-auto hover:opacity-80 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={asset('/logo-artisun.svg')} 
              alt="Artisun Icon" 
              className="w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* Middle: Desktop Nav Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          <Link href="/climate" className="font-editorial text-[var(--brand-cream)] text-[19px] hover:opacity-70 transition-opacity whitespace-nowrap">
            Climate-smart
          </Link>

          <div className="flex items-end gap-2">
            <Link href="/origin" aria-label="Origin" className="hover:scale-110 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset('/b2.png')} alt="Origin bottle" className="h-8 w-auto object-contain" />
            </Link>
            <Link href="/aura" aria-label="Aura" className="hover:scale-110 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset('/b1.png')} alt="Aura jar" className="h-[22px] w-auto object-contain mb-[2px]" />
            </Link>
          </div>

          <Link href="/skinwear" className="font-editorial text-[var(--brand-cream)] text-[19px] hover:opacity-70 transition-opacity whitespace-nowrap">
            Skinwear™
          </Link>

          <Link href="/about" className="font-editorial text-[var(--brand-cream)] text-[19px] hover:opacity-70 transition-opacity whitespace-nowrap">
            About
          </Link>
        </nav>

        {/* Right: Cart Icon */}
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform pointer-events-auto">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--brand-cream)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1.5"></circle>
            <circle cx="20" cy="21" r="1.5"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
      </header>

      {/* ── MOBILE SLIDE-OUT MENU DRAWER ── */}
      <div
        data-lenis-prevent="true"
        className={`fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col justify-between p-7 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'
        }`}
      >
        {/* Top bar inside drawer: Close Button & Logo */}
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/logo-artisun.svg')} alt="Artisun Icon" className="w-full h-full object-contain" />
          </div>
          <button
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

        {/* Navigation list */}
        <nav className="flex flex-col gap-5 my-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-editorial text-[var(--brand-cream)] text-2xl tracking-tight hover:opacity-70 transition-opacity"
          >
            Home
          </Link>

          <Link
            href="/climate"
            onClick={() => setMobileMenuOpen(false)}
            className="font-editorial text-[var(--brand-cream)] text-2xl tracking-tight hover:opacity-70 transition-opacity"
          >
            Climate-smart
          </Link>

          {/* Product links */}
          <div className="flex flex-col gap-3 py-2 border-y border-white/10">
            <Link
              href="/origin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 font-editorial text-[var(--brand-cream)] text-xl hover:opacity-70 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset('/b2.png')} alt="Origin" className="h-6 w-auto object-contain" />
              <span>ORIGIN · SPF 50+</span>
            </Link>

            <Link
              href="/aura"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 font-editorial text-[var(--brand-cream)] text-xl hover:opacity-70 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset('/b1.png')} alt="Aura" className="h-5 w-auto object-contain" />
              <span>AURA · SPF 40</span>
            </Link>
          </div>

          <Link
            href="/skinwear"
            onClick={() => setMobileMenuOpen(false)}
            className="font-editorial text-[var(--brand-cream)] text-2xl tracking-tight hover:opacity-70 transition-opacity"
          >
            Skinwear™
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="font-editorial text-[var(--brand-cream)] text-2xl tracking-tight hover:opacity-70 transition-opacity"
          >
            About
          </Link>
        </nav>

        {/* Drawer footer */}
        <div className="pt-4 border-t border-white/10 text-white/40 text-xs font-suisse tracking-wider uppercase">
          Artisun Skinwear · 2026
        </div>
      </div>
    </>
  );
}