'use client';

import { motion } from 'framer-motion';
import EmberField from '../about/EmberField';

export default function SkinwearAltHero() {
  const heroChild = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section id="sw-alt-hero" className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-40 pb-32">
      <div id="sw-alt-hero-bg" className="absolute inset-0 z-0">
        <EmberField />
      </div>

      {/* Aura bottle slot — enters large on the right of the opening title */}
      <div
        data-aura-anchor
        data-aura-scale="0.56"
        className="pointer-events-none absolute right-1/2 top-[55%] h-0 w-0 translate-x-1/2 md:right-[15%] md:translate-x-0"
        aria-hidden
      />

      <motion.h1
        {...heroChild(0.12)}
        id="skinwear-hero-title"
        style={{ willChange: 'transform' }}
        className="about-shine font-editorial leading-[1.1] tracking-[-0.02em] text-[clamp(3.6rem,10vw,8.5rem)] pb-4 pt-4"
      >
        Skinwear
      </motion.h1>

      {/* scroll cue (icon only) */}
      <motion.div {...heroChild(0.4)} className="mt-20 text-[var(--brand-cream)]/30">
        <motion.svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
