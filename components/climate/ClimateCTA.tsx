'use client';

import { motion } from 'framer-motion';

export default function ClimateCTA() {
  return (
    <section className="relative z-10 w-full min-h-[65vh] flex flex-col items-center justify-center px-4 py-16 text-[var(--brand-cream)]">
      
      {/* Container to sync Heading & Paragraph Width */}
      <div className="flex flex-col items-center max-w-[800px] text-center px-2">
        
        {/* 1. Uppercase Serif Heading (Width matched to Para & Tight Gap) */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-editorial text-[clamp(2rem,4.2vw,3.6rem)] tracking-tight font-normal uppercase mb-2 leading-none whitespace-nowrap"
        >
          Designed for exposure
        </motion.h2>

        {/* 2. Subtitle / Paragraph Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-lg md:text-2xl font-normal opacity-95 leading-snug mb-8"
        >
          <p>
            Your skin changes with the weather. So does the way you wear it.
          </p>
          <p className="mt-1">
            What’s your skin wearing today?
          </p>
        </motion.div>

        {/* 3. Styled Pill Button (Non-clickable for now) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            type="button"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-full px-8 py-3 text-sm md:text-base font-sans font-medium tracking-wide text-white transition-all duration-300 shadow-lg cursor-default"
          >
            [ Shop Now ]
          </button>
        </motion.div>

      </div>

    </section>
  );
}