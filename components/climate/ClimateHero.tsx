'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import Image from 'next/image';
import { asset } from '@/lib/asset';

type WeatherBand = 'WET' | 'COLD' | 'DRY_HEAT' | 'HUMID_HEAT' | 'HIGH_SUN' | 'MILD';

interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  uvIndex: number;
  precip: boolean;
  band: WeatherBand;
}

interface BandDetails {
  readLine: string;
  originPumps: string;
  auraPearls: string;
  reapplyLine: string;
  leadProduct: 'Aura' | 'Origin';
}

interface BandVisual {
  sunx: string;
  suny: string;
  skyWash: string;
}

const BAND_CONFIGS: Record<WeatherBand, BandDetails> = {
  HUMID_HEAT: {
    readLine: 'Sticky and hot out. You want light, not layers, today.',
    originPumps: '2 pumps',
    auraPearls: '2 pearls - "light and fresh, melts right in"',
    reapplyLine: 'Top up every 2 hours - the sweat eats it faster today.',
    leadProduct: 'Aura',
  },
  DRY_HEAT: {
    readLine: 'Dry heat and strong sun. Your skin will drink this up.',
    originPumps: '2-3 pumps - "go for 3 if your skin feels tight"',
    auraPearls: '2 pearls - "and Origin underneath if you want the extra moisture"',
    reapplyLine: 'Reapply every 2 hours - high sun, low mercy.',
    leadProduct: 'Origin',
  },
  HIGH_SUN: {
    readLine: "Bright out. The UV is doing the most today, even if it doesn't feel like it.",
    originPumps: '2 pumps',
    auraPearls: '2 pearls - "even, light coverage"',
    reapplyLine: "This is a reapply day — every 2 hours if you're out.",
    leadProduct: 'Aura',
  },
  COLD: {
    readLine: 'Cold and dry. Your skin wants a little more today.',
    originPumps: '3 pumps - "a touch more to keep skin from going tight"',
    auraPearls: '3 pearls - "more nourishment for the dry cold"',
    reapplyLine: "Every 3 hours is fine - the sun's gentler now.",
    leadProduct: 'Origin',
  },
  WET: {
    readLine: 'Damp and humid. A little goes a long way right now.',
    originPumps: '2 pumps',
    auraPearls: '1-2 pearls - "light, and it holds through the damp"',
    reapplyLine: 'After you get caught in the rain, or every 2-3 hours out.',
    leadProduct: 'Aura',
  },
  MILD: {
    readLine: "Easy weather today but the sun's still on. Don't skip it.",
    originPumps: '2 pumps',
    auraPearls: '2 pearls - "your everyday amount"',
    reapplyLine: "Every 2-3 hours if you're out for long.",
    leadProduct: 'Aura',
  },
};

// ── Step 5: Visual state per band ──
const BAND_VISUALS: Record<WeatherBand, BandVisual> = {
  HUMID_HEAT: { sunx: '78%', suny: '14%', skyWash: 'rgba(255,175,90,.5)' },
  DRY_HEAT:   { sunx: '60%', suny: '8%',  skyWash: 'rgba(255,150,70,.6)' },
  HIGH_SUN:   { sunx: '68%', suny: '10%', skyWash: 'rgba(255,190,120,.5)' },
  COLD:       { sunx: '30%', suny: '22%', skyWash: 'rgba(150,180,200,.4)' },
  WET:        { sunx: '70%', suny: '26%', skyWash: 'rgba(150,160,165,.45)' },
  MILD:       { sunx: '72%', suny: '16%', skyWash: 'rgba(230,200,150,.4)' },
};

// Default fallback values used when geo fails entirely (spec fallback table)
const GEO_FAIL_DEFAULTS = {
  readLine: 'Built for skin, built for weather — wherever you are.',
  originPumps: '2 pumps',
  auraPearls: '2 pearls - "your everyday amount"',
  reapplyLine: 'Every 2-3 hours if you\'re out for long.',
  leadProduct: 'Aura' as const,
};

// UV color coding: 0-2 low (green) → 8-10 very high (red) → 11+ extreme
function uvColor(uv: number): string {
  if (uv <= 2) return '#8FBF6B';       // low - green
  if (uv <= 5) return '#F2C94C';       // moderate - yellow
  if (uv <= 7) return '#F2994A';       // high - orange
  if (uv <= 10) return '#EB5757';      // very high - red
  return '#C0392B';                    // extreme - deep red
}

