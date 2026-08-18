'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { asset } from '@/lib/asset';

// ── 4 Images for 4 Cities ──
const CLIMATE_SLIDES = [
  {
    image: asset('/skinwear.shrink.img.jpeg'),
    text: "A Shimla winter pulls all the moisture out, and by afternoon your skin’s tight and flaking.",
  },
  {
    image: asset('/skinwear.shrink.img.jpeg'),
    text: "In the Jaipur heat, whatever you put on is gone before noon.",
  },
  {
    image: asset('/skinwear.shrink.img.jpeg'),
    text: "Bangalore’s humidity leaves everything sitting greasy, pilling the moment you touch makeup.",
  },
  {
    image: asset('/skinwear.shrink.img.jpeg'),
    text: "And in Bombay, all it takes is one downpour, and your face is an oily mess.",
  },
];

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

function makeCubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const A = (a1: number, a2: number) => 1.0 - 3.0 * a2 + 3.0 * a1;
  const B = (a1: number, a2: number) => 3.0 * a2 - 6.0 * a1;
  const C = (a1: number) => 3.0 * a1;
  const calc = (t: number, a1: number, a2: number) => ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
  const slope = (t: number, a1: number, a2: number) => 3.0 * A(a1, a2) * t * t + 2.0 * B(a1, a2) * t + C(a1);
  const getTForX = (x: number) => {
    let t = x;
    for (let i = 0; i < 6; i++) {
      const xEst = calc(t, p1x, p2x) - x;
      if (Math.abs(xEst) < 1e-6) return t;
      const d = slope(t, p1x, p2x);
      if (Math.abs(d) < 1e-4) break;
      t -= xEst / d;
    }
    let lo = 0, hi = 1;
    t = x;
    for (let i = 0; i < 12; i++) {
      const xEst = calc(t, p1x, p2x);
      if (Math.abs(xEst - x) < 1e-6) return t;
      if (x > xEst) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return t;
  };
  return (x: number) => calc(getTForX(clamp01(x)), p1y, p2y);
}

const cinematicEase = makeCubicBezier(0.22, 1, 0.36, 1);

export default function ClimateVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const N = CLIMATE_SLIDES.length;
    if (!containerRef.current) return;

    const HOLD_LEN = 1.2;
    const TRANS_LEN = 0.7;
    type Segment = { type: 'hold' | 'trans'; index: number; len: number; start: number };
    const segments: Segment[] = [];
    {
      let acc = 0;
      for (let i = 0; i < N; i++) {
        segments.push({ type: 'hold', index: i, len: HOLD_LEN, start: acc });
        acc += HOLD_LEN;
        if (i < N - 1) {
          segments.push({ type: 'trans', index: i, len: TRANS_LEN, start: acc });
          acc += TRANS_LEN;
        }
      }
    }
    const totalLen = segments.reduce((s, seg) => s + seg.len, 0);

    const locate = (rawUnits: number) => {
      const u = Math.min(Math.max(rawUnits, 0), totalLen - 1e-6);
      let seg = segments[segments.length - 1];
      for (let i = 0; i < segments.length; i++) {
        const next = segments[i + 1];
        if (!next || u < next.start) { seg = segments[i]; break; }
      }
      const local = clamp01((u - seg.start) / seg.len);
      if (seg.type === 'hold') {
        return { fromIdx: seg.index, toIdx: seg.index, e: 0, isHold: true };
      }
      return { fromIdx: seg.index, toIdx: seg.index + 1, e: cinematicEase(local), isHold: false };
    };

    const setRest = (i: number, active: boolean) => {
      gsap.set(slideRefs.current[i], {
        autoAlpha: active ? 1 : 0,
        zIndex: active ? 2 : 0,
      });
      gsap.set(imgWrapRefs.current[i], { scale: 1, autoAlpha: active ? 1 : 0 });
      gsap.set(textRefs.current[i], { autoAlpha: active ? 1 : 0, y: 0 });
    };

    const applyOut = (i: number, e: number) => {
      gsap.set(slideRefs.current[i], {
        autoAlpha: 1 - e,
        zIndex: 1,
      });
      gsap.set(imgWrapRefs.current[i], {
        scale: 1 - 0.04 * e,
        autoAlpha: 1 - e,
      });
      gsap.set(textRefs.current[i], {
        y: -30 * e,
        autoAlpha: 1 - e,
      });
    };

    const applyIn = (i: number, e: number) => {
      const inv = 1 - e;
      gsap.set(slideRefs.current[i], {
        autoAlpha: e,
        zIndex: 2,
      });
      gsap.set(imgWrapRefs.current[i], {
        scale: 1.04 - 0.04 * e,
        autoAlpha: e,
      });
      gsap.set(textRefs.current[i], {
        y: 40 * inv,
        autoAlpha: e,
      });
    };

    const update = (progress: number) => {
      const { fromIdx, toIdx, e, isHold } = locate(progress * totalLen);

      for (let i = 0; i < N; i++) {
        if (isHold) {
          setRest(i, i === fromIdx);
        } else if (i === fromIdx) {
          applyOut(i, e);
        } else if (i === toIdx) {
          applyIn(i, e);
        } else {
          setRest(i, false);
        }
      }

      const dominant = isHold ? fromIdx : e < 0.5 ? fromIdx : toIdx;
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const active = i === dominant;
        gsap.set(dot, {
          opacity: active ? 1 : 0.25,
          scale: active ? 1.4 : 1,
          backgroundColor: active ? '#ffffff' : '#888888',
        });
      });
    };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      anticipatePin: 1,
      start: 'top top',
      end: `+=${totalLen * 100}%`,
      scrub: 0.6,
      onUpdate: (self) => update(self.progress),
    });

    update(st.progress);

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] bg-[#0d0908] overflow-hidden z-20">
      <div className="relative w-full h-full">
        
        {CLIMATE_SLIDES.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-between pointer-events-none"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* ── LEFT: 65% Full-Height & Frame-Covering Image ── */}
            <div className="w-full lg:w-[65%] h-[55vh] lg:h-full relative overflow-hidden">
              <div
                ref={(el) => { imgWrapRefs.current[i] = el; }}
                className="relative w-full h-full overflow-hidden"
              >
                <Image
                  src={slide.image}
                  alt={`Climate Slide ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
            </div>

            {/* ── RIGHT: Text Area with Left Alignment ── */}
            <div className="w-full lg:w-[35%] h-[45vh] lg:h-full flex flex-col justify-center items-start px-6 sm:px-12 lg:px-16 text-left">
              <p
                ref={(el) => { textRefs.current[i] = el; }}
                className="font-editorial text-[24px] sm:text-[30px] lg:text-[36px] xl:text-[40px] leading-[1.25] text-[var(--brand-cream,#f5f0eb)] tracking-tight text-left"
              >
                {slide.text}
              </p>
            </div>
          </div>
        ))}

        {/* ── Progress Navigation Dots ── */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none">
          {CLIMATE_SLIDES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotsRef.current[i] = el; }}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                opacity: i === 0 ? 1 : 0.25,
                backgroundColor: i === 0 ? '#ffffff' : '#888888',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}