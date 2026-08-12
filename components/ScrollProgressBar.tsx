'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollProgressBar({ marker }: { marker?: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLImageElement>(null);
  const [hideAtFooter, setHideAtFooter] = useState(false);

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

  /* ── Footer Observer: Hide line & marker when footer comes into view ── */
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideAtFooter(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`transition-opacity duration-300 ${
        hideAtFooter ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Bottom progress line — Always fixed at the very bottom edge (bottom-0) */}
      <div
        ref={barRef}
        className="fixed left-0 bottom-0 w-full h-[2px] md:h-[3px] origin-left pointer-events-none"
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
          className="fixed pointer-events-none select-none bottom-0"
          style={{
            zIndex: 10000,
            left: '0%',
            transform: 'translateX(-50%)',
            height: '20px',
            width: 'auto',
            willChange: 'left',
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
          }}
        />
      )}
    </div>
  );
}