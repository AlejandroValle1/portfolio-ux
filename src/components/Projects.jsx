import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePerformance } from '../context/PerformanceContext';

import { useScrollSpotlight } from '../hooks/useScrollSpotlight';

const projectsSummary = [
    {
        id: 'smartock',
        title: "SMARTOCK",
        intro: <>Plataforma de gestión de inventario inteligente en tiempo real. <strong>Optimizando tiempos para comercios</strong> minoristas.</>,
        type: "Product Design / SaaS",
        tags: ["UX/UI", "B2B SaaS", "Figma", "IA"],
        link: "/smartock",
        image: "/Mockup-home-smartock.webp",
        imgStyle: { objectFit: 'contain', scale: 1.2, backgroundColor: '#fff' }
    },
    {
        id: 'separa',
        title: "SE-PA-RÁ",
        intro: <>Diseñé una app que convierte el reciclaje urbano en un hábito. <strong>Investigación de usuarios, arquitectura de información y sistema de incentivos</strong> desde cero.</>,
        type: "App Mobile design",
        tags: ["Mobile App", "UX Research", "Sistema de incentivos"],
        link: "/separa",
        image: "/Mockup-home-separa.webp",
        imgStyle: { objectFit: 'contain', backgroundColor: '#fff' }
    },
    {
        id: 'tienda-tecno',
        title: "TIENDA TECNO",
        intro: <>E-commerce de hardware diseñado para <strong>3 perfiles de usuario distintos</strong>. Del wireframe al prototipo final en 4 meses.</>,
        type: "Web Design / UX Research",
        tags: ["E-commerce", "Web Design", "UX Research"],
        link: "/tienda-tecno",
        image: "/Mockup-home-tienda_tecno.webp",
        imgStyle: { objectFit: 'contain', scale: 1.6, backgroundColor: '#fff' }
    },
    {
        id: 'azafran',
        title: "AZAFRÁN MENDOZA",
        intro: <>Rediseño de la experiencia digital de un restaurante estrella Michelin. Creación de un <strong>sistema de reservas nativo, asimétrico y elástico</strong>.</>,
        type: "Product Redesign / UX/UI",
        tags: ["Redesign", "UX/UI", "Gastronomía"],
        link: "/azafran",
        image: "/Mockup-home-azafran.webp",
        imgStyle: { objectFit: 'contain', scale: 1.1, backgroundColor: '#fff' }
    }
];

// Desktop: clip-path reveal + parallax + hover zoom
// Mobile: imagen estática plana, sin animaciones
const ParallaxImage = ({ src, alt, imgStyle = {}, isMobile = false, isLowPerformance = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);
    const imgRef = useRef(null);

    // Hooks siempre declarados
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    // Inmovilizamos el parallax en movil o gama baja
    const y = useTransform(scrollYProgress, [0, 1], (isMobile || isLowPerformance) ? [0, 0] : [10, -10]);

    useEffect(() => {
        const img = imgRef.current;
        if (img) {
            if (img.complete) setIsLoaded(true);
            else {
                const onLoad = () => setIsLoaded(true);
                img.addEventListener('load', onLoad);
                return () => img.removeEventListener('load', onLoad);
            }
        }
    }, [src]);

    // MOBILE o Low Performance: imagen plana
    if (isMobile || isLowPerformance) {
        return (
            <img
                src={src}
                alt={alt}
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                }}
            />
        );
    }

    const baseScale = imgStyle.scale || 1;
    const hoverScaleValue = baseScale * 0.97;

    return (
        <motion.div
            ref={containerRef}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
        >
            {!isLoaded && (
                <div className="skeleton-shimmer" style={{
                    width: '100%', height: '100%',
                    position: 'absolute', top: 0, left: 0,
                    zIndex: 2, backgroundColor: 'rgba(255,255,255,0.05)'
                }} />
            )}
            <motion.img
                ref={imgRef}
                src={src}
                alt={alt}
                whileHover={{ scale: hoverScaleValue }}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    position: 'relative',
                    zIndex: 1,
                    y,
                    ...imgStyle
                }}
                transition={{ scale: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } }}
                onLoad={() => setIsLoaded(true)}
            />
        </motion.div>
    );
};

