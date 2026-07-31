'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { asset } from '@/lib/asset';

export type StoryParagraph = { text: string; em?: string };

function ImageSlot({
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

      <div className={`min-h-[100svh] flex flex-col pt-20 pb-15 ${flip ? 'items-start' : 'items-end'}`}>
        <motion.div
          style={{ scale }}
          className="relative w-full max-w-[440px] h-[65vh] rounded-[24px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/5"
        >
          <Image
            src={asset(src)}
            alt={`${productLabel} ${i + 1}`}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover"
          />
        </motion.div>

        <div className="mt-20 w-full max-w-[440px]">
          <div
            className="transition-all duration-700 ease-out"
            style={{ opacity: active ? 1 : 0.35 }}
          >
            <p className={`font-suisse text-[var(--brand-cream)] text-[18px] md:text-[21px] lg:text-[24px] leading-[1.35] ${flip ? 'text-left' : 'text-right'}`}>
              {paragraph?.text}
            </p>

            {paragraph?.em && (
              <p className="font-suisse text-[var(--brand-cream)] text-[18px] md:text-[21px] lg:text-[24px] leading-[1.35] mt-2 text-center">
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
  productSub,
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

  return (
    <section className="relative w-full px-6 md:px-16 lg:px-24">
      <div className="md:grid md:grid-cols-2">

        {/* ── Editorial title side ── */}
        <div
          className={`hidden md:flex items-center sticky top-0 h-screen ${flip ? 'md:order-2 justify-end' : 'justify-start'
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

        {/* ── Scrolling product shots ── */}
        <div className={flip ? 'md:order-1' : ''}>
          {images.map((src, i) => (
            <ImageSlot
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