// Count-up hook for the temperature number
function useCountUp(target: number | null, duration = 1) {
  const [display, setDisplay] = useState(0);
  const prevTarget = useRef<number | null>(null);

  useEffect(() => {
    if (target === null) return;
    const from = prevTarget.current ?? 0;
    const controls = animate(from, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prevTarget.current = target;
    return () => controls.stop();
  }, [target, duration]);

  return display;
}

export default function ClimateHero() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [geoError, setGeoError] = useState<boolean>(false);       // geo fully failed
  const [weatherError, setWeatherError] = useState<boolean>(false); // city ok, weather API failed

  useEffect(() => {
    async function fetchLocationAndWeather() {
      setLoading(true);
      let city: string | null = null;
      let lat: number | null = null;
      let lon: number | null = null;

      // 1. Silent IP Geolocation
      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        if (!ipRes.ok) throw new Error('Geo IP failed');
        const ipData = await ipRes.json();
        city = ipData.city || null;
        lat = ipData.latitude ?? null;
        lon = ipData.longitude ?? null;
        if (!city || lat === null || lon === null) throw new Error('Geo incomplete');
      } catch (err) {
        console.error('Geo fetch error:', err);
        setGeoError(true);
        setLoading(false);
        return; // Nothing more we can do — full fallback state
      }

      // 2. Open-Meteo Current Weather + Daily Peak UV
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation&daily=uv_index_max&timezone=auto`
        );
        if (!weatherRes.ok) throw new Error('Weather API failed');
        const weatherData = await weatherRes.json();

        const temp = Math.round(weatherData.current.temperature_2m);
        const humidity = Math.round(weatherData.current.relative_humidity_2m);
        const precip = weatherData.current.precipitation > 0;
        const uvIndex = Math.round(weatherData.daily.uv_index_max[0] ?? 5);

        // Step 1 — Classify (temp <= 15, per spec)
        let band: WeatherBand = 'MILD';
        if (precip || humidity >= 80) {
          band = 'WET';
        } else if (temp <= 15) {
          band = 'COLD';
        } else if (temp >= 38 && humidity < 40) {
          band = 'DRY_HEAT';
        } else if (temp >= 30 && humidity >= 55) {
          band = 'HUMID_HEAT';
        } else if (uvIndex >= 8 && humidity < 55) {
          band = 'HIGH_SUN';
        }

        setWeather({ city: city as string, temp, humidity, uvIndex, precip, band });
        setWeatherError(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        // City known, weather failed — keep city, hide numbers
        setWeather({ city: city as string, temp: 0, humidity: 0, uvIndex: 0, precip: false, band: 'MILD' });
        setWeatherError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchLocationAndWeather();
  }, []);

  const currentBand = weather?.band || 'MILD';
  const bandConfig = geoError ? null : BAND_CONFIGS[currentBand];
  const bandVisual = geoError ? BAND_VISUALS.MILD : BAND_VISUALS[currentBand];

  const animatedTemp = useCountUp(!loading && !geoError && !weatherError ? weather?.temp ?? null : null, 1.2);

  // ── Heading logic per fallback spec ──
  let heading = 'Your weather, right now';
  if (geoError) heading = 'Built for wherever you are';
  else if (weatherError) heading = "Sun care built for your weather, whatever it's doing today";

  // ── Content used for read-line / doses / reapply / lead product ──
  const activeConfig = geoError
    ? GEO_FAIL_DEFAULTS
    : bandConfig ?? GEO_FAIL_DEFAULTS;

  return (
    <section
      className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 pt-24 pb-12 text-[var(--brand-cream)]"
      style={
        {
          '--sunx': bandVisual.sunx,
          '--suny': bandVisual.suny,
        } as React.CSSProperties
      }
    >
      {/* ── Step 5: Sky wash background layer, driven by band ── */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-[background] duration-[1200ms] ease-out"
        style={{
          background: `radial-gradient(circle at var(--sunx) var(--suny), ${bandVisual.skyWash}, transparent 60%)`,
        }}
      />

      {/* 1. Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-editorial text-[clamp(2.5rem,5.5vw,4.5rem)] text-center mb-3 font-normal tracking-wide"
      >
        {heading}
      </motion.h1>

      {/* 2. Weather Widget Box — hidden entirely if geo failed */}
      {!geoError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[620px] bg-black/25 backdrop-blur-md rounded-lg pt-4 pb-5 px-6 md:px-8 border border-white/10 text-center shadow-2xl mb-4"
        >
          <p className="text-base md:text-lg font-editorial tracking-wide opacity-90 mb-3">
            {weather?.city ? `Right now in [${weather.city}]` : 'Sun care for your weather'}
          </p>

          {weatherError ? (
            // Weather API failed but city is known — hide numbers per spec
            <p className="text-sm md:text-base opacity-80 font-light py-4">
              Weather details aren&apos;t available right now — but the essentials never change.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 md:gap-4 items-baseline justify-center">
              {/* Temperature — count-up animated */}
              <div className="flex flex-col items-center">
                <span className="font-editorial text-[clamp(2.5rem,5.5vw,4.2rem)] leading-none">
                  {loading ? '--' : `${animatedTemp}°`}
                </span>
                <span className="text-xs md:text-sm opacity-80 mt-1 font-sans">Celsius</span>
              </div>

              {/* Humidity */}
              <div className="flex flex-col items-center">
                <span className="font-editorial text-[clamp(2.5rem,5.5vw,4.2rem)] leading-none">
                  {loading ? '--' : `${weather?.humidity ?? 60}%`}
                </span>
                <span className="text-xs md:text-sm opacity-80 mt-1 font-sans">Humidity</span>
              </div>

              {/* UV Index — colour-coded per spec */}
              <div className="flex flex-col items-center">
                <span
                  className="font-editorial text-[clamp(2.5rem,5.5vw,4.2rem)] leading-none transition-colors duration-500"
                  style={{ color: loading ? undefined : uvColor(weather?.uvIndex ?? 6) }}
                >
                  {loading ? '--' : (weather?.uvIndex ?? 6)}
                </span>
                <span className="text-xs md:text-sm opacity-80 mt-1 font-sans">UV (Today&apos;s Peak)</span>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* 3. Recommendation & ReadLine */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center max-w-[720px] mb-6 px-4 font-sans leading-relaxed tracking-wide space-y-1"
      >
        <p className="text-lg md:text-xl font-normal opacity-95 italic">
          &quot;{activeConfig.readLine}&quot;
        </p>
        <p className="text-sm md:text-base opacity-80 font-light">
          Here&rsquo;s what your skin can wear today:
        </p>
      </motion.div>

      {/* 4. Product Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[760px]"
      >
        {/* CARD 1: Aura */}
        <div className="bg-black/25 backdrop-blur-md rounded-none border border-white/10 overflow-hidden flex flex-col justify-between h-full group hover:border-white/20 transition-all relative">
          {activeConfig.leadProduct === 'Aura' && (
            <span className="absolute top-2 right-2 bg-[#EAE3D2] text-[#6B241A] text-[10px] uppercase font-bold px-2 py-0.5 z-20">
              Today&apos;s Pick
            </span>
          )}
          <div className="p-5 flex items-start gap-4">
            <div className="relative w-24 h-24 md:w-28 md:h-28 bg-[#8B3A32] flex-shrink-0 overflow-hidden rounded-none">
              <Image
                src={asset('/skinwear-media/daily-product.jpg')}
                alt="Aura"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center pt-1">
              <h3 className="font-editorial text-3xl md:text-4xl mb-1 leading-none">Aura</h3>
              <p className="text-sm md:text-base opacity-90 leading-tight font-sans mt-1">
                {activeConfig.auraPearls}
              </p>
            </div>
          </div>
          <button type="button" className="w-full bg-[#EAE3D2] text-[#6B241A] py-3 text-sm md:text-base font-medium hover:bg-white transition-colors">
            Add to bag
          </button>
        </div>

        {/* CARD 2: Origin */}
        <div className="bg-black/25 backdrop-blur-md rounded-none border border-white/10 overflow-hidden flex flex-col justify-between h-full group hover:border-white/20 transition-all relative">
          {activeConfig.leadProduct === 'Origin' && (
            <span className="absolute top-2 right-2 bg-[#EAE3D2] text-[#6B241A] text-[10px] uppercase font-bold px-2 py-0.5 z-20">
              Today&apos;s Pick
            </span>
          )}
          <div className="p-5 flex items-start gap-4">
            <div className="relative w-24 h-24 md:w-28 md:h-28 bg-[#8B3A32] flex-shrink-0 overflow-hidden rounded-none">
              <Image
                src={asset('/about-media/origin-1.jpg')}
                alt="Origin"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center pt-1">
              <h3 className="font-editorial text-3xl md:text-4xl mb-1 leading-none">Origin</h3>
              <p className="text-sm md:text-base opacity-90 leading-tight font-sans mt-1">
                {activeConfig.originPumps}
              </p>
            </div>
          </div>
          <button type="button" className="w-full bg-[#EAE3D2] text-[#6B241A] py-3 text-sm md:text-base font-medium hover:bg-white transition-colors">
            Add to bag
          </button>
        </div>
      </motion.div>

      {/* 5. Reapply Line — always shown */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center text-xs md:text-sm opacity-80 mt-6 font-sans font-light tracking-wide bg-black/20 px-4 py-2 border border-white/5 rounded-full"
      >
        <span className="font-medium text-white">Reapply:</span> {activeConfig.reapplyLine}
      </motion.p>
    </section>
  );
}