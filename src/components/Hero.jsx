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
            paddingTop: '160px', // Reducido de 240px para subir todo el bloque
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
                    fontSize: 'clamp(2.1rem, 8vw, 7.5rem)', 
                    marginBottom: 'var(--space-3)', // Reducido de space-4
                    lineHeight: 1.1, 
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
                    fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', 
                    maxWidth: '700px', 
                    marginBottom: 'var(--space-6)', // Reducido de space-8 para subir el CTA
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
                <motion.button
                    onClick={scrollToProjects}
                    className="hero-cta btn-elegant"
                    whileTap={{ scale: 0.98 }}
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
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
