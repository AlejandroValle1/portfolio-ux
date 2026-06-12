import React from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import { usePerformance } from '../context/PerformanceContext';

const steps = [
    {
        title: "Claridad & Kick-off",
        subtitle: "Alineación",
        description: <>Alineación inicial para definir objetivos, analizar el problema y trazar la dirección del proyecto.</>,
    },
    {
        title: "Investigación",
        subtitle: "Entendimiento",
        description: <>Inmersión en el contexto del negocio, benchmark competitivo y análisis profundo del público objetivo.</>,
    },
    {
        title: "Ideación",
        subtitle: "Estructura",
        description: <>Creación de flujos de usuario, wireframes y prototipos interactivos para estructurar la información.</>,
    },
    {
        title: "Testeo & Iteración",
        subtitle: "Validación",
        description: <>Validación de usabilidad mediante pruebas con usuarios reales y ciclos de feedback para refinar la experiencia.</>,
    },
    {
        title: "Entrega & Handover",
        subtitle: "Implementación",
        description: <>Preparación y documentación de los assets finales listos para desarrollo y objetivos de negocio.</>,
    }
];

/* ─── Step Card ──────────────────────────────────────────── */
const StepCard = React.forwardRef(({ step, index, isActive, isLeft, isMobile, isLowEnd }, ref) => {
    // Determine number position and layout alignment
    const numberOnLeft = !isLeft && !isMobile;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isMobile ? 0 : (isLeft ? -40 : 40), y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={!isMobile ? {
                y: -6,
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                transition: { duration: 0.3 }
            } : undefined}
            style={{
                backgroundColor: 'var(--surface-color)',
                backdropFilter: (isLowEnd || isMobile) ? 'none' : 'blur(12px)',
                border: `1.5px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-inactive)'}`,
                borderRadius: 'var(--radius-card)',
                padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                cursor: 'default',
            }}
        >
            {/* Número de fondo - Zigzag: a la izquierda para cards derechas, a la derecha para cards izquierdas */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: numberOnLeft ? '8%' : undefined,
                right: !numberOnLeft ? '8%' : undefined,
                transform: 'translateY(-50%)',
                fontSize: 'clamp(5.5rem, 8.5vw, 8rem)',
                fontWeight: 'var(--fw-black)',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1,
                color: isActive ? 'var(--accent-primary)' : 'var(--text-color)',
                opacity: isActive ? 0.14 : 0.05,
                pointerEvents: 'none',
                transition: 'color 0.5s ease, opacity 0.5s ease',
                userSelect: 'none',
            }}>
                {index + 1}
            </div>

            {/* Contenido - Si el número está a la izquierda, desplazamos el texto a la derecha con marginLeft: auto */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: isMobile ? '75%' : '340px',
                marginLeft: numberOnLeft ? 'auto' : undefined
            }}>
                <span style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--accent-primary)',
                    fontWeight: 'var(--fw-bold)',
                    display: 'block',
                    marginBottom: 'var(--space-2)',
                }}>
                    {step.subtitle}
                </span>
                <h3 style={{
                    fontSize: isMobile ? '1.8rem' : 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    fontWeight: 'var(--fw-black)',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    marginBottom: 'var(--space-3)',
                    color: 'var(--text-color)',
                }}>
                    {step.title}
                </h3>
                <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    opacity: 0.8,
                }}>
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
});
StepCard.displayName = 'StepCard';

