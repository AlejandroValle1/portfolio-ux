import React from 'react';
import { useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

/**
 * useWorkProcessScroll
 *
 * Encapsulates all scroll-driven logic for the WorkProcess section:
 *  - SVG curve + connection-point geometry (recalculated on resize / load)
 *  - Per-segment animated progress values (seg0 … seg3)
 *  - Active card index driven by scrollY, with scrollend safety net
 *
 * Returns refs and state consumed by WorkProcess + its sub-components.
 */
export const useWorkProcessScroll = (isMobile, stepCount) => {
    const containerRef  = React.useRef(null);
    const cardRefs      = React.useRef(Array(stepCount).fill(null));
    const stepRefs      = React.useRef(Array(stepCount).fill(null));
    const thresholdsRef = React.useRef([]);

    const [svgData,      setSvgData]      = React.useState(null);
    const [activeIndex,  setActiveIndex]  = React.useState(null);

    /* ── Global scroll ── */
    const { scrollY } = useScroll();

    /* ── Per-segment progress: 0 at threshold[i] → 1 at threshold[i+1] ── */
    const calcSeg = React.useCallback((y, idx) => {
        const t = thresholdsRef.current;
        if (t.length < idx + 2) return 0;
        const start = t[idx], end = t[idx + 1];
        if (end <= start) return 0;
        return Math.max(0, Math.min(1, (y - start) / (end - start)));
    }, []);

    // Raw linear progress per segment
    const raw0 = useTransform(scrollY, y => calcSeg(y, 0));
    const raw1 = useTransform(scrollY, y => calcSeg(y, 1));
    const raw2 = useTransform(scrollY, y => calcSeg(y, 2));
    const raw3 = useTransform(scrollY, y => calcSeg(y, 3));

    // Spring-smoothed: gives the line natural momentum/inertia
    const springCfg = { stiffness: 120, damping: 28, mass: 0.6 };
    const seg0 = useSpring(raw0, springCfg);
    const seg1 = useSpring(raw1, springCfg);
    const seg2 = useSpring(raw2, springCfg);
    const seg3 = useSpring(raw3, springCfg);
    const smoothSegs = [seg0, seg1, seg2, seg3];


    /* ── Active-index resolver ── */
    const resolveActive = React.useCallback((y) => {
        const t = thresholdsRef.current;
        if (!t || !t.length) return;
        let active = null;
        for (let i = 0; i < t.length; i++) {
            if (y >= t[i]) active = i;
        }
        setActiveIndex(active);
    }, []);

    /* Framer scroll listener */
    useMotionValueEvent(scrollY, 'change', resolveActive);

    /* scrollend — fires once the CSS snap animation fully settles */
    React.useEffect(() => {
        const onScrollEnd = () => resolveActive(window.scrollY);
        window.addEventListener('scrollend', onScrollEnd);
        return () => window.removeEventListener('scrollend', onScrollEnd);
    }, [resolveActive]);

    /* ── SVG geometry + threshold calculation ── */
    React.useEffect(() => {
        const calculate = () => {
            if (!containerRef.current) return;
            const cRect = containerRef.current.getBoundingClientRect();
            const W  = cRect.width;
            const H  = cRect.height;
            const vh = window.innerHeight;
            const cx = W / 2; // horizontal center of the container

            /*
             * Connection point for each card:
             *   Left cards  (even index) → right edge
             *   Right cards (odd index)  → left edge
             *   Y = vertical center of the card
             */
            const points = cardRefs.current.map((el, i) => {
                if (!el) return null;
                const r      = el.getBoundingClientRect();
                const isLeft = i % 2 === 0;
                return {
                    x: isLeft ? (r.right - cRect.left) : (r.left - cRect.left),
                    y: r.top  - cRect.top + r.height / 2,
                };
            });
            if (points.some(p => p === null)) return;

            /*
             * Build cubic bezier segments.
             * Both control points pull toward cx so the curve bows through the gap.
             */
            const segments = [];
            let bgPath = `M ${points[0].x},${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
                const p0  = points[i - 1];
                const p1  = points[i];
                const seg = `M ${p0.x},${p0.y} C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
                segments.push(seg);
                bgPath += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
            }

            /*
             * Threshold = scrollY when card center crosses viewport center.
             *
             * CSS snap (scroll-padding-top: 80px) settles at vh/2 + 40px.
             * Using plain vh/2 means the threshold fires 40px BEFORE snap settles,
             * guaranteeing reliable activation.
             */
            const scrollPaddingTop = 80;
            const targetViewportCenter = vh / 2 + scrollPaddingTop / 2 + 20; // vh / 2 + 60
            thresholdsRef.current = cardRefs.current.map(el => {
                if (!el) return 0;
                const r = el.getBoundingClientRect();
                return (r.top + window.scrollY + r.height / 2) - targetViewportCenter;
            });

            setSvgData({ bgPath, W, H, points, segments });

            /* Resolve initial active index */
            const y = window.scrollY;
            const t = thresholdsRef.current;
            let active = null;
            for (let i = 0; i < t.length; i++) {
                if (y >= t[i]) active = i;
            }
            setActiveIndex(active);
        };

        calculate();
        const timer = setTimeout(calculate, 300);

        window.addEventListener('resize', calculate);
        window.addEventListener('load', calculate);

        let ro = null;
        if (typeof ResizeObserver !== 'undefined' && document.body) {
            ro = new ResizeObserver(calculate);
            ro.observe(document.body);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculate);
            window.removeEventListener('load', calculate);
            if (ro) ro.disconnect();
        };
    }, [isMobile]);

    return { containerRef, cardRefs, stepRefs, svgData, activeIndex, smoothSegs };
};
