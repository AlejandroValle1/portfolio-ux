import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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
const StepCard = ({ step, index, isActive, isLeft, isMobile, isLowEnd }) => (
    <motion.div
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
        {/* Número de fondo */}
        <div style={{
            position: 'absolute',
            top: '50%',
            right: isLeft && !isMobile ? '6%' : undefined,
            left: (!isLeft || isMobile) ? '5%' : undefined,
            transform: 'translateY(-50%)',
            fontSize: 'clamp(6rem, 10vw, 9rem)',
            fontWeight: 'var(--fw-black)',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1,
            color: isActive ? 'var(--accent-primary)' : 'var(--text-color)',
            opacity: isActive ? 0.13 : 0.06,
            pointerEvents: 'none',
            transition: 'color 0.5s ease, opacity 0.5s ease',
            userSelect: 'none',
        }}>
            {index + 1}
        </div>

        {/* Contenido */}
        <div style={{ position: 'relative', zIndex: 1 }}>
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
                maxWidth: '380px',
            }}>
                {step.description}
            </p>
        </div>
    </motion.div>
);

/* ─── WorkProcess ────────────────────────────────────────── */
const WorkProcess = () => {
    const { isLowEnd, isMobile } = usePerformance();
    const containerRef = React.useRef(null);
    const dotRefs = React.useRef(steps.map(() => null));
    const [svgData, setSvgData] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(null);

    /* Scroll-driven path drawing */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.75', 'end 0.25'],
    });
    const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

    /* Build SVG curved path from real DOM positions */
    React.useEffect(() => {
        if (isMobile) return;

        const calculate = () => {
            if (!containerRef.current) return;
            const cRect = containerRef.current.getBoundingClientRect();
            const W = cRect.width;
            const H = cRect.height;
            const cx = W / 2;
            const amplitude = W * 0.22; // how far the curve bows out

            const dots = dotRefs.current.map(el => {
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return r.top + r.height / 2 - cRect.top;
            });

            if (dots.some(d => d === null)) return;

            // Build smooth cubic bezier snake path
            let path = `M ${cx},${dots[0]}`;
            for (let i = 1; i < dots.length; i++) {
                const py = dots[i - 1];
                const cy = dots[i];
                const mid = (py + cy) / 2;
                // Odd segments bow right, even segments bow left
                const bx = i % 2 === 1 ? cx + amplitude : cx - amplitude;
                path += ` C ${bx},${mid} ${bx},${mid} ${cx},${cy}`;
            }

            setSvgData({ path, W, H, dots, cx });
        };

        const t = setTimeout(calculate, 120);
        window.addEventListener('resize', calculate);
        return () => { clearTimeout(t); window.removeEventListener('resize', calculate); };
    }, [isMobile]);

    /* Active step observer */
    React.useEffect(() => {
        const observers = dotRefs.current.map((el, i) => {
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
                { threshold: 0.9 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(obs => obs?.disconnect());
    }, []);

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

            {/* Timeline wrapper */}
            <div ref={containerRef} style={{ position: 'relative' }}>

                {/* ── SVG Curved Snake Line (desktop only) ── */}
                {!isMobile && svgData && (
                    <svg
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: `${svgData.H}px`,
                            pointerEvents: 'none',
                            zIndex: 1,
                            overflow: 'visible',
                        }}
                        viewBox={`0 0 ${svgData.W} ${svgData.H}`}
                        preserveAspectRatio="none"
                    >
                        {/* Static background path */}
                        <path
                            d={svgData.path}
                            fill="none"
                            stroke="var(--border-inactive)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />

                        {/* Animated glow path */}
                        {!isLowEnd && (
                            <motion.path
                                d={svgData.path}
                                fill="none"
                                stroke="var(--accent-primary)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                style={{
                                    pathLength,
                                    filter: 'drop-shadow(0 0 6px var(--accent-primary))',
                                }}
                            />
                        )}

                        {/* Dots on the path */}
                        {svgData.dots.map((dy, i) => (
                            <motion.circle
                                key={i}
                                cx={svgData.cx}
                                cy={dy}
                                r={activeIndex === i ? 8 : 5}
                                fill={activeIndex === i ? 'var(--accent-primary)' : 'var(--surface-color)'}
                                stroke="var(--accent-primary)"
                                strokeWidth="2"
                                style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
                            />
                        ))}
                    </svg>
                )}

                {/* ── Steps ── */}
                {steps.map((step, index) => {
                    const isLeft = index % 2 === 0;
                    const isActive = activeIndex === index;

                    if (isMobile) {
                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                {/* Line above dot (except first) */}
                                {index > 0 && (
                                    <div style={{
                                        width: '2px',
                                        height: '28px',
                                        background: 'var(--border-inactive)',
                                    }} />
                                )}

                                {/* Centered dot */}
                                <div
                                    ref={el => dotRefs.current[index] = el}
                                    style={{
                                        width: '32px', height: '32px',
                                        borderRadius: '50%',
                                        border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-inactive)'}`,
                                        backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--surface-color)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.75rem', fontWeight: 'var(--fw-black)',
                                        color: isActive ? 'var(--bg-color)' : 'var(--text-color)',
                                        transition: 'all 0.4s ease',
                                        flexShrink: 0,
                                        boxShadow: isActive ? '0 0 10px var(--accent-primary)' : 'none',
                                        zIndex: 2,
                                    }}
                                >
                                    {index + 1}
                                </div>

                                {/* Short line between dot and card */}
                                <div style={{
                                    width: '2px',
                                    height: '16px',
                                    background: 'var(--border-inactive)',
                                }} />

                                {/* Card — full width */}
                                <div style={{ width: '100%', marginBottom: 'var(--space-2)' }}>
                                    <StepCard step={step} index={index} isActive={isActive} isLeft={true} isMobile={isMobile} isLowEnd={isLowEnd} />
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={index}
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
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '52px' }}>
                                {isLeft && (
                                    <div style={{ width: '100%', maxWidth: '420px' }}>
                                        <StepCard step={step} index={index} isActive={isActive} isLeft={true} isMobile={isMobile} isLowEnd={isLowEnd} />
                                    </div>
                                )}
                            </div>

                            {/* Central dot (measured by ref) */}
                            <div
                                ref={el => dotRefs.current[index] = el}
                                style={{
                                    width: '14px', height: '14px',
                                    borderRadius: '50%',
                                    border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-inactive)'}`,
                                    backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--surface-color)',
                                    flexShrink: 0,
                                    zIndex: 3,
                                    transition: 'all 0.4s ease',
                                    boxShadow: isActive ? '0 0 10px var(--accent-primary)' : 'none',
                                }}
                            />

                            {/* Right slot */}
                            <div style={{ flex: 1, paddingLeft: '52px' }}>
                                {!isLeft && (
                                    <div style={{ width: '100%', maxWidth: '420px' }}>
                                        <StepCard step={step} index={index} isActive={isActive} isLeft={false} isMobile={isMobile} isLowEnd={isLowEnd} />
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