/* ─── WorkProcess ────────────────────────────────────────── */
const WorkProcess = () => {
    const { isLowEnd, isMobile } = usePerformance();
    const containerRef  = React.useRef(null);
    const cardRefs      = React.useRef(steps.map(() => null)); // card elements → SVG points + activation
    const stepRefs      = React.useRef(steps.map(() => null)); // rows → mobile layout
    const thresholdsRef = React.useRef([]);                    // scrollY when each card hits viewport center

    const [svgData, setSvgData]         = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(null);

    /* ── Global scroll Y ── */
    const { scrollY } = useScroll();

    /* ── Per-segment progress: 0 at threshold[i] → 1 at threshold[i+1] ── */
    const calcSeg = React.useCallback((y, idx) => {
        const t = thresholdsRef.current;
        if (t.length < idx + 2) return 0;
        const start = t[idx], end = t[idx + 1];
        if (end <= start) return 0;
        return Math.max(0, Math.min(1, (y - start) / (end - start)));
    }, []);

    const SPRING = { stiffness: 130, damping: 30 };
    const seg0 = useSpring(useTransform(scrollY, y => calcSeg(y, 0)), SPRING);
    const seg1 = useSpring(useTransform(scrollY, y => calcSeg(y, 1)), SPRING);
    const seg2 = useSpring(useTransform(scrollY, y => calcSeg(y, 2)), SPRING);
    const seg3 = useSpring(useTransform(scrollY, y => calcSeg(y, 3)), SPRING);
    const smoothSegs = [seg0, seg1, seg2, seg3];

    /* ── Active index driven by scroll ── */
    useMotionValueEvent(scrollY, 'change', (y) => {
        const t = thresholdsRef.current;
        if (!t || !t.length) return;
        let active = null;
        for (let i = 0; i < t.length; i++) {
            if (y >= t[i]) active = i;
        }
        setActiveIndex(active);
    });

    /* ── Build SVG & Calculate Thresholds from real card positions ── */
    React.useEffect(() => {
        const calculate = () => {
            if (!containerRef.current) return;
            const cRect = containerRef.current.getBoundingClientRect();
            const W = cRect.width;
            const H = cRect.height;
            const vh = window.innerHeight;
            const cx = W / 2; // center X of the container

            /*
             * Connection points: for each card we pick the edge closest to center.
             * Left cards  (index even)  → right edge (x = rect.right - cRect.left)
             * Right cards (index odd)   → left  edge (x = rect.left  - cRect.left)
             * Y = vertical center of the card
             */
            const points = cardRefs.current.map((el, i) => {
                if (!el) return null;
                const r = el.getBoundingClientRect();
                const isLeft = i % 2 === 0;
                return {
                    x: isLeft ? (r.right - cRect.left) : (r.left - cRect.left),
                    y: r.top - cRect.top + r.height / 2,
                };
            });
            if (points.some(p => p === null)) return;

            /*
             * Cubic bezier between connection points.
             * Control points go toward the horizontal center of the container
             * so the curve bows naturally through the gap between cards.
             */
            const segments = [];
            let bgPath = `M ${points[0].x},${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
                const p0 = points[i - 1];
                const p1 = points[i];
                // Both control points pull toward the container center X
                const seg = `M ${p0.x},${p0.y} C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
                segments.push(seg);
                bgPath += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
            }

            /* Thresholds: scrollY at which each card's center hits viewport center */
            thresholdsRef.current = cardRefs.current.map(el => {
                if (!el) return 0;
                const r = el.getBoundingClientRect();
                const absCenter = r.top + window.scrollY + r.height / 2;
                return absCenter - vh / 2;
            });

            setSvgData({ bgPath, W, H, points, segments });

            /* Set initial active */
            const y = window.scrollY;
            const t = thresholdsRef.current;
            let active = null;
            for (let i = 0; i < t.length; i++) {
                if (y >= t[i]) active = i;
            }
            setActiveIndex(active);
        };

        // Recalculate on mount, load, resize, and layout shifts (via document.body size changes)
        calculate();
        const timer = setTimeout(calculate, 300);

        window.addEventListener('resize', calculate);
        window.addEventListener('load', calculate);

        let resizeObserver = null;
        if (typeof ResizeObserver !== 'undefined' && document.body) {
            resizeObserver = new ResizeObserver(calculate);
            resizeObserver.observe(document.body);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculate);
            window.removeEventListener('load', calculate);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [isMobile]);

    return (
        <section id="process" className="container" style={{ paddingBottom: 'var(--space-24)', paddingTop: 'var(--space-12)' }}>
            <motion.h2
                className="brutalist-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    marginBottom: 'var(--space-12)',
                    color: 'var(--accent-primary)',
                    textAlign: 'center'
                }}
            >
                PROCESO DE TRABAJO
            </motion.h2>

            <div ref={containerRef} style={{ position: 'relative' }}>

                {/* ── SVG card-to-card curve ── */}
                {!isMobile && svgData && (
                    <svg
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            left: 0, top: 0,
                            width: '100%',
                            height: `${svgData.H}px`,
                            pointerEvents: 'none',
                            zIndex: 3,
                            overflow: 'visible',
                        }}
                        viewBox={`0 0 ${svgData.W} ${svgData.H}`}
                        preserveAspectRatio="none"
                    >
                        {/* Static grey background path */}
                        <path
                            d={svgData.bgPath}
                            fill="none"
                            stroke="var(--border-inactive)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />

                        {/* Animated accent segments — one per card connection */}
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
                                    filter: 'drop-shadow(0 0 6px var(--accent-primary))',
                                }}
                            />
                        ))}

                        {/* Small dot at each connection point */}
                        {svgData.points.map((pt, i) => {
                            const visited = activeIndex !== null && activeIndex >= i;
                            return (
                                <circle
                                    key={i}
                                    cx={pt.x}
                                    cy={pt.y}
                                    r={activeIndex === i ? 7 : 4}
                                    fill={visited ? 'var(--accent-primary)' : 'var(--surface-color)'}
                                    stroke="var(--accent-primary)"
                                    strokeWidth="2"
                                    style={{ transition: 'r 0.35s ease, fill 0.35s ease' }}
                                />
                            );
                        })}
                    </svg>
                )}

                {/* ── Step rows ── */}
                {steps.map((step, index) => {
                    const isLeft   = index % 2 === 0;
                    const isActive = activeIndex === index;

                    /* ── MOBILE ── */
                    if (isMobile) {
                        const isVisited = activeIndex !== null && activeIndex >= index;
                        return (
                            <div
                                key={index}
                                ref={el => stepRefs.current[index] = el}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                {index > 0 && (
                                    <div style={{
                                        width: '2px',
                                        height: '28px',
                                        background: activeIndex !== null && activeIndex >= index - 1 ? 'var(--accent-primary)' : 'var(--border-inactive)',
                                        transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
                                        boxShadow: activeIndex !== null && activeIndex >= index - 1 ? '0 0 8px var(--accent-primary)' : 'none',
                                    }} />
                                )}
                                <div style={{
                                    width: '32px', height: '32px',
                                    borderRadius: '50%',
                                    border: `2px solid ${isVisited ? 'var(--accent-primary)' : 'var(--border-inactive)'}`,
                                    backgroundColor: isVisited ? 'var(--accent-primary)' : 'var(--surface-color)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.75rem', fontWeight: 'var(--fw-black)',
                                    color: isVisited ? 'var(--bg-color)' : 'var(--text-color)',
                                    transition: 'all 0.4s ease',
                                    flexShrink: 0,
                                    boxShadow: isActive ? '0 0 10px var(--accent-primary)' : 'none',
                                    zIndex: 2,
                                }}>
                                    {index + 1}
                                </div>
                                <div style={{
                                    width: '2px',
                                    height: '16px',
                                    background: isVisited ? 'var(--accent-primary)' : 'var(--border-inactive)',
                                    transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
                                    boxShadow: isVisited ? '0 0 8px var(--accent-primary)' : 'none',
                                }} />
                                <div style={{ width: '100%', marginBottom: 'var(--space-2)' }}>
                                    <StepCard
                                        ref={el => cardRefs.current[index] = el}
                                        step={step} index={index}
                                        isActive={isActive} isLeft={true}
                                        isMobile={isMobile} isLowEnd={isLowEnd}
                                    />
                                </div>
                            </div>
                        );
                    }

                    /* ── DESKTOP ── */
                    return (
                        <div
                            key={index}
                            ref={el => stepRefs.current[index] = el}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: index < steps.length - 1 ? 'var(--space-8)' : 0,
                                position: 'relative',
                                zIndex: 2,
                            }}
                        >
                            {/* Left slot */}
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingRight: '40px' }}>
                                {isLeft && (
                                    <div style={{ width: '100%', maxWidth: '540px' }}>
                                        <StepCard
                                            ref={el => cardRefs.current[index] = el}
                                            step={step} index={index}
                                            isActive={isActive} isLeft={true}
                                            isMobile={isMobile} isLowEnd={isLowEnd}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Center gap — no visible dot, SVG handles it */}
                            <div style={{ width: '80px', flexShrink: 0 }} />

                            {/* Right slot */}
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingLeft: '40px' }}>
                                {!isLeft && (
                                    <div style={{ width: '100%', maxWidth: '540px' }}>
                                        <StepCard
                                            ref={el => cardRefs.current[index] = el}
                                            step={step} index={index}
                                            isActive={isActive} isLeft={false}
                                            isMobile={isMobile} isLowEnd={isLowEnd}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WorkProcess;
