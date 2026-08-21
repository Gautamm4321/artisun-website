'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';

const BADGES = ['SPF 40', 'PA++++', 'All Skin Types', 'All Weathers'];

const DETAILS = [
  {
    title: 'WHAT MAKES IT DIFFERENT',
    body: 'Pearls you choose as per the weather — more when it’s dry, fewer when it’s humid.',
  },
  {
    title: 'HOW IT WEARS',
    body: 'Pearls that melt into a fresh gel. A soft, dewy finish, never heavy.',
  },
  {
    title: "WHAT'S INSIDE",
    body: 'Ectoin, Bisabolol and Sodium Hyaluronate',
  },
];

export default function AuraProduct() {
  return (
    <div
      id="aura-product"
      className="aura-panel relative w-screen shrink-0 h-[100svh] overflow-hidden flex flex-col justify-start lg:justify-center pt-[72px] pb-[68px] sm:pt-24 sm:pb-20 lg:py-0 px-4 sm:px-8 lg:px-14"
    >
      {/* Desktop Cutout */}
      <div className="pointer-events-none hidden lg:block absolute right-[-4%] bottom-0 top-[10%] h-[75vh] w-[42%] z-0">
        <Image
          src={asset('/b2.png')}
          alt="Aura bottle"
          fill
          sizes="45vw"
          className="object-contain object-bottom rotate-[9deg] drop-shadow-2xl"
          priority
        />
      </div>

      {/* Main Container */}
      <div
        data-lenis-prevent="true"
        className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col lg:h-full lg:max-h-[86vh] lg:justify-center shrink-0 my-auto"
      >
        {/* Mobile Top Image: Header ke theek neeche well-proportioned */}
        <div className="lg:hidden relative w-full h-[20vh] sm:h-[24vh] max-h-[190px] flex items-center justify-center shrink-0 mb-2">
          <div className="relative h-full w-[45%] max-w-[170px]">
            <Image
              src={asset('/b2.png')}
              alt="Aura bottle"
              fill
              sizes="50vw"
              className="object-contain object-center drop-shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Content Stack: Ek ke baad ek clean continuous flow without extra blank gaps */}
        <div className="w-full max-w-full sm:max-w-[460px] flex flex-col space-y-2 sm:space-y-3 shrink-0">
          
          {/* Title & Badges */}
          <div>
            <h2 className="font-editorial tracking-[-0.02em] leading-[0.86] text-[var(--brand-cream)] text-[34px] sm:text-[44px] lg:text-[clamp(40px,11vw,112px)]">
              AURA
            </h2>

            <div className="flex flex-wrap gap-1 sm:gap-2 mt-1.5 sm:mt-2.5">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="font-suisse text-[8.5px] sm:text-[10.5px] font-medium tracking-wider uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-white/95 backdrop-blur-md bg-white/[0.08] border border-white/20 shadow-sm"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Glass Price Box */}
          <div className="w-full p-2.9 sm:p-3.5 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="font-editorial text-[var(--brand-cream)] text-[18px] sm:text-[22px] leading-none">
                ₹1,799 <span className="font-suisse text-[11px] sm:text-xs text-[var(--brand-cream)]/60">· 50g</span>
              </span>
              <button className="pointer-events-auto font-suisse text-[9.5px] sm:text-xs uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 bg-[var(--brand-cream)] text-[var(--brand-dark,#1a1a1a)] font-medium hover:bg-white transition-colors">
                Add to bag
              </button>
            </div>
            <p className="font-suisse text-[9.5px] sm:text-[11px] text-[var(--brand-cream)]/50 pt-1 border-t border-white/10">
              Free shipping · Delivered in 3–5 days
            </p>
          </div>

          {/* Divided Info Lines */}
          <div className="w-full border-t border-b border-[var(--brand-cream)]/15 divide-y divide-[var(--brand-cream)]/15 shrink-0 pt-0.5 pb-0.5">
            {DETAILS.map((d) => (
              <div key={d.title} className="py-1 sm:py-2">
                <span className="block font-suisse text-[7.5px] sm:text-[9px] tracking-[0.18em] uppercase text-[var(--brand-cream)]/60 font-semibold leading-tight">
                  {d.title}
                </span>
                <p className="font-suisse text-[10px] sm:text-[12px] leading-[1.3] text-[var(--brand-cream)]/90 mt-0.5">
                  {d.body}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Ending Line */}
          <div className="shrink-0 pt-0.5">
            <p className="font-editorial not-italic text-[var(--brand-cream)]/75 text-[14px] sm:text-[18px] tracking-tight">
              What&apos;s your skin wearing today?
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}