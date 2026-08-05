'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function SkinwearImgShrink2() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Width Transform: Full width se ~38% (left side box) tak shrink hoga
    const imageWidth = useTransform(
        scrollYProgress,
        [0.2, 0.6],
        ['100%', '38%']
    );

    // Text appears once and stays visible
    const textOpacity = useTransform(
        scrollYProgress,
        [0.3, 0.6, 1],
        [0, 1, 1]
    );

    const textX = useTransform(
        scrollYProgress,
        [0.3, 0.6, 1],
        [30, 0, 0]
    );

    // Blur only during entry
    const textBlur = useTransform(
        scrollYProgress,
        [0.3, 0.6, 1],
        ['10px', '0px', '0px']
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[240vh] sm:h-[230vh] md:h-[220vh] z-[16]"
        >
            {/* Sticky Viewport Area with exact side paddings */}
            <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center px-5 sm:px-8 md:px-16 lg:px-24">

                {/* Fixed Height Layout Frame */}
                <div className="w-full max-w-[1300px] h-[82svh] sm:h-[78vh] md:h-[75vh] relative">

                    {/* IMAGE — absolute, left-anchored */}
                    <motion.div
                        style={{ width: imageWidth }}
                        className="absolute left-0 top-0 h-full overflow-hidden z-20 rounded-[8px] sm:rounded-[10px]"
                    >
                        <Image
                            src="/skinwear.shrink.img.jpeg"
                            alt="Skinwear Red Box Visual"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 38vw"
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <motion.div
                        style={{
                            opacity: textOpacity,
                            x: textX,
                            filter: textBlur,
                        }}
                        className="absolute right-0 top-0 h-full w-full sm:w-[72%] md:w-[62%] flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8 text-right z-10"
                    >
                        {/* Main Editorial Heading */}
                        <h2 className="font-editorial text-[var(--brand-cream)] text-[clamp(1.7rem,7vw,4.5rem)] leading-[1.1] tracking-[-0.02em]">
                            Your skin now has a
                            <br />
                            wardrobe of its own.
                        </h2>

                        {/* Paragraph Text */}
                        <p className="font-suisse text-[var(--brand-cream)]/90 text-[13px] sm:text-[15px] md:text-[18px] lg:text-[21px] leading-[1.45] sm:leading-[1.5] max-w-[90%] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[680px] ml-auto">
                            This is the start of sun care, made the way fashion is.
                            <br />
                            Considered, worn with intent and built for the day
                            <br />
                            you&apos;re actually having.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}