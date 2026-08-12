'use client';
import { useEffect, useRef } from 'react';

export default function ScrollProgressBar({ marker }: { marker?: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrollTop / total : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (markerRef.current) markerRef.current.style.left = `${progress * 100}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      {/* Bottom progress line — sits above the mobile sticky bar, small gap on desktop */}
      <div
        ref={barRef}
        className="fixed left-0 w-full h-[3px] origin-left pointer-events-none bottom-[80px] lg:bottom-6"
        style={{
          zIndex: 9999,
          background: 'linear-gradient(90deg, #FF8C22, #C93B1A, #E8DCC8)',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
      {marker && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={markerRef}
          src={marker}
          alt=""
          aria-hidden="true"
          className="fixed pointer-events-none select-none bottom-[83px] lg:bottom-[27px]"
          style={{
            zIndex: 10000,
            left: '0%',
            transform: 'translateX(-50%)',
            height: '24px',
            width: 'auto',
            willChange: 'left',
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
          }}
        />
      )}
    </>
  );
}
