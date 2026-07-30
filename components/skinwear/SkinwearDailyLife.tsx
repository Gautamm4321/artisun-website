'use client';

import Image from 'next/image';
import Link from 'next/link';
import { asset } from '@/lib/asset';

/*
 * FRAME 4 — boxed headline over a three-column composition: copy, product,
 * copy — closed by the Wear Now call to action.
 */
export default function SkinwearDailyLife() {
  return (
    <section className="relative z-[15] w-full min-h-[100svh] flex flex-col justify-center px-6 md:px-16 lg:px-20 py-24 md:py-28">
      <h2 className="font-editorial text-[var(--brand-cream)] uppercase text-[clamp(1.8rem,3.1vw,3.8rem)] leading-[1.16] tracking-[-0.02em] text-justify [text-align-last:justify] w-full">
        Clothing for your skin, built for daily life
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr_1fr] gap-10 md:gap-12 items-center mt-12 md:mt-16">
        {/* Left copy */}
        <div className="order-2 md:order-1">
          <p className="font-suisse text-[var(--brand-cream)] text-[18px] md:text-[20px] lg:text-[24px] leading-[1.4]">
            <span className="font-editorial text-[clamp(1.5rem,2vw,2rem)]">
              Skinwear&trade;
            </span>{' '}
            <br className="hidden md:block" />
            is more than a
            <br />
            formula inside a bottle.
            <br />
            It is different
            <br />
            answers for
            <br />
            different mornings,
            <br />
            all held to the same
            <br />
            climate-smart
            <br />
            standard.
          </p>
        </div>

        {/* Centre product image + CTA */}
        <div className="order-1 md:order-2 flex flex-col items-center gap-6">
          <div className="relative w-full max-w-[460px] aspect-[2/2] overflow-hidden shadow-[0_50px_100px_-40px_rgba(0,0,0,0.55)]">
            <Image
              src={asset('/skinwear-media/daily-product.jpg')}
              alt="Skinwear, built for daily life"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          </div>

          <Link
            href="/"
            className="
              inline-flex items-center justify-center
              px-10 py-3 md:px-12 md:py-3.5
              rounded-full
              bg-[var(--brand-cream)]
              font-editorial text-[var(--brand-red)] text-[17px] md:text-[19px]
              shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)]
              transition-transform duration-500 hover:scale-[1.04]
            "
          >
            Wear Now
          </Link>
        </div>

        {/* Right copy */}
        <div className="order-3 md:order-3">
          <p className="font-suisse text-[var(--brand-cream)] text-[18px] md:text-[20px] lg:text-[24px] leading-[1.4] text-left md:text-right">
            The texture matters.
            <br />
            The weight in your
            <br />
            hand matters. The way
            <br />
            the bottle sits on a
            <br />
            shelf next to your other
            <br />
            essentials matters. We
            <br />
            make these decisions
            <br />
            with the same care a
            <br />
            tailor brings to a
            <br />
            garment.
          </p>
        </div>
      </div>
    </section>
  );
}
