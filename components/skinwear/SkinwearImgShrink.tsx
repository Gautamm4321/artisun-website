'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function SkinwearImgShrink() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Width Transform: Full width se ~38% (right side box) tak shrink hoga
    const imageWidth = useTransform(scrollYProgress, [0.2, 0.6], ['100%', '38%']);

    // Content Fade-in: Jab image shrink hona start ho, tab left content smoothly aayega
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
    const textX = useTransform(scrollYProgress, [0.3, 0.6], [-30, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-[220vh] z-[16]">
            {/* Sticky Viewport Area with exact side paddings */}
            <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center px-8 md:px-16 lg:px-24">

                {/* Fixed Height Layout Frame */}
                <div className="w-full max-w-[1300px] h-[75vh] relative">

                    {/* LEFT CONTENT — absolute, left-anchored, fades in during phase 2 */}
                    <motion.div
                        style={{ opacity: textOpacity, x: textX }}
                        className="absolute left-0 top-0 h-full w-full md:w-[62%] flex flex-col justify-center space-y-6 md:space-y-8 text-left z-10"
                    >
                        {/* Subtitle */}
                        <p className="font-suisse text-[var(--brand-cream)]/80 text-[16px] md:text-[20px] tracking-wide font-normal">
                            Fashion is how you dress your body
                        </p>

                        {/* Main Editorial Heading */}
                        <h2 className="font-editorial text-[var(--brand-cream)] text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.08] tracking-[-0.02em]">
                            Skinwear is how
                            <br />
                            you dress your skin
                        </h2>

                        {/* Paragraph Text with Exact Line Breaks */}
                        <p className="font-suisse text-[var(--brand-cream)]/90 text-[16px] md:text-[19px] lg:text-[21px] leading-[1.5] max-w-[680px]">
                            So we&apos;re changing where sun care sits.
                            <br />
                            Out of the cabinet, into the conversation. Chosen
                            <br />
                            with intent, worn like you mean it — the same way
                            <br />
                            you choose everything else that&apos;s seen.
                        </p>
                    </motion.div>

                    {/* IMAGE — absolute, right-anchored: full width in Phase 1, shrinks to right box in Phase 2 */}
                    <motion.div
                        style={{ width: imageWidth }}
                        className="absolute right-0 top-0 h-full overflow-hidden z-20 rounded-[10px]"
                    >
                        <Image
                            src="/skinwear.shrink.img.jpeg"
                            alt="Skinwear Red Box Visual"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}