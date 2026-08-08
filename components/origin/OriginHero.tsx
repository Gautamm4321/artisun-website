'use client';

import { useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

const BADGES = ['SPF 50+', 'PA++++', 'Broad spectrum', '50ml'];

const GALLERY = [
  '/about-media/origin-hero.jpg',
  '/about-media/origin-1.jpg',
  '/about-media/origin-3.jpg',
];

const FULL_INGREDIENTS =
  'Aqua, Homosalate, Ethylhexyl Salicylate, Butyl Methoxydibenzoylmethane, ' +
  'Octocrylene, Glycerin, Beta-Glucan, Niacinamide, Dimethicone, ' +
  'Cetearyl Alcohol, Tocopherol, Sodium Hyaluronate, Panthenol, ' +
  'Allantoin, Xanthan Gum, Phenoxyethanol, Fragrance.';

type NavItem = { n: string; label: string; target: number | null; kind: 'link' | 'accordion' };
const NAV_ITEMS: NavItem[] = [
  { n: '01', label: 'Why Origin', target: 1, kind: 'link' },
  { n: '02', label: 'Where it works', target: 2, kind: 'link' },
  { n: '03', label: "What's in it", target: null, kind: 'link' },
  { n: '04', label: 'Some questions', target: null, kind: 'link' },
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
    <div className="origin-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen flex items-start lg:pt-[104px] lg:pb-8">
      <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 pt-24 pb-12 lg:py-0 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-7 lg:gap-14 items-start">
        {/* ── LEFT: gallery ── */}
        <div className="order-1 flex flex-col gap-3">
          {/* Big image — full width of the column, tall */}
          <div className="relative w-full h-[40vh] sm:h-[48vh] lg:h-[calc(100svh-220px)] rounded-[14px] overflow-hidden bg-white/[0.03] border border-[var(--brand-cream)]/10">
            <Image
              key={activeImg}
              src={asset(activeImg)}
              alt="Origin 4-in-1 Milk Emulsion"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
              className="object-cover animate-[originHeroFade_0.45s_ease]"
            />

            {/* Prev / next arrows */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full grid place-items-center bg-black/35 backdrop-blur-md border border-[var(--brand-cream)]/20 text-[var(--brand-cream)] hover:bg-black/60 transition-colors"
            >
              <Chevron dir="left" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full grid place-items-center bg-black/35 backdrop-blur-md border border-[var(--brand-cream)]/20 text-[var(--brand-cream)] hover:bg-black/60 transition-colors"
            >
              <Chevron dir="right" />
            </button>
          </div>

          {/* Thumbnails — horizontal inline row */}
          <div className="flex gap-2.5">
            {GALLERY.map((src, i) => {
              const active = i === index;
              return (
                <button
                  key={src}
                  onClick={() => setIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`pointer-events-auto relative h-16 w-20 sm:h-[72px] sm:w-24 rounded-[10px] overflow-hidden border transition-all duration-300 ${
                    active
                      ? 'border-[var(--brand-cream)] opacity-100'
                      : 'border-[var(--brand-cream)]/20 opacity-55 hover:opacity-90'
                  }`}
                >
                  <Image src={asset(src)} alt="" fill sizes="96px" className="object-cover" />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: info ── */}
        <div className="order-2 flex flex-col">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {BADGES.map((b) => (
              <span
                key={b}
                className="font-suisse text-[11px] sm:text-xs tracking-wide uppercase px-3 py-1.5 rounded-full border border-[var(--brand-cream)]/25 text-[var(--brand-cream)]/85"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-editorial text-[var(--brand-cream)] text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.12] tracking-tight">
            ORIGIN&nbsp;·&nbsp;4-in-1 Milk Emulsion SPF&nbsp;50+
          </h1>

          {/* Description */}
          <p className="font-suisse text-[var(--brand-cream)]/75 text-[15px] sm:text-[16px] leading-[1.55] mt-3.5 max-w-[46ch]">
            <span className="text-[var(--brand-cream)] font-medium">Four steps, done in one. </span>
            Origin is a milk-light layer sunscreen that does four jobs at once — serum,
            moisturiser, sunscreen and primer. It goes on weightless, absorbs in seconds,
            and sits invisibly under everything else.
          </p>

          {/* Price + buy */}
          <div className="flex items-center gap-5 mt-6">
            <span className="font-editorial text-[var(--brand-cream)] text-[26px] sm:text-[30px]">₹599</span>
            <button className="pointer-events-auto font-suisse text-sm tracking-wide uppercase px-7 py-3.5 rounded-full bg-[var(--brand-cream)] text-[var(--brand-dark)] hover:bg-white transition-colors">
              Add to bag
            </button>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[var(--brand-cream)]/12 mt-6 mb-0.5" />

          {/* Sidebar list */}
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const soon = item.kind === 'link' && item.target === null;

              if (item.kind === 'accordion') {
                return (
                  <li key={item.n} className="border-b border-[var(--brand-cream)]/10">
                    <button
                      onClick={() => setIngredientsOpen((v) => !v)}
                      aria-expanded={ingredientsOpen}
                      className="pointer-events-auto w-full flex items-center gap-4 py-3 text-left group"
                    >
                      <span className="font-suisse text-xs text-[var(--brand-cream)]/40 tabular-nums">{item.n}</span>
                      <span className="font-suisse text-[15px] sm:text-base text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)] transition-colors">
                        {item.label}
                      </span>
                      <span className={`ml-auto text-[var(--brand-cream)]/50 transition-transform duration-300 ${ingredientsOpen ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-[400ms] ease-out ${ingredientsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="font-suisse text-[13px] leading-[1.6] text-[var(--brand-cream)]/60 pl-8 pb-4 pr-2">{FULL_INGREDIENTS}</p>
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
                    className={`pointer-events-auto w-full flex items-center gap-4 py-3 text-left group ${soon ? 'cursor-default' : ''}`}
                  >
                    <span className="font-suisse text-xs text-[var(--brand-cream)]/40 tabular-nums">{item.n}</span>
                    <span className={`font-suisse text-[15px] sm:text-base transition-colors ${soon ? 'text-[var(--brand-cream)]/35' : 'text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)]'}`}>
                      {item.label}
                    </span>
                    {soon ? (
                      <span className="ml-auto font-suisse text-[10px] uppercase tracking-wider text-[var(--brand-cream)]/30 border border-[var(--brand-cream)]/15 rounded-full px-2 py-0.5">Soon</span>
                    ) : (
                      <span className="ml-auto text-[var(--brand-cream)]/40 group-hover:text-[var(--brand-cream)] group-hover:translate-x-1 transition-all duration-300">→</span>
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
