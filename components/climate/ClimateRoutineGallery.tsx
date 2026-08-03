'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { asset } from '@/lib/asset';

// 1. HAR IMAGE KE LIYE SEPARATE ALAG SRC PATHS
const galleryImages = [
  {
    id: 1,
    src: '/skinwear-media/daily-product.jpg', // Path for Image 1
    alt: 'Early mornings',
  },
  {
    id: 2,
    src: '/skinwear-media/daily-product.jpg', // Path for Image 2
    alt: 'Meetings',
  },
  {
    id: 3,
    src: '/skinwear-media/daily-product.jpg', // Path for Image 3
    alt: 'Afternoon sun',
  },
  {
    id: 4,
    src: '/skinwear-media/daily-product.jpg', // Path for Image 4
    alt: 'Commute home',
  },
];

export default function ClimateRoutineGallery() {
  return (
    <section className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-[var(--brand-cream)]">
      
      {/* 2. Top Headline — Reduced Gap (mb-5) */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center font-sans text-xl md:text-2xl font-normal opacity-95 max-w-[1250px] mb-5 leading-relaxed px-2"
      >
        Made to hold through early mornings, back-to-back meetings, the afternoon sun,<br className="hidden md:block" />
        the commute home and everything in between.
      </motion.h2>

      {/* 3. Four Image Cards Grid without Blur */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-[1100px]"
      >
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="group relative w-full h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden rounded-none cursor-pointer bg-black/20"
          >
            <Image
              src={asset(img.src)}
              alt={img.alt}
              fill
              className="object-cover scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle Overlay Effect */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
      </motion.div>

    </section>
  );
}