'use client';

export default function FashionSkinSection() {
    return (
        <section className="relative w-full h-[100svh] min-h-[650px] overflow-hidden bg-[#84190c] select-none">

            {/* Model Image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-end justify-center leading-none">
                <img
                    src="/bg1.png"
                    alt=""
                    className="h-[90vh] max-w-none w-auto object-contain object-bottom block align-bottom"
                />
            </div>

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