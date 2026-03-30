import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        title: "Empatizar",
        subtitle: "Investigación",
        description: "Más allá de lo evidente, revelando los verdaderos puntos de dolor. Uso de tesis académicas, visitas de campo y benchmarks de mercado.",
    },
    {
        title: "Definir",
        subtitle: "Arquitectura",
        description: "Estructuras escalables y diseño atómico. Grillas consistentes y sistemas de diseño duraderos que responden a los pain points detectados.",
    },
    {
        title: "Idear",
        subtitle: "Prototipar",
        description: "Diseños funcionales y visuales que transforman insights en soluciones claras y atractivas.",
    },
    {
        title: "Iterar",
        subtitle: "Validar",
        description: "Integración de IA generativa para retroalimentación rápida y simulación de escenarios. Feedback puntual externo documentado.",
    }
];

// Hook: detecta qué card está más centrada en el viewport
function useScrollSpotlight(refs) {
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
            setActiveIndex(maxRatio > 0.15 ? maxIndex : null);
        };

        refs.forEach((ref, i) => {
            if (!ref.current) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    ratios[i] = entry.intersectionRatio;
                    updateActive();
                },
                { 
                    threshold: Array.from({ length: 21 }, (_, k) => k / 20),
                    rootMargin: "-35% 0px -35% 0px"
                }
            );
            obs.observe(ref.current);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, [refs]);

    return activeIndex;
}

const WorkProcess = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1024); // incluye tablets
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const cardRefs = [
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
    ];
    const activeIndex = useScrollSpotlight(cardRefs);

    const getCardStyle = (index) => ({
        backgroundColor: 'var(--surface-color)',
        padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
        paddingLeft: isMobile ? 'var(--space-4)' : 'var(--space-12)',
        borderRadius: '32px',
        border: '1.5px solid var(--border-inactive)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        justifyContent: 'center',
        cursor: 'default',
        minHeight: '280px',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease, transform 0.4s ease',
        ...(isMobile && activeIndex !== null ? {
            borderColor: activeIndex === index ? 'var(--accent-primary)' : 'var(--border-inactive)',
            boxShadow: activeIndex === index
                ? '0 0 0 1.5px var(--accent-primary), 0 16px 40px rgba(230,90,43,0.18)'
                : '0 4px 20px rgba(0,0,0,0.05)',
            opacity: activeIndex === index ? 1 : 0.7,
            transform: activeIndex === index ? 'scale(1.01)' : 'scale(1)',
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
                        {/* Large Background Number */}
                        <motion.div
                            animate={isMobile ? undefined : {
                                scale: hoveredIndex === index ? 1.1 : 1,
                                color: 'var(--accent-primary)',
                                opacity: hoveredIndex === index ? 0.4 : 0.08,
                            }}
                            transition={!isMobile ? { duration: 0.4, ease: "easeOut" } : undefined}
                            style={{
                                position: 'absolute',
                                top: isMobile ? '10%' : '50%',
                                left: isMobile ? 'var(--space-4)' : '5%',
                                y: isMobile ? '0' : '-50%',
                                transformOrigin: 'left center',
                                fontSize: isMobile ? 'clamp(6rem, 25vw, 10rem)' : 'clamp(8rem, 15vw, 12rem)',
                                fontWeight: 900,
                                lineHeight: 1,
                                fontFamily: 'var(--font-heading)',
                                pointerEvents: 'none',
                                zIndex: 0,
                                // Active state: number glows with accent color
                                color: isMobile && activeIndex === index ? 'var(--accent-primary)' : 'var(--text-color)',
                                opacity: isMobile && activeIndex === index ? 0.35 : 0.08,
                                transition: 'color 0.4s ease, opacity 0.4s ease',
                            }}
                        >
                            {index + 1}
                        </motion.div>

                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-1)',
                            paddingLeft: isMobile ? '0' : 'var(--space-12)',
                            paddingRight: isMobile ? '0' : '0',
                            marginTop: isMobile ? 'var(--space-8)' : '0',
                        }}>
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
