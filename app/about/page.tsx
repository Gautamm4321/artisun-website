'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollProgressBar from '../../components/ScrollProgressBar';
import CustomCursor from '../../components/CustomCursor';
import GlobalHeader from '../../components/GlobalHeader';
import Footer from '../../components/Footer';
import EmberField from '../../components/about/EmberField';
import PerspectiveFocus from '../../components/about/PerspectiveFocus';
import JourneyRoad from '../../components/about/JourneyRoad';

/* ── Content (verbatim) ─────────────────────────────────────────────── */

const HERO_SUB =
  'Artisun is an Indian sun-care house, built around the sun and the way we live with it. We make Skinwear — wearable layers that protect, hydrate, and move with the day. For the Indian skin. For the Indian climate.';

function Rise({
  children,
  className = '',
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
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

    // Make the About page fully "Molten Core" bright immediately
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
      start: 'bottom bottom-=400',
      end: 'bottom bottom',
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
      }),
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const heroChild = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <main className="relative w-full min-h-[100svh] overflow-clip">
      <ScrollProgressBar />

      {/* Molten Core — the brand gradient surface */}
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      {/* ── SECTION 1 — HERO ───────────────────────────────────────────── */}
      <section className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-40 pb-32 overflow-hidden">
        <EmberField />

        {/* glowing sun emblem (constellation analog) */}
        <motion.div {...heroChild(0)} className="relative mb-14 h-32 w-32">
          <div
            className="absolute inset-0 rounded-full blur-[32px]"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,186,96,0.6), rgba(232,96,26,0.22) 60%, transparent 80%)',
            }}
          />
          <div
            className="absolute inset-[32%] rounded-full"
            style={{
              background: 'radial-gradient(circle at 50% 38%, #FFE9C6, #F2A65C 52%, #C9401A)',
              boxShadow: '0 0 50px rgba(242,166,92,0.6)',
            }}
          />
        </motion.div>

        <motion.h1
          {...heroChild(0.12)}
          className="about-shine font-editorial leading-[0.96] tracking-[-0.02em] text-[clamp(3.6rem,10vw,8.5rem)]"
        >
          About Artisun
        </motion.h1>

        <motion.p
          {...heroChild(0.24)}
          className="relative z-10 mt-12 font-editorial tracking-wide text-[var(--brand-cream)]/60 text-lg md:text-[22px] leading-[1.6] max-w-[52ch]"
        >
          {HERO_SUB}
        </motion.p>

        {/* scroll cue (icon only) */}
        <motion.div {...heroChild(0.4)} className="mt-20 text-[var(--brand-cream)]/30">
          <motion.svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </motion.div>
      </section>

      {/* ── SECTION 2 — ARTISUN PERSPECTIVE (paper reader) ─────────────── */}
      <section className="relative z-10">
        <Rise className="relative z-10 text-center pt-36 md:pt-48 pb-10">
          <h2 className="about-shine font-editorial leading-[1.0] tracking-[-0.02em] text-[clamp(2.8rem,6.4vw,5.5rem)]">
            Artisun perspective
          </h2>
        </Rise>

        <PerspectiveFocus />
      </section>

      {/* ── SECTION 3 — IN YEARS TO COME (Journey Road) ───────────────── */}
      <section className="relative z-10 px-4 py-24 md:py-36 text-center">
        <Rise>
          <h2 className="about-shine font-editorial leading-[1.0] tracking-[-0.02em] text-[clamp(2.8rem,6.4vw,5.5rem)]">
            In years to come..
          </h2>
        </Rise>

        <JourneyRoad />

        {/* CTA Button */}
        <div className="-mt-4 pb-32 flex justify-center relative z-20">
          <a 
            href="/shop"
            className="group relative flex items-center justify-center px-10 py-4 md:px-14 md:py-5 bg-[#C02D19] border border-[#E8601A]/30 text-[var(--brand-cream)] font-suisse uppercase tracking-[0.2em] text-xs md:text-[13px] font-medium rounded-full overflow-hidden transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(192,45,25,0.5)] whitespace-nowrap"
          >
            <span className="relative z-10">Find your dailywear</span>
            <div className="absolute inset-0 bg-[#A52A2C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
