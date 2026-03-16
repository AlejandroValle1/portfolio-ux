import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            borderColor: 'var(--border-inactive)',
            transition: { duration: 0.6, ease: "easeOut" }
        },
        hover: {
            y: -8,
            borderColor: 'var(--accent-primary)',
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    return (
        <section id="about" className="container" style={{ paddingBottom: 'var(--space-24)', paddingTop: 'var(--space-4)' }}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    marginBottom: 'var(--space-12)',
                    color: 'var(--accent-primary)',
                    fontWeight: 900,
                    textAlign: 'center'
                }}
            >
                SOBRE MÍ
            </motion.h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                className="about-bento-layout"
            >
                {/* Block 1: Quién soy (Principal) */}
                <motion.div
                    variants={itemVariants}
                    whileHover="hover"
                    className="bento-about-1 about-bento-card"
                    style={{
                        padding: 'var(--space-8)',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        cursor: 'default',
                    }}
                >
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 'var(--space-4)', color: 'var(--accent-primary)' }}>
                        QUIÉN SOY
                    </h3>
                    <p style={{ fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 500 }}>
                        Soy Alejandro Valle, diseñador UX con una sólida base en Comunicación. Me apasiona crear experiencias digitales claras, inclusivas y funcionales, combinando la sensibilidad narrativa con la precisión estructural.
                    </p>
                </motion.div>

                {/* Block 2: Foto */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{
                        ...itemVariants.hover,
                        boxShadow: '8px 8px 0 var(--accent-primary)'
                    }}
                    className="bento-about-2 about-bento-card"
                    style={{
                        backgroundColor: 'var(--text-color)',
                        borderRadius: '24px',
                        border: '1.5px solid var(--border-inactive)',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                >
                    <motion.img
                        initial={{ scale: 1.1 }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.6 }
                        }}
                        src="/ale-valle-selfie.webp"
                        alt="Alejandro Valle"
                        style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '300px',
                            objectFit: 'cover',
                            filter: 'grayscale(10%) contrast(110%)',
                        }}
                    />
                </motion.div>

                {/* Block 3: Mi recorrido (Comunicación) */}
                <motion.div
                    variants={itemVariants}
                    whileHover="hover"
                    className="bento-about-3 about-bento-card"
                    style={{
                        padding: 'var(--space-6)',
                        borderRadius: '24px',
                    }}
                >
                    <h4 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-2)', opacity: 0.7 }}>
                        Formación
                    </h4>
                    <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                        Estudié Comunicación en la UNT (Tucumán). La semiótica y el guión me enseñaron a construir mensajes que generan confianza y narrativas que conectan.
                    </p>
                </motion.div>

                {/* Block 4: Mi recorrido (UX) */}
                <motion.div
                    variants={itemVariants}
                    whileHover="hover"
                    className="bento-about-4 about-bento-card"
                    style={{
                        backgroundColor: 'var(--text-color)',
                        color: 'var(--bg-color)',
                        padding: 'var(--space-6)',
                        borderRadius: '24px',
                        border: '1.5px solid var(--border-inactive)',
                    }}
                >
                    <h4 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-2)', opacity: 0.8 }}>
                        Evolución UX
                    </h4>
                    <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                        De autodidacta a becado en Digitalers (Telecom). Hoy aplico investigación y diseño atómico para crear sistemas escalables y humanos.
                    </p>
                </motion.div>

                {/* Block 5: Mi filosofía */}
                <motion.div
                    variants={itemVariants}
                    whileHover="hover"
                    className="bento-about-5 about-bento-card"
                    style={{
                        padding: 'var(--space-8)',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        cursor: 'default',
                    }}
                >
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
                        MI FILOSOFÍA
                    </h3>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>
                        Me caracterizo por ser detallista, metódico y transparente. No solo diseño interfaces; construyo puentes de confianza entre el negocio y las personas a través de la claridad visual y la arquitectura de información.
                    </p>
                </motion.div>

                {/* Block 6: Descargar CV (Nuevo) */}
                <motion.a
                    href="/CV - ALEJANDRO VALLE.pdf"
                    download="CV - ALEJANDRO VALLE.pdf"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.1 }}
                    className="bento-about-cv about-bento-card"
                    style={{
                        padding: 'var(--space-8)',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: 'var(--space-4)',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        minHeight: '200px',
                        zIndex: 5,
                        position: 'relative',
                        transition: 'border-color 0.3s ease, transform 0.3s ease'
                    }}
                >
                    <motion.div
                        variants={{
                            hover: {
                                y: -6,
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }
                        }}
                        style={{ fontSize: '3.5rem', marginBottom: '4px' }}
                    >
                        📄
                    </motion.div>

                    <motion.div
                        variants={{
                            hover: { y: -2 }
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.4rem',
                            fontWeight: 900,
                            margin: 0,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'inherit'
                        }}>
                            DESCARGAR CV
                        </h3>
                        <p style={{
                            fontSize: '0.9rem',
                            opacity: 0.7,
                            margin: 0,
                            marginTop: '2px',
                            fontWeight: 600,
                            color: 'inherit'
                        }}>
                            PDF • 2024
                        </p>
                    </motion.div>


                </motion.a>
            </motion.div>
        </section>
    );
};

export default About;
