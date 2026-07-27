'use client';

import { motion, useReducedMotion } from 'framer-motion';

const rise = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function FutureShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20">
      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* ── Copy + CTA ── */}
        <div className="w-full text-center mx-auto">
          <motion.div {...rise(0, reduce)} className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--brand-cream)]/40" />
            <span className="font-suisse uppercase tracking-[0.28em] text-[11px] md:text-[12px] text-[var(--brand-cream)]/70">
            </span>
          </motion.div>

          <motion.h2
            {...rise(0.08, reduce)}
            className="about-shine font-editorial leading-[1.02] tracking-[-0.02em] text-[clamp(2.6rem,6vw,4.6rem)] text-center"
          >
            In years to come..
          </motion.h2>

          {/* Gap reduced using space-y-3 & mt-6 */}
          <motion.div {...rise(0.16, reduce)} className="mt-6 space-y-3 font-suisse text-[var(--brand-cream)]/80 text-[18px] md:text-[22px] lg:text-[24px] leading-[1.4] w-full">

            <p className="text-justify [text-align-last:center] w-full">
              Artisun is just getting started. What you see today is the beginning of a longer
              collection — one focused on suncare and designed as skinwear.
            </p>

            <p className="text-justify [text-align-last:center] w-full">
              Different layers for different mornings and different climates, each one built to the
              same standard. Artisun is bringing you two layers to begin.
            </p>

            <p className="text-justify [text-align-last:center] w-full">
              In years to come, it’ll grow with you, for you. For your skin, your needs and your climate.
            </p>

          </motion.div>

          <motion.div {...rise(0.24, reduce)} className="mt-8 flex justify-center">
            <a
              href="/shop"
              className="group relative inline-flex items-center justify-center px-10 py-4 md:px-12 md:py-5 bg-[#C02D19] border border-[#E8601A]/30 text-[var(--brand-cream)] font-suisse uppercase tracking-[0.2em] text-xs md:text-[13px] font-medium rounded-full overflow-hidden transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(192,45,25,0.55)]"
            >
              <span className="relative z-10">Find your dailywear</span>
              <span className="absolute inset-0 bg-[#A52A2C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}