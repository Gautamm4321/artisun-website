'use client';



import Image from 'next/image';

import { asset } from '@/lib/asset';



/*

 * FRAME 3 — statement split: justified boxed heading + subtext on the left

 * (the about-page heading treatment), full-height image column on the right.

 */

export default function SkinwearWorn() {

  return (

    <section className="relative z-[15] w-full min-h-[100svh] flex flex-col md:flex-row">

      {/* Left — copy */}

      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-20 md:py-0">

        <h2 className="font-editorial text-[var(--brand-cream)] uppercase text-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.28] tracking-[-0.01em] text-justify [text-align-last:justify] max-w-[21em]">

          Most sunscreens are designed to be tolerated. Skinwear is designed to

          be worn.

        </h2>



        <p className="font-suisse text-[var(--brand-cream)]/90 text-[18px] md:text-[21px] lg:text-[30px] leading-[1.4] text-justify mt-10 md:mt-14 max-w-[26em]">

          Chosen with the same intent as an outfit, and

          <br />

          worthy of the same attention. We are not making

          <br />

          suncare that you tolerate as a treatment We are

          <br />

          making the thing you'd want to wear, talk

          <br />

          about, and be seen in.

        </p>

      </div>



      {/* Right — full-height image */}

      <div className="relative w-full md:w-[30%] lg:w-[32%] h-[50svh] md:h-auto md:min-h-[100svh]">

        <Image

          src={asset('/skinwear-media/worn-product.jpg')}

          alt="Skinwear, designed to be worn"

          fill

          sizes="(max-width: 768px) 100vw, 38vw"

          className="object-cover"

        />

      </div>

    </section>

  );

}