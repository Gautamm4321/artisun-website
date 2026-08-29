'use client';

import { asset } from '@/lib/asset';

/**
 * Hero.
 *
 * DESKTOP (lg and up) is the ORIGINAL composition: red gradient + centre glow,
 * nothing else. The big ARTISUN wordmark is drawn by HomeHeader, not here.
 * The model cutout is `lg:hidden` because the original desktop hero had no
 * image at all — restoring "pc alignment from the very old code" means removing
 * her above 1024px, not repositioning her.
 *
 * MOBILE (below lg) keeps the cutout added on 28 Aug: her head and ponytail
 * cross the wordmark, so her face reads through the letterforms. That works
 * because the model is z-[2] — above this section, below the header's z-[100]
 * wordmark. Swap the order and the interlock is gone.
 *
 * Sizing comes from the live-tunable variables in app/globals.css. See TUNING.md.
 *
 * NOT sticky. It used to be `sticky top-0`, but a sticky element only unsticks
 * once its CONTAINING BLOCK scrolls past — and that is <main>, which spans the
 * whole page. So it stayed pinned for the entire scroll and painted over the
 * sections below. That is a bug fix, not an alignment change, so it applies to
 * desktop too.
 */
export default function HeroSection({ ready = false }: { ready?: boolean }) {
  void ready;

  return (
    <section className="relative w-full h-[100svh] overflow-hidden z-[1] flex items-end lg:items-center justify-center bg-[radial-gradient(135%_120%_at_50%_20%,_#E8551E_0%,_#C43612_28%,_#8D180C_60%,_#460905_100%)]">
      {/* Subtle centre glow — original, unchanged */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Model cutout — MOBILE / TABLET ONLY */}
      <div className="lg:hidden absolute inset-x-0 bottom-0 z-[2] flex justify-center pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/hero-model.png')}
          alt="Artisun"
          className="hero-model w-auto max-w-none object-contain object-bottom select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          draggable={false}
        />
      </div>

      {/* Warm floor so the cutout's lower edge dissolves — mobile only */}
      <div
        className="lg:hidden absolute inset-x-0 bottom-0 h-[22%] z-[3] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(70,9,5,0.85) 0%, rgba(120,25,12,0.25) 55%, rgba(120,25,12,0) 100%)',
        }}
      />

      <style jsx>{`
        .hero-model {
          height: auto;
          width: var(--hero-model-w, 96vw);
          transform: translate(var(--hero-model-x, 0%), var(--hero-model-y, 0%));
        }
      `}</style>
    </section>
  );
}
