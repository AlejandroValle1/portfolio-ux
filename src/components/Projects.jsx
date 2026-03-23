import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const projectsSummary = [
    {
        id: 'separa',
        title: "SE-PA-RÁ",
        intro: "Una propuesta digital para educar y motivar la separación de residuos en la ciudad.",
        type: "App Mobile design",
        link: "/separa",
        image: "/separa-mockup.webp",
        imgStyle: { objectFit: 'contain', padding: 'var(--space-1)', backgroundColor: '#fff' }
    },
    {
        id: 'tiendatecno',
        title: "TIENDA TECNO",
        intro: "E-commerce confiable para marca con locales físicos.",
        type: "Web Design / UX Research",
        link: "/tiendatecno",
        image: "/tienda-mockup.webp",
        imgStyle: { objectFit: 'contain', padding: 'var(--space-6)', backgroundColor: '#fff' }
    }
];



const ImageWithSkeleton = ({ src, alt, hoverVariants, imgStyle = {} }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const img = imgRef.current;
        if (img) {
            if (img.complete) {
                setIsLoaded(true);
            } else {
                const handleLoad = () => setIsLoaded(true);
                img.addEventListener('load', handleLoad);
                return () => img.removeEventListener('load', handleLoad);
            }
        }
    }, [src]); // Re-run effect if src changes

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {!isLoaded && (
                <div className="skeleton-shimmer" style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                }} />
            )}
            <motion.img
                ref={imgRef}
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
                    transition: 'opacity 0.6s ease',
                    position: 'relative',
                    zIndex: 1,
                    ...imgStyle
                }}
            />
        </div>
    );
};

const Projects = () => {
    const [isMobile, setIsMobile] = React.useState(false);
    
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
                            whileInView={isMobile ? {
                                opacity: 1, 
                                y: 0,
                                borderColor: ['rgba(0,0,0,0)', 'var(--accent-primary)', 'rgba(0,0,0,0)'],
                                boxShadow: ['0 0px 0px transparent', '0 15px 35px rgba(230,90,43,0.15)', '0 0px 0px transparent'],
                                transition: { duration: 1.5, delay: index * 0.1 }
                            } : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={!isMobile ? { duration: 0.6, delay: index * 0.1 } : undefined}
                            whileHover={!isMobile ? {
                                y: -8,
                                borderColor: 'var(--accent-primary)',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                transition: { duration: 0.3 }
                            } : undefined}
                            whileTap={{ scale: 0.98 }}
                            className="project-card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                height: '100%',
                                borderRadius: '32px',
                                overflow: 'hidden',
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
                                    imgStyle={project.imgStyle}
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
                                            fontSize: '0.75rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            fontWeight: 800,
                                            backgroundColor: 'rgba(26, 42, 64, 0.05)',
                                            color: 'var(--text-color)',
                                            border: '1.2px solid var(--text-color)',
                                            padding: '6px 14px',
                                            borderRadius: '50px',
                                            display: 'inline-block'
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
