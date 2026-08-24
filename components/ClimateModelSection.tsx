'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClimateModelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true;
    video.pause();
    video.currentTime = 0;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',        // Screen pehle 100% fit hokar set/freeze hogi
      end: '+=200',            // Sirf 200px ka minimal scroll (heavy freeze nahi rahega)
      pin: true,               // Screen ko visually settle karega
      pinSpacing: true,
      onEnter: () => {
        video.play().catch(() => {});
      },
      onLeaveBack: () => {
        video.pause();
        video.currentTime = 0; // Wapas scroll karne par initial freeze frame par aayegi
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[680px] overflow-hidden select-none bg-[#0a0504]"
    >
      
      {/* 1. Background City Video Layer — edge to edge, cover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={asset('/climate-model-bg.mp4')}
          poster={asset('/climate-model-poster.jpg')}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90 brightness-90"
        />
      </div>

      {/* 2. Cinematic Atmospheric Gradient & Vignette Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,3,2,0.6) 100%), linear-gradient(to bottom, rgba(15,3,2,0.3) 0%, transparent 40%, rgba(15,3,2,0.8) 100%)',
        }}
      />

      {/* 3. Model Cutout (Enlarged and Grounded to Bottom) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center">
        <img
          src={asset('/2.png')}
          alt="Model wearing Artisun"
          className="h-[80vh] sm:h-[90vh] lg:h-[94vh] w-auto max-w-[95vw] object-contain object-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* 4. Left Side Text Block */}
      <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-12 lg:left-16 z-30 max-w-[340px] sm:max-w-[440px] text-left pointer-events-auto">
        <h3 className="font-editorial text-[var(--brand-cream,#f5f0eb)] text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.12] tracking-tight drop-shadow-md">
          So we made one that&rsquo;s ready for all of it.
        </h3>
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)]/85 text-[14.5px] sm:text-[15.5px] leading-relaxed mt-3 drop-shadow-sm">
          The first Climate Smart&trade; sun care line &mdash; Built for your day &amp; weather, not just your skin type.
        </p>
      </div>

    </section>
  );
}