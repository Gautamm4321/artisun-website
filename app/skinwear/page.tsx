'use client';

import { useEffect, useRef } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';
import SkinwearImageReveal from '../../components/skinwear/SkinwearImageReveal';
import SkinwearForgettable from '../../components/skinwear/SkinwearForgettable';
import SkinwearWorn from '../../components/skinwear/SkinwearWorn';
import SkinwearDailyLife from '../../components/skinwear/SkinwearDailyLife';

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
      {/* Molten Core — the same brand gradient surface as the home hero */}
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      {/* 1 — opening reveal: portrait rises under the stuck question */}
      <SkinwearImageReveal />

      {/* 2 — why does something we use every day feel so forgettable */}
      <SkinwearForgettable />

      {/* 3 — tolerated vs worn */}
      <SkinwearWorn />

      {/* 4 — clothing for your skin, built for daily life */}
      <SkinwearDailyLife />

      <Footer />
    </main>
  );
}
