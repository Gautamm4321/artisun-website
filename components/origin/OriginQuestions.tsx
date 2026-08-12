'use client';

import { useState } from 'react';

/* PLACEHOLDER FAQ COPY — swap for your real questions/answers. */
type QA = { q: string; a: string };
type Category = { label: string; items: QA[] };

const CATEGORIES: Category[] = [
  {
    label: 'Using Origin',
    items: [
      { q: 'Does Origin replace my whole morning routine?', a: 'Yes — one light layer does the work of a serum, moisturiser, sunscreen and primer, so you can skip the four-step stack.' },
      { q: 'How much should I apply?', a: 'Two finger-lengths for the face and neck, smoothed in until it disappears. Reapply through the day if you are in direct sun.' },
      { q: 'Can I wear makeup over it?', a: 'Absolutely. Origin doubles as a primer, so foundation and concealer grip to it with no pilling or slide.' },
    ],
  },
  {
    label: 'Skin Types',
    items: [
      { q: 'Is Origin okay for oily or acne-prone skin?', a: 'Yes. The milk-light texture absorbs in seconds and is formulated to sit weightless without clogging pores.' },
      { q: 'Will it work on dry or sensitive skin?', a: 'Beta-Glucan and 72-hour moisture support the barrier, so dry and sensitive skin stay comfortable all day.' },
      { q: 'Is it non-comedogenic?', a: 'It is designed to be non-comedogenic and fragrance-conscious. Patch test first if your skin is highly reactive.' },
    ],
  },
  {
    label: 'Protection',
    items: [
      { q: 'What does SPF 50+ PA++++ protect against?', a: 'SPF 50+ blocks ~98% of UVB, and PA++++ is the highest UVA rating — full broad-spectrum daily defence.' },
      { q: 'Do I need to reapply?', a: 'For everyday indoor life, one morning layer holds. On beach or high-sun days, reapply every two hours.' },
      { q: 'Is it broad spectrum?', a: 'Yes — Origin shields against both UVA and UVB, tested to protect across Indian weather and light conditions.' },
    ],
  },
  {
    label: 'Shipping',
    items: [
      { q: 'How long does delivery take?', a: 'Orders are delivered in 3–5 business days across India, with tracking shared as soon as it ships.' },
      { q: 'Do you offer free shipping?', a: 'Yes, shipping is free on every order — no minimum cart value required.' },
      { q: 'What is your return policy?', a: 'Unopened Origin can be returned within 14 days of delivery for a full refund. Reach out and we will sort it.' },
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function OriginQuestions() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  const items = CATEGORIES[tab].items;

  return (
    <div
      id="origin-questions"
      className="origin-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen flex items-center"
    >
      <div className="w-full max-w-[900px] mx-auto px-5 sm:px-8 lg:px-14 pt-24 lg:pt-[104px] pb-10 flex flex-col">
        {/* Eyebrow + heading */}
        <span className="self-center font-suisse text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[var(--brand-red)]">
          Curious minds
        </span>
        <h2 className="self-center font-editorial text-[var(--brand-cream)] text-[30px] sm:text-[42px] lg:text-[52px] leading-tight mt-3 text-center">
          Frequently Asked{' '}
          <em className="italic bg-gradient-to-r from-[var(--brand-cream)] to-[var(--brand-cream)]/25 bg-clip-text text-transparent">
            Questions
          </em>
        </h2>

        {/* Category tabs */}
        <div className="mt-8 lg:mt-10 border-t border-b border-[var(--brand-cream)]/15">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-9 py-3.5">
            {CATEGORIES.map((c, i) => {
              const active = i === tab;
              return (
                <button
                  key={c.label}
                  onClick={() => { setTab(i); setOpen(0); }}
                  className={`pointer-events-auto flex items-center gap-2 font-suisse text-[11px] sm:text-[13px] tracking-[0.14em] uppercase transition-colors ${
                    active ? 'text-[var(--brand-cream)]' : 'text-[var(--brand-cream)]/45 hover:text-[var(--brand-cream)]/80'
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-red)]" />}
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion */}
        <div className="mt-2">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-[var(--brand-cream)]/12">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="pointer-events-auto w-full flex items-center gap-4 py-4 sm:py-5 text-left text-[var(--brand-cream)]"
                >
                  <span className="font-suisse text-[13px] sm:text-[15px] tracking-[0.06em] uppercase flex-1">
                    {item.q}
                  </span>
                  <Chevron open={isOpen} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-[400ms] ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="font-suisse text-[14px] sm:text-[15px] leading-[1.6] text-[var(--brand-cream)]/65 pb-5 pr-8 max-w-[62ch]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <button className="pointer-events-auto self-center mt-8 font-suisse text-[13px] tracking-wide uppercase px-8 py-3 rounded-full border border-[var(--brand-cream)]/30 text-[var(--brand-cream)]/90 hover:bg-[var(--brand-cream)] hover:text-[var(--brand-dark)] transition-colors">
          View All
        </button>
      </div>
    </div>
  );
}
