'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CustomCursor from '@/components/CustomCursor';
import GlobalHeader from '@/components/GlobalHeader';
import OriginHero from '@/components/origin/OriginHero';
import OriginWhy from '@/components/origin/OriginWhy';
import OriginWhere from '@/components/origin/OriginWhere';
import OriginWhatsIn, { FRAME_COUNT, type WhatsInController } from '@/components/origin/OriginWhatsIn';
import OriginProduct from '@/components/origin/OriginProduct';
import OriginQuestions from '@/components/origin/OriginQuestions';
import StickyCartBar from '@/components/origin/StickyCartBar';
import { asset } from '@/lib/asset';

const PANELS = 6;

export default function OriginPage() {
  const mouseProxy = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const whatsInRef = useRef<WhatsInController | null>(null);

  // cursor proxy
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

      // Bottle frame-scrub: synchronized perfectly for Panel 4 (OriginWhatsIn)
      const whatsIn = document.querySelector('#origin-whatsin');
      if (whatsIn) {
        ScrollTrigger.create({
          trigger: whatsIn,
          containerAnimation: tween,
          start: 'left right',
          end: 'center center',
          scrub: true,
          onUpdate: (self) => {
            const ctrl = whatsInRef.current;
            if (!ctrl) return;
            ctrl.draw(self.progress * (FRAME_COUNT - 1));
            ctrl.setReveal(self.progress);
          },
        });
      }

      return () => {
        stRef.current = null;
      };
    });

    // Mobile / tablet
    mm.add('(max-width: 1023px)', () => {
      const whatsIn = document.querySelector('#origin-whatsin');
      if (!whatsIn) return;
      const stFrames = ScrollTrigger.create({
        trigger: whatsIn,
        start: 'top bottom',
        end: 'center center',
        scrub: true,
        onUpdate: (self) => {
          const ctrl = whatsInRef.current;
          if (!ctrl) return;
          ctrl.draw(self.progress * (FRAME_COUNT - 1));
          ctrl.setReveal(self.progress);
        },
      });
      return () => stFrames.kill();
    });

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  /** Jump to a panel from the hero's sidebar list */
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
        1: '#origin-why',
        2: '#origin-where',
        3: '#origin-whatsin',
        4: '#origin-product',
        5: '#origin-questions',
      };
      lenis.scrollTo(map[i] ?? 0, { duration: 1.1, offset: -56 });
    }
  };

  return (
    <main className="relative w-full min-h-[100svh] overflow-clip">
      <ScrollProgressBar marker={asset('/b2.png')} />
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      <style jsx global>{`
        @media (max-width: 1023px) {
          html {
            scroll-snap-type: y proximity;
          }
          .origin-panel {
            scroll-snap-align: start;
          }
        }
        #origin-questions {
          touch-action: pan-y !important;
          overscroll-behavior: contain;
        }
      `}</style>

      {/* ── 6 EXACT ORDERED PANELS ── */}
      <div ref={wrapperRef} className="relative w-full lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row lg:flex-nowrap lg:h-screen will-change-transform"
        >
          {/* 1. Home Section */}
          <OriginHero onNavigate={goToPanel} />

          {/* 2. The most boring step in your morning */}
          <OriginWhy />

          {/* 3. One sunscreen. Every Indian weather. */}
          <OriginWhere />

          {/* 4. The good version of everything. */}
          <OriginWhatsIn ref={whatsInRef} />

          {/* 5. ORIGIN 4-in-1 Milk Emulsion SPF 50+ */}
          <OriginProduct />

          {/* 6. Origin questions everything answered */}
          <OriginQuestions />
        </div>
      </div>

      <StickyCartBar />
    </main>
  );
}