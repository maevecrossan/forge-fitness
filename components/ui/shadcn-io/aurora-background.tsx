'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

type Props = {
    children: React.ReactNode;
    className?: string;
};

/**
 * AuroraBackground
 * - Full-screen container with soft, animated radial gradients.
 * - Children render above the effect (z-10).
 * CREDIT: https://www.shadcn.io/background/aurora
 */

export function AuroraBackground({ children, className }: Props) {
    return (
        <div
            className={[
                'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950',
                className || '',
            ].join(' ')}
        >
            {/* Gradient blobs */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.5, 1, 1, 0.3],
                    scale: [0.98, 1.02, 0.98],
                    rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ transformOrigin: "50% 50%" }}
                className="pointer-events-none absolute inset-0"
            >
                {/* cyan */}
                <div className="absolute left-[18%] top-[22%] h-[clamp(20rem,50vw,100rem)] w-[clamp(20rem,50vw,100rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_60%)] blur-3xl" />
                {/* purple */}
                <div className="absolute left-[74%] top-[20%] h-[clamp(20rem,50vw,100rem)] w-[clamp(20rem,50vw,100rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.35),transparent_60%)] blur-3xl" />
                {/* green */}
                <div className="absolute left-[32%] bottom-[15%] h-[clamp(20rem,50vw,100rem)] w-[clamp(20rem,50vw,100rem)] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.35),transparent_60%)] blur-3xl" />
                {/* pink */}
                <div className="absolute left-[68%] bottom-[18%] h-[clamp(20rem,50vw,100rem)] w-[clamp(20rem,50vw,100rem)] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.35),transparent_60%)] blur-3xl" />
            </motion.div>

            {/* Foreground content */}
            <div className="w-full z-10">{children}</div>
        </div>
    );
}
