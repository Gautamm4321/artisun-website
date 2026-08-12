'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { asset } from '@/lib/asset';

export const FRAME_COUNT = 40;
const framePath = (i: number) => `/origin-frames/${String(i + 1).padStart(4, '0')}.webp`;

export type WhatsInController = {
  draw: (frame: number) => void;
  setReveal: (progress: number) => void;
  ready: () => boolean;
};

type Ingredient = {
  name: string;
  country: string;
  hook: string;
  long: string;
  side: 'left' | 'right';
  pos: string; // absolute-position classes for desktop
};

const INGREDIENTS: Ingredient[] = [
  {
    name: 'Beta-Glucan',
    country: 'Finland',
    hook: 'Holds moisture deeper than hyaluronic acid.',
    long: 'Finland grows the world\u2019s finest cosmetic beta-glucan, with forty years of dermatology behind it. It strengthens the skin\u2019s outer layer and keeps moisture locked in through the day \u2014 deeper and longer than hyaluronic acid manages. Not the active you notice. The one you\u2019d notice gone.',
    side: 'left',
    pos: 'lg:left-[8%] lg:top-[40%]',
  },
  {
    name: 'Camellia Sinensis',
    country: 'Japan',
    hook: 'Green tea, 100\u00d7 the antioxidant strength of vitamin E.',
    long: 'Japanese green tea, refined to its most concentrated form. Up to 100\u00d7 the antioxidant power of vitamin E, taking on the pollution and particulate matter your skin meets on any ordinary day out. Quietly defensive, always working.',
    side: 'right',
    pos: 'lg:right-[8%] lg:top-[28%]',
  },
  {
    name: 'Uvinul A Plus',
    country: 'Germany',
    hook: 'One of the most advanced UVA filters made anywhere in the world.',
    long: 'It holds its structure in sunlight instead of degrading through the morning \u2014 so the protection you put on at eight is still the protection you have at four.',
    side: 'right',
    pos: 'lg:right-[8%] lg:top-[56%]',
  },
];

function Connector({ side }: { side: 'left' | 'right' }) {
  const line = <span className="block w-10 lg:w-16 border-t border-dashed border-[var(--brand-cream)]/40" />;
  const dot = <span className="block w-1.5 h-1.5 rounded-full bg-[var(--brand-red)] shrink-0" />;
  return (
    <span className={`hidden lg:flex items-center gap-1 ${side === 'left' ? '' : 'flex-row-reverse'}`}>
      {line}
      {dot}
    </span>
  );
}

const OriginWhatsIn = forwardRef<WhatsInController>(function OriginWhatsIn(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const readyRef = useRef(false);
  const lastFrameRef = useRef(-1);

  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  // Preload every frame, then draw frame 0.
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let done = 0;
    const finish = () => {
      done++;
      if (done === FRAME_COUNT && !cancelled) {
        imagesRef.current = imgs;
        const canvas = canvasRef.current;
        if (canvas && imgs[0]) {
          canvas.width = imgs[0].naturalWidth;
          canvas.height = imgs[0].naturalHeight;
        }
        readyRef.current = true;
        setLoaded(true);
        drawFrame(0);
      }
    };
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = finish;
      img.onerror = finish;
      img.src = asset(framePath(i));
      imgs[i] = img;
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frame];
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useImperativeHandle(
    ref,
    (): WhatsInController => ({
      draw: (frame: number) => {
        if (!readyRef.current) return;
        const i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frame)));
        if (i === lastFrameRef.current) return;
        lastFrameRef.current = i;
        drawFrame(i);
      },
      setReveal: (progress: number) => {
        const el = calloutsRef.current;
        if (!el) return;
        const o = Math.max(0, Math.min(1, (progress - 0.5) / 0.35));
        el.style.opacity = String(o);
        el.style.transform = `translateY(${(1 - o) * 14}px)`;
      },
      ready: () => readyRef.current,
    }),
    []
  );

  return (
    <div
      id="origin-whatsin"
      className="origin-panel relative w-full lg:w-screen shrink-0 min-h-[100svh] lg:h-screen overflow-hidden"
    >
      {/* Dark backdrop + soft glow so the red bottle pops */}
      <div className="absolute inset-0 bg-[var(--brand-dark)]/70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 46%, rgba(201,59,26,0.28), transparent 70%)',
        }}
      />

      {/* Heading */}
      <div className="absolute z-20 top-24 lg:top-[104px] left-5 sm:left-8 lg:left-14 right-5">
        <h2 className="font-editorial text-[var(--brand-cream)] text-[28px] sm:text-[40px] lg:text-[52px] leading-[1.05] tracking-tight max-w-[16ch]">
          The good version of everything.
        </h2>
      </div>

      {/* Bottle canvas (centered) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="h-[54vh] sm:h-[60vh] lg:h-[80vh] w-auto"
          style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.45))' }}
        />
      </div>

      {/* Loader until frames are ready */}
      {!loaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-[var(--brand-cream)]/25 border-t-[var(--brand-cream)] animate-spin" />
        </div>
      )}

      {/* Ingredient callouts (revealed once the cap opens) */}
      <div
        ref={calloutsRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(14px)', transition: 'none' }}
      >
        <div className="relative h-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col justify-end pb-28 gap-4 lg:block lg:pb-0">
          {INGREDIENTS.map((ing, i) => {
            const isOpen = open === i;
            return (
              <div
                key={ing.name}
                className={`pointer-events-auto lg:absolute w-full lg:w-[300px] ${ing.pos} ${
                  ing.side === 'right' ? 'lg:text-right' : ''
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  onMouseEnter={() => setOpen(i)}
                  onMouseLeave={() => setOpen((c) => (c === i ? null : c))}
                  className="w-full text-left group"
                >
                  <span
                    className={`flex items-center gap-3 ${
                      ing.side === 'right' ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <Connector side={ing.side} />
                    <span className={`block ${ing.side === 'right' ? 'lg:text-right' : ''}`}>
                      <span className="font-suisse text-[15px] sm:text-base text-[var(--brand-cream)]">
                        {ing.name}
                        <span className="text-[var(--brand-cream)]/45"> · {ing.country}</span>
                      </span>
                      <span className="block font-suisse text-[13px] leading-[1.5] text-[var(--brand-cream)]/70 mt-1 max-w-[34ch]">
                        {ing.hook}
                      </span>
                    </span>
                  </span>

                  {/* Long description */}
                  <span
                    className={`grid transition-[grid-template-rows] duration-[400ms] ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <span className="overflow-hidden block">
                      <span className="block font-suisse text-[12.5px] leading-[1.6] text-[var(--brand-cream)]/55 pt-2 max-w-[36ch]">
                        {ing.long}
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default OriginWhatsIn;
