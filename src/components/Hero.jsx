import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const scrollToProjects = () => {
        const element = document.getElementById('projects');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: '240px', // Espacio real para despegar del header fijo
            paddingBottom: 'var(--space-12)',
            position: 'relative',
            overflow: 'hidden',
            color: 'var(--text-color)'
        }} className="container hero-container">

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="brutalist-title"
                style={{
                    fontSize: 'clamp(2.5rem, 7vw, 7.5rem)', // Recuperando un poco más el tamaño brutalista
                    marginBottom: 'var(--space-4)', // Menos espacio respecto a la descripción para subir todo
                    lineHeight: 1.1, // Espacio más brutalista
                    letterSpacing: '-0.04em'
                }}
            >
                DISEÑO CON <br />
                PROPÓSITO
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', // Un poco más grande para compensar el ajuste
                    maxWidth: '700px', // Más angosto para que no sea tan alto el bloque de texto
                    marginBottom: 'var(--space-8)', // Reducido de space-12 para subir el CTA
                    opacity: 0.9,
                    lineHeight: 1.6,
                    fontWeight: 400
                }}
            >
                Diseño productos digitales que conectan objetivos de negocio con necesidades reales. Mi enfoque combina la <span className="serif-title" style={{ fontSize: '1.2em' }}>narrativa visual</span> con la arquitectura de información para crear experiencias coherentes.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    y: [0, 10, 0]
                }}
                transition={{
                    opacity: { delay: 0.6, duration: 0.8 },
                    y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                style={{
                    marginLeft: '42%', // Ajustado para que el borde arranque en la referencia del cursor
                    width: 'fit-content',
                    zIndex: 10
                }}
                className="hero-cta-wrapper"
            >
                <button
                    onClick={scrollToProjects}
                    className="hero-cta btn-elegant"
                    style={{
                        padding: '1.2rem 3.5rem',
                        fontSize: '1rem',
                        backgroundColor: 'transparent',
                        color: 'var(--text-color)',
                        border: '1px solid var(--text-color)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderRadius: '50px',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                    }}
                >
                    VER PROYECTOS
                    <span style={{ fontSize: '1.2rem' }}>↓</span>
                </button>
            </motion.div>
        </section>
    );
};

export default Hero;
