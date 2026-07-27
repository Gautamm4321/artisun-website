'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollProgressBar from '../../components/ScrollProgressBar';
import CustomCursor from '../../components/CustomCursor';
import GlobalHeader from '../../components/GlobalHeader';
import Footer from '../../components/Footer';
import AboutHero from '../../components/about/AboutHero';
import ProductScrollStory, { type StoryParagraph } from '../../components/about/ProductScrollStory';
import FutureShowcase from '../../components/about/FutureShowcase';

/* ── The Artisun perspective, split across the two products ─────────────── */
const ORIGIN_PARAS: StoryParagraph[] = [
  {
    text:
      'Artisun was born out of refusal. After years of experiencing disconnect with every sunscreen it tried, it refused. ',
  },
  {
    text:
      'It refused to let sun care sit as an afterthought in a long lineup of beauty products. It refused to treat sunscreen as an occasional use when it should have been the foundation of every morning.It refused formulas built around skin type alone, with no consideration for the climate the skin lives in.',

  },
  {
    text:
      'So Artisun came forward. Not to add another sunscreen to a crowded shelf,But to do something the category had never quite done — ',
    em: 'Take Indian sun protection seriously.',
  },
];

const AURA_PARAS: StoryParagraph[] = [
  {
    text:
      'To formulate for the humidity of Mumbai’s monsoon. To stand up to the heat of  Chennai’s afternoon. To hold its ground through the pollution of Delhi’s evening.',
  },
  {
    text:
      'Because the Indian sun is anything but forgiving. What pays the price is skin left unprotected — pigmentation that darkens slowly, fine lines that arrive earlier than they should, skin tone that loses its evenness across the year, damage that doesn’t show today but compounds over time.',
  },

];

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

    // Same molten background as the home page — bright through the whole page,
    // darkening only as the footer arrives.
    gsap.set(document.documentElement, {
      '--mc-center': '100%',
      '--mc-pos-1': '20%',
      '--mc-pos-2': '50%',
      '--mc-pos-3': '110%',
      '--mc-pos-4': '200%',
      '--mc-pos-5': '250%',
      '--mc-pos-6': '300%',
    });

    ScrollTrigger.create({
      trigger: document.body,
      start: 'bottom bottom-=500',
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
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className="relative w-full min-h-[100svh] overflow-clip">
      <ScrollProgressBar />

      {/* Molten Core — the brand gradient surface (same as home) */}
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      {/* 1 — HERO: revolving Origin bottle over the ARTISUN wordmark */}
      <AboutHero />

      {/* 2 — THE ARTISUN PERSPECTIVE */}
      <section className="relative z-16 w-full px-6 md:px-16 lg:px-24 pt-12 pb-8 mx-auto overflow-hidden flex flex-col items-center justify-center">
        <h2 className="font-editorial text-[clamp(2.5rem,6.8vw,8rem)] leading-[1.18] tracking-[-0.03em] text-[var(--brand-cream)] uppercase text-justify [text-align-last:justify] w-full">
          <span className="block w-full mb-1">FOR THE INDIAN SKIN, FOR</span>
          <span className="block w-full mb-1">THE INDIAN CLIMATES AND</span>
          <span className="block w-full">FOR THE REAL INDIAN DAYS.</span>
        </h2>
      </section>

      <ProductScrollStory
        productLabel="Origin"
        productSub=""
        paragraphs={ORIGIN_PARAS}
        images={['/about-media/origin-1.jpg', '/about-media/origin-2.jpg', '/about-media/origin-3.jpg']}
      />
      <ProductScrollStory
        productLabel="Aura"
        productSub="Pearl Skinwear"
        paragraphs={AURA_PARAS}
        images={['/about-media/aura-1.jpg', '/about-media/aura-2.jpg', '/about-media/aura-3.jpg']}
        flip
      />


      {/* ── Breaker Heading Section (Clean 3-Line Balanced Grid) ── */}
      {/* ── Breaker Heading Section (Clean 3-Line Balanced Grid) ── */}
      <section className="relative z-16 w-full px-6 md:px-16 lg:px-24 pt-20 pb-20 mx-auto overflow-hidden flex flex-col items-center justify-center">
        <h2 className="font-editorial text-[clamp(2rem,4.8vw,5.5rem)] leading-[1.18] tracking-[-0.03em] text-[var(--brand-cream)] uppercase text-justify [text-align-last:justify] w-full">
          <span className="block w-full mb-2">ARTISUN BRINGS TO YOU SUN</span>
          <span className="block w-full mb-2">CARE, MADE THE WAY IT</span>
          <span className="block w-full">SHOULD ALWAYS HAVE BEEN MADE.</span>
        </h2>
      </section>


      {/* 3 — IN YEARS TO COME */}
      <FutureShowcase />

      <Footer />
    </main>
  );
}
