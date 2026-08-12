'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

export default function StickyCartBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // First panel = the hero. Show the bar only once it's completely out of view
    // (translated off-screen on desktop, scrolled past on mobile).
    const hero = document.querySelector('.origin-panel');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-16 z-[60] lg:hidden bg-[var(--brand-dark)]/85 backdrop-blur-md border-t border-[var(--brand-cream)]/15 transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0 pointer-events-auto' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="h-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-14 flex items-center gap-3 sm:gap-4">
        {/* Thumb + name */}
        <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-[var(--brand-cream)]/15">
          <Image src={asset('/about-media/origin-hero.jpg')} alt="Origin" fill sizes="40px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="font-editorial text-[var(--brand-cream)] text-sm sm:text-base leading-none">ORIGIN</div>
          <div className="hidden sm:block font-suisse text-[10px] uppercase tracking-[0.14em] text-[var(--brand-cream)]/50 mt-1.5">
            4-in-1 Milk Emulsion SPF 50+
          </div>
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2.5 sm:gap-4">
          <span className="font-editorial text-[var(--brand-cream)] text-base sm:text-lg">₹599</span>
          <button className="font-suisse text-[11px] sm:text-sm uppercase tracking-wide px-4 sm:px-7 py-2.5 rounded-full bg-[var(--brand-red)] text-white hover:brightness-110 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
