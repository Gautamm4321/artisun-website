'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CustomCursor from '@/components/CustomCursor';
import GlobalHeader from '@/components/GlobalHeader';
import AuraHero from '@/components/aura/AuraHero';
import AuraDosage from '@/components/aura/AuraDosage';
import AuraTexture from '@/components/aura/AuraTexture';
import AuraWhere from '@/components/aura/AuraWhere';
import AuraWhatsIn from '@/components/aura/AuraWhatsIn';
import AuraStats from '@/components/aura/AuraStats';
import AuraQuestions from '@/components/aura/AuraQuestions';
import AuraStickyCartBar from '@/components/aura/AuraStickyCartBar';
import { asset } from '@/lib/asset';

const PANELS = 8;

// ── Naya Aura Product Section ──
function AuraProduct() {
  return (
    <div
      id="aura-product"
      className="aura-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden"
    >
      {/* Product cutout */}
      <div className="pointer-events-none absolute right-[-6%] sm:right-0 bottom-0 top-[16%] sm:top-[12%] w-[62%] sm:w-[48%] lg:w-[40%]">
        <Image
          src={asset('/b2.png')}
          alt="Aura bottle"
          fill
          sizes="(max-width: 1024px) 60vw, 40vw"
          className="object-contain object-bottom rotate-[9deg] drop-shadow-2xl"
        />
      </div>

      {/* Content wrapper with direct 90px bottom padding */}
      <div
        className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 pt-24 lg:pt-[104px] flex flex-col justify-between"
        style={{ paddingBottom: '90px' }}
      >
        {/* Top: Wordmark + Subtitle */}
        <div>
          <h2 className="font-editorial tracking-[-0.02em] leading-[0.86] text-[var(--brand-cream)] text-[clamp(66px,14vw,168px)]">
            AURA
          </h2>
          <p className="font-suisse text-[var(--brand-cream)]/75 text-[15px] sm:text-[18px] mt-2 lg:mt-3">
            Aura · Pearl Skinwear SPF 40 · PA+++ · Broad spectrum · 50ml
          </p>
        </div>

        {/* Middle: Pricing & Buy Action */}
        <div className="my-auto py-4 max-w-[36ch]">
          <p className="font-suisse text-[var(--brand-cream)] text-[18px] sm:text-[20px] font-medium">
            <span className="font-bold">₹1,799</span> —{' '}
            <button className="pointer-events-auto underline underline-offset-4 decoration-1 hover:text-[var(--brand-red)] transition-colors">
              [ Add to bag ]
            </button>{' '}
            ·{' '}
            <button className="pointer-events-auto underline underline-offset-4 decoration-1 hover:text-[var(--brand-red)] transition-colors">
              [ Buy now ]
            </button>
          </p>
          <p className="font-suisse text-[var(--brand-cream)]/50 text-[13px] sm:text-sm mt-2">
            Free shipping · Delivered in 3 days
          </p>
        </div>

        {/* Bottom Statements — Exact 3-line format */}
        <div className="mt-auto" style={{ maxWidth: '440px', paddingBottom: '20px' }}>
          <h3
            className="font-editorial text-[var(--brand-cream)] tracking-tight"
            style={{
              fontSize: 'clamp(26px, 3.4vw, 40px)',
              lineHeight: '1.15',
              whiteSpace: 'normal'
            }}
          >
            Some sunscreen you use.<br />
            This one you’ll<br />
            reach for.
          </h3>
          <p
            className="font-editorial italic text-[var(--brand-cream)]/70 mt-4"
            style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}
          >
            What’s your skin wearing today?
          </p>
        </div>

      </div>
    </div>
  );
}

export default function AuraPage() {
  const mouseProxy = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseProxy.current.px = e.clientX;
      mouseProxy.current.py = e.clientY;
      mouseProxy.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseProxy.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    gsap.set(document.documentElement, {
      '--mc-center': '100%',
      '--mc-pos-1': '20%',
      '--mc-pos-2': '50%',
      '--mc-pos-3': '110%',
      '--mc-pos-4': '200%',
      '--mc-pos-5': '250%',
      '--mc-pos-6': '300%',
    });

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => '+=' + getScrollAmount(),
        pin: true,
        scrub: 1,
        animation: tween,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (PANELS - 1),
          duration: { min: 0.2, max: 0.55 },
          ease: 'power2.inOut',
          delay: 0.06,
        },
      });
      stRef.current = st;

      return () => {
        stRef.current = null;
      };
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const goToPanel = (i: number) => {
    const lenis = lenisRef.current;
    const st = stRef.current;
    if (!lenis) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (isDesktop && st) {
      const target = st.start + (i / (PANELS - 1)) * (st.end - st.start);
      lenis.scrollTo(target, { duration: 1.3 });
    } else {
      const map: Record<number, number | string> = {
        0: 0,
        1: '#aura-dosage',
        2: '#aura-texture',
        3: '#aura-where',
        4: '#aura-whatsin',
        5: '#aura-stats',
        6: '#aura-product',
        7: '#aura-questions',
      };
      lenis.scrollTo(map[i] ?? 0, { duration: 1.1, offset: -56 });
    }
  };

  return (
    <main className="relative w-full min-h-[100svh] overflow-clip">
      <ScrollProgressBar marker={asset('/about-media/aura-1.jpg')} />
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      <style jsx global>{`
        @media (max-width: 1023px) {
          html {
            scroll-snap-type: y proximity;
          }
          .aura-panel {
            scroll-snap-align: start;
          }
        }
      `}</style>

      <div ref={wrapperRef} className="relative w-full lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row lg:flex-nowrap lg:h-screen will-change-transform"
        >
          <AuraHero onNavigate={goToPanel} />
          <AuraDosage />
          <AuraTexture />
          <AuraWhere />
          <AuraWhatsIn />
          <AuraStats />
          <AuraProduct />
          <AuraQuestions />
        </div>
      </div>
      <AuraStickyCartBar />
    </main>
  );
}