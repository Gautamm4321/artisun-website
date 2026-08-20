'use client';

export default function HeroSection() {
  return (
    <section className="sticky top-0 w-full h-[100svh] overflow-hidden z-[1] flex items-center justify-center bg-[radial-gradient(130%_110%_at_50%_35%,_#FF7A29_0%,_#F05A15_40%,_#DE480B_75%,_#C93804_100%)]">
      {/* Subtle Center Glow — No dark or black overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />
    </section>
  );
}