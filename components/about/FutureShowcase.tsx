'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { asset } from '@/lib/asset';

const rise = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function FutureShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden py-20 md:py-0">
      <div className="w-full md:grid md:grid-cols-2 md:items-center gap-10 lg:gap-16 px-6 md:px-12 lg:px-20">
        {/* ── Both products ── */}
        <div className="relative h-[46vh] md:h-[80vh] mb-12 md:mb-0 md:order-2">
          <motion.div
            {...rise(0, reduce)}
            className="absolute left-0 bottom-0 w-[52%] h-[80%] rounded-[22px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/5"
          >
            <Image src={asset('/about-media/origin-hero.jpg')} alt="Origin" fill sizes="30vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 font-suisse uppercase tracking-[0.22em] text-[10px] md:text-[11px] text-[var(--brand-cream)]/80">
              Origin
            </span>
          </motion.div>
          <motion.div
            {...rise(0.15, reduce)}
            className="absolute right-0 top-0 w-[52%] h-[80%] rounded-[22px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/5"
          >
            <Image src={asset('/about-media/aura-hero.jpg')} alt="Aura" fill sizes="30vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 font-suisse uppercase tracking-[0.22em] text-[10px] md:text-[11px] text-[var(--brand-cream)]/80">
              Aura
            </span>
          </motion.div>
        </div>

        {/* ── Copy + CTA ── */}
        <div className="max-w-[520px] md:order-1">
          <motion.div {...rise(0, reduce)} className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--brand-cream)]/40" />
            <span className="font-suisse uppercase tracking-[0.28em] text-[11px] md:text-[12px] text-[var(--brand-cream)]/70">
            </span>
          </motion.div>

          <motion.h2
            {...rise(0.08, reduce)}
            className="about-shine font-editorial leading-[1.02] tracking-[-0.02em] text-[clamp(2.6rem,6vw,4.6rem)]"
          >
            In years to come..
          </motion.h2>

          <motion.div {...rise(0.16, reduce)} className="mt-8 space-y-5 font-editorial text-[var(--brand-cream)]/80 text-[17px] md:text-[19px] leading-[1.55]">
            <p>
              Artisun is just getting started. What you see today is the beginning of a longer
              collection — one focused on suncare and designed as skinwear.
            </p>
            <p>
              Different layers for different mornings and different climates, each one built to the
              same standard. Artisun is bringing you two layers to begin.
            </p>
            <p className="font-editorial italic text-[#F2A65C]">
              In years to come, it’ll grow with you, for you. For your skin, your needs and your climate.
            </p>
          </motion.div>

          <motion.div {...rise(0.24, reduce)} className="mt-10">
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
