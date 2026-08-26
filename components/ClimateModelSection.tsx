'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

export default function ClimateModelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          video.play().catch(() => {});
        },
        onEnterBack: () => {
          video.play().catch(() => {});
        },
        onLeave: () => {
          video.pause();
        },
        onLeaveBack: () => {
          video.pause();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden select-none bg-[#0a0504] z-20"
    >
      {/* 1. Background City Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={asset('/climate-model-bg.mp4')}
          poster={asset('/climate-model-poster.jpg')}
          loop
          muted
          autoPlay
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

      {/* 3. Model Cutout */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center overflow-visible">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/2.png')}
          alt="Model wearing Artisun"
          className="h-[68vh] xs:h-[72vh] sm:h-[82vh] md:h-[86vh] lg:h-[94vh] w-auto max-w-none sm:max-w-[95vw] object-contain object-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)] -translate-x-[6%] xs:-translate-x-[4%] sm:translate-x-0 translate-y-1 lg:translate-y-0"
        />
      </div>

      {/* 4. Top-Left Typography */}
      <div className="absolute top-14 xs:top-16 sm:top-24 md:top-28 lg:top-[20%] xl:top-[23%] left-4 sm:left-8 md:left-10 lg:left-15 z-30 w-auto max-w-[85vw] lg:max-w-[900px] pointer-events-none text-left">
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)] text-[13px] xs:text-[14px] sm:text-[20px] md:text-[24px] lg:text-[32px] font-normal leading-[1.1] sm:leading-[1.04] tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] translate-y-0 lg:translate-y-8">
          So we made one<br />
          that&rsquo;s ready for all of it
        </p>

        <h2 className="font-editorial font-[200] text-[var(--brand-cream,#f5f0eb)] text-[26px] xs:text-[29px] sm:text-[38px] md:text-[46px] lg:text-[84px] leading-[0.98] sm:leading-[0.94] tracking-[-0.01em] sm:tracking-[-0.015em] lg:tracking-[-0.02em] origin-left scale-x-100 lg:scale-x-[1.12] whitespace-normal lg:whitespace-nowrap mt-2 xs:mt-3 sm:mt-6 lg:mt-13 translate-y-0 lg:translate-y-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] antialiased">
          The first<br />
          Climate-smart<span className="text-[0.25em] align-top tracking-normal font-sans ml-1">TM</span><br />
          sun care line
        </h2>
      </div>

      {/* 5. Bottom-Right Subtitle */}
      <div className="absolute bottom-8 xs:bottom-10 sm:bottom-12 md:bottom-14 lg:bottom-10 xl:bottom-14 right-4 xs:right-5 sm:right-8 md:right-10 lg:right-16 z-30 w-auto max-w-[220px] xs:max-w-[250px] sm:max-w-[360px] lg:max-w-[650px] text-right pointer-events-none">
        <p className="font-suisse text-[var(--brand-cream,#f5f0eb)] text-[12px] xs:text-[13.5px] sm:text-[16px] md:text-[18px] lg:text-[26px] font-normal leading-[1.18] lg:leading-[1.04] tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          Built for your day &amp; weather,<br />
          not just your skin type.
        </p>
      </div>
    </section>
  );
}