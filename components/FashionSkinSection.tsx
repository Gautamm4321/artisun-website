'use client';

export default function FashionSkinSection() {
    return (
        <section 
            className="relative w-full h-[100svh] min-h-[650px] overflow-hidden select-none"
            style={{
                background: 'radial-gradient(ellipse at 50% 45%, #D44026 0%, #8A2718 50%, #420f08 100%)',
            }}
        >

{/* Ambient Radial Depth Vignette */}
            <div 
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(5,2,1,0.45) 100%)',
                }}
            />

            {/* Model Image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-end justify-center leading-none">
                <img
                    src="/bg1.png"
                    alt=""
                    className="h-[90vh] max-w-none w-auto object-contain object-bottom block align-bottom"
                />
            </div>

            {/* Text Block — Positioned at Yellow Mark */}
            {/* Text Block — Positioned Closer to Model */}
            <div className="absolute top-[24%] sm:top-[26%] lg:top-[28%] left-1/2 -translate-x-[95%] sm:-translate-x-[102%] lg:-translate-x-[108%] z-30 max-w-[280px] sm:max-w-[340px] pointer-events-auto text-left">
                <h2 className="font-editorial text-[var(--brand-cream,#f5f0eb)] text-[22px] sm:text-[28px] lg:text-[34px] leading-[1.12] tracking-tight">
                    What&apos;s your skin<br />
                    wearing today?
                </h2>
                <p className="font-suisse text-[var(--brand-cream,#f5f0eb)]/75 text-[12px] sm:text-[13.5px] lg:text-[14px] leading-relaxed mt-2.5 sm:mt-3">
                    Fashion gets weeks. Skin gets a shelf.<br />
                    We’re changing that.
                </p>
            </div>

            {/* Background ARTISUN Brand Watermark */}
            <div
                aria-hidden="true"
                className="absolute bottom-[-2vw] left-1/2 -translate-x-1/2 leading-[0.8] z-10"
            >
                <h1
                    className="
            whitespace-nowrap
            font-serif
            text-white/90
            tracking-[-0.06em]
            select-none
          "
                    style={{
                        fontSize: 'clamp(180px, 27vw, 650px)',
                        mixBlendMode: 'soft-light',
                        filter: 'brightness(0) invert(1)',
                    }}
                >
                    ARTISUN
                </h1>
            </div>
        </section>
    );
}