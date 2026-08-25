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
        video.play().catch(() => { });
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




      {/* 4. Top-Left & Mid-Left Split Typography */}
      <div className="absolute top-[20%] sm:top-[23%] left-4 sm:left-12 lg:left-15 z-30 w-auto max-w-[900px] pointer-events-none text-left">
        {/* Top-Left Sans Subtitle */}
        {/* Top-Left Sans Subtitle */}
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)] text-[18px] sm:text-[24px] lg:text-[32px] font-normal leading-[1.04] tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] translate-y-6 sm:translate-y-7 lg:translate-y-8">
          So we made one<br />
          that&rsquo;s ready for all of it
        </p>




        {/* Big Editorial Serif Headline */}
        <h2 className="font-editorial font-[200] text-[var(--brand-cream,#f5f0eb)] text-[44px] sm:text-[72px] lg:text-[84px] leading-[0.94] tracking-[-0.01em] sm:tracking-[-0.015em] lg:tracking-[-0.02em] origin-left scale-x-[1.12] whitespace-nowrap mt-7 sm:mt-10 lg:mt-13 translate-y-4 sm:translate-y-5 lg:translate-y-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] [text-stroke:0px] antialiased">
          The first<br />
          Climate-smart<span className="text-[0.25em] align-top tracking-normal font-sans ml-1">TM</span><br />
          sun care line
        </h2>
      </div>




      {/* 5. Bottom-Right Subtitle */}
      <div className="absolute bottom-10 sm:bottom-14 right-6 sm:right-12 lg:right-16 z-30 w-auto max-w-[650px] text-right pointer-events-none">
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)] text-[16px] sm:text-[22px] lg:text-[26px] font-normal leading-[1.04] tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          Built for your day &amp; weather,<br />
          not just your skin type.
        </p>
      </div>

    </section>
  );
}