'use client';

import { useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

const BADGES = ['SPF 50+', 'PA++++', 'All Weathers', '50ml'];

const GALLERY = [
  '/about-media/origin-hero.jpg',
  '/about-media/origin-1.jpg',
  '/about-media/origin-3.jpg',
];

const FULL_INGREDIENTS =
  'Water, Ethylhexyl Methoxycinnamate, Propylene Glycol, Ethylhexyl Salicylate, ' +
  'Glycerin, C13-15 Alkane, Betaine, Camellia Sinensis Leaf Extract, Beta-Glucan, ' +
  'Bisabolol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Cetearyl Alcohol, ' +
  'Ceteareth-25, Lauric/Myristic/Palmitic/Stearic Glycerides, C14-22 Alcohols, ' +
  'Magnesium Aluminometasilicate, Palmitic Acid, Glyceryl Stearate, Stearic Acid, ' +
  'C12-20 Alkyl Glucoside, Xanthan Gum, Fragrance, Caprylhydroxamic Acid, Glyceryl Caprylate.';

type NavItem = { n: string; label: string; target: number | null; kind: 'link' | 'accordion' };
const NAV_ITEMS: NavItem[] = [
  { n: '01', label: 'Why Origin', target: 1, kind: 'link' },
  { n: '02', label: 'Where it works', target: 2, kind: 'link' },
  { n: '03', label: "What's in it", target: 3, kind: 'link' },
  { n: '04', label: 'Questions', target: 5, kind: 'link' },
  { n: '05', label: 'Full ingredient list', target: null, kind: 'accordion' },
];

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

export default function OriginHero({ onNavigate }: { onNavigate: (panelIndex: number) => void }) {
  const [index, setIndex] = useState(0);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);

  const activeImg = GALLERY[index];
  const prev = () => setIndex((p) => (p - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setIndex((p) => (p + 1) % GALLERY.length);

  return (
    <div className="origin-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen flex items-center justify-center pt-20 pb-8 lg:py-0">
      <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-12 items-stretch my-auto">

        {/* ── LEFT: Matches Right Content Height Pixel to Pixel ── */}
        <div className="order-1 flex flex-col h-full min-h-[380px] sm:min-h-[460px] lg:min-h-0">
          <div className="relative w-full h-full min-h-full overflow-hidden bg-white/[0.03] shadow-2xl">
            <Image
              key={activeImg}
              src={asset(activeImg)}
              alt="Origin 4-in-1 Milk Emulsion"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover animate-[originHeroFade_0.45s_ease]"
            />

            {/* Thumbnails */}
            <div className="absolute top-3 left-3 z-10 flex gap-2">
              {GALLERY.map((src, i) => {
                const active = i === index;
                return (
                  <button
                    key={src}
                    onClick={() => setIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`pointer-events-auto relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden transition-all duration-300 ${active
                      ? 'opacity-100'
                      : 'opacity-50 hover:opacity-80'
                      }`}
                  >
                    <Image src={asset(src)} alt="" fill sizes="48px" className="object-cover" />
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full grid place-items-center bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all duration-300"
            >
              <Chevron dir="left" />
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full grid place-items-center bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all duration-300"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        {/* ── RIGHT: Info & Compact Navigation Copy ── */}
        <div className="order-2 flex flex-col justify-between h-full py-1">
          {/* Liquid Glass Badges */}
          <div className="flex flex-wrap gap-2 mb-2.5">
            {BADGES.map((b) => (
              <span
                key={b}
                className="font-suisse text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-3.5 py-1 rounded-full text-white/95 backdrop-blur-md bg-white/[0.08] border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.25)] transition-all"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-editorial text-[var(--brand-cream)] text-[24px] sm:text-[30px] lg:text-[36px] leading-[1.1] tracking-tight">
            ORIGIN&nbsp;·&nbsp;4-in-1 Milk Emulsion SPF&nbsp;50+
          </h1>

          {/* Description */}
          <div className="w-full font-suisse text-[var(--brand-cream)]/80 text-[13px] sm:text-[14px] leading-[1.6] mt-2 space-y-1">
            <p className="text-[var(--brand-cream)] font-medium">
              Four steps, done in one.
            </p>
            <p className="w-full text-justify [text-justify:inter-word] sm:text-left">
              Origin is a milk-light layer sunscreen that does four jobs at once — serum, moisturiser, <br/> sunscreen and primer. It goes on weightless, absorbs in seconds, and sits invisibly <br/> under everything else.
            </p>
          </div>

          {/* Price + Buy */}
          <div className="flex items-center gap-4 mt-3 mb-3">
            <span className="font-editorial text-[var(--brand-cream)] text-[22px] sm:text-[26px]">₹1499</span>
            <button className="pointer-events-auto font-suisse text-xs sm:text-sm tracking-wide uppercase px-6 py-2.5 bg-[var(--brand-cream)] text-[var(--brand-dark)] hover:bg-white transition-colors font-medium">
              Add to bag
            </button>
          </div>

          <div className="h-px w-full bg-[var(--brand-cream)]/12 mb-1" />

          {/* Sidebar Navigation */}
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const soon = item.kind === 'link' && item.target === null;

              if (item.kind === 'accordion') {
                return (
                  <li key={item.n} className="border-b border-[var(--brand-cream)]/10">
                    <button
                      onClick={() => setIngredientsOpen((v) => !v)}
                      aria-expanded={ingredientsOpen}
                      className="pointer-events-auto w-full flex items-center gap-3 py-2 text-left group"
                    >
                      <span className="font-suisse text-[13px] sm:text-[14px] text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)] transition-colors">
                        {item.label}
                      </span>
                      <span className={`ml-auto text-xs text-[var(--brand-cream)]/50 transition-transform duration-300 ${ingredientsOpen ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-[300ms] ease-out ${ingredientsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="font-suisse text-[11px] sm:text-[12px] leading-[1.45] text-[var(--brand-cream)]/70 pb-2 pr-1">{FULL_INGREDIENTS}</p>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.n} className="border-b border-[var(--brand-cream)]/10">
                  <button
                    disabled={soon}
                    onClick={() => item.target !== null && onNavigate(item.target)}
                    className={`pointer-events-auto w-full flex items-center gap-3 py-2 text-left group ${soon ? 'cursor-default' : ''}`}
                  >
                    <span className={`font-suisse text-[13px] sm:text-[14px] transition-colors ${soon ? 'text-[var(--brand-cream)]/35' : 'text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)]'}`}>
                      {item.label}
                    </span>
                    {soon ? (
                      <span className="ml-auto font-suisse text-[10px] uppercase tracking-wider text-[var(--brand-cream)]/30 border border-[var(--brand-cream)]/15 rounded-full px-2 py-0.5">Soon</span>
                    ) : (
                      <span className="ml-auto text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style jsx global>{`
        @keyframes originHeroFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}