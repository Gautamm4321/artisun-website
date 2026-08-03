'use client';

import { motion } from 'framer-motion';

export default function ClimateCTA() {
  return (
    <section className="relative z-10 w-full min-h-[50vh] md:min-h-[65vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 text-[var(--brand-cream)] overflow-hidden">
      
      {/* Container to sync Heading & Paragraph Width */}
      <div className="flex flex-col items-center w-full max-w-[800px] text-center px-2">
        
        {/* 1. Uppercase Serif Heading (Responsive clamp, wrap-safe) */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="font-editorial text-[clamp(1.8rem,5vw,3.6rem)] tracking-tight font-normal uppercase mb-3 md:mb-4 leading-tight"
        >
          Designed for exposure
        </motion.h2>

        {/* 2. Subtitle / Paragraph Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-base sm:text-xl md:text-2xl font-normal opacity-95 leading-relaxed mb-6 md:mb-8 max-w-[680px]"
        >
          <p>
            Your skin changes with the weather. So does the way you wear it.
          </p>
          <p className="mt-1">
            What’s your skin wearing today?
          </p>
        </motion.div>

        {/* 3. Styled Pill Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            type="button"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-full px-6 md:px-8 py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-sans font-medium tracking-wide text-white transition-all duration-300 shadow-lg cursor-default"
          >
            [ Shop Now ]
          </button>
        </motion.div>

      </div>

    </section>
  );
}