const Projects = () => {
    const { isLowEnd, isMobile } = usePerformance();

    const cardRefs = React.useMemo(() => projectsSummary.map(() => React.createRef()), []);
    const activeIndex = useScrollSpotlight(cardRefs, isLowEnd || isMobile);

    const getCardStyle = () => ({
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch',
        cursor: 'pointer',
        width: '100%',
        minHeight: isMobile ? 'auto' : '520px', 
        height: isMobile ? 'auto' : 'auto', 
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        willChange: 'transform',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        transition: 'all 0.4s ease',
        backgroundColor: 'var(--surface-color)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: 'none',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 0 0 1.5px var(--border-inactive)', // Use outset shadow instead of border to prevent child bleed
    });

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
                PROYECTOS
            </motion.h2>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? 'var(--space-12)' : 'var(--space-12)' // Más espacio en móvil para evitar pisado
            }}>
                {projectsSummary.map((project, index) => (
                    <Link
                        key={project.id}
                        to={project.link}
                        aria-label={`Ver caso de estudio del proyecto ${project.title}`}
                        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    >
                        <motion.article
                            ref={cardRefs[index]}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={!isMobile ? "cardHover" : undefined}
                            whileTap={{ scale: 0.98 }}
                            className="project-card"
                            style={{
                                ...getCardStyle(),
                                ...((isLowEnd || isMobile) && activeIndex !== null ? {
                                    boxShadow: activeIndex === index
                                        ? '0 20px 60px var(--accent-glow), 0 0 0 1.5px var(--accent-primary)'
                                        : '0 10px 30px rgba(0,0,0,0.05), 0 0 0 1.5px var(--border-inactive)',
                                    opacity: activeIndex === index ? 1 : 0.45,
                                } : {})
                            }}
                            variants={{
                                cardHover: {
                                    boxShadow: '0 15px 50px rgba(0,0,0,0.1), 0 0 0 1.5px var(--accent-primary), 0 0 30px var(--accent-glow)',
                                    transition: { duration: 0.3 }
                                }
                            }}
                        >
                            {/* Imagen — izquierda en desktop, arriba en mobile */}
                            <div style={{
                                flex: '0 0 55%',
                                width: isMobile ? '100%' : '55%',
                                height: isMobile ? '240px' : 'auto',
                                minHeight: isMobile ? '240px' : 'auto',
                                overflow: 'hidden',
                                position: 'relative',
                                // Flex centering en mobile para centrar la imagen content
                                display: isMobile ? 'flex' : 'block',
                                alignItems: isMobile ? 'center' : undefined,
                                justifyContent: isMobile ? 'center' : undefined,
                                backgroundColor: '#fff', // Fondo blanco puro para ocultar bordes de imagen
                                borderBottom: isMobile ? '1px solid var(--border-inactive)' : 'none',
                                borderRight: isMobile ? 'none' : '1px solid var(--border-inactive)',
                            }}>
                            <ParallaxImage
                                src={project.image}
                                alt={`Mockup del proyecto ${project.title}`}
                                imgStyle={project.imgStyle}
                                isMobile={isMobile}
                                isLowPerformance={isLowEnd}
                            />
                            </div>

                            {/* Contenido — derecha en desktop, abajo en mobile */}
                            <div style={{
                                flex: '1 1 45%',
                                width: isMobile ? '100%' : '45%',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
                                gap: isMobile ? 'var(--space-2)' : 'var(--space-3)',
                            }}>
                                {/* TAGS */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                fontSize: isMobile ? '0.68rem' : '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                fontWeight: 'var(--fw-bold)',
                                                color: 'var(--accent-primary)',
                                                background: 'color-mix(in srgb, var(--accent-primary) 12%, transparent)',
                                                border: '1px solid color-mix(in srgb, var(--accent-primary) 35%, transparent)',
                                                padding: isMobile ? '4px 10px' : '5px 12px',
                                                borderRadius: 'var(--radius-pill)',
                                                display: 'inline-block',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* TÍTULO */}
                                <h3 style={{
                                    fontSize: isMobile ? 'clamp(1.5rem, 8vw, 2.25rem)' : 'clamp(2.5rem, 5vw, 4.5rem)',
                                    lineHeight: 1.0,
                                    margin: '0',
                                    fontWeight: 'var(--fw-black)',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Inter, sans-serif',
                                    letterSpacing: '-0.04em'
                                }}>
                                    {project.title}
                                </h3>

                                {/* DESCRIPCIÓN */}
                                <p style={{
                                    fontSize: isMobile ? '0.95rem' : '1.1rem',
                                    lineHeight: 1.6,
                                    opacity: 0.9,
                                    fontWeight: 'var(--fw-medium)',
                                    margin: '0',
                                    maxWidth: isMobile ? 'none' : '38ch'
                                }}>
                                    {project.intro}
                                </p>

                                {/* CTA — Alineación consistente a la derecha con margen de seguridad */}
                                <div style={{ flex: 1, minHeight: isMobile ? 'var(--space-3)' : 'var(--space-2)' }} />
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: isMobile ? 'stretch' : 'flex-end',
                                    width: '100%',
                                    paddingBottom: 'var(--space-2)',
                                    paddingRight: isMobile ? 0 : 'var(--space-2)'
                                }}>
                                    <motion.div
                                        className="btn-elegant"
                                        initial="initial"
                                        whileHover="hover"
                                        style={isMobile ? {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            width: '100%',
                                            padding: '14px 16px',
                                            borderRadius: 'var(--radius-small)',
                                            border: '2px solid var(--accent-primary)',
                                            color: 'var(--text-color)',
                                            fontSize: '0.85rem',
                                            fontWeight: 'var(--fw-bold)',
                                            background: 'transparent',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            whiteSpace: 'nowrap'
                                        } : {
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '14px 36px',
                                            borderRadius: 'var(--radius-pill)',
                                            border: '1.5px solid var(--accent-primary)',
                                            color: 'var(--text-color)',
                                            fontSize: '1rem',
                                            fontWeight: 'var(--fw-bold)',
                                            background: 'transparent',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.06em',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Ver caso de estudio
                                        <motion.span 
                                            variants={{ 
                                                initial: { x: 0, y: 0 },
                                                hover: { x: 3, y: -3 } 
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            style={{ display: 'inline-block', fontSize: isMobile ? '1.1rem' : '1.2rem' }}
                                        >
                                            ↗
                                        </motion.span>
                                    </motion.div>
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
