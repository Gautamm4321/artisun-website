'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

export type StoryParagraph = { text: string; em?: string };

/**
 * Sticky editorial text on one side, three product shots scrolling past on the
 * other. As each shot enters the viewport the copy on the sticky side cross-
 * fades to the matching paragraph — three photos, three beats of the story.
 * When the last shot has scrolled through, the whole section releases.
 */
export default function ProductScrollStory({
  productLabel,
  productSub,
  paragraphs,
  images,
  flip = false,
}: {
  productLabel: string;
  productSub: string;
  paragraphs: StoryParagraph[];
  images: string[];
  flip?: boolean;
}) {
  const [active, setActive] = useState(0);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );
    slotRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full">
      <div className="md:grid md:grid-cols-2">
        {/* ── Sticky copy side ── */}
        <div className={flip ? 'md:order-2' : ''}>
          <div className="sticky top-0 h-[100svh] flex items-center">
            <div className="w-full px-6 md:px-12 lg:px-20 py-16">
              {/* product tag */}
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--brand-cream)]/40" />
                <span className="font-suisse uppercase tracking-[0.28em] text-[11px] md:text-[12px] text-[var(--brand-cream)]/70">
                  {productLabel} · {productSub}
                </span>
              </div>

              {/* cross-fading paragraphs (stacked; height held by the tallest) */}
              <div className="relative">
                {/* invisible spacer keeps the block height stable across paragraphs */}
                <div aria-hidden className="invisible">
                  {paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="font-editorial text-[22px] md:text-[26px] lg:text-[30px] leading-[1.45]"
                    >
                      {p.text} {p.em ?? ''}
                    </p>
                  ))}
                </div>

                {paragraphs.map((p, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-all duration-700 ease-out"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: active === i ? 'translateY(0)' : 'translateY(14px)',
                    }}
                  >
                    <p className="font-editorial text-[var(--brand-cream)] text-[22px] md:text-[26px] lg:text-[30px] leading-[1.45]">
                      {p.text}
                    </p>
                    {p.em && (
                      <p className="font-editorial italic text-[#F2A65C] text-[22px] md:text-[26px] lg:text-[30px] leading-[1.45] mt-3">
                        {p.em}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* progress index */}
              <div className="mt-10 flex items-center gap-3">
                {paragraphs.map((_, i) => (
                  <span
                    key={i}
                    className="h-[3px] rounded-full transition-all duration-500"
                    style={{
                      width: active === i ? 34 : 14,
                      background:
                        active === i ? 'var(--brand-cream)' : 'rgba(232,220,200,0.28)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrolling product shots ── */}
        <div className={flip ? 'md:order-1' : ''}>
          {images.map((src, i) => (
            <div
              key={src}
              data-idx={i}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className="h-[100svh] flex items-center justify-center px-6 md:px-8"
            >
              <div className="relative w-full max-w-[560px] h-[86vh] rounded-[24px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
                <Image
                  src={asset(src)}
                  alt={`${productLabel} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
