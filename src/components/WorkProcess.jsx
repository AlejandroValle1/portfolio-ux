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

const WorkProcess = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState(null);

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

            <div className="process-grid-layout" style={{
                gap: '20px',
            }}>
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className={`process-step-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        whileHover={{
                            y: -8,
                            borderColor: 'var(--accent-primary)',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                            transition: { duration: 0.3 }
                        }}
                        style={{
                            backgroundColor: 'var(--surface-color)',
                            padding: 'var(--space-8)',
                            paddingLeft: 'var(--space-12)',
                            borderRadius: '32px',
                            border: '1.5px solid var(--border-inactive)',
                            backdropFilter: 'blur(12px)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-4)',
                            justifyContent: 'center', // Vertical centering
                            cursor: 'default',
                            minHeight: '280px',
                        }}
                    >
                        {/* Large Background Number */}
                        <motion.div
                            animate={{
                                scale: hoveredIndex === index ? 1.1 : 1,
                                color: 'var(--accent-primary)',
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
                            paddingLeft: 'var(--space-12)', // Adequate space for alignment
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
