import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const projectsSummary = [
    {
        id: 'separa',
        title: "SE-PA-RÁ",
        intro: "Una propuesta digital para educar y motivar la separación de residuos en la ciudad.",
        type: "App Mobile design",
        link: "/separa",
        image: "/separa-mockup.webp"
    },
    {
        id: 'tiendatecno',
        title: "TIENDA TECNO",
        intro: "E-commerce confiable para marca con locales físicos.",
        type: "Web Design / UX Research",
        link: "/tiendatecno",
        image: "/tienda-mockup.webp"
    }
];



const ImageWithSkeleton = ({ src, alt, hoverVariants }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <>
            {!isLoaded && (
                <div className="skeleton-shimmer" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
            )}
            <motion.img
                src={src}
                alt={alt}
                variants={hoverVariants}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                onLoad={() => setIsLoaded(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                }}
            />
        </>
    );
};

const Projects = () => {
    // Preload images
    React.useEffect(() => {
        projectsSummary.forEach((project) => {
            const img = new Image();
            img.src = project.image;
        });
    }, []);

    return (
        <section
            id="projects"
            className="container"
            style={{ paddingBottom: 'var(--space-24)' }}
        >
            <motion.h2
                className="brutalist-title"
                initial={{ opacity: 0, y: 30 }}
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
                PROYECTOS DESTACADOS
            </motion.h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-8)'
            }}>
                {projectsSummary.map((project, index) => (
                    <Link
                        key={project.id}
                        to={project.link}
                        aria-label={`Ver caso de estudio del proyecto ${project.title}: ${project.description}`}
                        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                        <motion.article
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{
                                y: -8,
                                borderColor: 'var(--accent-primary)',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                transition: { duration: 0.3 }
                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                height: '100%',
                                backgroundColor: 'var(--surface-color)',
                                border: '1.5px solid var(--border-inactive)',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                transition: 'border-color 0.3s ease, background-color 0.3s ease',
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                                WebkitTransform: 'translateZ(0)'
                            }}
                        >
                            {/* Image Container */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '16/10',
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                overflow: 'hidden',
                                position: 'relative',
                                borderBottom: '1.5px solid var(--border-inactive)'
                            }}>
                                <ImageWithSkeleton
                                    src={project.image}
                                    alt=""
                                    hoverVariants={{ hover: { scale: 1.05 } }}
                                />
                            </div>

                            {/* Content */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--space-3)',
                                flex: 1,
                                padding: 'var(--space-4)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span
                                        aria-label={`Categoría: ${project.type}`}
                                        style={{
                                            fontSize: '0.8rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            fontWeight: 600,
                                            opacity: 0.7,
                                            border: '1.5px solid var(--border-inactive)',
                                            padding: '4px 8px',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        {project.type}
                                    </span>
                                </div>

                                {/* Project Title - Mixed Type */}
                                <h3 style={{
                                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                    lineHeight: 1.1,
                                    margin: 'var(--space-2) 0',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    fontFamily: 'Inter, sans-serif'
                                }}>
                                    {project.title}
                                </h3>

                                <p style={{
                                    fontSize: '1rem',
                                    lineHeight: 1.5,
                                    opacity: 0.8,
                                    maxWidth: '90%',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    {project.intro}
                                </p>

                                <div
                                    className="btn-elegant"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '14px 32px',
                                        borderRadius: '50px',
                                        border: '1.5px solid var(--border-inactive)',
                                        color: 'var(--text-color)',
                                        fontSize: '1rem',
                                        fontWeight: 800,
                                        background: 'transparent',
                                        marginTop: 'auto',
                                        width: 'fit-content',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    Ver caso de estudio
                                    <span style={{ fontSize: '1.2rem', marginLeft: '4px' }}>↗</span>
                                </div>
                            </div>
                        </motion.article>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Projects;
