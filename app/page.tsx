'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { preloadAll } from '../lib/preloader';
import ScrollProgressBar from '../components/ScrollProgressBar';
import LoadingScreen from '../components/LoadingScreen';
import HeroSection from '../components/HeroSection';
import CustomCursor from '../components/CustomCursor';
import TextRevealSection from '../components/TextRevealSection';
import GlobalHeader from '../components/GlobalHeader';
import ClimateVideoSection from '../components/climate/ClimateVideoSection';
import EarthSection from '../components/EarthSection';
import ProductsSection from '../components/ProductsSection';
import EvolutionSection from '../components/EvolutionSection';
import SuncareShiftSection from '../components/SuncareShiftSection';
import ClothingSection from '../components/ClothingSection';
import SkinProtectionSection from '../components/SkinProtectionSection';
import KeyholeSection from '../components/KeyholeSection';
import CTASection from '../components/CTASection';
import FashionSkinSection from '@/components/FashionSkinSection';
import Footer from '../components/Footer';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  // Mouse Proxy for performance (no react state re-renders on mousemove)
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

  // Real loading progress
  useEffect(() => {
    preloadAll((progress) => setMediaProgress(progress)).catch(console.error);
  }, []);

  // ── Smooth scroll (Lenis) driven by GSAP's single ticker ──
  // The library + CSS were already in place but no instance was ever created, so
  // scrolling ran on the raw native event loop while heavy GSAP scrub animations and
  // canvas render loops competed for the main thread — the source of the jank.
  // Driving Lenis from gsap.ticker means one rAF loop powers smoothing AND ScrollTrigger.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Entrance animations for Hero elements once loading is done
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mobile browsers resize the viewport (innerHeight) as the address bar
    // collapses/expands *during* scroll. ScrollTrigger auto-refreshes on resize by
    // default, which recalculates every viewport-relative pin length (e.g. "+=200%")
    // against the new height — visibly shifting total page height and scroll position
    // mid-scroll. This flag is GSAP's built-in fix for exactly that class of jump.
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (loadingComplete) {
      // Refresh ScrollTrigger to recalculate heights after loading screen goes away
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.getAll().forEach(st => st.refresh());
        });
      });

      // Custom fonts (font-editorial) can swap in after the refresh above,
      // reflowing section heights and leaving every pin's cached start/end
      // position stale — which shows up as a jump right as a section pins.
      // Re-refresh once fonts have actually settled to fix that up.
      document.fonts.ready.then(() => {
        ScrollTrigger.getAll().forEach(st => st.refresh());
      });

      const tl = gsap.timeline();

      // Hero Logo fade in / slight scale
      tl.fromTo('.hero-title',
        { opacity: 0, scale: 0.96, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Hero Subtitle — word by word entrance (Effect 9 adapted, half-intensity)
      // Each word materialises from a slight atmospheric haze — 6 words, 0.09s apart.
      // Calmer and more effortless than the section word reveals.
      // The blur is 3px (not 12px) — a whisper of haze, not a dramatic reveal.
      tl.fromTo('.hero-subtitle-word',
        { opacity: 0, y: 20, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.09,
          duration: 1.0,
          ease: 'power4.out',
        },
        '-=0.6'   // keeps the same overlap with the logo animation as before
      );

      // Top Header (Logo, Bottles, Cart) fade in
      tl.to('.hero-header', {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out'
      }, '-=0.8');

      // Scroll indicator fade in
      tl.to('.scroll-indicator', {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.4');

      // Global Molten Core Gradient Ecosystem Transition
      // 1. Erupt: Immediately push darkness away when scrolling down from the Hero
      // Within the first 800px of scroll, the bright colors expand massively, pushing
      // the dark top gradient completely off-screen, as requested by the user.
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=800",
        scrub: 1.5,
        animation: gsap.to(document.documentElement, {
          '--mc-center': '100%',
          '--mc-pos-1': '20%',    // Bright orange core at the bottom
          '--mc-pos-2': '50%',    // Vibrant red in the middle
          '--mc-pos-3': '110%',   // Dark red extends fully past the top
          '--mc-pos-4': '200%',   // Blackish colors completely pushed away
          '--mc-pos-5': '250%',
          '--mc-pos-6': '300%',
          ease: 'power2.out'
        })
      });

      // 2. Subside: Bring the darkness back only for the Footer
      ScrollTrigger.create({
        trigger: document.body,
        start: "bottom bottom-=800",
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

      // Scroll indicator fades out immediately upon scrolling down
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "+=150", // fades out completely after scrolling 150px
        scrub: true,
        animation: gsap.fromTo('.scroll-indicator',
          { opacity: 1 },
          { opacity: 0, ease: 'none' }
        )
      });
      // ── Hero EXIT: Gravity Pull ──
      // As user scrolls past the hero, content drifts up and fades.
      // The logo and subtitle float away — camera falls into the story.
      ScrollTrigger.create({
        trigger: '.hero-content-inner',
        start: 'top top',
        end: '+=220',
        scrub: 1.5,
        animation: gsap.to('.hero-content-inner', {
          y: -50,
          opacity: 0,
          ease: 'none',
        }),
      });
    }
  }, [loadingComplete]);

  return (
    <main ref={mainRef} className="relative w-full min-h-[100svh] overflow-clip">
      <ScrollProgressBar />

      {/* Global Molten Core Background */}
      <div id="global-bg" className="theme-molten-core" />

      {!loadingComplete && (
        <LoadingScreen progress={mediaProgress} onComplete={() => setLoadingComplete(true)} />
      )}

      <CustomCursor mouseProxy={mouseProxy} />

      <GlobalHeader startHidden />
      <HeroSection mouseProxy={mouseProxy} />

      <TextRevealSection />

      <ClimateVideoSection />
      <EvolutionSection />
      <EarthSection />
      <SuncareShiftSection />
      <ClothingSection />
      <SkinProtectionSection />
      <KeyholeSection />
      <ProductsSection />
      <CTASection />
      <FashionSkinSection />
      <Footer />
    </main>
  );
}
