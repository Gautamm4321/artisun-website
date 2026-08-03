'use client';

import { motion } from 'framer-motion';

export default function ClimateSkinVsWeather() {
  return (
    <section className="relative z-10 w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-[var(--brand-cream)] text-center">
      
     {/* 2-Line Serif Heading — Tight Bottom Margin */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="font-editorial text-[clamp(2.5rem,5.5vw,4.1rem)] font-normal mb-3 leading-[1.1] tracking-tight max-w-[950px]"
      >
        Skin type tells you a little,<br />
        the weather tells you everything
      </motion.h2>

      {/* Paragraph — Wider Container & Bigger Font Size */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-sans text-xl md:text-3xl font-normal opacity-95 max-w-[1300px] leading-relaxed mx-auto"
      >
        So we stopped sorting sunscreen by skin, and started building it around<br className="hidden md:block" />
        climate. That’s climate-smart — the same idea, in two products.
      </motion.p>

    </section>
  );
}