'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';
import { usePanelEdgeScroll } from '@/hooks/usePanelEdgeScroll';

const BADGES = ['SPF 40', 'PA++++', 'All weathers', '50g'];

// Four distinct AURA product shots for the gallery.
const GALLERY = [
  '/about-media/aura-1.jpg',
  '/about-media/aura-2.jpg',
  '/about-media/aura-3.jpg',
  '/artisun1_page-0001.jpg',
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
  { n: '01', label: 'How to wear', target: 1, kind: 'link' },       // AuraDosage
  { n: '02', label: 'How it feels', target: 2, kind: 'link' },      // AuraTexture
  { n: '03', label: 'Where it works', target: 3, kind: 'link' },    // AuraWhere
  { n: '04', label: "What's in it", target: 4, kind: 'link' },      // AuraWhatsIn
  { n: '05', label: 'The specifics', target: 5, kind: 'link' },     // AuraStats
  { n: '06', label: 'Product buy', target: 6, kind: 'link' },       // AuraProduct
  { n: '07', label: 'Questions', target: 7, kind: 'link' },         // AuraQuestions
  { n: '08', label: 'Full ingredient list', target: null, kind: 'accordion' },
];

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

export default function AuraHero({ onNavigate }: { onNavigate: (panelIndex: number) => void }) {
  const [index, setIndex] = useState(0);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Whole section (image + copy) scrolls vertically, then releases into the
  // horizontal track — the image is no longer pinned while only the text moves.
  usePanelEdgeScroll(scrollerRef);

  const activeImg = GALLERY[index];
  const prev = () => setIndex((p) => (p - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setIndex((p) => (p + 1) % GALLERY.length);

  return (
    <div className="aura-panel relative w-screen shrink-0 h-[100svh] overflow-hidden">
      {/* Background Radial Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
        }}
      />

      <div
        ref={scrollerRef}
        className="panel-scroll lg:overflow-hidden h-full flex flex-col justify-start lg:justify-center pt-[76px] pb-24 sm:pt-24 sm:pb-24 lg:py-0"
      >
        <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] gap-5 sm:gap-6 lg:gap-14 items-center lg:items-stretch my-auto">

          {/* ── IMAGE: matches Origin hero sizing (top on mobile / left on desktop) ── */}
          <div className="order-1 flex flex-col h-[42vh] max-h-[400px] lg:h-full lg:max-h-none w-full max-w-[360px] lg:max-w-none shrink-0 min-h-0">
            <div className="relative w-full h-full rounded-xl lg:rounded-none overflow-hidden bg-white/[0.03] shadow-2xl">
              <Image
                key={activeImg}
                src={asset(activeImg)}
                alt="Aura Pearl Skinwear"
                fill
                sizes="(max-width: 1024px) 90vw, 50vw"
                priority
                className="object-cover object-center animate-[auraHeroFade_0.45s_ease]"
              />

              {/* Thumbnails */}
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {GALLERY.map((src, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={`${src}-${i}`}
                      onClick={() => setIndex(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`pointer-events-auto relative h-9 w-9 sm:h-11 sm:w-11 overflow-hidden rounded-md border transition-all duration-300 ${active
                        ? 'opacity-100 border-white/70'
                        : 'opacity-50 hover:opacity-80 border-white/20'
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
                className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full grid place-items-center bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/70 transition-all duration-300"
              >
                <Chevron dir="left" />
              </button>

              <button
                onClick={next}
                aria-label="Next image"
                className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full grid place-items-center bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/70 transition-all duration-300"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>

          {/* ── CONTENT: right on desktop / bottom on mobile (scrolls with the image) ── */}
          <div className="order-2 flex flex-col justify-start lg:justify-between w-full max-w-[580px] lg:max-w-none lg:h-full gap-2 sm:gap-2.5 lg:gap-0 py-0.5 lg:py-1">

            {/* Liquid Glass Badges */}
            <div className="flex flex-wrap gap-2 mb-0.5 sm:mb-1 lg:mb-2">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="font-suisse text-[9px] sm:text-[11px] font-medium tracking-wider uppercase px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-white/95 backdrop-blur-md bg-white/[0.08] border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.25)] transition-all"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-editorial text-[var(--brand-cream)] text-[21px] sm:text-[30px] lg:text-[36px] leading-[1.1] tracking-tight">
              AURA&nbsp;·&nbsp;Pearl Skinwear SPF&nbsp;40
            </h1>

            {/* Description */}
            <div className="font-suisse text-[var(--brand-cream)]/80 text-[12px] sm:text-[14px] leading-[1.5] sm:leading-[1.6] mt-1 sm:mt-2 space-y-1 w-full max-w-[500px]">
              <p className="text-[var(--brand-cream)] font-medium">
                Pearls that melt into sun protection.
              </p>
              <p>
                Beads that break on your skin and sink in. No white cast. A soft, dewy finish. Every skin tone, every Indian weather. Easiest absorption ever.
              </p>
            </div>

            {/* Price + Buy */}
            <div className="flex items-center gap-3 sm:gap-4 my-2 sm:my-3">
              <span className="font-editorial text-[var(--brand-cream)] text-[18px] sm:text-[26px]">₹1,799</span>
              <button className="pointer-events-auto font-suisse text-[10px] sm:text-sm tracking-wide uppercase px-4 sm:px-6 py-1.5 sm:py-2.5 bg-[var(--brand-cream)] text-[var(--brand-dark)] hover:bg-white transition-colors font-medium">
                Add to bag
              </button>
            </div>

            <div className="h-px w-full bg-[var(--brand-cream)]/12 mb-0.5 sm:mb-1" />

            {/* Sidebar Navigation */}
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                if (item.kind === 'accordion') {
                  return (
                    <li key={item.n} className="border-b border-[var(--brand-cream)]/10">
                      <button
                        onClick={() => setIngredientsOpen((v) => !v)}
                        aria-expanded={ingredientsOpen}
                        className="pointer-events-auto w-full flex items-center gap-3 py-1.5 sm:py-2 text-left group"
                      >
                        <span className="font-suisse text-[11.5px] sm:text-[13px] lg:text-[14px] text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)] transition-colors">
                          {item.label}
                        </span>
                        <span className={`ml-auto text-xs text-[var(--brand-cream)]/50 transition-transform duration-300 ${ingredientsOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      <div className={`grid transition-[grid-template-rows] duration-[300ms] ease-out ${ingredientsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                          <p className="font-suisse text-[11px] sm:text-[12px] leading-[1.5] text-[var(--brand-cream)]/70 pb-3 pr-1">{FULL_INGREDIENTS}</p>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.n} className="border-b border-[var(--brand-cream)]/10">
                    <button
                      onClick={() => item.target !== null && onNavigate(item.target)}
                      className="pointer-events-auto w-full flex items-center gap-3 py-1.5 sm:py-2 text-left group"
                    >
                      <span className="font-suisse text-[11.5px] sm:text-[13px] lg:text-[14px] text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)] transition-colors">
                        {item.label}
                      </span>
                      <span className="ml-auto text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes auraHeroFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
