'use client';

import { motion } from 'framer-motion';

export default function ClimateSkinVsWeather() {
  return (
    <section className="relative z-10 w-full min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 text-[var(--brand-cream)] text-center overflow-hidden">
      
      {/* 2-Line Serif Heading — Tight Bottom Margin */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="font-editorial text-[clamp(1.8rem,5.5vw,4.1rem)] font-normal mb-4 md:mb-6 leading-[1.15] tracking-tight max-w-[950px] px-2"
      >
        Skin type tells you a little,<br className="hidden sm:block" />
        {' '}the weather tells you everything
      </motion.h2>

      {/* Paragraph — Wider Container & Bigger Font Size */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-sans text-base sm:text-xl md:text-2xl lg:text-3xl font-normal opacity-95 max-w-[1200px] leading-relaxed mx-auto px-2"
      >
        So we stopped sorting sunscreen by skin, and started building it around<br className="hidden md:block" />
        {' '}climate. That’s climate-smart — the same idea, in two products.
      </motion.p>

    </section>
  );
}