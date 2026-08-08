'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { asset } from '@/lib/asset';

// Fast Pointer Variants (Fast Slide + Fade)
const leftPointerVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      delay: 0.15 + i * 0.08,
      ease: 'easeOut',
    },
  }),
};

const rightPointerVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      delay: 0.2 + i * 0.08,
      ease: 'easeOut',
    },
  }),
};

export default function ClimatePartOfSkincare() {
  return (
    <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20 text-[var(--brand-cream)] overflow-hidden">
      
      {/* 1. Top Serif Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="font-editorial text-[clamp(1.8rem,5.2vw,4.2rem)] text-center mb-8 md:mb-12 tracking-wide font-normal uppercase px-2 leading-tight"
      >
        Climate is (a part of) skincare
      </motion.h2>

      {/* 2. Interactive Image & Pointer Layout Container */}
      <div className="relative w-full max-w-[1280px] flex flex-col lg:flex-row items-center justify-center my-auto gap-8 lg:gap-0">
        
        {/* --- LEFT POINTERS CONTAINER (Desktop Only) --- */}
        <div className="hidden lg:flex flex-col justify-between h-[480px] w-[380px] text-center z-20 py-4">
          
          {/* Point 1: Top Left */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={leftPointerVariants}
            className="flex items-center justify-end gap-2 translate-x-10 mt-2"
          >
            <p className="text-lg md:text-xl font-sans font-normal leading-snug opacity-95 text-center">
              The sun you don’t<br />feel ages your skin
            </p>
            <span className="w-20 h-[1px] bg-white/90 flex-shrink-0 -mr-4 relative z-30 shadow-sm" />
          </motion.div>

          {/* Point 3: Bottom Left */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={leftPointerVariants}
            className="flex items-center justify-end gap-2 translate-x-10 mb-16"
          >
            <p className="text-lg md:text-xl font-sans font-normal leading-snug opacity-95 text-center">
              Office AC quietly pulls<br />your skin’s moisture out
            </p>
            <span className="w-20 h-[1px] bg-white/90 flex-shrink-0 -mr-4 relative z-30 shadow-sm" />
          </motion.div>

        </div>

        {/* --- CENTER MAIN IMAGE --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-[280px] h-[360px] sm:w-[360px] sm:h-[460px] md:w-[420px] md:h-[520px] flex-shrink-0 overflow-hidden shadow-2xl z-10 rounded-none border border-white/10"
        >
          <Image
            src={asset('/skinwear-media/model-portrait.jpg')}
            alt="Climate impact on skin"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* --- RIGHT POINTERS CONTAINER (Desktop Only) --- */}
        <div className="hidden lg:flex flex-col justify-between h-[480px] w-[380px] text-center z-20 py-4">
          
          {/* Point 2: Top Right */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={rightPointerVariants}
            className="flex items-center justify-start gap-2 -translate-x-10 mt-24"
          >
            <span className="w-20 h-[1px] bg-white/90 flex-shrink-0 -ml-4 relative z-30 shadow-sm" />
            <p className="text-lg md:text-xl font-sans font-normal leading-snug opacity-95 text-center">
              A warm day pushes your<br />oil up by mid-morning
            </p>
          </motion.div>

          {/* Point 4: Bottom Right */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={rightPointerVariants}
            className="flex items-center justify-start gap-2 -translate-x-10 mb-4"
          >
            <span className="w-20 h-[1px] bg-white/90 flex-shrink-0 -ml-4 relative z-30 shadow-sm" />
            <p className="text-lg md:text-xl font-sans font-normal leading-snug opacity-95 text-center whitespace-nowrap">
              Damp air decides whether<br />anything you put on stays put
            </p>
          </motion.div>

        </div>

        {/* --- MOBILE & TABLET FALLBACK LIST --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex lg:hidden flex-col gap-4 mt-4 w-full max-w-[480px] px-4 text-center"
        >
          <div className="border-b border-white/10 pb-3">
            <p className="text-sm sm:text-base font-sans opacity-90 leading-relaxed">
              The sun you don’t feel ages your skin
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <p className="text-sm sm:text-base font-sans opacity-90 leading-relaxed">
              A warm day pushes your oil up by mid-morning
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <p className="text-sm sm:text-base font-sans opacity-90 leading-relaxed">
              Office AC quietly pulls your skin’s moisture out
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <p className="text-sm sm:text-base font-sans opacity-90 leading-relaxed">
              Damp air decides whether anything you put on stays put
            </p>
          </div>
        </motion.div>

      </div>

    </section>
  );
}