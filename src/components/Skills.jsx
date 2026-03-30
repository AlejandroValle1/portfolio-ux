import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    "Diseño de Interfaz (UI) & Sistemas de Diseño",
    "Investigación de Usuarios (UX Research)",
    "Prototipado de Alta Fidelidad & Wireframing",
    "Resolución de problemas complejos",
    "Transformación de métricas de negocio",
    "Diseño centrado en evidencia"
];

// Hook: detecta qué ítem está más centrado en el viewport
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

const Skills = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Un ref por skill
    const rowRefs = [
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
    ];
    const activeIndex = useScrollSpotlight(rowRefs);

    // Estilos condicionales por fila
    const getRowStyle = (index) => ({
        position: 'relative',
        padding: 'var(--space-4) 0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--space-4)',
        borderBottom: '1.5px solid var(--text-color)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        // Spotlight solo en mobile/tablet
        ...(isMobile && activeIndex !== null ? {
            opacity: activeIndex === index ? 1 : 0.35,
            transform: activeIndex === index ? 'translateX(6px)' : 'translateX(0)',
        } : { opacity: 1 }),
    });

    const getNumberStyle = (index) => ({
        fontSize: '1rem',
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        transition: 'color 0.35s ease',
        color: isMobile && activeIndex === index
            ? 'var(--accent-primary)'
            : 'var(--accent-primary)',
    });

    const getTextStyle = (index) => ({
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        display: 'block',
        width: '100%',
        transition: 'color 0.35s ease',
        color: isMobile && activeIndex === index
            ? 'var(--text-color)'
            : 'var(--text-color)',
    });

    return (
        <section id="skills" className="container" style={{ paddingBottom: 'var(--space-24)' }}>
            <h2 className="brutalist-title" style={{ marginBottom: 'var(--space-8)', fontSize: '2rem' }}>
                Skills / Diferencial
            </h2>

            <ul style={{ borderTop: '1.5px solid var(--text-color)', paddingTop: 'var(--space-8)' }}>
                {skills.map((skill, index) => (
                    <motion.li
                        key={index}
                        ref={rowRefs[index]}
                        initial="initial"
                        whileHover={!isMobile ? "hover" : undefined}
                        animate="initial"
                        style={getRowStyle(index)}
                    >
                        {/* Número */}
                        <motion.span
                            variants={{
                                initial: { color: 'var(--accent-primary)' },
                                hover: { color: 'var(--skill-hover)' }
                            }}
                            style={getNumberStyle(index)}
                        >
                            0{index + 1}
                        </motion.span>

                        {/* Texto skill */}
                        <motion.span
                            variants={{
                                initial: { x: 0, fontStyle: 'normal', color: 'var(--text-color)' },
                                hover: { x: 20, color: 'var(--skill-hover)' }
                            }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={getTextStyle(index)}
                        >
                            {skill}
                        </motion.span>

                        {/* Asterisco — en mobile solo visible cuando activo */}
                        <motion.span
                            variants={{
                                initial: { opacity: 0, scale: 0.5, rotate: -45, color: 'var(--accent-primary)' },
                                hover: { opacity: 1, scale: 1.2, rotate: 0, color: 'var(--skill-hover)' }
                            }}
                            style={{
                                fontSize: '2.5rem',
                                lineHeight: 0.8,
                                color: 'var(--accent-primary)',
                                fontFamily: '"Playfair Display", serif',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                // En mobile: aparece cuando la fila está activa
                                opacity: isMobile
                                    ? (activeIndex === index ? 1 : 0)
                                    : undefined,
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            *
                        </motion.span>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
};

export default Skills;
