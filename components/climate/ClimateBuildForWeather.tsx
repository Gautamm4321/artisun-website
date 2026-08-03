'use client';

import { motion } from 'framer-motion';

export default function ClimateBuildForWeather() {
  return (
    <section className="relative z-10 w-full min-h-[50vh] md:min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 text-[var(--brand-cream)] text-center overflow-hidden">
      
      {/* Main Editorial Heading — 1 Line on Laptop & Tablet, Wrapped on Mobile */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="font-editorial text-[clamp(1.6rem,3.8vw,4.8rem)] font-medium mb-8 md:mb-14 md:whitespace-nowrap tracking-tight leading-tight px-2 max-w-[1400px]"
      >
        Why we build for weather, not just skin type
      </motion.h2>

      {/* Paragraph Block — Adaptive Fluid Flow for Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-[700px] mx-auto space-y-6 md:space-y-10 text-lg sm:text-2xl md:text-3xl font-sans font-normal opacity-95 leading-relaxed text-center px-2"
      >
        <p>
          Every sunscreen asks the<br className="hidden sm:inline" />
          {' '}same question: <strong className="font-bold opacity-100">oily or dry?</strong><br className="hidden sm:inline" />
          {' '}But your skin isn’t oily or dry<br className="hidden sm:inline" />
          {' '}in a fixed way.
        </p>

        <p>
          It changes the second the<br className="hidden sm:inline" />
          {' '}<strong className="font-bold opacity-100">weather does</strong> — tight in a<br className="hidden sm:inline" />
          {' '}Delhi December, greasy in a<br className="hidden sm:inline" />
          {' '}Bombay July, dull in the<br className="hidden sm:inline" />
          {' '}September smog.
        </p>
      </motion.div>

    </section>
  );
}