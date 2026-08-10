'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, PanInfo } from 'framer-motion';
import { asset } from '@/lib/asset';

export type StoryParagraph = { text: string; em?: string };

/* ── Desktop Image Slot Component ── */
function DesktopImageSlot({
  src,
  i,
  productLabel,
  paragraph,
  active,
  setRef,
  flip,
}: {
  src: string;
  i: number;
  productLabel: string;
  paragraph?: StoryParagraph;
  active: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  flip?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0.75]);
  return (
    <div
      data-idx={i}
      ref={(el) => {
        containerRef.current = el;
        setRef(el);
      }}
    >
      <div
        className={`min-h-0 md:min-h-auto lg:min-h-[85vh] flex flex-col pb-6 md:pb-10 ${
          i === 0 ? 'pt-4 md:pt-16 lg:pt-20' : 'pt-4 md:pt-8'
        } items-center ${flip ? 'md:items-start' : 'md:items-end'}`}
      >
        <motion.div
          style={{ scale }}
          className="relative w-full max-w-[440px] h-[45vh] md:h-[65vh] rounded-[24px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/5"
        >
          <Image
            src={asset(src)}
            alt={`${productLabel} ${i + 1}`}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover"
          />
        </motion.div>

        <div className="mt-4 md:mt-8 w-full max-w-[440px]">
          <div
            className="transition-all duration-700 ease-out"
            style={{ opacity: active ? 1 : 0.35 }}
          >
            <p
              className={`font-suisse text-[var(--brand-cream)] text-[16px] md:text-[21px] lg:text-[24px] leading-[1.35] text-center ${
                flip ? 'md:text-left' : 'md:text-right'
              }`}
            >
              {paragraph?.text}
            </p>

            {paragraph?.em && (
              <p className="font-suisse text-[var(--brand-cream)] text-[16px] md:text-[21px] lg:text-[24px] leading-[1.35] mt-2 text-center">
                {paragraph.em}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductScrollStory({
  productLabel,
  paragraphs,
  images,
  flip = false,
  eyebrow,
  heading,
}: {
  productLabel: string;
  productSub: string;
  paragraphs: StoryParagraph[];
  images: string[];
  flip?: boolean;
  eyebrow?: string;
  heading?: string[];
}) {
  const [active, setActive] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );

    slotRefs.current.forEach((el) => el && io.observe(el));

    return () => io.disconnect();
  }, []);

  const headingLines = heading ?? ['The Artisun', 'Perspective'];

  /* ── Touch / Finger Swipe Logic for Mobile ── */
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50; // minimum drag pixels to trigger slide
    if (info.offset.x < -swipeThreshold && mobileIndex < images.length - 1) {
      setMobileIndex((prev) => prev + 1); // Swipe Left -> Next Image
    } else if (info.offset.x > swipeThreshold && mobileIndex > 0) {
      setMobileIndex((prev) => prev - 1); // Swipe Right -> Previous Image
    }
  };

  return (
    <section className="relative w-full px-4 md:px-16 lg:px-24">

      {/* ── 1. MOBILE & SMALL TABLET CAROUSEL VIEW WITH TOUCH SWIPE (< 768px) ── */}
      <div className="block md:hidden py-8 px-2 text-center w-full max-w-[480px] mx-auto overflow-hidden">
        {/* Eyebrow */}
        {eyebrow && (
          <p className="font-suisse uppercase tracking-[0.14em] text-[12px] text-[var(--brand-cream)]/75 mb-2">
            {eyebrow}
          </p>
        )}

        {/* Heading */}
        <h2 className="font-editorial text-[clamp(1.75rem,6.8vw,2.4rem)] leading-[1.15] tracking-[-0.03em] text-[var(--brand-cream)] mb-6">
          {headingLines.map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Draggable/Swipable Image Container */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative w-full h-[280px] sm:h-[340px] rounded-[18px] overflow-hidden shadow-2xl mb-5 border border-white/10 bg-[#8B3A32] cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <Image
            src={asset(images[mobileIndex])}
            alt={`${productLabel} ${mobileIndex + 1}`}
            fill
            sizes="90vw"
            className="object-cover transition-opacity duration-300 pointer-events-none"
          />
        </motion.div>

        {/* Dynamic Paragraph Text */}
        <div className="min-h-[75px] max-w-[420px] mx-auto flex flex-col justify-center mb-5">
          <p className="font-suisse text-[var(--brand-cream)] text-[15px] sm:text-[17px] leading-[1.4] opacity-95">
            {paragraphs[mobileIndex]?.text}
          </p>
          {paragraphs[mobileIndex]?.em && (
            <p className="font-suisse text-[var(--brand-cream)] text-[15px] sm:text-[17px] leading-[1.4] mt-1.5 opacity-95">
              {paragraphs[mobileIndex].em}
            </p>
          )}
        </div>

        {/* 3 Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setMobileIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                mobileIndex === idx
                  ? 'w-6 bg-white opacity-100'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── 2. DESKTOP STICKY SCROLL VIEW (>= 768px) ── */}
      <div className="hidden md:grid md:grid-cols-2">
        {/* Editorial title side (desktop sticky) */}
        <div
          className={`flex items-center sticky top-0 h-screen ${
            flip ? 'md:order-2 justify-end' : 'justify-start'
          }`}
        >
          <div className={flip ? 'text-right' : 'text-left'}>
            {eyebrow && (
              <p className="font-suisse uppercase tracking-[0.12em] text-[22px] md:text-[26px] text-[var(--brand-cream)]/70 mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="font-editorial text-[clamp(2.2rem,4.5vw,5rem)] leading-[1.18] tracking-[-0.04em] text-[var(--brand-cream)]">
              {headingLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Scrolling product shots */}
        <div className={flip ? 'md:order-1' : ''}>
          {images.map((src, i) => (
            <DesktopImageSlot
              key={src}
              src={src}
              i={i}
              productLabel={productLabel}
              paragraph={paragraphs[i]}
              active={active === i}
              flip={flip}
              setRef={(el) => {
                slotRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

    </section>
  );
}