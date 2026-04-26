import React from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../context/PerformanceContext';

const steps = [
    {
        title: "Empatizar",
        subtitle: "Escuchar",
        description: <>Más allá de lo evidente, buscando entender qué es lo que realmente le molesta al usuario. Utilizo <strong>entrevistas y análisis de la competencia</strong> para entender el contexto real.</>,
    },
    {
        title: "Definir",
        subtitle: "Estructurar",
        description: <>Organizo la información con <strong>sistemas de diseño consistentes</strong>. Creo estructuras que responden directamente a los <strong>problemas detectados</strong>.</>,
    },
    {
        title: "Idear",
        subtitle: "Diseñar",
        description: <>Soluciones visuales y funcionales que transforman los <strong>hallazgos de la investigación</strong> en <strong>pantallas claras y fáciles de navegar</strong>.</>,
    },
    {
        title: "Iterar",
        subtitle: "Probar",
        description: <>Integro los <strong>comentarios de los usuarios</strong> para pulir el diseño. Uso herramientas de vanguardia para asegurar la mejora continua del producto.</>,
    }
];

// Hook: detecta qué card está más centrada en el viewport
function useScrollSpotlight(refs, isLowPerformance) {
    const [activeIndex, setActiveIndex] = React.useState(null);

    React.useEffect(() => {
        const observers = [];
        const ratios = new Array(refs.length).fill(0);

        const updateActive = () => {
            let maxRatio = 0;
            let maxIndex = null;
            ratios.forEach((r, i) => {
                if (r > maxRatio) { maxRatio = r; maxIndex = i; }
            });
            setActiveIndex(maxRatio > 0.5 ? maxIndex : null);
        };

        refs.forEach((ref, i) => {
            if (!ref.current) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    ratios[i] = entry.intersectionRatio;
                    updateActive();
                },
                { 
                    threshold: isLowPerformance ? [0.5] : [0.2, 0.5, 0.8],
                    rootMargin: isLowPerformance ? "-20% 0px -20% 0px" : "-35% 0px -35% 0px"
                }
            );
            obs.observe(ref.current);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, [refs, isLowPerformance]);

    return activeIndex;
}

const WorkProcess = () => {
    const { isLowEnd, isMobile } = usePerformance();
    const [hoveredIndex, setHoveredIndex] = React.useState(null);

    const cardRefs = [
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
    ];
    const activeIndex = useScrollSpotlight(cardRefs, isLowEnd || isMobile);

    const getCardStyle = (index) => ({
        backgroundColor: 'var(--surface-color)',
        padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
        paddingLeft: isMobile ? 'var(--space-4)' : 'var(--space-12)',
        borderRadius: '32px',
        border: '1.5px solid var(--border-inactive)',
        backdropFilter: (isLowEnd || isMobile) ? 'none' : 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        justifyContent: 'center',
        cursor: 'default',
        minHeight: '280px',
        transition: 'all 0.4s ease',
        ...((isLowEnd || isMobile) && activeIndex !== null ? {
            borderColor: activeIndex === index ? 'var(--accent-primary)' : 'var(--border-inactive)',
            opacity: activeIndex === index ? 1 : 0.4,
            transform: 'none',
        } : {}),
    });

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

            <div className="process-grid-layout" style={{ gap: '20px' }}>
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        ref={cardRefs[index]}
                        className={`process-step-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                        onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                        whileHover={!isMobile ? {
                            y: -8,
                            borderColor: 'var(--accent-primary)',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                            transition: { duration: 0.3 }
                        } : undefined}
                        whileTap={{ scale: 0.98 }}
                        style={getCardStyle(index)}
                    >
                        {/* Large Background Number - Hidden on mobile */}
                        {!isMobile && (
                            <motion.div
                                animate={{
                                    scale: hoveredIndex === index ? 1.1 : 1,
                                    color: hoveredIndex === index ? 'var(--accent-primary)' : 'var(--text-color)',
                                    opacity: hoveredIndex === index ? 0.4 : 0.08,
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '5%',
                                    y: '-50%',
                                    transformOrigin: 'left center',
                                    fontSize: 'clamp(8rem, 15vw, 12rem)',
                                    fontWeight: 900,
                                    lineHeight: 1,
                                    fontFamily: 'var(--font-heading)',
                                    pointerEvents: 'none',
                                    zIndex: 0,
                                    color: 'var(--text-color)',
                                    opacity: 0.08,
                                    transition: 'color 0.4s ease, opacity 0.4s ease',
                                }}
                            >
                                {index + 1}
                            </motion.div>
                        )}

                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-1)',
                            paddingLeft: isMobile ? '0' : 'var(--space-12)',
                        }}>
                            {isMobile ? (
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{
                                        fontSize: '4.5rem',
                                        fontWeight: 900,
                                        lineHeight: 0.8,
                                        color: activeIndex === index ? 'var(--accent-primary)' : 'var(--text-color)',
                                        opacity: activeIndex === index ? 0.9 : 0.15,
                                        transition: 'color 0.4s ease, opacity 0.4s ease',
                                        marginTop: '6px',
                                        fontFamily: 'var(--font-heading)'
                                    }}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.25em',
                                            color: 'var(--accent-primary)',
                                            fontWeight: 800,
                                            marginBottom: 'var(--space-1)',
                                            display: 'block'
                                        }}>
                                            {step.subtitle}
                                        </span>
                                        <h3 style={{
                                            fontSize: '2rem',
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            lineHeight: 1,
                                            letterSpacing: '-0.03em',
                                            marginBottom: 'var(--space-2)'
                                        }}>
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25em',
                                        color: 'var(--accent-primary)',
                                        fontWeight: 800,
                                        marginBottom: 'var(--space-1)',
                                        display: 'block'
                                    }}>
                                        {step.subtitle}
                                    </span>
                                    <h3 style={{
                                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        lineHeight: 1,
                                        letterSpacing: '-0.03em',
                                        marginBottom: 'var(--space-2)'
                                    }}>
                                        {step.title}
                                    </h3>
                                </>
                            )}
                            <p style={{
                                fontSize: '1rem',
                                lineHeight: 1.5,
                                opacity: 0.85,
                                maxWidth: '100%'
                            }}>
                                {step.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WorkProcess;
