'use client';
import { useState } from 'react';
import Link from 'next/link';
import { asset } from '@/lib/asset';

export default function GlobalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-10 py-4 md:py-6 z-[100] bg-transparent pointer-events-none">
        
        {/* Left: ARTISUN Primary Logo */}
        <div className="flex items-center pointer-events-auto">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center hover:opacity-85 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={asset('Artisun Primary Logo.png')} 
              alt="ARTISUN" 
              className="h-6 w-auto object-contain"
            />
          </button>

          <Link 
            href="/" 
            className="hidden md:flex items-center hover:opacity-85 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={asset('Artisun Primary Logo.png')} 
              alt="ARTISUN" 
              className="h-8 lg:h-9 w-auto object-contain"
            />
          </Link>
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
            aria-label="Cart"
            className="group bg-[#E8DAC7] hover:bg-[#A52A2C] px-3.5 py-1.5 flex items-center justify-center transition-all duration-200 h-[36px] cursor-pointer"
          >
            <svg className="w-5 h-5 text-[#A52A2C] group-hover:text-[#E8DAC7] transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1.5"></circle>
              <circle cx="20" cy="21" r="1.5"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>



        {/* Mobile Right Cart Button */}
        <div className="md:hidden flex items-center pointer-events-auto">
          <button type="button" aria-label="Cart" className="text-[var(--brand-cream)] hover:opacity-75 transition-opacity p-1">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1.5"></circle>
              <circle cx="20" cy="21" r="1.5"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        data-lenis-prevent="true"
        className={`fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col justify-between p-7 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'
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