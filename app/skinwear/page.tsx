'use client';
import { useEffect, useRef } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';
import SkinwearImageReveal from '../../components/skinwear/SkinwearImageReveal';
import SkinwearForgettable from '../../components/skinwear/SkinwearForgettable';
import SkinwearImgShrink from '../../components/skinwear/SkinwearImgShrink';
import SkinwearImgShrinkkk from '../../components/skinwear/SkinwearImgShrinkkk';
import SkinwearDailyLife from '../../components/skinwear/SkinwearDailyLife';
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

  return (
    <main className="relative w-full min-h-[100svh] overflow-clip">
      {/* 👈 YEH PROGRESS BAR ADD KARO */}
      <ScrollProgressBar />

      {/* Brand gradient background */}
      <div id="global-bg" className="theme-molten-core" />

      {/* CustomCursor is pointer-device only; touch devices never trigger mousemove */}
      <CustomCursor mouseProxy={mouseProxy} />

      <GlobalHeader />

      {/* 1 — Opening reveal: portrait rises from below */}
      <SkinwearImageReveal />

      {/* 2 — Why suncare felt forgettable */}
      <div style={{ paddingTop: 'clamp(24px, 4vw, 40px)', paddingBottom: 'clamp(24px, 4vw, 40px)' }}>
        <SkinwearForgettable />
      </div>

      {/* 3 — Dress your body vs dress your skin (image shrinks right) */}
      <div className="py-2 sm:py-3 md:py-4">
        <SkinwearImgShrink />
      </div>

      {/* 4 — Your skin now has a wardrobe (image shrinks left) */}
      <div className="py-2 sm:py-3 md:py-4">
        <SkinwearImgShrinkkk />
      </div>

      {/* 5 — What's your skin wearing today CTA */}
      <div className="py-2 sm:py-3 md:py-4">
        <SkinwearDailyLife />
      </div>

      <Footer />
    </main>
  );
}