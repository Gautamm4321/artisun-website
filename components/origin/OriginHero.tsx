'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';
import TagPills from '@/components/pdp/TagPills';
import { usePanelEdgeScroll } from '@/hooks/usePanelEdgeScroll';

const BADGES = ['SPF 50+', 'PA++++', 'All Weathers', '50ml'];

// Four distinct ORIGIN product shots for the gallery.
const GALLERY = [
  '/pdp/origin-1.jpg',
  '/pdp/origin-2.jpg',
  '/pdp/origin-3.jpg',
  '/pdp/origin-4.jpg',
  '/pdp/origin-5.jpg',
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Whole-section vertical scroll (image + copy together) that releases into the
  // horizontal track at the edges. Inert on desktop where everything fits.
  usePanelEdgeScroll(scrollerRef);

  const activeImg = GALLERY[index];
  const prev = () => setIndex((p) => (p - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setIndex((p) => (p + 1) % GALLERY.length);

  return (
    <div className="origin-panel relative w-screen shrink-0 h-[100svh] overflow-hidden">
      {/* Background Radial Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(135% 120% at 50% 20%, #E8551E 0%, #C43612 28%, #8D180C 60%, #460905 100%)',
        }}
      />

      {/* Scroller: on mobile the section scrolls vertically (with room to clear
          the sticky bar); on desktop it's a centred, non-scrolling grid. */}
      <div
        ref={scrollerRef}
        className="panel-scroll lg:overflow-hidden h-full flex flex-col justify-start lg:justify-center pt-[76px] pb-24 sm:pt-24 sm:pb-24 lg:py-0"
      >
        <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] gap-5 sm:gap-6 lg:gap-14 items-center lg:items-stretch my-auto">

          {/* ── TOP ON MOBILE / LEFT ON DESKTOP: Product Visual ── */}
          <div className="order-1 flex flex-col w-full max-w-[360px] lg:max-w-none shrink-0 min-h-0">
            {/* Square frame on every breakpoint. aspect-square drives the height,
                so the old h-[42vh]/lg:h-full pair is gone — with those still in
                place the box stayed viewport-shaped and the ratio never applied. */}
            <div className="relative w-full aspect-square rounded-xl lg:rounded-none overflow-hidden bg-white/[0.03] shadow-2xl">
              <Image
                key={activeImg}
                src={asset(activeImg)}
                alt="Origin 4-in-1 Milk Emulsion"
                fill
                sizes="(max-width: 1024px) 90vw, 50vw"
                priority
                className="object-cover object-center animate-[originHeroFade_0.45s_ease]"
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


          {/* ── BOTTOM ON MOBILE / RIGHT ON DESKTOP: Info & Compact Navigation Copy ── */}
          <div className="order-2 flex flex-col justify-start lg:justify-between w-full max-w-[440px] lg:max-w-none lg:h-full gap-2 sm:gap-2 lg:gap-0 py-0.5 lg:py-1">
            {/* Outlined tag pills — matches your reference */}
            <TagPills tags={BADGES} className="mb-0.5 sm:mb-1 lg:mb-2" />

            {/* Title */}
            <h1 className="font-editorial text-[var(--brand-cream)] text-[21px] sm:text-[26px] lg:text-[36px] leading-[1.1] tracking-tight">
              ORIGIN&nbsp;·&nbsp;4-in-1 Milk Emulsion SPF&nbsp;50+
            </h1>

            {/* Description */}
            <div className="w-full font-suisse text-[var(--brand-cream)]/80 text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.45] sm:leading-[1.5] mt-1 sm:mt-2 space-y-0.5">
              <p className="text-[var(--brand-cream)] font-medium text-[12.5px] sm:text-[13.5px]">
                Four steps, done in one.
              </p>
              <p className="w-full text-left">
                Origin is a milk-light layer sunscreen that does four jobs at once — serum, moisturiser, sunscreen and primer. It goes on weightless, absorbs in seconds, and sits invisibly under everything else.
              </p>
            </div>

            {/* Price + Buy */}
            <div className="flex items-center gap-3 sm:gap-4 my-2 sm:my-3">
              <span className="font-editorial text-[var(--brand-cream)] text-[18px] sm:text-[22px] lg:text-[26px]">₹1499</span>
              <button className="pointer-events-auto font-suisse text-[10px] sm:text-xs uppercase tracking-wide px-4 sm:px-6 py-1.5 sm:py-2.5 bg-[var(--brand-cream)] text-[var(--brand-dark)] hover:bg-white transition-colors font-medium">
                Add to bag
              </button>
            </div>

            <div className="h-px w-full bg-[var(--brand-cream)]/12 mb-0.5 sm:mb-1" />

            {/* Sidebar Navigation */}
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const soon = item.kind === 'link' && item.target === null;

                if (item.kind === 'accordion') {
                  return (
                    <li key={item.n} className="relative border-b border-[var(--brand-cream)]/10">
                      <button
                        onClick={() => setIngredientsOpen((v) => !v)}
                        aria-expanded={ingredientsOpen}
                        className="pointer-events-auto w-full flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2 text-left group"
                      >
                        <span className="font-suisse text-[11.5px] sm:text-[13px] lg:text-[14px] text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)] transition-colors">
                          {item.label}
                        </span>
                        <span className={`ml-auto text-xs text-[var(--brand-cream)]/50 transition-transform duration-300 ${ingredientsOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      {/* The list is inside a vertically-centred flex column, so
                          growing it pushed everything UP and the + slid out from
                          under the cursor. Fixed by taking the expanded copy OUT
                          of flow: it is absolutely positioned below the row, so
                          the row itself never changes height and nothing above it
                          moves. The <li> is `relative` to anchor it. */}
                      <div
                        className={`absolute left-0 right-0 top-full z-20 origin-top transition-[opacity,transform] duration-300 ease-out ${
                          ingredientsOpen
                            ? 'opacity-100 scale-y-100 pointer-events-auto'
                            : 'opacity-0 scale-y-95 pointer-events-none'
                        }`}
                      >
                        <p className="font-suisse text-[11px] sm:text-[12px] leading-[1.5] text-[var(--brand-cream)]/80 bg-black/70 backdrop-blur-md border border-white/12 rounded-lg p-3 max-h-[34vh] overflow-y-auto [scrollbar-width:none]">
                          {FULL_INGREDIENTS}
                        </p>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.n} className="border-b border-[var(--brand-cream)]/10">
                    <button
                      disabled={soon}
                      onClick={() => item.target !== null && onNavigate(item.target)}
                      className={`pointer-events-auto w-full flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2 text-left group ${soon ? 'cursor-default' : ''}`}
                    >
                      <span className={`font-suisse text-[11.5px] sm:text-[13px] lg:text-[14px] transition-colors ${soon ? 'text-[var(--brand-cream)]/35' : 'text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)]'}`}>
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
