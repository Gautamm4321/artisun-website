'use client';

/*
 * FRAME 2 — the question, top-left, with the answer set as a justified
 * block in the lower-right quadrant (mirrors the home/about editorial grid).
 */
export default function SkinwearForgettable() {
  return (
    <section className="relative z-[15] w-full min-h-[100svh] flex flex-col justify-between px-6 md:px-16 lg:px-20 pt-28 md:pt-36 pb-20 md:pb-28">
      <h2 className="font-editorial text-[var(--brand-cream)] text-[clamp(2.2rem,5.2vw,5.2rem)] leading-[1.15] tracking-[-0.02em] max-w-[16em]">
        Why does something we use every single day feel so forgettable?
      </h2>

      <div className="w-full flex justify-end mt-16 md:mt-0">
        <div className="w-full md:w-[58%] lg:w-[52%] space-y-6 md:space-y-8">
          <p className="font-suisse text-[var(--brand-cream)]/90 text-[18px] md:text-[21px] lg:text-[24px] leading-[1.4] text-justify">
            Sun care in India had been treated like an afterthought for so long
            that nobody expected anything from it.
          </p>
          <p className="font-suisse text-[var(--brand-cream)]/90 text-[18px] md:text-[21px] lg:text-[24px] leading-[1.4] text-justify">
            It was a step you rushed, an ingredient list you didn&apos;t read, a
            texture you put up with. The category had simply stopped trying and
            we decided to change that.
          </p>
        </div>
      </div>
    </section>
  );
}
