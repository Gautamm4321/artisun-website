'use client';
import Link from 'next/link';
import { asset } from '@/lib/asset';

export default function GlobalHeader({ startHidden = false }: { startHidden?: boolean }) {
  return (
    <header
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-6 md:px-12 md:py-8 z-[100] hero-header bg-gradient-to-b from-black/50 to-transparent ${
        startHidden ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100'
      }`}
    >
      
      {/* Left: Monogram Logo */}
      <Link href="/" className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center pointer-events-auto hover:opacity-80 transition-opacity">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={asset('/logo-artisun.svg')} 
          alt="Artisun Icon" 
          className="w-full h-full object-contain"
        />
      </Link>

      {/* Middle: Nav links + product icons */}
      <nav className="flex items-center gap-3 sm:gap-4 md:gap-8 pointer-events-auto">
        <Link href="/climate" className="font-editorial text-[var(--brand-cream)] text-sm md:text-[19px] hover:opacity-70 transition-opacity whitespace-nowrap">Climate-smart</Link>

        <div className="hidden sm:flex items-end gap-[6px] md:gap-2">
          <Link href="/origin" aria-label="Origin" className="hover:scale-110 transition-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/b2.png')} alt="Origin bottle" className="h-6 md:h-8 w-auto object-contain" />
          </Link>
          <Link href="/aura" aria-label="Aura" className="hover:scale-110 transition-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/b1.png')} alt="Aura jar" className="h-4 md:h-[22px] w-auto object-contain mb-[2px]" />
          </Link>
        </div>

        <Link href="/skinwear" className="font-editorial text-[var(--brand-cream)] text-sm md:text-[19px] hover:opacity-70 transition-opacity whitespace-nowrap">Skinwear™</Link>

        <Link href="/about" className="font-editorial text-[var(--brand-cream)] text-sm md:text-[19px] hover:opacity-70 transition-opacity whitespace-nowrap">About</Link>
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
  );
}
