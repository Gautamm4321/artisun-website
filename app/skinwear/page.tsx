'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import GlobalHeader from '../../components/GlobalHeader';
import CustomCursor from '../../components/CustomCursor';
import SkinwearReason from '../../components/skinwear/SkinwearReason';
import MeetSkinwear from '../../components/skinwear/MeetSkinwear';
import AuraJourney from '../../components/skinwear/AuraJourney';
import DedicatedSection from '../../components/skinwear/DedicatedSection';
import SkinwearAltHero from '../../components/skinwear/SkinwearAltHero';
import Footer from '../../components/Footer';
import ScrollProgressBar from '../../components/ScrollProgressBar';

export default function SkinwearPage() {
  const mouseProxy = useRef({ x: 0, y: 0, px: 0, py: 0 });

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
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // For the Skinwear page, we want it to be fully "Molten Core" bright immediately,
    // rather than starting pitch black like the home page intro.
    gsap.set(document.documentElement, {
      '--mc-center': '100%',
      '--mc-pos-1': '20%',
      '--mc-pos-2': '50%',
      '--mc-pos-3': '110%',
      '--mc-pos-4': '200%',
      '--mc-pos-5': '250%',
      '--mc-pos-6': '300%',
    });

    // Subside: Bring the darkness back only for the Footer
    ScrollTrigger.create({
      trigger: document.body,
      start: "bottom bottom-=400",
      end: "bottom bottom",
      scrub: 1.5,
      animation: gsap.to(document.documentElement, {
        '--mc-center': '-10%',
        '--mc-pos-1': '0%',
        '--mc-pos-2': '20%',
        '--mc-pos-3': '40%',
        '--mc-pos-4': '60%',
        '--mc-pos-5': '80%',
        '--mc-pos-6': '100%',
        ease: 'power2.inOut',
      })
    });

    // --- Title Morph Animation ---
    // Wait a brief moment to ensure fonts are rendered and bounding boxes are accurate
    const morphTimer = setTimeout(() => {
      const heroTitle = document.getElementById('skinwear-hero-title');
      const targetWord = document.getElementById('skinwear-target-word');
      const reasonWrapper = document.getElementById('sw-reason-wrapper');
      const heroBg = document.getElementById('sw-alt-hero-bg');

      if (heroTitle && targetWord && reasonWrapper && heroBg) {
        ScrollTrigger.create({
          trigger: reasonWrapper,
          start: 'top bottom', // Start exactly when the second section appears at the bottom of the screen
          end: 'top top',      // Finish exactly when the second section reaches the top of the screen
          scrub: true,
          invalidateOnRefresh: true, // Recalculate on resize
          animation: gsap.timeline()
            // 1. Squeeze and dim the background
            .to(heroBg, { scale: 0.9, opacity: 0.3, ease: 'none', duration: 1 }, 0)
            // 2. Morph the title to its projected final position
            .to(heroTitle, {
              x: () => {
                const tRect = targetWord.getBoundingClientRect();
                const rRect = reasonWrapper.getBoundingClientRect();
                const hRect = heroTitle.getBoundingClientRect();
                const finalLeft = tRect.left - rRect.left;
                return (finalLeft + tRect.width / 2) - (hRect.left + hRect.width / 2);
              },
              y: () => {
                const tRect = targetWord.getBoundingClientRect();
                const rRect = reasonWrapper.getBoundingClientRect();
                const hRect = heroTitle.getBoundingClientRect();
                const finalTop = tRect.top - rRect.top;
                return finalTop - hRect.top;
              },
              scale: () => {
                const tRect = targetWord.getBoundingClientRect();
                const hRect = heroTitle.getBoundingClientRect();
                return tRect.width / hRect.width;
              },
              transformOrigin: '50% 0%', 
              ease: 'none', // Linear ease is crucial for perfect sync with scrolling target
              duration: 1
            }, 0)
            // 3. Seamless handoff at the very end
            .to(heroTitle, { opacity: 0, duration: 0.05 }, 0.95)
            .to(targetWord, { opacity: 1, duration: 0.05 }, 0.95)
        });
      }
    }, 100);

    return () => {
      clearTimeout(morphTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="relative w-full overflow-clip">
      <ScrollProgressBar />

      {/* Molten Core — the brand gradient surface (same as home / about) */}
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      {/* The Aura Pearl bottle — one persistent 3D object that travels the
          whole page, gliding between the empty-space anchors in each section. */}
      <AuraJourney />

      <div className="relative w-full">
        {/* Layer 1: Pinned Alt Hero (Sticky Background) */}
        <div className="sticky top-0 left-0 w-full h-[100svh] z-10 overflow-hidden">
          <SkinwearAltHero />
        </div>

        {/* Layer 2: The Reason Flow (Scrolls over the hero naturally) */}
        <div id="sw-reason-wrapper" className="relative w-full z-20">
          <SkinwearReason />
        </div>
      </div>

      {/* Layer 3: Meet Skinwear — the wardrobe manifesto */}
      <div className="relative w-full z-20">
        <MeetSkinwear />
      </div>

      {/* Layer 4: Dedicated to you — the premium finale (no bottle here) */}
      <div className="relative w-full z-20">
        <DedicatedSection />
      </div>

      <Footer />

      {/* film-grain overlay (matches the reference's noise layer) */}
      <div className="sw-noise pointer-events-none fixed inset-0 z-[3]" aria-hidden />
    </main>
  );
}
