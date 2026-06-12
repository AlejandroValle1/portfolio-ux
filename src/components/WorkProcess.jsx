import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const TimelineStep = ({ step, index, isMobile, isLowEnd }) => {
    const isLeft = index % 2 === 0;
    const ref = React.useRef(null);
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsActive(entry.isIntersecting),
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, x: isMobile ? 0 : (isLeft ? -50 : 50), y: isMobile ? 20 : 0 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    const card = (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            whileHover={!isMobile ? {
                y: -6,
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                transition: { duration: 0.3 }
            } : undefined}
            style={{
                backgroundColor: 'var(--surface-color)',
                backdropFilter: (isLowEnd || isMobile) ? 'none' : 'blur(12px)',
                border: isActive
                    ? '1.5px solid var(--accent-primary)'
                    : '1.5px solid var(--border-inactive)',
                borderRadius: 'var(--radius-card)',
                padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
                position: 'relative',
                overflow: 'hidden',
                flex: isMobile ? '1' : '0 0 44%',
                maxWidth: isMobile ? '100%' : '44%',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                cursor: 'default',
            }}
        >
            {/* Número de fondo */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: isLeft && !isMobile ? '5%' : undefined,
                left: !isLeft && !isMobile ? '5%' : isMobile ? '5%' : undefined,
                transform: 'translateY(-50%)',
                fontSize: 'clamp(7rem, 12vw, 10rem)',
                fontWeight: 'var(--fw-black)',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1,
                color: isActive ? 'var(--accent-primary)' : 'var(--text-color)',
                opacity: isActive ? 0.12 : 0.06,
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

    if (isMobile) {
        return (
            <div ref={ref} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {/* Línea y dot para mobile */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px', flexShrink: 0 }}>
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-inactive)'}`,
                        backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 'var(--fw-black)',
                        color: isActive ? 'var(--bg-color)' : 'var(--text-color)',
                        transition: 'all 0.4s ease',
                        flexShrink: 0,
                    }}>
                        {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                        <div style={{
                            width: '2px',
                            flex: 1,
                            minHeight: '40px',
                            background: 'var(--border-inactive)',
                            marginTop: '4px',
                        }} />
                    )}
                </div>
                <div style={{ flex: 1, paddingBottom: index < steps.length - 1 ? 'var(--space-6)' : 0 }}>
                    {card}
                </div>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
                position: 'relative',
                width: '100%',
            }}
        >
            {/* Lado izquierdo */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '40px' }}>
                {isLeft ? card : null}
            </div>

            {/* Dot central */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <motion.div
                    animate={{
                        scale: isActive ? 1.2 : 1,
                        backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--surface-color)',
                        borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-inactive)',
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: '2px solid var(--border-inactive)',
                        backgroundColor: 'var(--surface-color)',
                    }}
                />
            </div>

            {/* Lado derecho */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: '40px' }}>
                {!isLeft ? card : null}
            </div>
        </div>
    );
};

const WorkProcess = () => {
    const { isLowEnd, isMobile } = usePerformance();
    const timelineRef = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 0.8', 'end 0.2']
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

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

            {/* Timeline container */}
            <div
                ref={timelineRef}
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? 0 : 'var(--space-8)',
                }}
            >
                {/* Línea vertical central (solo desktop) */}
                {!isMobile && (
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        transform: 'translateX(-50%)',
                        width: '2px',
                        backgroundColor: 'var(--border-inactive)',
                        zIndex: 1,
                    }}>
                        {/* Línea de progreso animada */}
                        {!isLowEnd && (
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: lineHeight,
                                    backgroundColor: 'var(--accent-primary)',
                                    boxShadow: '0 0 8px var(--accent-primary)',
                                }}
                            />
                        )}
                    </div>
                )}

                {/* Steps */}
                {steps.map((step, index) => (
                    <TimelineStep
                        key={index}
                        step={step}
                        index={index}
                        isMobile={isMobile}
                        isLowEnd={isLowEnd}
                    />
                ))}
            </div>
        </section>
    );
};

export default WorkProcess;
