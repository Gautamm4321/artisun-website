'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { asset } from '@/lib/asset';

export default function SkinwearImageReveal() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /*
   * IMAGE REVEAL
   *
   * Starts completely below the viewport.
   * Slowly rises as the user scrolls.
   * Reaches its final position.
   */
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.3, 0.5, 0.68],
    ['80vh', '72vh', '52vh', '25vh', '0vh']
  );

  /*
   * IMAGE OPACITY
   */
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.5, 0.68],
    [0, 0.05, 0.3, 0.8, 1]
  );

  /*
   * IMAGE SCALE
   */
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.68],
    [0.88, 0.92, 0.97, 1]
  );

  /*
   * TEXT REVEAL
   */
  const textOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.58, 0.72],
    [0, 0.4, 1]
  );

  const textY = useTransform(
    scrollYProgress,
    [0.4, 0.72],
    [30, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-[15] w-full h-[300vh]"
    >
      {/* STICKY REVEAL AREA */}
      <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center px-6">

        {/* REVEALING IMAGE */}
        <motion.div
          style={{
            y: imageY,
            opacity: imageOpacity,
            scale: imageScale,
          }}
          className="
            relative
            w-[38vw]
            max-w-[300px]
            aspect-[5/12]
            rounded-[10px]
            overflow-hidden
            shadow-[0_50px_100px_-30px_rgba(0,0,0,0.65)]
            will-change-transform
          "
        >
          <Image
            src={asset('/skinwear-front-img.png')}
            alt="Skinwear"
            fill
            sizes="(max-width: 900px) 60vw, 300px"
            className="object-cover"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-8
            pointer-events-none
          "
        >
          <p
            className="
              font-editorial
              text-[var(--brand-cream)]
              text-[clamp(1.4rem,3.4vw,2.4rem)]
              leading-[1.25]
              text-center
              max-w-[720px]
              drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]
            "
          >
            It started with a small, frustrating question.
          </p>
        </motion.div>
      </div>

      {/* FINAL IMAGE STATE */}
      <div className="relative w-full flex justify-center -mt-[100svh] pointer-events-none">
        <div
          className="
            relative
            w-[38vw]
            max-w-[300px]
            aspect-[5/12]
            rounded-[10px]
            overflow-hidden
            opacity-0
            pointer-events-none
          "
        >
          <Image
            src={asset('/skinwear-front-img.png')}
            alt=""
            fill
            sizes="(max-width: 900px) 60vw, 300px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}