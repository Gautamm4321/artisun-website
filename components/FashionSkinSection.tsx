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
                    src="/1.png"
                    alt=""
                    className="h-[150vh] max-w-none w-auto object-contain object-bottom block align-bottom"
                />
            </div>

           {/* Left Side: Description (Bigger Font Size & Top Synced) */}
            <div className="absolute top-[14%] sm:top-[16%] left-6 sm:left-12 lg:left-16 z-30 max-w-[340px] sm:max-w-[500px] pointer-events-none text-left">
                <p className="font-suisse text-[var(--brand-cream,#f5f0eb)] text-[22px] sm:text-[25px] lg:text-[31px] font-light leading-[1.12] tracking-[-0.01em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    Fashion gets weeks. Skin gets<br className="hidden sm:inline" />
                    a shelf. We&rsquo;re changing that.
                </p>
            </div>

            {/* Right Side: Indented Heading & Rectangular Borderless Button */}
            <div className="absolute top-[14%] sm:top-[16%] right-6 sm:right-12 lg:right-20 z-30 flex flex-col items-start w-auto max-w-[340px] sm:max-w-[460px] pointer-events-auto text-left">
                <h2 className="w-full font-editorial text-[var(--brand-cream,#f5f0eb)] text-[34px] sm:text-[52px] lg:text-[62px] leading-[1.02] tracking-[-0.01em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                    What&rsquo;s your skin<br />
                    <span className="inline-block pl-6 sm:pl-8 lg:pl-10">wearing today?</span>
                </h2>
                
                {/* Rectangular Borderless Button — Shifted Right */}
                <button
                    type="button"
                    className="w-full mt-4 sm:mt-6 py-3 sm:py-3.5 px-4 rounded-none border-0 bg-transparent text-[var(--brand-cream,#f5f0eb)] font-suisse text-[14px] sm:text-[16px] tracking-widest uppercase underline underline-offset-8 decoration-[var(--brand-cream,#f5f0eb)]/50 hover:decoration-[var(--brand-cream,#f5f0eb)] hover:opacity-80 transition-all active:scale-[0.99] translate-x-4 sm:translate-x-8 lg:translate-x-12"
                >
                    [Start wearing today button]
                </button>
            </div>

            {/* Background ARTISUN Brand Logo (Fitted 100% inside screen, shifted up) */}
            <div
                aria-hidden="true"
                className="absolute bottom-[2vh] sm:bottom-[3vh] lg:bottom-[4vh] left-1/2 -translate-x-1/2 z-10 w-[98vw] max-w-[1500px] px-4 flex justify-center pointer-events-none select-none"
            >
                <img
                    src="Artisun Primary Logo.png"
                    alt=""
                    className="w-full h-auto object-contain opacity-95 drop-shadow-[0_10px_35px_rgba(0,0,0,0.3)]"
                    draggable={false}
                />
            </div>

        </section>
    );
}