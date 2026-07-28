'use client';

import { useEffect, useRef } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import Footer from '../../components/Footer';
import SkinwhereImageReveal from '../../components/skinwear/SkinwearImageReveal';
import CustomCursor from '../../components/CustomCursor';
export default function SkinwherePage() {
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
    <main className="min-h-screen bg-[#080307] text-white">
      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />
      <SkinwhereImageReveal />
      <Footer />
    </main>
  );
}