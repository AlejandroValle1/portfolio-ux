import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePerformance } from '../context/PerformanceContext';

// Hook: detecta qué card está más centrada en el viewport
function useScrollSpotlight(refs, isLowPerformance) {
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
            setActiveIndex(maxRatio > 0.5 ? maxIndex : null);
        };

        refs.forEach((ref, i) => {
            if (!ref.current) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    ratios[i] = entry.intersectionRatio;
                    updateActive();
                },
                { 
                    threshold: isLowPerformance ? [0.5] : [0.2, 0.5, 0.8],
                    rootMargin: isLowPerformance ? "-20% 0px -20% 0px" : "-35% 0px -35% 0px"
                }
            );
            obs.observe(ref.current);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, [refs, isLowPerformance]);

    return activeIndex;
}

const projectsSummary = [
    {
        id: 'separa',
        title: "SE-PA-RÁ",
        intro: <>App sustentable con <strong>gamificación</strong> para incentivar y facilitar la separación de residuos urbanos.</>,
        type: "App Mobile design",
        link: "/separa",
        image: "/Mockup-home-separa.webp",
        imgStyle: { objectFit: 'contain', backgroundColor: '#fff' }
    },
    {
        id: 'tienda-tecno',
        title: "TIENDA TECNO",
        intro: <>Rediseño UX/UI de e-commerce enfocado en reducir <strong>fricción</strong> y aumentar la <strong>confianza de compra</strong>.</>,
        type: "Web Design / UX Research",
        link: "/tienda-tecno",
        image: "/Mockup-home-tienda_tecno.webp",
        imgStyle: { objectFit: 'contain', scale: 1.6, backgroundColor: '#fff' }
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

    const cardRefsArray = React.useRef(projectsSummary.map(() => React.createRef()));
    const cardRefs = cardRefsArray.current;
    const activeIndex = useScrollSpotlight(cardRefs, isLowEnd || isMobile);

    const getCardStyle = () => ({
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch',
        cursor: 'pointer',
        width: '100%',
        height: isMobile ? 'auto' : 'clamp(480px, 65vh, 620px)',
        borderRadius: '32px',
        overflow: 'hidden',
        willChange: 'transform',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        transition: 'all 0.4s ease',
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
                PROYECTOS DESTACADOS
            </motion.h2>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? 'var(--space-6)' : 'var(--space-12)'
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
                            whileHover={!isMobile ? {
                                borderColor: 'var(--accent-primary)',
                                boxShadow: '0 15px 50px rgba(0,0,0,0.1), 0 0 30px var(--accent-glow)',
                                transition: { duration: 0.3 }
                            } : undefined}
                            whileTap={{ scale: 0.98 }}
                            className="project-card"
                            style={{
                                ...getCardStyle(),
                                ...((isLowEnd || isMobile) && activeIndex !== null ? {
                                    borderColor: activeIndex === index ? 'var(--accent-primary)' : 'var(--border-inactive)',
                                    boxShadow: activeIndex === index
                                        ? '0 20px 60px var(--accent-glow)'
                                        : 'none',
                                    opacity: activeIndex === index ? 1 : 0.45,
                                } : {})
                            }}
                        >
                            {/* Imagen — izquierda en desktop, arriba en mobile */}
                            <div style={{
                                flex: '0 0 55%',
                                width: isMobile ? '100%' : '55%',
                                height: isMobile ? '240px' : 'auto',
                                minHeight: isMobile ? '240px' : 'auto',
                                backgroundColor: '#fff',
                                overflow: 'hidden',
                                position: 'relative',
                                // Flex centering en mobile para centrar la imagen content
                                display: isMobile ? 'flex' : 'block',
                                alignItems: isMobile ? 'center' : undefined,
                                justifyContent: isMobile ? 'center' : undefined,
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
                                {/* TAG */}
                                <span
                                    aria-label={`Categoría: ${project.type}`}
                                    style={{
                                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.12em',
                                        fontWeight: 700,
                                        color: 'var(--text-color)',
                                        border: '1px solid var(--border-inactive)',
                                        padding: isMobile ? '4px 10px' : '6px 14px',
                                        borderRadius: '50px',
                                        display: 'inline-block',
                                        width: 'fit-content',
                                    }}
                                >
                                    {project.type}
                                </span>

                                {/* TÍTULO */}
                                <h3 style={{
                                    fontSize: isMobile ? 'clamp(1.5rem, 8vw, 2.25rem)' : 'clamp(2.5rem, 5vw, 4.5rem)',
                                    lineHeight: 1.0,
                                    margin: '0',
                                    fontWeight: 900,
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
                                    opacity: 0.72,
                                    margin: '0',
                                    maxWidth: isMobile ? 'none' : '38ch'
                                }}>
                                    {project.intro}
                                </p>

                                {/* CTA — derecha en desktop | full-width acento en mobile */}
                                <div style={{ flex: 1, minHeight: isMobile ? 'var(--space-3)' : 0 }} />
                                <div style={{ display: 'flex', justifyContent: isMobile ? 'stretch' : 'flex-end' }}>
                                    <div
                                        className="btn-elegant"
                                        style={isMobile ? {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            width: '100%',
                                            padding: '14px 20px',
                                            borderRadius: '12px',
                                            border: '2px solid var(--accent-primary)',
                                            color: 'var(--text-color)',
                                            fontSize: '0.9rem',
                                            fontWeight: 800,
                                            background: 'transparent',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                        } : {
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '14px 36px',
                                            borderRadius: '50px',
                                            border: '1.5px solid var(--accent-primary)',
                                            color: 'var(--text-color)',
                                            fontSize: '1rem',
                                            fontWeight: 800,
                                            background: 'transparent',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.06em',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Ver caso de estudio
                                        <span style={{ fontSize: isMobile ? '1.1rem' : '1.2rem' }}>↗</span>
                                    </div>
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
