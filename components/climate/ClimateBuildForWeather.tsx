'use client';

import { motion } from 'framer-motion';

export default function ClimateBuildForWeather() {
  return (
    <section className="relative z-10 w-full min-h-[85vh] flex flex-col items-center justify-center px-4 py-20 text-[var(--brand-cream)] text-center">
      
      {/* Main Editorial Heading — Larger Size, Heavier Weight & Single Line */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="font-editorial text-[clamp(2.2rem,5.2vw,4.8rem)] font-medium mb-14 whitespace-nowrap tracking-tight leading-none"
      >
        Why we build for weather, not just skin type
      </motion.h2>

      {/* Paragraph Block — Exact Line Breaks & Center Aligned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-[700px] mx-auto space-y-10 text-xl md:text-3xl font-sans font-normal opacity-95 leading-snug text-center"
      >
        <p>
          Every sunscreen asks the<br />
          same question: <strong className="font-bold opacity-100">oily or dry?</strong><br />
          But your skin isn’t oily or dry<br />
          in a fixed way.
        </p>

        <p>
          It changes the second the<br />
          <strong className="font-bold opacity-100">weather does</strong> — tight in a<br />
          Delhi December, greasy in a<br />
          Bombay July, dull in the<br />
          September smog.
        </p>
      </motion.div>

    </section>
  );
}