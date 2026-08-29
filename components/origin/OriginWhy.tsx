'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { asset } from '@/lib/asset';
import CountUp from './CountUp';

type Stat = { index: string; label: string; value: number; suffix: string; copy: string; mobileCopy: string };

const STATS: Stat[] = [
  { index: '01', label: 'Serum', value: 20, suffix: '%', copy: "deeper hydration than hyaluronic acid — the Beta-Glucan that does a serum's barrier work.", mobileCopy: 'deeper hydration than hyaluronic acid' },
  { index: '02', label: 'Moisturiser', value: 72, suffix: ' hrs', copy: 'of continuous moisture — hydration that holds, long after it goes on.', mobileCopy: 'of continuous moisture' },
  { index: '03', label: 'Sunscreen', value: 98, suffix: '%', copy: 'of UVB blocked — a full SPF 50+ PA++++ shield, tested to protect.', mobileCopy: 'of UVB blocked' },
  { index: '04', label: 'Primer', value: 0, suffix: '', copy: 'pilling or slide — a smooth, even base makeup grips to.', mobileCopy: 'pilling or slide' },
  { index: '05', label: 'Over time', value: 4, suffix: ' weeks', copy: 'to a visibly stronger skin barrier, used daily.', mobileCopy: 'to a visibly stronger skin barrier, used daily.' },
];

const BG_IMAGE_DESKTOP = '/pdp/origin-why-desktop.jpg';
const BG_IMAGE_MOBILE = '/pdp/origin-why-mobile.jpg';

export default function OriginWhy() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-15%' });

  return (
    <div id="origin-why" className="origin-panel relative w-screen shrink-0 h-screen overflow-hidden">
      {/* Full-bleed background — shown AS IS. Both scrims are gone: the
          `bg-black/55` wash and the top/bottom gradient. Legibility now comes
          from the frosted panels on the copy and stat boxes instead, so the
          photograph itself stays clean. */}
      <Image
        src={asset(BG_IMAGE_MOBILE)}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center lg:hidden"
      />
      <Image
        src={asset(BG_IMAGE_DESKTOP)}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center hidden lg:block"
      />

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-14 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-[104px] lg:pb-16 flex flex-col justify-between overflow-hidden">
        {/* Top: Center on mobile, 2-col on desktop */}
        {/* Type sizes on mobile now match frame 3 (OriginWhere): 30px heading,
            15px body — they were 22px/11px, noticeably smaller than every
            neighbouring panel. */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 sm:gap-3 lg:grid lg:grid-cols-2 lg:gap-16 shrink-0 mt-2 sm:mt-4 lg:mt-0 rounded-2xl lg:rounded-none bg-black/45 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 lg:p-0">
          <h2 className="font-editorial text-[var(--brand-cream)] text-[30px] sm:text-[46px] lg:text-[54px] leading-[1.03] lg:leading-[1.08] tracking-tight max-w-[24ch] lg:max-w-[15ch] drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
            The most boring step in your morning, <br className="hidden sm:inline lg:hidden" />finally worth it.
          </h2>
          <p className="font-suisse text-[var(--brand-cream)]/85 text-[15px] sm:text-[18px] lg:text-[19px] leading-[1.4] lg:leading-[1.5] max-w-[36ch] sm:max-w-[48ch] lg:pt-2 lg:justify-self-end mt-2 lg:mt-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            You use four products before you&apos;ve even left the house — serum, moisturiser, sunscreen, primer, one after the other. Origin is all four, in one light layer.
          </p>
        </div>

      {/* Bottom-aligned stats: 2 Top / 3 Bottom on Mobile | 5 Columns on Desktop */}
        <div
          ref={statsRef}
          /* Every box is now the same width and height. Previously row 1 was
             50%-wide / row 2 was 33%-wide, so the five tiles were two different
             sizes. A 3-col grid makes them uniform and the last two centre
             themselves. mb-auto pulls the whole block up off the bottom edge —
             that was the large dead gap in the middle of the page. */
          className="w-full grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 lg:gap-x-0 max-w-[390px] lg:max-w-none mx-auto shrink-0 mt-4 mb-auto lg:mt-0 lg:mb-0 pb-2 sm:pb-3 lg:pb-0"
        >
          {STATS.map((s, idx) => {
            const isLast2 = idx >= 3;
            return (
              <div
                key={s.index}
                className={`${isLast2 && idx === 3 ? 'col-start-1 lg:col-start-auto' : ''} h-[92px] sm:h-[100px] lg:w-auto lg:h-auto p-2 sm:p-2.5 lg:p-0 rounded-xl lg:rounded-none bg-black/50 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/20 lg:border-0 lg:border-l lg:border-[var(--brand-cream)]/18 lg:first:border-l-0 lg:px-7 lg:first:pl-0 flex flex-col justify-between shadow-lg lg:shadow-none`}
              >
                <div>
                  <div className="font-suisse text-[8.5px] sm:text-[9.5px] lg:text-[11px] tracking-[0.12em] uppercase text-[var(--brand-cream)]/60">
                    {s.index} · {s.label}
                  </div>
                  <div className="font-editorial text-[var(--brand-cream)] text-[18px] sm:text-[22px] lg:text-[60px] leading-none mt-1 lg:mt-2 tabular-nums drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                    <CountUp end={s.value} suffix={s.suffix} play={inView} duration={2} />
                  </div>
                </div>

                <p className="font-suisse text-[8px] sm:text-[9.5px] lg:text-[13px] leading-[1.2] lg:leading-[1.5] text-[var(--brand-cream)]/75 mt-1 lg:mt-3 line-clamp-2">
                  <span className="lg:hidden">{s.mobileCopy}</span>
                  <span className="hidden lg:inline">{s.copy}</span>
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}