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

const Skills = () => {
    return (
        <section id="skills" className="container" style={{ paddingBottom: 'var(--space-24)' }}>
            <h2 className="brutalist-title" style={{ marginBottom: 'var(--space-8)', fontSize: '2rem' }}>
                Skills / Diferencial
            </h2>

            <ul style={{ borderTop: '1.5px solid var(--text-color)', paddingTop: 'var(--space-8)' }}>
                {skills.map((skill, index) => (
                    <motion.li
                        key={index}
                        initial="initial"
                        whileHover="hover"
                        animate="initial"
                        style={{
                            position: 'relative',
                            padding: 'var(--space-4) 0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 'var(--space-4)',
                            borderBottom: '1.5px solid var(--text-color)',
                            opacity: 1
                        }}
                    >
                        {/* Number */}
                        <motion.span
                            variants={{
                                initial: { color: 'var(--accent-primary)' },
                                hover: { color: 'var(--skill-hover)' }
                            }}
                            style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            0{index + 1}
                        </motion.span>

                        {/* Text Container with masking/reveal effect could go here, but let's keep it simple and elegant first with type change */}
                        <motion.span
                            variants={{
                                initial: { x: 0, fontStyle: 'normal', color: 'var(--text-color)' },
                                hover: { x: 20, color: 'var(--skill-hover)' }
                            }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                fontWeight: 600,
                                letterSpacing: '-0.02em',
                                display: 'block',
                                width: '100%'
                            }}
                        >
                            {skill}
                        </motion.span>

                        {/* Elegant Asterisk on Hover */}
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
                                fontWeight: 400
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
