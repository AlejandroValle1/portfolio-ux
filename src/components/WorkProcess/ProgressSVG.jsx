import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProgressSVG — Desktop-only SVG overlay.
 *
 * Draws:
 *  1. Static grey track (full bezier path)
 *  2. Accent-colored animated segments driven by scroll (pathLength via useSpring)
 *  3. Connection dots at each card edge:
 *       - Inactive → small grey-filled dot
 *       - Visited  → filled accent dot (spring radius)
 *       - Active   → larger dot + ripple pulse ring
 */
const ProgressSVG = ({ svgData, activeIndex, smoothSegs, isLowEnd }) => (
    <svg
        aria-hidden="true"
        style={{
            position:      'absolute',
            left:          0,
            top:           0,
            width:         '100%',
            height:        `${svgData.H}px`,
            pointerEvents: 'none',
            zIndex:        1,
            overflow:      'visible',
        }}
        viewBox={`0 0 ${svgData.W} ${svgData.H}`}
        preserveAspectRatio="none"
    >
        {/* ── 1. Static grey track ── */}
        <path
            d={svgData.bgPath}
            fill="none"
            stroke="var(--border-inactive)"
            strokeWidth="1.5"
            strokeLinecap="round"
        />

        {/* ── 2. Animated accent segments (spring-smoothed pathLength) ── */}
        {!isLowEnd && svgData.segments.map((segPath, i) => (
            <motion.path
                key={i}
                d={segPath}
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                    pathLength: smoothSegs[i],
                    filter:     'drop-shadow(0 0 6px var(--accent-primary))',
                }}
            />
        ))}

        {/* ── 3. Connection dots ── */}
        {svgData.points.map((pt, i) => {
            const visited  = activeIndex !== null && activeIndex >= i;
            const isActive = activeIndex === i;

            return (
                <g key={i}>
                    {/* Ripple pulse ring — only shown on the active dot */}
                    {isActive && (
                        <motion.circle
                            cx={pt.x}
                            cy={pt.y}
                            fill="none"
                            stroke="var(--accent-primary)"
                            strokeWidth="1.5"
                            initial={{ r: 7, opacity: 0.7 }}
                            animate={{ r: 22, opacity: 0 }}
                            transition={{
                                duration: 1.4,
                                repeat:   Infinity,
                                ease:     'easeOut',
                                repeatDelay: 0.3,
                            }}
                        />
                    )}

                    {/* Main dot — spring-animated radius and fill */}
                    <motion.circle
                        cx={pt.x}
                        cy={pt.y}
                        stroke="var(--accent-primary)"
                        strokeWidth="2"
                        animate={{
                            r:    isActive ? 8 : visited ? 5 : 4,
                            fill: visited ? 'var(--accent-primary)' : 'var(--surface-color)',
                        }}
                        transition={{
                            r:    { type: 'spring', stiffness: 400, damping: 24 },
                            fill: { duration: 0.35 },
                        }}
                    />
                </g>
            );
        })}
    </svg>
);

export default ProgressSVG;
