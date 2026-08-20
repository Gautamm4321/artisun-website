'use client';

export default function HeroSection() {
  return (
    <section className="sticky top-0 w-full h-[100svh] overflow-hidden z-[1] flex items-center justify-center bg-[radial-gradient(135%_120%_at_50%_20%,_#E8551E_0%,_#C43612_28%,_#8D180C_60%,_#460905_100%)]">
      {/* Subtle Center Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />
    </section>
  );
}