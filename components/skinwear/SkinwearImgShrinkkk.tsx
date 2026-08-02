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
            className="relative w-full h-[220vh] z-[16]"
        >
            {/* Sticky Viewport Area with exact side paddings */}
            <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center px-8 md:px-16 lg:px-24">

                {/* Fixed Height Layout Frame */}
                <div className="w-full max-w-[1300px] h-[75vh] relative">

                    {/* IMAGE — absolute, left-anchored */}
                    <motion.div
                        style={{ width: imageWidth }}
                        className="absolute left-0 top-0 h-full overflow-hidden z-20 rounded-[10px]"
                    >
                        <Image
                            src="/skinwear.shrink.img.jpeg"
                            alt="Skinwear Red Box Visual"
                            fill
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
                        className="absolute right-0 top-0 h-full w-full md:w-[62%] flex flex-col justify-center space-y-6 md:space-y-8 text-right z-10"
                    >
                        {/* Main Editorial Heading */}
                        <h2 className="font-editorial text-[var(--brand-cream)] text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.08] tracking-[-0.02em]">
                            Your skin now
                            <br />
                            has a wardrobe
                        </h2>

                        {/* Paragraph Text */}
                        <p className="font-suisse text-[var(--brand-cream)]/90 text-[16px] md:text-[19px] lg:text-[21px] leading-[1.5] max-w-[680px] ml-auto">
                            This is the start of sun care, made the way
                            <br />
                            fashion is. Considered, worn with intent,
                            <br />
                            Built for the day you&apos;re actually having,
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}