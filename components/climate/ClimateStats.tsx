'use client';

import { motion } from 'framer-motion';

export default function ClimateStats() {
  return (
    <section className="relative z-10 w-full min-h-[50vh] md:min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 text-[var(--brand-cream)] overflow-hidden">
      
      {/* 1. Top Sub-heading / Statement */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-[1100px] mb-8 md:mb-12 space-y-2 font-sans px-2"
      >
        <p className="text-lg sm:text-2xl md:text-3xl font-normal opacity-95 leading-relaxed">
          Even the same routine can perform differently depending on where you are.
        </p>
        <p className="text-lg sm:text-2xl md:text-3xl font-normal opacity-95 underline underline-offset-4 leading-relaxed decoration-white/80">
          Understanding the skin means understanding the conditions it lives in.
        </p>
      </motion.div>

      {/* 2. Three Compact Glassmorphism Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-[860px]"
      >

        {/* CARD 1 */}
        <div className="bg-black/25 backdrop-blur-md border border-white/10 rounded-none p-5 sm:p-6 flex flex-col justify-between min-h-auto md:min-h-[310px] shadow-2xl hover:border-white/20 transition-all">
          <div>
            <h3 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal mb-2 tracking-tight leading-none">
              10%
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-sans font-normal opacity-95 leading-snug">
              more sebum production takes place for every 1°C rise in the skin temperature.
            </p>
          </div>
          <p className="text-xs md:text-sm font-sans text-white/90 text-right mt-6 md:mt-4 font-normal">
            British Journal of Dermatology, 1970
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-black/25 backdrop-blur-md border border-white/10 rounded-none p-5 sm:p-6 flex flex-col justify-between min-h-auto md:min-h-[310px] shadow-2xl hover:border-white/20 transition-all">
          <div>
            <h3 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal mb-2 tracking-tight leading-none">
              2 hrs
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-sans font-normal opacity-95 leading-snug">
              at 32°C is enough to measurably raise both sebum and inflammation markers in the skin.
            </p>
          </div>
          <p className="text-xs md:text-sm font-sans text-white/90 text-right mt-6 md:mt-4 font-normal">
            Fudan University, Shanghai<br />
            Environmental Research, 2025
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-black/25 backdrop-blur-md border border-white/10 rounded-none p-5 sm:p-6 flex flex-col justify-between min-h-auto md:min-h-[310px] shadow-2xl hover:border-white/20 transition-all">
          <div>
            <h3 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal mb-2 tracking-tight leading-none">
              20%
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-sans font-normal opacity-95 leading-snug">
              more pigment spots on the forehead and cheeks, in skin exposed to more traffic particles.
            </p>
          </div>
          <p className="text-xs md:text-sm font-sans text-white/90 text-right mt-6 md:mt-4 font-normal">
            Journal of Investigative<br />
            Dermatology, 2010
          </p>
        </div>

      </motion.div>

    </section>
  );
}