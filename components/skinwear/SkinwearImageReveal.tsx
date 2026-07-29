'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { asset } from '@/lib/asset';

/*
 * FRAME 1 — molten-core opening (same surface as the home hero), then on
 * scroll a 3:4 model portrait rises from the bottom of the viewport with a
 * smaller product frame trailing it, while the opening line stays stuck in
 * the centre of the screen.
 */
export default function SkinwearImageReveal() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Big model frame — starts fully below the viewport, settles centred.
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.62, 0.8],
    ['105vh', '85vh', '45vh', '12vh', '0vh']
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.94, 0.97, 1]);

  // Small product frame — nested in the big frame, trails it by a beat.
  const productLag = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 0.9],
    ['55vh', '38vh', '10vh', '0vh']
  );

  // Opening line — present from the start, sitting over the rising image.
  const textOpacity = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [0.9, 1, 1, 1]);

  return (
    <section ref={sectionRef} className="relative z-[15] w-full h-[300vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Rising frames — centred by the flex wrapper so the motion `y`
            transform doesn't fight the centering translate */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="
              relative
              w-[clamp(240px,60vw,340px)] md:w-[clamp(300px,33vw,460px)]
              aspect-[3/4]
              max-h-[74svh]
              will-change-transform
            "
          >
            {/* Big model frame — 3:4, roughly a third of the screen */}
            <div className="absolute inset-0 overflow-hidden shadow-[0_60px_120px_-40px_rgba(0,0,0,0.6)]">
              <Image
                src={asset('/skinwear-media/model-portrait.jpg')}
                alt="Skinwear"
                fill
                sizes="(max-width: 768px) 60vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Trailing product frame — smaller, hanging off the lower right */}
            <motion.div
              style={{ y: productLag }}
              className="
                absolute
                -right-[16%] md:-right-[22%]
                bottom-[-6%]
                w-[34%]
                aspect-[3/4]
                overflow-hidden
                shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]
                will-change-transform
              "
            >
              <Image
                src={asset('/about-media/origin-1.jpg')}
                alt="Artisun Origin Skinwear"
                fill
                sizes="(max-width: 768px) 22vw, 12vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Stuck centre line */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none"
        >
          <p
            className="
              font-editorial
              text-[var(--brand-cream)]
              text-[clamp(1.5rem,3.6vw,2.6rem)]
              leading-[1.25]
              text-center
              max-w-[780px]
              drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]
            "
          >
            It started with a small, frustrating question.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
