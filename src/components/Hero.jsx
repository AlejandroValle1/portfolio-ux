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
            paddingTop: '160px',
            paddingBottom: 'var(--space-12)',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'var(--main-gradient)',
            backgroundSize: 'cover',
            color: 'var(--text-color)'
        }}>
            <div className="container hero-container" style={{ position: 'relative', zIndex: 2 }}>

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
                Diseño productos digitales que conectan objetivos de negocio con necesidades reales. Mi enfoque combina la <span style={{ fontWeight: 700, color: 'var(--text-color)' }}>narrativa visual</span> con la arquitectura de información para crear experiencias coherentes.
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
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        color: 'var(--text-color)',
                        border: '1.5px solid var(--accent-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderRadius: '50px',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                    }}
                >
                    VER PROYECTOS
                    <motion.span 
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center',
                            fontSize: '1.2rem',
                            lineHeight: 1
                        }}
                    >
                        ↓
                    </motion.span>
                </motion.button>
            </motion.div>

            </div>

            {/* Gradiente de transición al fondo sólido - Ahora detrás del contenido */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '150px',
                background: 'linear-gradient(to bottom, transparent, var(--bg-color))',
                pointerEvents: 'none',
                zIndex: 0
            }} />
        </section>
    );
};

export default Hero;
