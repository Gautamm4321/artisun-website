'use client';

import { useEffect, useRef } from 'react';
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
import { asset } from '@/lib/asset';

const PANELS = 6;

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
          {/* Exact New Sequence: 1. Dosage -> 2. How it feels -> 3. Where it works -> 4. What's in it -> 5. The specifics */}
          <AuraHero onNavigate={goToPanel} />
          <AuraDosage />
          <AuraTexture />
          <AuraWhere />
          <AuraWhatsIn />
          <AuraStats />
        </div>
      </div>
    </main>
  );
}